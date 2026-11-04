package hn.galaxia21.radio

import android.app.PendingIntent
import android.content.Intent
import android.net.Uri
import androidx.media3.common.AudioAttributes
import androidx.media3.common.C
import androidx.media3.common.MediaItem
import androidx.media3.common.MediaMetadata
import androidx.media3.common.PlaybackException
import androidx.media3.common.Player
import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.session.MediaSession
import androidx.media3.session.MediaSessionService
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

class RadioPlaybackService : MediaSessionService() {

    private var mediaSession: MediaSession? = null
    private val serviceScope = CoroutineScope(SupervisorJob() + Dispatchers.Main)
    private var sleepTimerJob: Job? = null
    private var reconnectJob: Job? = null
    private var reconnectAttempts = 0

    companion object {
        const val STREAM_URL = "https://usa8.fastcast4u.com/proxy/galaxia21v2?mp=/1"

        private val _sleepTimerSeconds = MutableStateFlow(0)
        val sleepTimerSeconds: StateFlow<Int> = _sleepTimerSeconds.asStateFlow()

        private val _isReconnecting = MutableStateFlow(false)
        val isReconnecting: StateFlow<Boolean> = _isReconnecting.asStateFlow()

        private val _streamError = MutableStateFlow<String?>(null)
        val streamError: StateFlow<String?> = _streamError.asStateFlow()

        private val _liveMetadataTitle = MutableStateFlow("Transmisión en Vivo • 95.1 FM")
        val liveMetadataTitle: StateFlow<String> = _liveMetadataTitle.asStateFlow()

        private var activeInstance: RadioPlaybackService? = null

        fun setSleepTimerMinutes(minutes: Int) {
            val instance = activeInstance
            if (instance != null) {
                instance.startSleepTimer(minutes * 60)
            } else {
                _sleepTimerSeconds.value = minutes * 60
            }
        }

        fun manualRetry(player: Player?) {
            _streamError.value = null
            _isReconnecting.value = false
            activeInstance?.resetReconnectAttempts()
            player?.let {
                it.prepare()
                it.play()
            }
        }
    }

    fun resetReconnectAttempts() {
        reconnectAttempts = 0
    }

    override fun onCreate() {
        super.onCreate()
        activeInstance = this

        val audioAttributes = AudioAttributes.Builder()
            .setUsage(C.USAGE_MEDIA)
            .setContentType(C.AUDIO_CONTENT_TYPE_MUSIC)
            .build()

        val player = ExoPlayer.Builder(this)
            .setAudioAttributes(audioAttributes, true)
            .setHandleAudioBecomingNoisy(true)
            .setWakeMode(C.WAKE_MODE_NETWORK)
            .build()

        // Local high-res artwork so lock-screen and notifications work offline without latency
        val localArtworkUri = Uri.parse(
            "android.resource://$packageName/${R.drawable.notification_cover}"
        )

        val metadata = MediaMetadata.Builder()
            .setTitle("Galaxia 21 — 95.1 FM En Vivo")
            .setArtist("La Radio de Lempira")
            .setAlbumTitle("Gracias, Lempira • HRNS")
            .setArtworkUri(localArtworkUri)
            .build()

        val mediaItem = MediaItem.Builder()
            .setUri(STREAM_URL)
            .setMediaMetadata(metadata)
            .build()

        player.setMediaItem(mediaItem)

        player.addListener(object : Player.Listener {
            override fun onPlaybackStateChanged(playbackState: Int) {
                if (playbackState == Player.STATE_READY) {
                    reconnectAttempts = 0
                    _isReconnecting.value = false
                    _streamError.value = null
                }
            }

            override fun onIsPlayingChanged(isPlaying: Boolean) {
                if (isPlaying) {
                    reconnectAttempts = 0
                    _isReconnecting.value = false
                    _streamError.value = null
                }
            }

            override fun onMediaMetadataChanged(mediaMetadata: MediaMetadata) {
                val incomingTitle = mediaMetadata.title?.toString()?.trim()
                if (!incomingTitle.isNullOrEmpty() &&
                    !incomingTitle.equals("Galaxia 21 — 95.1 FM En Vivo", ignoreCase = true) &&
                    !incomingTitle.equals("unknown", ignoreCase = true)
                ) {
                    _liveMetadataTitle.value = incomingTitle
                } else {
                    _liveMetadataTitle.value = "Transmisión en Vivo • 95.1 FM"
                }
            }

            override fun onPlayerError(error: PlaybackException) {
                scheduleReconnect(player)
            }
        })

        val sessionActivityIntent = PendingIntent.getActivity(
            this,
            0,
            Intent(this, MainActivity::class.java),
            PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
        )

        mediaSession = MediaSession.Builder(this, player)
            .setSessionActivity(sessionActivityIntent)
            .build()

        // Resume any pending sleep timer set before service connected
        if (_sleepTimerSeconds.value > 0) {
            startSleepTimer(_sleepTimerSeconds.value)
        }
    }

    private fun scheduleReconnect(player: ExoPlayer) {
        reconnectJob?.cancel()
        if (reconnectAttempts < 5) {
            reconnectAttempts += 1
            _isReconnecting.value = true
            _streamError.value = "Señal interrumpida. Reconectando ($reconnectAttempts/5)..."
            reconnectJob = serviceScope.launch {
                delay(3500L)
                player.prepare()
                player.play()
            }
        } else {
            _isReconnecting.value = false
            _streamError.value = "Sin conexión a Internet. Revisa tu red y toca Reintentar."
        }
    }

    fun startSleepTimer(seconds: Int) {
        sleepTimerJob?.cancel()
        _sleepTimerSeconds.value = seconds
        if (seconds <= 0) return

        sleepTimerJob = serviceScope.launch {
            while (_sleepTimerSeconds.value > 0) {
                delay(1000L)
                _sleepTimerSeconds.value -= 1
                if (_sleepTimerSeconds.value == 0) {
                    mediaSession?.player?.pause()
                }
            }
        }
    }

    override fun onGetSession(controllerInfo: MediaSession.ControllerInfo): MediaSession? {
        return mediaSession
    }

    override fun onTaskRemoved(rootIntent: Intent?) {
        val player = mediaSession?.player
        if (player == null || !player.playWhenReady || player.mediaItemCount == 0) {
            stopSelf()
        }
    }

    override fun onDestroy() {
        if (activeInstance === this) {
            activeInstance = null
        }
        serviceScope.cancel()
        mediaSession?.run {
            player.release()
            release()
            mediaSession = null
        }
        super.onDestroy()
    }
}

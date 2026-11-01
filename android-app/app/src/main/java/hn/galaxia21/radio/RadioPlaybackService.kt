package hn.galaxia21.radio

import android.app.PendingIntent
import android.content.Intent
import android.net.Uri
import androidx.media3.common.AudioAttributes
import androidx.media3.common.C
import androidx.media3.common.MediaItem
import androidx.media3.common.MediaMetadata
import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.session.MediaSession
import androidx.media3.session.MediaSessionService

class RadioPlaybackService : MediaSessionService() {

    private var mediaSession: MediaSession? = null

    companion object {
        const val STREAM_URL = "https://usa8.fastcast4u.com/proxy/galaxia21v2?mp=/1"
        const val ARTWORK_URI = "https://galaxia21.vercel.app/lockscreen-square.png"
    }

    override fun onCreate() {
        super.onCreate()

        val audioAttributes = AudioAttributes.Builder()
            .setUsage(C.USAGE_MEDIA)
            .setContentType(C.AUDIO_CONTENT_TYPE_MUSIC)
            .build()

        val player = ExoPlayer.Builder(this)
            .setAudioAttributes(audioAttributes, true)
            .setHandleAudioBecomingNoisy(true)
            .setWakeMode(C.WAKE_MODE_NETWORK)
            .build()

        val metadata = MediaMetadata.Builder()
            .setTitle("Galaxia 21 — 95.1 FM En Vivo")
            .setArtist("La Radio de Lempira")
            .setAlbumTitle("Gracias, Lempira • HRNS")
            .setArtworkUri(Uri.parse(ARTWORK_URI))
            .build()

        val mediaItem = MediaItem.Builder()
            .setUri(STREAM_URL)
            .setMediaMetadata(metadata)
            .build()

        player.setMediaItem(mediaItem)

        val sessionActivityIntent = PendingIntent.getActivity(
            this,
            0,
            Intent(this, MainActivity::class.java),
            PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
        )

        mediaSession = MediaSession.Builder(this, player)
            .setSessionActivity(sessionActivityIntent)
            .build()
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
        mediaSession?.run {
            player.release()
            release()
            mediaSession = null
        }
        super.onDestroy()
    }
}

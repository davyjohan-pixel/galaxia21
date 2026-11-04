package hn.galaxia21.radio

import android.Manifest
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.database.ContentObserver
import android.media.AudioManager
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.provider.Settings
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.animation.expandVertically
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.shrinkVertically
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.media3.common.Player
import androidx.media3.session.MediaController
import androidx.media3.session.SessionToken
import com.google.common.util.concurrent.ListenableFuture

val NavyDark = Color(0xFF061833)
val NavyCardDark = Color(0xFF0F2547)
val NavyText = Color(0xFF081C38)
val BrandYellow = Color(0xFFFACC15)
val LightBg = Color(0xFFF8FAFC)
val DarkBg = Color(0xFF041022)
val WhatsAppGreen = Color(0xFF25D366)
val FacebookBlue = Color(0xFF1877F2)

const val FACEBOOK_URL = "https://www.facebook.com/radiogalaxia21/?locale=es_LA"
const val WHATSAPP_URL = "https://wa.me/50495107057?text=Hola%20Radio%20Galaxia%2021%20(95.1%20FM)%2C%20me%20gustar%C3%ADa%20ponerme%20en%20contacto%20con%20ustedes."
const val PRIVACY_URL = "https://galaxia21.vercel.app/privacidad"
const val WEB_URL = "https://galaxia21.vercel.app"

class MainActivity : ComponentActivity() {

    private var controllerFuture: ListenableFuture<MediaController>? = null
    private var mediaController by mutableStateOf<MediaController?>(null)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Match status bar with brand navy
        window.statusBarColor = android.graphics.Color.parseColor("#061833")

        // Request POST_NOTIFICATIONS on Android 13+ so media controls show on lockscreen
        if (Build.VERSION.SDK_INT >= 33) {
            if (ContextCompat.checkSelfPermission(
                    this,
                    Manifest.permission.POST_NOTIFICATIONS
                ) != PackageManager.PERMISSION_GRANTED
            ) {
                ActivityCompat.requestPermissions(
                    this,
                    arrayOf(Manifest.permission.POST_NOTIFICATIONS),
                    1001
                )
            }
        }

        val sessionToken = SessionToken(
            this,
            ComponentName(this, RadioPlaybackService::class.java)
        )
        val future = MediaController.Builder(this, sessionToken).buildAsync()
        controllerFuture = future
        future.addListener(
            {
                try {
                    mediaController = future.get()
                } catch (_: Exception) {
                }
            },
            ContextCompat.getMainExecutor(this)
        )

        setContent {
            MaterialTheme {
                Galaxia21AppScreen(mediaController = mediaController)
            }
        }
    }

    override fun onDestroy() {
        controllerFuture?.let { MediaController.releaseFuture(it) }
        super.onDestroy()
    }
}

@Composable
fun Galaxia21AppScreen(mediaController: MediaController?) {
    val context = LocalContext.current
    val audioManager = remember {
        context.getSystemService(Context.AUDIO_SERVICE) as AudioManager
    }

    var isPlaying by remember { mutableStateOf(false) }
    var isBuffering by remember { mutableStateOf(false) }
    var showContactDialog by remember { mutableStateOf(false) }
    var expandHistory by remember { mutableStateOf(false) }
    var isDarkMode by remember { mutableStateOf(false) }

    // Observe service-level states (Sleep Timer, Auto-Reconnect, Live Stream Metadata)
    val sleepTimerSeconds by RadioPlaybackService.sleepTimerSeconds.collectAsState()
    val isReconnecting by RadioPlaybackService.isReconnecting.collectAsState()
    val streamError by RadioPlaybackService.streamError.collectAsState()
    val liveMetadataTitle by RadioPlaybackService.liveMetadataTitle.collectAsState()

    // Theme dynamic colors
    val bgColor by animateColorAsState(if (isDarkMode) DarkBg else LightBg, label = "bg")
    val cardColor by animateColorAsState(if (isDarkMode) NavyCardDark else Color.White, label = "card")
    val headerColor by animateColorAsState(if (isDarkMode) NavyDark else Color.White, label = "header")
    val primaryTextColor by animateColorAsState(if (isDarkMode) Color.White else NavyText, label = "txt1")
    val secondaryTextColor by animateColorAsState(
        if (isDarkMode) Color(0xFFCBD5E1) else Color(0xFF334155),
        label = "txt2"
    )

    // Real hardware volume state synced with physical volume buttons
    val maxVolume = remember {
        audioManager.getStreamMaxVolume(AudioManager.STREAM_MUSIC).coerceAtLeast(1)
    }
    var currentVolume by remember {
        mutableStateOf(
            audioManager.getStreamVolume(AudioManager.STREAM_MUSIC).toFloat() / maxVolume.toFloat()
        )
    }

    DisposableEffect(context) {
        val observer = object : ContentObserver(Handler(Looper.getMainLooper())) {
            override fun onChange(selfChange: Boolean) {
                val vol = audioManager.getStreamVolume(AudioManager.STREAM_MUSIC)
                currentVolume = vol.toFloat() / maxVolume.toFloat()
            }
        }
        context.contentResolver.registerContentObserver(
            Settings.System.CONTENT_URI,
            true,
            observer
        )
        onDispose {
            context.contentResolver.unregisterContentObserver(observer)
        }
    }

    DisposableEffect(mediaController) {
        val listener = object : Player.Listener {
            override fun onIsPlayingChanged(playing: Boolean) {
                isPlaying = playing
            }

            override fun onPlaybackStateChanged(playbackState: Int) {
                isBuffering = playbackState == Player.STATE_BUFFERING
            }
        }
        mediaController?.let { controller ->
            isPlaying = controller.isPlaying
            isBuffering = controller.playbackState == Player.STATE_BUFFERING
            controller.addListener(listener)
        }
        onDispose {
            mediaController?.removeListener(listener)
        }
    }

    val togglePlay = {
        mediaController?.let { controller ->
            if (controller.isPlaying) {
                controller.pause()
            } else {
                RadioPlaybackService.manualRetry(controller)
            }
        }
    }

    val shareRadio = {
        val sendIntent = Intent(Intent.ACTION_SEND).apply {
            type = "text/plain"
            putExtra(
                Intent.EXTRA_TEXT,
                "📻 Escucha Radio Galaxia 21 HRNS (95.1 FM) — La Radio de Lempira en vivo desde Gracias, Lempira: $WEB_URL"
            )
        }
        context.startActivity(Intent.createChooser(sendIntent, "Compartir Radio Galaxia 21"))
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(bgColor)
            .verticalScroll(rememberScrollState())
    ) {
        // 1. Top Header Bar with Night Mode Toggle & Contact Button
        Surface(
            color = headerColor,
            shadowElevation = 4.dp,
            modifier = Modifier.fillMaxWidth()
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 14.dp, vertical = 10.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Image(
                        painter = painterResource(id = R.drawable.logo_galaxia),
                        contentDescription = "Logo Galaxia 21 HRNS",
                        modifier = Modifier.size(50.dp)
                    )
                    Spacer(modifier = Modifier.width(10.dp))
                    Column {
                        Text(
                            text = "GALAXIA 21",
                            color = primaryTextColor,
                            fontSize = 19.sp,
                            fontWeight = FontWeight.Black
                        )
                        Text(
                            text = "La Radio de Lempira",
                            color = if (isDarkMode) BrandYellow else Color(0xFF1E3A5F),
                            fontSize = 12.sp,
                            fontWeight = FontWeight.SemiBold
                        )
                    }
                }

                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    IconButton(
                        onClick = { isDarkMode = !isDarkMode },
                        modifier = Modifier
                            .size(38.dp)
                            .clip(CircleShape)
                            .background(if (isDarkMode) NavyCardDark else Color(0xFFF1F5F9))
                    ) {
                        Icon(
                            imageVector = if (isDarkMode) Icons.Default.LightMode else Icons.Default.DarkMode,
                            contentDescription = if (isDarkMode) "Cambiar a modo claro" else "Cambiar a modo oscuro",
                            tint = if (isDarkMode) BrandYellow else NavyText,
                            modifier = Modifier.size(20.dp)
                        )
                    }

                    Button(
                        onClick = { showContactDialog = true },
                        colors = ButtonDefaults.buttonColors(
                            containerColor = BrandYellow,
                            contentColor = NavyText
                        ),
                        shape = RoundedCornerShape(10.dp),
                        contentPadding = PaddingValues(horizontal = 14.dp, vertical = 8.dp)
                    ) {
                        Text(
                            text = "Contacto",
                            fontWeight = FontWeight.Bold,
                            fontSize = 13.sp
                        )
                    }
                }
            }
        }

        // 2. Hero Banner with Aerial Photo of Gracias, Lempira
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(265.dp)
        ) {
            Image(
                painter = painterResource(id = R.drawable.hero_gracias),
                contentDescription = "Vista aérea de Gracias, Lempira",
                contentScale = ContentScale.Crop,
                modifier = Modifier.fillMaxSize()
            )

            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(
                        Brush.horizontalGradient(
                            colors = listOf(
                                NavyDark.copy(alpha = 0.94f),
                                NavyDark.copy(alpha = 0.70f),
                                NavyDark.copy(alpha = 0.25f)
                            )
                        )
                    )
            )

            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(horizontal = 20.dp, vertical = 20.dp),
                verticalArrangement = Arrangement.Center
            ) {
                Box(
                    modifier = Modifier
                        .width(44.dp)
                        .height(5.dp)
                        .clip(RoundedCornerShape(50))
                        .background(BrandYellow)
                )
                Spacer(modifier = Modifier.height(10.dp))
                Row {
                    Text(
                        text = "GALAXIA ",
                        color = Color.White,
                        fontSize = 34.sp,
                        fontWeight = FontWeight.Black
                    )
                    Text(
                        text = "21",
                        color = BrandYellow,
                        fontSize = 34.sp,
                        fontWeight = FontWeight.Black
                    )
                }
                Spacer(modifier = Modifier.height(8.dp))
                Surface(
                    color = BrandYellow,
                    shape = RoundedCornerShape(50)
                ) {
                    Row(
                        modifier = Modifier.padding(horizontal = 14.dp, vertical = 6.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(
                            imageVector = Icons.Default.Radio,
                            contentDescription = null,
                            tint = NavyText,
                            modifier = Modifier.size(18.dp)
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(
                            text = "95.1 FM • HRNS",
                            color = NavyText,
                            fontWeight = FontWeight.Black,
                            fontSize = 17.sp
                        )
                    }
                }
                Spacer(modifier = Modifier.height(10.dp))
                Text(
                    text = "La Radio de Lempira",
                    color = Color.White,
                    fontSize = 20.sp,
                    fontWeight = FontWeight.ExtraBold
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = "Música, información y la mejor compañía, siempre.",
                    color = Color.White.copy(alpha = 0.92f),
                    fontSize = 13.sp,
                    fontStyle = FontStyle.Italic
                )
            }
        }

        // 3. Floating Live Audio Player Card
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp)
                .offset(y = (-20).dp),
            shape = RoundedCornerShape(22.dp),
            colors = CardDefaults.cardColors(containerColor = cardColor),
            elevation = CardDefaults.cardElevation(defaultElevation = 10.dp)
        ) {
            Column(modifier = Modifier.padding(18.dp)) {
                // Connection Error / Auto-Reconnect Alert Banner
                AnimatedVisibility(
                    visible = streamError != null,
                    enter = fadeIn() + expandVertically(),
                    exit = fadeOut() + shrinkVertically()
                ) {
                    Surface(
                        color = Color(0xFFFEF2F2),
                        shape = RoundedCornerShape(12.dp),
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(bottom = 12.dp)
                    ) {
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(horizontal = 12.dp, vertical = 8.dp),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                modifier = Modifier.weight(1f)
                            ) {
                                Icon(
                                    imageVector = Icons.Default.WifiOff,
                                    contentDescription = null,
                                    tint = Color(0xFFDC2626),
                                    modifier = Modifier.size(18.dp)
                                )
                                Spacer(modifier = Modifier.width(8.dp))
                                Text(
                                    text = streamError ?: "",
                                    color = Color(0xFF991B1B),
                                    fontSize = 12.sp,
                                    fontWeight = FontWeight.SemiBold
                                )
                            }
                            if (!isReconnecting) {
                                TextButton(
                                    onClick = { RadioPlaybackService.manualRetry(mediaController) }
                                ) {
                                    Text(
                                        text = "Reintentar",
                                        color = Color(0xFFDC2626),
                                        fontWeight = FontWeight.Black,
                                        fontSize = 12.sp
                                    )
                                }
                            }
                        }
                    }
                }

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        modifier = Modifier.weight(1f)
                    ) {
                        PulsingPlayButton(
                            isPlaying = isPlaying,
                            isBuffering = isBuffering || isReconnecting,
                            onClick = togglePlay
                        )
                        Spacer(modifier = Modifier.width(14.dp))
                        Column(modifier = Modifier.weight(1f)) {
                            Text(
                                text = if (isPlaying) "Escuchando en vivo" else "Escúchanos en vivo",
                                color = primaryTextColor,
                                fontSize = 18.sp,
                                fontWeight = FontWeight.ExtraBold
                            )
                            Text(
                                text = liveMetadataTitle,
                                color = secondaryTextColor,
                                fontSize = 12.sp,
                                fontWeight = FontWeight.SemiBold,
                                maxLines = 1,
                                overflow = TextOverflow.Ellipsis
                            )
                        }
                    }

                    Spacer(modifier = Modifier.width(8.dp))

                    Surface(
                        color = if (isPlaying) Color(0xFF065F46) else NavyDark,
                        shape = RoundedCornerShape(50)
                    ) {
                        Row(
                            modifier = Modifier.padding(horizontal = 10.dp, vertical = 5.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Box(
                                modifier = Modifier
                                    .size(8.dp)
                                    .clip(CircleShape)
                                    .background(
                                        if (isPlaying) Color(0xFF34D399) else BrandYellow
                                    )
                            )
                            Spacer(modifier = Modifier.width(6.dp))
                            Text(
                                text = if (isPlaying) "EN AIRE" else "En vivo",
                                color = Color.White,
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }
                }

                Spacer(modifier = Modifier.height(16.dp))

                // Animated Waveform + Real Device Volume Control
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    AnimatedSoundBars(isPlaying = isPlaying)
                    Spacer(modifier = Modifier.width(14.dp))
                    IconButton(
                        onClick = {
                            val newVol = if (currentVolume > 0f) 0f else 0.7f
                            currentVolume = newVol
                            audioManager.setStreamVolume(
                                AudioManager.STREAM_MUSIC,
                                (newVol * maxVolume).toInt(),
                                0
                            )
                        },
                        modifier = Modifier.size(28.dp)
                    ) {
                        Icon(
                            imageVector = if (currentVolume == 0f) Icons.Default.VolumeOff else Icons.Default.VolumeUp,
                            contentDescription = "Silenciar o activar volumen",
                            tint = primaryTextColor,
                            modifier = Modifier.size(22.dp)
                        )
                    }
                    Spacer(modifier = Modifier.width(6.dp))
                    Slider(
                        value = currentVolume,
                        onValueChange = { newVal ->
                            currentVolume = newVal
                            val targetStep = (newVal * maxVolume).toInt()
                            audioManager.setStreamVolume(
                                AudioManager.STREAM_MUSIC,
                                targetStep,
                                0
                            )
                        },
                        colors = SliderDefaults.colors(
                            thumbColor = BrandYellow,
                            activeTrackColor = BrandYellow,
                            inactiveTrackColor = if (isDarkMode) Color(0xFF1E3A5F) else Color(0xFFE2E8F0)
                        ),
                        modifier = Modifier
                            .weight(1f)
                            .semantics {
                                contentDescription = "Control de volumen de la radio"
                            }
                    )
                }

                Spacer(modifier = Modifier.height(8.dp))

                // Service-Backed Sleep Timer Selector Row
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Default.Timer,
                            contentDescription = null,
                            tint = if (sleepTimerSeconds > 0) BrandYellow else secondaryTextColor,
                            modifier = Modifier.size(16.dp)
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(
                            text = if (sleepTimerSeconds > 0) {
                                "Apagar en ${sleepTimerSeconds / 60}m ${sleepTimerSeconds % 60}s"
                            } else {
                                "Apagado auto:"
                            },
                            color = primaryTextColor,
                            fontSize = 12.sp,
                            fontWeight = FontWeight.SemiBold
                        )
                    }

                    Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                        listOf(0 to "Off", 15 to "15m", 30 to "30m", 60 to "60m").forEach { (mins, label) ->
                            val isSelected = (mins == 0 && sleepTimerSeconds == 0) ||
                                (mins > 0 && sleepTimerSeconds in ((mins - 1) * 60 + 1)..(mins * 60))
                            Surface(
                                color = if (isSelected) {
                                    BrandYellow
                                } else if (isDarkMode) {
                                    Color(0xFF1E3A5F)
                                } else {
                                    Color(0xFFF1F5F9)
                                },
                                shape = RoundedCornerShape(8.dp),
                                modifier = Modifier.clickable {
                                    RadioPlaybackService.setSleepTimerMinutes(mins)
                                }
                            ) {
                                Text(
                                    text = label,
                                    color = if (isSelected) NavyText else primaryTextColor,
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Bold,
                                    modifier = Modifier.padding(horizontal = 9.dp, vertical = 5.dp)
                                )
                            }
                        }
                    }
                }

                Spacer(modifier = Modifier.height(14.dp))
                HorizontalDivider(
                    color = if (isDarkMode) Color(0xFF1E3A5F) else Color(0xFFE2E8F0)
                )
                Spacer(modifier = Modifier.height(12.dp))

                // Quick Social & Share Action Row (Facebook Oficial, WhatsApp, Compartir)
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    // Official Facebook Button
                    Button(
                        onClick = {
                            context.startActivity(
                                Intent(Intent.ACTION_VIEW, Uri.parse(FACEBOOK_URL))
                            )
                        },
                        colors = ButtonDefaults.buttonColors(
                            containerColor = FacebookBlue,
                            contentColor = Color.White
                        ),
                        shape = RoundedCornerShape(12.dp),
                        contentPadding = PaddingValues(horizontal = 10.dp, vertical = 10.dp),
                        modifier = Modifier.weight(1f)
                    ) {
                        Icon(
                            imageVector = Icons.Default.ThumbUp,
                            contentDescription = null,
                            modifier = Modifier.size(16.dp)
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(
                            text = "Facebook",
                            fontWeight = FontWeight.Bold,
                            fontSize = 12.sp,
                            maxLines = 1
                        )
                    }

                    // Official WhatsApp Button
                    Button(
                        onClick = {
                            context.startActivity(
                                Intent(Intent.ACTION_VIEW, Uri.parse(WHATSAPP_URL))
                            )
                        },
                        colors = ButtonDefaults.buttonColors(
                            containerColor = WhatsAppGreen,
                            contentColor = Color.White
                        ),
                        shape = RoundedCornerShape(12.dp),
                        contentPadding = PaddingValues(horizontal = 10.dp, vertical = 10.dp),
                        modifier = Modifier.weight(1f)
                    ) {
                        Icon(
                            imageVector = Icons.Default.Chat,
                            contentDescription = null,
                            modifier = Modifier.size(16.dp)
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(
                            text = "WhatsApp",
                            fontWeight = FontWeight.Bold,
                            fontSize = 12.sp,
                            maxLines = 1
                        )
                    }

                    // Share App / Station Button
                    OutlinedButton(
                        onClick = shareRadio,
                        shape = RoundedCornerShape(12.dp),
                        contentPadding = PaddingValues(horizontal = 10.dp, vertical = 10.dp),
                        modifier = Modifier.weight(0.9f)
                    ) {
                        Icon(
                            imageVector = Icons.Default.Share,
                            contentDescription = null,
                            tint = primaryTextColor,
                            modifier = Modifier.size(16.dp)
                        )
                        Spacer(modifier = Modifier.width(5.dp))
                        Text(
                            text = "Compartir",
                            color = primaryTextColor,
                            fontWeight = FontWeight.Bold,
                            fontSize = 12.sp,
                            maxLines = 1
                        )
                    }
                }
            }
        }

        // 4. "Nuestra Tierra" Card (Fuerte San Cristóbal & 30-Year History)
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 4.dp),
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(containerColor = cardColor),
            elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
        ) {
            Column {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(210.dp)
                ) {
                    Image(
                        painter = painterResource(id = R.drawable.fuerte_san_cristobal),
                        contentDescription = "Fuerte San Cristóbal - Gracias, Lempira",
                        contentScale = ContentScale.Crop,
                        modifier = Modifier.fillMaxSize()
                    )
                    Surface(
                        color = NavyDark.copy(alpha = 0.92f),
                        shape = RoundedCornerShape(12.dp),
                        modifier = Modifier
                            .align(Alignment.BottomStart)
                            .padding(12.dp)
                    ) {
                        Row(
                            modifier = Modifier.padding(horizontal = 12.dp, vertical = 8.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Icon(
                                imageVector = Icons.Default.LocationOn,
                                contentDescription = null,
                                tint = BrandYellow,
                                modifier = Modifier.size(20.dp)
                            )
                            Spacer(modifier = Modifier.width(6.dp))
                            Column {
                                Text(
                                    text = "Gracias, Lempira",
                                    color = Color.White,
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 12.sp
                                )
                                Text(
                                    text = "Tierra de historia, cultura y gente trabajadora.",
                                    color = Color(0xFFE2E8F0),
                                    fontSize = 10.sp
                                )
                            }
                        }
                    }
                }

                Column(modifier = Modifier.padding(18.dp)) {
                    Box(
                        modifier = Modifier
                            .width(36.dp)
                            .height(4.dp)
                            .clip(RoundedCornerShape(50))
                            .background(BrandYellow)
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "Nuestra Tierra",
                        color = primaryTextColor,
                        fontSize = 24.sp,
                        fontWeight = FontWeight.Black
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "Gracias, Lempira, un lugar lleno de historia, tradición y gente de gran corazón. Desde aquí llevamos la mejor música, la información veraz y el orgullo de nuestra tierra.",
                        color = secondaryTextColor,
                        fontSize = 14.sp,
                        lineHeight = 20.sp
                    )

                    AnimatedVisibility(
                        visible = expandHistory,
                        enter = fadeIn() + expandVertically(),
                        exit = fadeOut() + shrinkVertically()
                    ) {
                        Column {
                            Spacer(modifier = Modifier.height(10.dp))
                            HorizontalDivider(
                                color = if (isDarkMode) Color(0xFF1E3A5F) else Color(0xFFE2E8F0)
                            )
                            Spacer(modifier = Modifier.height(10.dp))
                            Text(
                                text = "Con más de 30 años de trayectoria ininterrumpida, Radio Galaxia 21 es la emisora referente del departamento de Lempira. A través de la frecuencia 95.1 FM, hemos consolidado un espacio de comunicación que trasciende el entretenimiento para convertirse en un verdadero pilar institucional y social de nuestra comunidad.",
                                color = secondaryTextColor,
                                fontSize = 14.sp,
                                lineHeight = 20.sp
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(14.dp))
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(50))
                            .border(2.dp, BrandYellow, RoundedCornerShape(50))
                            .clickable { expandHistory = !expandHistory }
                            .padding(vertical = 10.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = if (expandHistory) "Mostrar menos ↑" else "Conoce más sobre nosotros →",
                            color = primaryTextColor,
                            fontWeight = FontWeight.Bold,
                            fontSize = 13.sp
                        )
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // 5. Dark Navy Footer with Official Links
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .background(NavyDark)
                .padding(20.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Image(
                    painter = painterResource(id = R.drawable.logo_galaxia),
                    contentDescription = "Galaxia 21",
                    modifier = Modifier.size(54.dp)
                )
                Spacer(modifier = Modifier.width(12.dp))
                Column {
                    Text(
                        text = "GALAXIA 21",
                        color = Color.White,
                        fontWeight = FontWeight.Black,
                        fontSize = 18.sp
                    )
                    Text(
                        text = "La Radio de Lempira • 95.1 FM",
                        color = BrandYellow,
                        fontWeight = FontWeight.Bold,
                        fontSize = 12.sp
                    )
                }
            }

            Spacer(modifier = Modifier.height(14.dp))
            Row(
                horizontalArrangement = Arrangement.spacedBy(14.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "Facebook Oficial",
                    color = BrandYellow,
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.clickable {
                        context.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(FACEBOOK_URL)))
                    }
                )
                Text(text = "•", color = Color.White.copy(alpha = 0.5f))
                Text(
                    text = "Contacto",
                    color = Color.White,
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.clickable { showContactDialog = true }
                )
                Text(text = "•", color = Color.White.copy(alpha = 0.5f))
                Text(
                    text = "Privacidad",
                    color = Color.White.copy(alpha = 0.85f),
                    fontSize = 12.sp,
                    modifier = Modifier.clickable {
                        context.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(PRIVACY_URL)))
                    }
                )
            }
        }
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(8.dp)
                .background(BrandYellow)
        )
    }

    // Official Contact Modal Dialog
    if (showContactDialog) {
        AlertDialog(
            onDismissRequest = { showContactDialog = false },
            containerColor = Color.White,
            title = {
                Column {
                    Text(
                        text = "Contacto Oficial",
                        color = NavyText,
                        fontWeight = FontWeight.Black,
                        fontSize = 20.sp
                    )
                    Text(
                        text = "Radio Galaxia 21 HRNS • 95.1 FM",
                        color = Color(0xFF334155),
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            },
            text = {
                Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    Surface(
                        color = Color(0xFFF8FAFC),
                        shape = RoundedCornerShape(12.dp),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Column(modifier = Modifier.padding(12.dp)) {
                            Text(
                                text = "NOMBRE LEGAL / RAZÓN SOCIAL",
                                color = Color(0xFF475569),
                                fontSize = 10.sp,
                                fontWeight = FontWeight.Bold
                            )
                            Text(
                                text = "Inversiones Lempira",
                                color = NavyText,
                                fontSize = 16.sp,
                                fontWeight = FontWeight.Black
                            )
                            Text(
                                text = "Gracias, Lempira, Honduras",
                                color = Color(0xFF334155),
                                fontSize = 12.sp
                            )
                        }
                    }

                    Surface(
                        color = Color(0xFFF8FAFC),
                        shape = RoundedCornerShape(12.dp),
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable {
                                val emailIntent = Intent(
                                    Intent.ACTION_SENDTO,
                                    Uri.parse("mailto:congolongalaxi@yahoo.com.mx")
                                )
                                context.startActivity(emailIntent)
                            }
                    ) {
                        Column(modifier = Modifier.padding(12.dp)) {
                            Text(
                                text = "CORREO ELECTRÓNICO",
                                color = Color(0xFF475569),
                                fontSize = 10.sp,
                                fontWeight = FontWeight.Bold
                            )
                            Text(
                                text = "congolongalaxi@yahoo.com.mx",
                                color = Color(0xFF1D4ED8),
                                fontSize = 14.sp,
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }

                    Button(
                        onClick = {
                            context.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(WHATSAPP_URL)))
                        },
                        colors = ButtonDefaults.buttonColors(
                            containerColor = WhatsAppGreen,
                            contentColor = Color.White
                        ),
                        shape = RoundedCornerShape(12.dp),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text(
                            text = "WhatsApp Oficial (+504 9510-7057)",
                            fontWeight = FontWeight.Bold,
                            fontSize = 13.sp,
                            modifier = Modifier.padding(vertical = 4.dp)
                        )
                    }

                    Button(
                        onClick = {
                            context.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(FACEBOOK_URL)))
                        },
                        colors = ButtonDefaults.buttonColors(
                            containerColor = FacebookBlue,
                            contentColor = Color.White
                        ),
                        shape = RoundedCornerShape(12.dp),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text(
                            text = "Síguenos en Facebook Oficial",
                            fontWeight = FontWeight.Bold,
                            fontSize = 13.sp,
                            modifier = Modifier.padding(vertical = 4.dp)
                        )
                    }
                }
            },
            confirmButton = {
                TextButton(onClick = { showContactDialog = false }) {
                    Text("Cerrar", color = NavyText, fontWeight = FontWeight.Bold)
                }
            }
        )
    }
}

@Composable
fun PulsingPlayButton(
    isPlaying: Boolean,
    isBuffering: Boolean,
    onClick: () -> Unit
) {
    val infiniteTransition = rememberInfiniteTransition(label = "pulse")
    val pulseScale by infiniteTransition.animateFloat(
        initialValue = 1.0f,
        targetValue = if (isPlaying) 1.14f else 1.0f,
        animationSpec = infiniteRepeatable(tween(900), RepeatMode.Reverse),
        label = "pulseScale"
    )

    Box(contentAlignment = Alignment.Center) {
        if (isPlaying) {
            Box(
                modifier = Modifier
                    .size(64.dp)
                    .scale(pulseScale)
                    .clip(CircleShape)
                    .background(BrandYellow.copy(alpha = 0.28f))
            )
        }
        Box(
            modifier = Modifier
                .size(64.dp)
                .clip(CircleShape)
                .background(BrandYellow)
                .clickable { onClick() }
                .semantics {
                    contentDescription = if (isPlaying) {
                        "Pausar transmisión en vivo de Radio Galaxia 21"
                    } else {
                        "Reproducir transmisión en vivo de Radio Galaxia 21"
                    }
                },
            contentAlignment = Alignment.Center
        ) {
            if (isBuffering) {
                CircularProgressIndicator(
                    color = NavyText,
                    strokeWidth = 3.dp,
                    modifier = Modifier.size(28.dp)
                )
            } else {
                Icon(
                    imageVector = if (isPlaying) Icons.Default.Pause else Icons.Default.PlayArrow,
                    contentDescription = null,
                    tint = NavyText,
                    modifier = Modifier.size(36.dp)
                )
            }
        }
    }
}

@Composable
fun AnimatedSoundBars(isPlaying: Boolean) {
    val infiniteTransition = rememberInfiniteTransition(label = "wave")
    val scale1 by infiniteTransition.animateFloat(
        initialValue = 0.35f,
        targetValue = 1.0f,
        animationSpec = infiniteRepeatable(tween(550), RepeatMode.Reverse),
        label = "b1"
    )
    val scale2 by infiniteTransition.animateFloat(
        initialValue = 0.9f,
        targetValue = 0.3f,
        animationSpec = infiniteRepeatable(tween(450), RepeatMode.Reverse),
        label = "b2"
    )
    val scale3 by infiniteTransition.animateFloat(
        initialValue = 0.45f,
        targetValue = 0.95f,
        animationSpec = infiniteRepeatable(tween(650), RepeatMode.Reverse),
        label = "b3"
    )

    val heights = listOf(14.dp, 24.dp, 30.dp, 18.dp, 26.dp, 14.dp)
    val scales = listOf(scale1, scale2, scale3, scale2, scale1, scale3)

    Row(
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(4.dp),
        modifier = Modifier.height(32.dp)
    ) {
        heights.forEachIndexed { idx, baseH ->
            val factor = if (isPlaying) scales[idx] else 0.35f
            Box(
                modifier = Modifier
                    .width(4.dp)
                    .height(baseH * factor)
                    .clip(RoundedCornerShape(50))
                    .background(BrandYellow)
            )
        }
    }
}

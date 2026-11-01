package hn.galaxia21.radio

import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.media.AudioManager
import android.net.Uri
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
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
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.core.content.ContextCompat
import androidx.media3.common.Player
import androidx.media3.session.MediaController
import androidx.media3.session.SessionToken
import com.google.common.util.concurrent.ListenableFuture
import kotlinx.coroutines.delay

val NavyDark = Color(0xFF061833)
val NavyText = Color(0xFF081C38)
val BrandYellow = Color(0xFFFACC15)
val LightBg = Color(0xFFF8FAFC)
val WhatsAppGreen = Color(0xFF25D366)

class MainActivity : ComponentActivity() {

    private var controllerFuture: ListenableFuture<MediaController>? = null
    private var mediaController by mutableStateOf<MediaController?>(null)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

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

    // Sleep timer state (in remaining seconds, 0 = off)
    var sleepTimerSeconds by remember { mutableStateOf(0) }

    // Real hardware volume state
    val maxVolume = remember {
        audioManager.getStreamMaxVolume(AudioManager.STREAM_MUSIC).coerceAtLeast(1)
    }
    var currentVolume by remember {
        mutableStateOf(
            audioManager.getStreamVolume(AudioManager.STREAM_MUSIC).toFloat() / maxVolume.toFloat()
        )
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

    // Countdown coroutine for Sleep Timer
    LaunchedEffect(sleepTimerSeconds) {
        if (sleepTimerSeconds > 0) {
            delay(1000L)
            sleepTimerSeconds -= 1
            if (sleepTimerSeconds == 0) {
                mediaController?.pause()
            }
        }
    }

    val togglePlay = {
        mediaController?.let { controller ->
            if (controller.isPlaying) {
                controller.pause()
            } else {
                if (controller.playbackState == Player.STATE_IDLE || controller.playbackState == Player.STATE_ENDED) {
                    controller.prepare()
                }
                controller.play()
            }
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(LightBg)
            .verticalScroll(rememberScrollState())
    ) {
        // 1. Top White Header Bar
        Surface(
            color = Color.White,
            shadowElevation = 4.dp,
            modifier = Modifier.fillMaxWidth()
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 12.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Image(
                        painter = painterResource(id = R.drawable.logo_galaxia),
                        contentDescription = "Galaxia 21 HRNS",
                        modifier = Modifier.size(54.dp)
                    )
                    Spacer(modifier = Modifier.width(10.dp))
                    Column {
                        Text(
                            text = "GALAXIA 21",
                            color = NavyText,
                            fontSize = 20.sp,
                            fontWeight = FontWeight.Black
                        )
                        Text(
                            text = "La Radio de Lempira",
                            color = Color(0xFF1E3A5F),
                            fontSize = 12.sp,
                            fontWeight = FontWeight.SemiBold
                        )
                    }
                }

                Row(verticalAlignment = Alignment.CenterVertically) {
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
                .height(270.dp)
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
                                NavyDark.copy(alpha = 0.92f),
                                NavyDark.copy(alpha = 0.65f),
                                Color.Transparent
                            )
                        )
                    )
            )

            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(horizontal = 20.dp, vertical = 22.dp),
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
                            text = "95.1 FM",
                            color = NavyText,
                            fontWeight = FontWeight.Black,
                            fontSize = 18.sp
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

        // 3. Floating Live Audio Player Card with Real Hardware Volume & Sleep Timer
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp)
                .offset(y = (-18).dp),
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            elevation = CardDefaults.cardElevation(defaultElevation = 8.dp)
        ) {
            Column(modifier = Modifier.padding(18.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        modifier = Modifier.weight(1f)
                    ) {
                        Box(
                            modifier = Modifier
                                .size(62.dp)
                                .clip(CircleShape)
                                .background(BrandYellow)
                                .clickable { togglePlay() },
                            contentAlignment = Alignment.Center
                        ) {
                            if (isBuffering) {
                                CircularProgressIndicator(
                                    color = NavyText,
                                    strokeWidth = 3.dp,
                                    modifier = Modifier.size(26.dp)
                                )
                            } else {
                                Icon(
                                    imageVector = if (isPlaying) Icons.Default.Pause else Icons.Default.PlayArrow,
                                    contentDescription = if (isPlaying) "Pausar" else "Reproducir",
                                    tint = NavyText,
                                    modifier = Modifier.size(34.dp)
                                )
                            }
                        }
                        Spacer(modifier = Modifier.width(14.dp))
                        Column {
                            Text(
                                text = "Escúchanos en vivo",
                                color = NavyText,
                                fontSize = 18.sp,
                                fontWeight = FontWeight.ExtraBold
                            )
                            Text(
                                text = "Radio Galaxia 21 HRNS | 95.1 FM",
                                color = Color(0xFF64748B),
                                fontSize = 12.sp,
                                fontWeight = FontWeight.SemiBold
                            )
                        }
                    }

                    Surface(
                        color = NavyText,
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
                                    .background(Color(0xFF34D399))
                            )
                            Spacer(modifier = Modifier.width(6.dp))
                            Text(
                                text = "En vivo",
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
                    Icon(
                        imageVector = if (currentVolume == 0f) Icons.Default.VolumeOff else Icons.Default.VolumeUp,
                        contentDescription = "Volumen",
                        tint = NavyText,
                        modifier = Modifier.size(22.dp)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
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
                            inactiveTrackColor = Color(0xFFE2E8F0)
                        ),
                        modifier = Modifier.weight(1f)
                    )
                }

                Spacer(modifier = Modifier.height(8.dp))

                // Sleep Timer Selector Row
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Default.Timer,
                            contentDescription = "Temporizador",
                            tint = Color(0xFF64748B),
                            modifier = Modifier.size(16.dp)
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(
                            text = if (sleepTimerSeconds > 0) {
                                "Apagar en ${sleepTimerSeconds / 60}m ${sleepTimerSeconds % 60}s"
                            } else {
                                "Temporizador:"
                            },
                            color = Color(0xFF475569),
                            fontSize = 12.sp,
                            fontWeight = FontWeight.SemiBold
                        )
                    }

                    Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                        listOf(0 to "Off", 15 to "15m", 30 to "30m", 60 to "60m").forEach { (mins, label) ->
                            val isSelected = (mins == 0 && sleepTimerSeconds == 0) ||
                                (mins > 0 && sleepTimerSeconds in ((mins - 1) * 60 + 1)..(mins * 60))
                            Surface(
                                color = if (isSelected) BrandYellow else Color(0xFFF1F5F9),
                                shape = RoundedCornerShape(8.dp),
                                modifier = Modifier.clickable {
                                    sleepTimerSeconds = mins * 60
                                }
                            ) {
                                Text(
                                    text = label,
                                    color = NavyText,
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Bold,
                                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                                )
                            }
                        }
                    }
                }
            }
        }

        // 4. "Nuestra Tierra" Card (Fuerte San Cristóbal & 30-Year History)
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 6.dp),
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White),
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
                        color = NavyDark.copy(alpha = 0.90f),
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
                        color = NavyText,
                        fontSize = 24.sp,
                        fontWeight = FontWeight.Black
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "Gracias, Lempira, un lugar lleno de historia, tradición y gente de gran corazón. Desde aquí llevamos la mejor música, la información veraz y el orgullo de nuestra tierra.",
                        color = Color(0xFF334155),
                        fontSize = 14.sp,
                        lineHeight = 20.sp
                    )

                    AnimatedVisibility(visible = expandHistory) {
                        Column {
                            Spacer(modifier = Modifier.height(10.dp))
                            HorizontalDivider(color = Color(0xFFE2E8F0))
                            Spacer(modifier = Modifier.height(10.dp))
                            Text(
                                text = "Con más de 30 años de trayectoria ininterrumpida, Radio Galaxia 21 es la emisora referente del departamento de Lempira. A través de la frecuencia 95.1 FM, hemos consolidado un espacio de comunicación que trasciende el entretenimiento para convertirse en un verdadero pilar institucional y social de nuestra comunidad.",
                                color = Color(0xFF334155),
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
                            text = if (expandHistory) "Mostrar menos" else "Conoce más sobre nosotros →",
                            color = NavyText,
                            fontWeight = FontWeight.Bold,
                            fontSize = 13.sp
                        )
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(14.dp))

        // 5. Dark Navy Footer
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
                    modifier = Modifier.size(56.dp)
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

            Spacer(modifier = Modifier.height(12.dp))
            Row(
                horizontalArrangement = Arrangement.spacedBy(16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "Contacto Oficial",
                    color = BrandYellow,
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.clickable { showContactDialog = true }
                )
                Text(text = "•", color = Color.White.copy(alpha = 0.5f))
                Text(
                    text = "Política de Privacidad",
                    color = Color.White.copy(alpha = 0.8f),
                    fontSize = 12.sp,
                    modifier = Modifier.clickable {
                        val intent = Intent(
                            Intent.ACTION_VIEW,
                            Uri.parse("https://galaxia21.vercel.app/privacidad")
                        )
                        context.startActivity(intent)
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
                        color = Color(0xFF64748B),
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            },
            text = {
                Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    Surface(
                        color = Color(0xFFF8FAFC),
                        shape = RoundedCornerShape(12.dp),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Column(modifier = Modifier.padding(12.dp)) {
                            Text(
                                text = "NOMBRE LEGAL / RAZÓN SOCIAL",
                                color = Color(0xFF64748B),
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
                                color = Color(0xFF64748B),
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
                                color = Color(0xFF64748B),
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
                            val waUri = Uri.parse(
                                "https://wa.me/50495107057?text=Hola%20Radio%20Galaxia%2021%20(95.1%20FM)%2C%20me%20gustar%C3%ADa%20ponerme%20en%20contacto%20con%20ustedes."
                            )
                            context.startActivity(Intent(Intent.ACTION_VIEW, waUri))
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
            val factor = if (isPlaying) scales[idx] else 0.4f
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

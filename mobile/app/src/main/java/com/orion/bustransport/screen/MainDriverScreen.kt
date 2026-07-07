package com.orion.bustransport.screen

import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccountCircle
import androidx.compose.material.icons.filled.Done
import androidx.compose.material.icons.filled.Place
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.platform.LocalContext
import com.orion.bustransport.network.RetrofitClient
import com.orion.bustransport.network.ScanRequest
import kotlinx.coroutines.launch
//import androidx.compose.platform.LocalContext
import com.orion.bustransport.utils.TextToSpeechManager

// 1. DÉFINITION DES ONGLETS DE NAVIGATION
sealed class Screen(val route: String, val title: String, val icon: ImageVector) {
    object Scan : Screen("scan", "Scanner", Icons.Default.Place)
    object Revenue : Screen("revenue", "Revenus", Icons.Default.Done)
    object Profile : Screen("profile", "Profil", Icons.Default.AccountCircle)
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainDriverScreen(driverName: String) {
    val context = LocalContext.current
    val coroutineScope = rememberCoroutineScope()
    // ÉTAT DE L'ONGLET ACTIF
    var currentScreen by remember { mutableStateOf<Screen>(Screen.Scan) }

    // ÉTATS DES DONNÉES SIMULÉES (À lier plus tard à vos appels de route Express.js)
    var totalTicketsScanned by remember { mutableStateOf(24) }
    val ticketPriceMGA = 500
    val tickets = List(10) { index ->
        TicketScanned(
            id = "TK-56758678-${index + 1}",
            num = "TK-56758678-${index + 1}",
            validation = "20-06-2026",
            price = 2000
        )
    }
    val user = UserProfile(
        id = "123456789","Julianot@Orion", phoneNumber = "Julianot Lovasoa", email = "julianot@gmail.com", homeAddress = "Fianarantsoa"
    )

    // État temporaire pour simuler le retour visuel après un scan
    var scanResult by remember { mutableStateOf<Pair<Boolean, String>?>(null) }

    // Liste des onglets à afficher dans la barre du bas
    val items = listOf(Screen.Scan, Screen.Revenue, Screen.Profile)

    val ttsManager = remember { TextToSpeechManager(context) }

    DisposableEffect(Unit) {
        onDispose { ttsManager.shutdown() }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text(
                        text = if (currentScreen == Screen.Scan) "Contrôle des Tickets" else "Rapport Journalier",
                        style = MaterialTheme.typography.titleMedium
                    )
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = Color(0xFF19193E),
                    titleContentColor = Color.White
                )
            )
        },
        bottomBar = {
            NavigationBar(
                containerColor = Color.White,
                contentColor = Color(0xFF3B3B98)
            ) {
                items.forEach { screen ->
                    NavigationBarItem(
                        icon = { Icon(screen.icon, contentDescription = screen.title) },
                        label = { Text(screen.title) },
                        selected = currentScreen == screen,
                        onClick = { currentScreen = screen },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = Color(0xFF3B3B98),
                            selectedTextColor = Color(0xFF3B3B98),
                            indicatorColor = Color(0xFFEAEAEA),
                            unselectedIconColor = Color.Gray,
                            unselectedTextColor = Color.Gray
                        )
                    )
                }
            }
        }
    ) { innerPadding ->
        // COMMUTATEUR D'ÉCRANS (NAVIGATION LOGIQUE)
        Surface(
            modifier = Modifier.padding(innerPadding),
            color = MaterialTheme.colorScheme.background
        ) {
            when (currentScreen) {
                is Screen.Scan -> {
                    ScanScreen(
                        driverName = driverName,
                        scanResult = scanResult,
                        onTokenScanned = { idTicketScanned ->
                            coroutineScope.launch {
                                try {
                                    val response = RetrofitClient.apiService.validateTicket(
                                        ScanRequest(id_ticket = idTicketScanned)
                                    )

                                    if (response.isSuccessful && response.body() != null) {
                                        val apiResult = response.body()!!

                                        if (apiResult.success) {
                                            totalTicketsScanned++
                                            scanResult = Pair(true, "✓ ${apiResult.message}")

                                            // 2. DICTER LE SUCCÈS À HAUTE VOIX
                                            ttsManager.speak("Ticket valide. Bon voyage.")

                                        } else {
                                            scanResult = Pair(false, "❌ ${apiResult.message}")

                                            // 3. DICTER L'ERREUR À HAUTE VOIX
                                            ttsManager.speak("Attention, ticket déjà scanné ou invalide.")
                                        }
                                    } else {
                                        scanResult = Pair(false, "❌ Erreur serveur.")
                                        ttsManager.speak("Erreur de validation système.")
                                    }
                                } catch (e: Exception) {
                                    scanResult = Pair(false, "⚠️ Échec réseau.")
                                    ttsManager.speak("Erreur de connexion internet.")
                                }
                            }
                        }
                    )
                }
                is Screen.Revenue -> {
                    RevenueScreen(
                        totalTicketsScanned = totalTicketsScanned,
                        ticketPriceMGA = ticketPriceMGA,
                        tickets = tickets
                    )
                }

                else -> {
                    ProfileScreen(
                        user = user,
                        onUpdateProfile = { updatedUser ->
                            // TODO: appeler API update profile
                        },
//                        onChangePassword = { oldPass, newPass ->
//                            // TODO: appeler API change password
//                        },
                        onBack = {

                        }
                    )
                }
            }
        }
    }
}
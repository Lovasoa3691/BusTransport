package com.orion.bustransport.screen

import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccountCircle
import androidx.compose.material.icons.filled.Done
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Place
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.lifecycle.viewmodel.compose.viewModel
//import androidx.compose.platform.LocalContext
import com.orion.bustransport.utils.TextToSpeechManager
import com.orion.bustransport.viewModel.DriverViewModel
import kotlinx.coroutines.selects.whileSelect

sealed class Screen(val route: String, val title: String, val icon: ImageVector) {
    object Scan : Screen("scan", "Scanner", Icons.Default.Done)
    object Revenue : Screen("revenue", "Revenus", Icons.Default.Place)
    object Profile : Screen("profile", "Profil", Icons.Default.Person)
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainDriverScreen(driverName: String, onLogout: () -> Unit) {
    val context = LocalContext.current
    var currentScreen by remember { mutableStateOf<Screen>(Screen.Scan) }

    val viewModel: DriverViewModel = viewModel(factory = DriverViewModel.Factory)
    val uiState = viewModel.uiState


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
                        text = if (currentScreen == Screen.Scan) "Contrôle des Tickets" else if (currentScreen == Screen.Revenue) "Rapport Journalier" else "Informations personnel",
                        style = MaterialTheme.typography.titleMedium
                    )
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = Color(0xFF009688),
                    titleContentColor = Color.White
                )
            )
        },
        bottomBar = {
            NavigationBar(
                containerColor = Color(0xE8EAEAEA),
                contentColor = Color(0xFF009688)
            ) {
                items.forEach { screen ->
                    NavigationBarItem(
                        icon = { Icon(screen.icon, contentDescription = screen.title) },
                        label = {
                            Text(
                                text = screen.title,
                                fontWeight = if (currentScreen == screen) {
                                    FontWeight.Bold
                                } else {
                                    FontWeight.Normal
                                }
                            )
                        },
                        selected = currentScreen == screen,
                        onClick = { currentScreen = screen },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = Color(0xFF00B29A),

                            selectedTextColor = Color(0xFF00B29A),
                            indicatorColor = Color(0xFFEAEAEA),
                            unselectedIconColor = Color.Gray,
                            unselectedTextColor = Color.Gray
                        )
                    )
                }
            }
        }
    ) { innerPadding ->
        Surface(
            modifier = Modifier.padding(innerPadding),
            color = MaterialTheme.colorScheme.background
        ) {
            when (currentScreen) {
                is Screen.Scan -> {
                    ScanScreen(
                        driverName = uiState.user?.username ?: "N/A",
                        scanResult = uiState.scanResult,
                        onTokenScanned = {
                            viewModel.scanTicket(it)
                        }
                    )
                }
                is Screen.Revenue -> {
                    RevenueScreen(
                        totalTicketsScanned = uiState.totalTickets,
                        ticketPriceMGA = 2000,
                        tickets = uiState.tickets
                    )
                }
                else -> {
                    uiState.user?.let {
                        ProfileScreen(
                            user = it,
                            onUpdateProfile = {},
                            onBack = { currentScreen = Screen.Scan },
                            onLogout = {
                                viewModel.logout {
                                    onLogout()
                                }
                            },
                            imageBaseUrl = "https://financial-partially-article-privilege.trycloudflare.com"
                        )
                    }
                }
            }
        }
    }
}
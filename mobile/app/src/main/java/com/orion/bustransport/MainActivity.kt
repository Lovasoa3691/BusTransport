package com.orion.bustransport

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.tooling.preview.Preview
import com.orion.bustransport.screen.LoginScreen
import com.orion.bustransport.screen.MainDriverScreen
import com.orion.bustransport.ui.theme.BusTransportTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // Active l'affichage plein écran moderne sous la barre d'état et de navigation
        enableEdgeToEdge()

        setContent {
            BusTransportTheme {
                // 1. ÉTATS GLOBAUX DE SESSION
                var isLoggedIn by remember { mutableStateOf(false) }
                var driverName by remember { mutableStateOf("Chauffeur N° 12") }

                // 2. LOGIQUE DE ROUTING RACINE
                if (!isLoggedIn) {
                    LoginScreen(
                        onLoginSuccess = { usernameScanned ->
                            // Vous pourrez stocker dynamiquement le nom après l'appel API Express
                            if (usernameScanned.isNotBlank()) {
                                driverName = usernameScanned
                            }
                            isLoggedIn = true
                        }
                    )
                } else {
                    MainDriverScreen(
                        driverName = driverName
                    )
                }
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    BusTransportTheme {
        MainDriverScreen(driverName = "Julianot")
    }
}
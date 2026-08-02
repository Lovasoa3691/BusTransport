package com.orion.madatransit

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import com.orion.madatransit.screen.ItineraryResultScreen
import com.orion.madatransit.screen.MainHomeScreen
import com.orion.madatransit.screen.OnboardingScreen
import com.orion.madatransit.ui.theme.MadaTransitTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            MadaTransitTheme {
                var currentScreen by rememberSaveable { mutableStateOf("onboarding") }
                var selectedDestination by rememberSaveable { mutableStateOf("") }

                when (currentScreen) {
                    "onboarding" -> {
                        OnboardingScreen(
                            onFinishOnboarding = {
                                currentScreen = "home"
                            }
                        )
                    }
                    "home" -> {
                        MainHomeScreen(
                            onNavigateToItinerary = { destination ->
                                selectedDestination = destination
                                currentScreen = "itinerary"
                            }
                        )
                    }
                    "itinerary" -> {
                        ItineraryResultScreen(
                            destination = selectedDestination,
                            onBack = {
                                currentScreen = "home"
                            }
                        )
                    }
                }
            }
        }
    }
}

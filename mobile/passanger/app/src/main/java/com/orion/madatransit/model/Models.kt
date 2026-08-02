package com.orion.madatransit.model


import androidx.compose.ui.graphics.Color
import org.osmdroid.util.GeoPoint

data class OnboardingPage(
    val title: String,
    val description: String? = null,
    val backgroundColor: Long,
    val isSplashScreen: Boolean = false
)

//data class BusStop(
//    val id: String,
//    val name: String,
//    val location: LatLng,
//    val distanceMeters: Int
//)

data class BusStop(
    val id: String,
    val name: String,
    val location: GeoPoint,
    val distance: String,
    val availableLines: String,
    val distanceColor: Color
)

data class BusStopInfo(
    val name: String,
    val distance: String,
    val availableLines: String,
    val distanceColor: Color
)
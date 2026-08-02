package com.orion.madatransit.screen

import android.annotation.SuppressLint
import android.content.Context
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import com.google.accompanist.permissions.ExperimentalPermissionsApi
import com.google.accompanist.permissions.rememberMultiplePermissionsState
import com.google.android.gms.location.LocationServices
import com.google.android.gms.location.Priority
import com.orion.madatransit.components.BusStopRowItem
import com.orion.madatransit.components.SelectedStopBanner
import com.orion.madatransit.model.BusStop
import org.osmdroid.config.Configuration
import org.osmdroid.tileprovider.tilesource.TileSourceFactory
import org.osmdroid.util.GeoPoint
import org.osmdroid.views.MapView
import org.osmdroid.views.overlay.Marker
import org.osmdroid.views.overlay.mylocation.GpsMyLocationProvider
import org.osmdroid.views.overlay.mylocation.MyLocationNewOverlay

@OptIn(ExperimentalMaterial3Api::class, ExperimentalPermissionsApi::class)
@SuppressLint("MissingPermission")
@Composable
fun MainHomeScreen(onNavigateToItinerary: (destination: String) -> Unit) {
    val primaryColor = Color(0xFF5E17EB)
    val context = LocalContext.current

    // Permisssions handling
    val locationPermissionsState = rememberMultiplePermissionsState(
        listOf(
            android.Manifest.permission.ACCESS_FINE_LOCATION,
            android.Manifest.permission.ACCESS_COARSE_LOCATION
        )
    )

    // Configuration d'OSM
    Configuration.getInstance().load(context, context.getSharedPreferences("osm_pref", Context.MODE_PRIVATE))

    val allStops = remember {
        listOf(
            BusStop("1", "Arrêt Andrainjato", GeoPoint(-21.4536, 47.0858), "250 m", "Lignes : 1, 3, 7", Color(0xFF00C853)),
            BusStop("2", "Arrêt Mahazengy", GeoPoint(-21.4580, 47.0890), "480 m", "Lignes : 2, 4", Color(0xFF00C853)),
            BusStop("3", "Arrêt Anosizato", GeoPoint(-21.4490, 47.0810), "650 m", "Lignes : 1, 5, 8", Color(0xFFFF9800)),
            BusStop("4", "Arrêt Ambohijatovo", GeoPoint(-21.4620, 47.0950), "810 m", "Lignes : 3, 6", Color(0xFFFF9800))
        )
    }

    var searchQuery by remember { mutableStateOf("") }
    var selectedStop by remember { mutableStateOf<BusStop?>(null) }
    
    // Default position (Fianarantsoa centre) if permission is denied
    val defaultPosition = GeoPoint(-21.4536, 47.0858)
    var userPosition by remember { mutableStateOf<GeoPoint?>(null) }
    var mapView by remember { mutableStateOf<MapView?>(null) }

    // Effect to get real location when permission is granted
    LaunchedEffect(locationPermissionsState.allPermissionsGranted) {
        if (locationPermissionsState.allPermissionsGranted) {
            val fusedLocationProviderClient = LocationServices.getFusedLocationProviderClient(context)
            fusedLocationProviderClient.getCurrentLocation(Priority.PRIORITY_HIGH_ACCURACY, null)
                .addOnSuccessListener { location ->
                    if (location != null) {
                        userPosition = GeoPoint(location.latitude, location.longitude)
                        mapView?.controller?.animateTo(userPosition)
                    }
                }
        }
    }

    // Effect to request permissions once
    LaunchedEffect(Unit) {
        locationPermissionsState.launchMultiplePermissionRequest()
    }

    val scaffoldState = rememberBottomSheetScaffoldState()

    // Filtered stops based on search
    val filteredStops = remember(searchQuery) {
        if (searchQuery.isBlank()) allStops
        else allStops.filter { it.name.contains(searchQuery, ignoreCase = true) || it.availableLines.contains(searchQuery) }
    }

    // Recommendation logic: find the closest stop (use userPosition or default)
    val effectiveUserPosition = userPosition ?: defaultPosition
    val recommendedStop = remember(allStops, userPosition) {
        allStops.minByOrNull { it.location.distanceToAsDouble(effectiveUserPosition) }
    }

    BottomSheetScaffold(
        scaffoldState = scaffoldState,
        sheetPeekHeight = 160.dp,
        sheetShape = RoundedCornerShape(topStart = 28.dp, topEnd = 28.dp),
        sheetContainerColor = Color.White,
        sheetDragHandle = {
            BottomSheetDefaults.DragHandle(
                width = 40.dp,
                height = 4.dp,
                color = Color.LightGray
            )
        },
        sheetContent = {
            BottomSheetContent(
                selectedStop = selectedStop,
                filteredStops = filteredStops,
                recommendedStop = recommendedStop,
                primaryColor = primaryColor,
                onStopSelected = { stop ->
                    selectedStop = stop
                    mapView?.controller?.animateTo(stop.location)
                },
                onCloseBanner = { selectedStop = null },
                onNavigate = onNavigateToItinerary
            )
        }
    ) { innerPadding ->
        MainContent(
            innerPadding = innerPadding,
            primaryColor = primaryColor,
            searchQuery = searchQuery,
            onSearchChange = { searchQuery = it },
            userPosition = effectiveUserPosition,
            isLocationKnown = userPosition != null,
            filteredStops = filteredStops,
            onStopSelected = { selectedStop = it },
            mapView = mapView,
            onMapViewReady = { mapView = it }
        )
    }
}

@Composable
fun BottomSheetContent(
    selectedStop: BusStop?,
    filteredStops: List<BusStop>,
    recommendedStop: BusStop?,
    primaryColor: Color,
    onStopSelected: (BusStop) -> Unit,
    onCloseBanner: () -> Unit,
    onNavigate: (String) -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 20.dp, vertical = 8.dp)
            .navigationBarsPadding()
    ) {
        if (selectedStop != null) {
            SelectedStopBanner(
                stop = selectedStop,
                onClose = onCloseBanner,
                onGoToItinerary = { onNavigate(selectedStop.name) }
            )
        } else {
            // Recommendation Section
            if (recommendedStop != null && filteredStops.contains(recommendedStop)) {
                RecommendationCard(recommendedStop, primaryColor) { onStopSelected(recommendedStop) }
                Spacer(modifier = Modifier.height(16.dp))
            }

            Row(
                modifier = Modifier.fillMaxWidth().padding(bottom = 12.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text("Arrêts proches", fontSize = 18.sp, fontWeight = FontWeight.ExtraBold)
                    Text("${filteredStops.size} arrêts trouvés autour de vous", fontSize = 12.sp, color = Color.Gray)
                }
                Icon(
                    Icons.Default.LocationOn,
                    contentDescription = null,
                    tint = primaryColor,
                    modifier = Modifier.size(24.dp)
                )
            }

            LazyColumn(
                verticalArrangement = Arrangement.spacedBy(10.dp),
                modifier = Modifier.heightIn(max = 400.dp)
            ) {
                items(filteredStops) { stop ->
                    BusStopRowItem(
                        stop = stop,
                        onClick = { onStopSelected(stop) }
                    )
                }
            }
        }
    }
}

@Composable
fun RecommendationCard(stop: BusStop, primaryColor: Color, onClick: () -> Unit) {
    Card(
        onClick = onClick,
        colors = CardDefaults.cardColors(containerColor = primaryColor.copy(alpha = 0.1f)),
        shape = RoundedCornerShape(16.dp),
        modifier = Modifier.fillMaxWidth()
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .size(40.dp)
                    .clip(CircleShape)
                    .background(primaryColor),
                contentAlignment = Alignment.Center
            ) {
                Icon(Icons.Default.Star, contentDescription = null, tint = Color.White, modifier = Modifier.size(20.dp))
            }
            Spacer(modifier = Modifier.width(12.dp))
            Column {
                Text("Meilleur choix proche", fontSize = 12.sp, color = primaryColor, fontWeight = FontWeight.Bold)
                Text(stop.name, fontSize = 16.sp, fontWeight = FontWeight.Bold)
                Text("${stop.distance} • ${stop.availableLines}", fontSize = 12.sp, color = Color.Gray)
            }
        }
    }
}

@Composable
fun MainContent(
    innerPadding: PaddingValues,
    primaryColor: Color,
    searchQuery: String,
    onSearchChange: (String) -> Unit,
    userPosition: GeoPoint,
    isLocationKnown: Boolean,
    filteredStops: List<BusStop>,
    onStopSelected: (BusStop) -> Unit,
    mapView: MapView?,
    onMapViewReady: (MapView) -> Unit
) {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFFF6F7FB))
            .padding(bottom = innerPadding.calculateBottomPadding())
    ) {
        AndroidView(
            factory = { ctx ->
                MapView(ctx).apply {
                    setTileSource(TileSourceFactory.MAPNIK)
                    setMultiTouchControls(true)
                    controller.setZoom(14.0)
                    controller.setCenter(userPosition)

                    val locationOverlay = MyLocationNewOverlay(GpsMyLocationProvider(ctx), this)
                    locationOverlay.enableMyLocation()
                    overlays.add(locationOverlay)
                    
                    onMapViewReady(this)
                }
            },
            modifier = Modifier.fillMaxSize(),
            update = { view ->
                view.overlays.removeIf { it is Marker }
                
                // Add User Position Marker if known
                if (isLocationKnown) {
                    val userMarker = Marker(view)
                    userMarker.position = userPosition
                    userMarker.title = "Ma Position"
                    val icon = view.context.getDrawable(android.R.drawable.ic_menu_myplaces)?.apply {
                        setTint(android.graphics.Color.BLUE)
                    }
                    userMarker.icon = icon
                    userMarker.setAnchor(Marker.ANCHOR_CENTER, Marker.ANCHOR_CENTER)
                    view.overlays.add(userMarker)
                }

                // Add Bus Stop Markers
                filteredStops.forEach { stop ->
                    val marker = Marker(view)
                    marker.position = stop.location
                    marker.title = stop.name
                    marker.setAnchor(Marker.ANCHOR_CENTER, Marker.ANCHOR_BOTTOM)
                    marker.setOnMarkerClickListener { m, _ ->
                        onStopSelected(stop)
                        view.controller.animateTo(m.position)
                        true
                    }
                    view.overlays.add(marker)
                }
                view.invalidate()
            }
        )

        Box(
            modifier = Modifier
                .fillMaxWidth()
                .statusBarsPadding()
                .padding(16.dp)
        ) {
            HeaderSection(primaryColor, searchQuery, onSearchChange, isLocationKnown)
        }

        FloatingActionButton(
            onClick = {
                mapView?.controller?.animateTo(userPosition)
                mapView?.controller?.setZoom(15.0)
            },
            containerColor = Color.White,
            modifier = Modifier
                .align(Alignment.CenterEnd)
                .padding(end = 16.dp)
                .size(48.dp)
        ) {
            Icon(Icons.Default.LocationOn, contentDescription = "GPS", tint = primaryColor)
        }
    }
}

@Composable
fun HeaderSection(primaryColor: Color, searchQuery: String, onSearchChange: (String) -> Unit, isLocationKnown: Boolean) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 8.dp)
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier.padding(horizontal = 12.dp, vertical = 4.dp)
        ) {
            Icon(
                Icons.Default.Search, 
                contentDescription = null, 
                tint = if (isLocationKnown) primaryColor else Color.Gray
            )
            Spacer(modifier = Modifier.width(8.dp))
            TextField(
                value = searchQuery,
                onValueChange = onSearchChange,
                placeholder = { Text("Où allez-vous ?", fontSize = 16.sp, color = Color.Gray) },
                singleLine = true,
                colors = TextFieldDefaults.colors(
                    focusedContainerColor = Color.Transparent,
                    unfocusedContainerColor = Color.Transparent,
                    focusedIndicatorColor = Color.Transparent,
                    unfocusedIndicatorColor = Color.Transparent
                ),
                keyboardOptions = KeyboardOptions(imeAction = ImeAction.Search),
                modifier = Modifier.weight(1f)
            )
            IconButton(onClick = {}) {
                Icon(Icons.Default.AccountCircle, contentDescription = "Profile", tint = primaryColor)
            }
        }
    }
}

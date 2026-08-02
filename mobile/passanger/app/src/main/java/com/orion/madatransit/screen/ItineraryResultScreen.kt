package com.orion.madatransit.screen

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Info
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.orion.madatransit.model.BusStop

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ItineraryResultScreen(
    destination: String,
    onBack: () -> Unit
) {
    val primaryColor = Color(0xFF5E17EB)

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Itinéraire vers $destination") },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Retour")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = primaryColor,
                    titleContentColor = Color.White,
                    navigationIconContentColor = Color.White
                )
            )
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .background(Color(0xFFF6F7FB))
                .padding(16.dp)
        ) {
            Text(
                text = "Meilleures recommandations",
                fontSize = 20.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.padding(bottom = 16.dp)
            )

            // Mocked results
            val results = listOf(
                ItineraryItem("Ligne 1", "Rapide", "15 min", Color(0xFF00C853)),
                ItineraryItem("Ligne 3", "Moins de marche", "22 min", Color(0xFFFF9800)),
                ItineraryItem("Ligne 7", "Direct", "18 min", Color(0xFF5E17EB))
            )

            LazyColumn(
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                items(results) { item ->
                    ItineraryCard(item)
                }
            }
        }
    }
}

data class ItineraryItem(
    val lineName: String,
    val tag: String,
    val duration: String,
    val color: Color
)

@Composable
fun ItineraryCard(item: ItineraryItem) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .size(48.dp)
                    .background(item.color.copy(alpha = 0.1f), RoundedCornerShape(12.dp)),
                contentAlignment = Alignment.Center
            ) {
                Text(item.lineName.takeLast(1), color = item.color, fontWeight = FontWeight.Bold, fontSize = 20.sp)
            }
            Spacer(modifier = Modifier.width(16.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text(item.lineName, fontWeight = FontWeight.Bold, fontSize = 16.sp)
                Text(item.tag, fontSize = 12.sp, color = Color.Gray)
            }
            Column(horizontalAlignment = Alignment.End) {
                Text(item.duration, fontWeight = FontWeight.ExtraBold, color = Color.Black)
                Icon(Icons.Default.Info, contentDescription = null, tint = Color.LightGray, modifier = Modifier.size(16.dp))
            }
        }
    }
}

package com.orion.madatransit.components

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.orion.madatransit.model.BusStop

@Composable
fun SelectedStopBanner(stop: BusStop, onClose: () -> Unit, onGoToItinerary: () -> Unit) {
    Column {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(stop.name, fontSize = 18.sp, fontWeight = FontWeight.Bold)
            IconButton(onClick = onClose) {
                Icon(Icons.Default.Close, contentDescription = "Fermer")
            }
        }
        Text(stop.availableLines, fontSize = 13.sp, color = Color.Gray)
        Spacer(modifier = Modifier.height(12.dp))
        Button(
            onClick = onGoToItinerary,
            modifier = Modifier.fillMaxWidth(),
            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF5E17EB)),
            shape = RoundedCornerShape(12.dp)
        ) {
            Icon(Icons.Default.Place, contentDescription = null)
            Spacer(modifier = Modifier.width(8.dp))
            Text("Voir les itineraire pour cet arrêt")
        }
    }
}
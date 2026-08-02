package com.orion.madatransit.screen

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.orion.madatransit.components.LegendItem
import com.orion.madatransit.components.StepItem

@Composable
fun HowItWorksScreen() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp)
            .padding(top = 16.dp),
        verticalArrangement = Arrangement.SpaceBetween
    ) {
        Column {
            Text(
                text = "Comment ça marche ?",
                fontSize = 22.sp,
                fontWeight = FontWeight.Bold,
                color = Color.Black
            )

            Spacer(modifier = Modifier.height(24.dp))

            StepItem(
                step = "1",
                text = "Autorisez la localisation pour voir les arrêts proches."
            )
            StepItem(
                step = "2",
                text = "Choisissez votre destination ou saisissez-la."
            )
            StepItem(
                step = "3",
                text = "Consultez les suggestions de bus et prenez le meilleur trajet."
            )
        }

        // Section Légende en bas de carte
        Card(
            colors = CardDefaults.cardColors(containerColor = Color(0xFFF0F2F8)),
            shape = RoundedCornerShape(16.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    text = "LÉGENDE",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.Gray
                )
                Spacer(modifier = Modifier.height(8.dp))
                LegendItem(
                    label = "Arrêt de bus",
                    color = Color(0xFF6200EE)
                )
                LegendItem(
                    label = "Bus en service",
                    color = Color(0xFF00C853)
                )
                LegendItem(
                    label = "Hors service",
                    color = Color.Gray
                )
            }
        }
    }
}
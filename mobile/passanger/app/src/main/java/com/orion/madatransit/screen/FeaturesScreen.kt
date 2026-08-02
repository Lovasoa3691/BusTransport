package com.orion.madatransit.screen

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.orion.madatransit.components.FeatureItem

@Composable
fun FeaturesScreen() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = "MadaTransit",
            fontSize = 24.sp,
            fontWeight = FontWeight.Bold,
            color = Color(0xFF4A25A9)
        )

        Spacer(modifier = Modifier.height(12.dp))

        Text(
            text = "Trouvez votre arrêt\net le bon bus facilement",
            fontSize = 22.sp,
            fontWeight = FontWeight.ExtraBold,
            color = Color.Black
        )

        Spacer(modifier = Modifier.height(32.dp))

        FeatureItem(
            title = "Arrêts proches",
            description = "Voir les arrêts autour de votre position et la distance à pied."
        )
        FeatureItem(
            title = "Choix de destination",
            description = "Entrez votre destination pour obtenir les lignes recommandées."
        )
        FeatureItem(
            title = "Suggestions de bus",
            description = "Nous vous suggérons les meilleures lignes pour rejoindre votre destination."
        )
    }
}
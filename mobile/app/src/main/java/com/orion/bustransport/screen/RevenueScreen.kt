package com.orion.bustransport.screen

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CheckCircle
//import androidx.compose.material.icons.filled.ConfirmationNumber
import androidx.compose.material.icons.filled.Info
//import androidx.compose.material.icons.filled.LocalAtm
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

data class TicketScanned(
    val id: String,
    val num: String,
    val validation: String,
    val price: Int
)

@Composable
fun RevenueScreen(
    totalTicketsScanned: Int,
    ticketPriceMGA: Int,
    tickets: List<TicketScanned>
) {
    val totalRevenue = totalTicketsScanned * ticketPriceMGA

    // Thème de couleurs unifié
    val tealBackground = Color(0xFFF3F7F9)
    val darkBlue = Color(0xFF19193E)
    val accentTeal = Color(0xFF00B29A)
    val cardBackground = Color.White
    val textMuted = Color(0xFF757575)

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(tealBackground),
        contentPadding = PaddingValues(24.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // 1. Titre Principal de l'Écran
        item {
            Column(modifier = Modifier.padding(bottom = 8.dp)) {
                Text(
                    text = "Mes Revenus du Jour",
                    fontSize = 22.sp,
                    fontWeight = FontWeight.ExtraBold,
                    color = darkBlue
                )
                Text(
                    text = "Suivi en direct de votre activité de transport",
                    fontSize = 13.sp,
                    color = textMuted
                )
            }
        }

        // 2. Carte Principale - Recette Totale (Style Carte Bancaire / Premium)
        item {
            Card(
                shape = RoundedCornerShape(24.dp),
                elevation = CardDefaults.cardElevation(defaultElevation = 4.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Box(
                    modifier = Modifier
                        .background(
                            brush = Brush.horizontalGradient(
                                colors = listOf(darkBlue, Color(0xFF3B3B98))
                            )
                        )
                        .padding(24.dp)
                ) {
                    Column(modifier = Modifier.fillMaxWidth()) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = "RECETTE TOTALE ESTIMÉE",
                                color = Color.White.copy(alpha = 0.7f),
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Bold,
                                letterSpacing = 1.sp
                            )
                            Icon(
                                imageVector = Icons.Default.Info,
                                contentDescription = null,
                                tint = accentTeal,
                                modifier = Modifier.size(24.dp)
                            )
                        }

                        Spacer(modifier = Modifier.height(12.dp))

                        Text(
                            text = "$totalRevenue MGA",
                            color = Color.White,
                            fontSize = 32.sp,
                            fontWeight = FontWeight.Black
                        )

                        Spacer(modifier = Modifier.height(8.dp))

                        Box(
                            modifier = Modifier
                                .clip(RoundedCornerShape(6.dp))
                                .background(Color.White.copy(alpha = 0.15f))
                                .padding(horizontal = 8.dp, vertical = 4.dp)
                        ) {
                            Text(
                                text = "Mise à jour instantanée",
                                color = Color.White.copy(alpha = 0.9f),
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Medium
                            )
                        }
                    }
                }
            }
        }

        // 3. Grille de Détails (Statistiques)
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                // Tickets Scannés
                Card(
                    modifier = Modifier.weight(1f),
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = cardBackground),
                    elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
                ) {
                    Row(
                        modifier = Modifier.padding(16.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Box(
                            modifier = Modifier
                                .size(40.dp)
                                .clip(CircleShape)
                                .background(accentTeal.copy(alpha = 0.12f)),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = Icons.Default.CheckCircle,
                                contentDescription = null,
                                tint = accentTeal,
                                modifier = Modifier.size(20.dp)
                            )
                        }
                        Spacer(modifier = Modifier.width(12.dp))
                        Column {
                            Text("Tickets Scannés", color = textMuted, fontSize = 11.sp)
                            Text(
                                text = "$totalTicketsScanned",
                                fontSize = 18.sp,
                                fontWeight = FontWeight.Bold,
                                color = darkBlue
                            )
                        }
                    }
                }

                // Prix Unitaire
                Card(
                    modifier = Modifier.weight(1f),
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = cardBackground),
                    elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
                ) {
                    Row(
                        modifier = Modifier.padding(16.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Box(
                            modifier = Modifier
                                .size(40.dp)
                                .clip(CircleShape)
                                .background(Color(0xFFFFB300).copy(alpha = 0.12f)),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = Icons.Default.Info,
                                contentDescription = null,
                                tint = Color(0xFFFFB300),
                                modifier = Modifier.size(20.dp)
                            )
                        }
                        Spacer(modifier = Modifier.width(12.dp))
                        Column {
                            Text("Prix Unitaire", color = textMuted, fontSize = 11.sp)
                            Text(
                                text = "$ticketPriceMGA MGA",
                                fontSize = 16.sp,
                                fontWeight = FontWeight.Bold,
                                color = darkBlue
                            )
                        }
                    }
                }
            }
        }

        // 4. Sous-Titre Historique
        item {
            Text(
                text = "Historique des scans",
                fontSize = 16.sp,
                fontWeight = FontWeight.Bold,
                color = darkBlue,
                modifier = Modifier.padding(top = 8.dp)
            )
        }

        // 5. Liste Dynamique des Tickets Scannés
        if (tickets.isEmpty()) {
            item {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 32.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "Aucun ticket scanné pour le moment.",
                        color = textMuted,
                        fontSize = 14.sp
                    )
                }
            }
        } else {
            items(tickets) { ticket ->
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = cardBackground),
                    elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(16.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        // Badge de statut (Validé / Succès)
                        Box(
                            modifier = Modifier
                                .size(40.dp)
                                .clip(CircleShape)
                                .background(accentTeal.copy(alpha = 0.12f)),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = Icons.Default.CheckCircle,
                                contentDescription = "Validé",
                                tint = accentTeal,
                                modifier = Modifier.size(22.dp)
                            )
                        }

                        Spacer(modifier = Modifier.width(16.dp))

                        // Infos principales du ticket
                        Column(modifier = Modifier.weight(1f)) {
                            Text(
                                text = ticket.num,
                                fontWeight = FontWeight.Bold,
                                fontSize = 14.sp,
                                color = darkBlue
                            )
                            Spacer(modifier = Modifier.height(2.dp))
                            Text(
                                text = "ID: ${ticket.id}",
                                fontSize = 11.sp,
                                color = textMuted
                            )
                            Text(
                                text = "Scanné le : ${ticket.validation}",
                                fontSize = 11.sp,
                                color = textMuted
                            )
                        }

                        // Prix à droite
                        Text(
                            text = "${ticket.price} MGA",
                            fontWeight = FontWeight.ExtraBold,
                            fontSize = 15.sp,
                            color = darkBlue
                        )
                    }
                }
            }
        }

        // 6. Message DevOps / Traçabilité tout en bas
        item {
            Spacer(modifier = Modifier.height(16.dp))
            Card(
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = Color(0xFFE8F0FE)),
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier.padding(12.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        imageVector = Icons.Default.Info,
                        contentDescription = null,
                        tint = Color(0xFF1A73E8),
                        modifier = Modifier.size(18.dp)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = "Ces données sont synchronisées en temps réel avec le tableau de bord administratif de la coopérative.",
                        fontSize = 11.sp,
                        color = Color(0xFF1A73E8),
                        lineHeight = 16.sp
                    )
                }
            }
        }
    }
}
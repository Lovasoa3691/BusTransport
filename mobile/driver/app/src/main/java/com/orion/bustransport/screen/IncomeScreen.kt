package com.orion.bustransport.screen

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.DateRange
//import androidx.compose.material.icons.filled.ConfirmationNumber
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Star
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
import com.orion.bustransport.components.TicketCard
import com.orion.bustransport.network.Ticket
import com.orion.bustransport.utils.formatAmount

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
    tickets: List<Ticket>
) {
    val totalRevenue = totalTicketsScanned * ticketPriceMGA

    // Thème de couleurs unifié
    val tealBackground = Color(0xFFF3F7F9)
    val darkBlue = Color(0xFF4CAF50)
    val accentTeal = Color(0xFF00B29A)
    val cardBackground = Color.White
    val textMuted = Color(0xFF343434)

    println("Tickets List: ${tickets}")

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(tealBackground),
        contentPadding = PaddingValues(24.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            Column(modifier = Modifier.padding(bottom = 8.dp)) {
                Text(
                    text = "Mes Revenus du Jour",
                    fontSize = 22.sp,
                    fontWeight = FontWeight.ExtraBold,
                    color = textMuted
                )
                Text(
                    text = "Suivi en direct de votre activité de transport",
                    fontSize = 13.sp,
                    color = textMuted
                )
            }
        }

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
                                colors = listOf(darkBlue, Color(0xFF009688))
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
                            text = "${formatAmount(totalRevenue)} MGA",
                            color = Color.White,
                            fontSize = 32.sp,
                            fontWeight = FontWeight.Black
                        )

                        Spacer(modifier = Modifier.height(16.dp))

                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(top = 8.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {

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

                            VerticalDivider(
                                modifier = Modifier
                                    .height(24.dp)
                                    .padding(horizontal = 10.dp),
                                thickness = 1.dp,
                                color = Color.White.copy(alpha = 0.4f)
                            )

                            Text(
                                text = "$totalTicketsScanned tickets scannés",
                                color = Color.White.copy(alpha = 0.9f),
                                fontSize = 13.sp,
                                fontWeight = FontWeight.Medium
                            )
                        }
                    }
                }
            }
        }

        item {
            Text(
                text = "Historique des scans",
                fontSize = 16.sp,
                fontWeight = FontWeight.Bold,
                color = darkBlue,
                modifier = Modifier.padding(top = 8.dp)
            )
        }

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
                TicketCard(ticket)
            }
        }
    }
}
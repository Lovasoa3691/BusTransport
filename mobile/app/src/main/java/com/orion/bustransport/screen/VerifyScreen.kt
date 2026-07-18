package com.orion.bustransport.screen

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Email
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.orion.bustransport.R
import com.orion.bustransport.ui.theme.BusTransportTheme

@Composable
fun VerifyScreen(
    // Correction ici : onVerifyEmail est maintenant une fonction (callback)
    // qui transmet l'email saisi pour passer à l'étape suivante
    onVerifyEmail: (String) -> Unit,
) {
    var email by remember { mutableStateOf("") }

    // Palette de couleurs épurée
    val appBackground = Color.White
    val darkBlue = Color(0xFF19193E)
    val accentTeal = Color(0xFF00B29A)
    val textMuted = Color(0xFF757575)
    val inputBorderColor = Color(0xFFE0E0E0)

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(appBackground)
            .verticalScroll(rememberScrollState())
            .padding(horizontal = 32.dp, vertical = 24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.SpaceBetween
    ) {

        Spacer(modifier = Modifier.height(2.dp))

        // ================= ZONE LOGO & TITRES =================
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier.fillMaxWidth()
        ) {
            Box(
                modifier = Modifier
                    .size(90.dp)
                    .clip(CircleShape)
                    .background(
                        brush = Brush.radialGradient(
                            colors = listOf(accentTeal.copy(alpha = 0.15f), Color.Transparent)
                        )
                    ),
                contentAlignment = Alignment.Center
            ) {
                Image(
                    painter = painterResource(id = R.drawable.ic_logo),
                    contentDescription = "Logo TransScan",
                    modifier = Modifier.size(54.dp)
                )
            }

            Spacer(modifier = Modifier.height(20.dp))

            Text(
                text = "MADATRANSIT",
                fontSize = 32.sp,
                fontWeight = FontWeight.Medium,
                color = Color.Cyan,
                letterSpacing = 2.sp
            )

        }

        Text(
            text = "Entrer votre adresse email pour continuer",
            fontSize = 14.sp,
            fontWeight = FontWeight.Medium,
            color = textMuted,
            modifier = Modifier.padding(top = 6.dp),
            textAlign = TextAlign.Center
        )

//        Spacer(modifier = Modifier.height(5.dp))

        // ================= FORMULAIRE DE SAISIE =================
        Column(
            modifier = Modifier.fillMaxWidth(),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Column(modifier = Modifier.fillMaxWidth()) {
                Text(
                    text = "Email",
                    fontWeight = FontWeight.Bold,
                    fontSize = 12.sp,
                    color = darkBlue,
                    modifier = Modifier.padding(bottom = 8.dp)
                )
                OutlinedTextField(
                    value = email,
                    onValueChange = { email = it },
                    placeholder = { Text("Ex: chauffeur@orion.com", color = textMuted.copy(alpha = 0.6f), fontSize = 14.sp) },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(12.dp),
                    singleLine = true,
                    // Configuration du clavier pour forcer le format Email
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email),
                    leadingIcon = {
                        Icon(
                            imageVector = Icons.Default.Email,
                            contentDescription = null,
                            tint = darkBlue.copy(alpha = 0.6f)
                        )
                    },
                    colors = OutlinedTextFieldDefaults.colors(
                        unfocusedBorderColor = inputBorderColor,
                        focusedBorderColor = accentTeal,
                    )
                )
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(
                modifier = Modifier.fillMaxWidth(),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Button(
                    onClick = {
                        if (email.isNotBlank()) {
                            // Déclenche l'action de vérification
                            onVerifyEmail(email)
                        }
                    },
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(54.dp),
                    enabled = email.isNotBlank(),
                    shape = RoundedCornerShape(14.dp),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = accentTeal,
                        disabledContainerColor = accentTeal.copy(alpha = 0.5f)
                    ),
                    elevation = ButtonDefaults.buttonElevation(
                        defaultElevation = 2.dp,
                        pressedElevation = 0.dp
                    )
                ) {
                    Text(
                        text = "VÉRIFIER",
                        fontWeight = FontWeight.ExtraBold,
                        fontSize = 15.sp,
                        color = Color.White,
                        letterSpacing = 1.sp
                    )
                }
            }

            Spacer(modifier = Modifier.height(15.dp))

            Column(
                modifier = Modifier.fillMaxWidth(),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Button(
                    onClick = {
                        if (email.isNotBlank()) {
                            // Déclenche l'action de vérification
                            onVerifyEmail(email)
                        }
                    },
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(54.dp),
//                    enabled = email.isNotBlank(),
                    shape = RoundedCornerShape(14.dp),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = Color.White,
                        disabledContainerColor = accentTeal.copy(alpha = 0.5f)
                    ),
                    elevation = ButtonDefaults.buttonElevation(
                        defaultElevation = 2.dp,
                        pressedElevation = 0.dp
                    )
                ) {
                    Text(
                        text = "ANNULER",
                        fontWeight = FontWeight.ExtraBold,
                        fontSize = 15.sp,
                        color = Color.Gray,
                        letterSpacing = 1.sp
                    )
                }
            }
        }

        // ================= BOUTON DE CONNEXION =================

    }
}

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    BusTransportTheme {
        VerifyScreen(onVerifyEmail = { email ->
            // Simulation de la navigation vers l'étape suivante
            println("Email à vérifier : $email")
        })
    }
}
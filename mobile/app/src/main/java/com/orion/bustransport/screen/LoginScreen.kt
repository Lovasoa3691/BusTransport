package com.orion.bustransport.screen

import android.widget.Toast
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccountBox
//import androidx.compose.material.icons.filled.DirectionsBus
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.Person
//import androidx.compose.material.icons.filled.Visibility
//import androidx.compose.material.icons.filled.VisibilityOff
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.orion.bustransport.R
import com.orion.bustransport.viewModel.LoginViewModel

@Composable
fun LoginScreen(
    viewModel: LoginViewModel,
    onLoginSuccess: (String) -> Unit,
    onForgotPasswordClick: () -> Unit = {},
    onActivateAccountClick: () -> Unit = {}
) {
    val context = LocalContext.current
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var isPasswordVisible by remember { mutableStateOf(false) }

    val isLoading = viewModel.isLoading
    val error = viewModel.errorMessage

    // Palette de couleurs épurée
    val appBackground = Color.White // Arrière-plan principal blanc pour un look natif et propre
    val darkBlue = Color(0xFF19193E)
    val accentTeal = Color(0xFF00B29A)
    val textMuted = Color(0xFF757575)
    val inputBorderColor = Color(0xFFE0E0E0)

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(appBackground)
            // verticalScroll permet d'éviter les bugs d'affichage lorsque le clavier virtuel apparaît
            .verticalScroll(rememberScrollState())
            .padding(horizontal = 32.dp, vertical = 24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.SpaceBetween
    ) {

        // Espaceur flexible au-dessus pour centrer visuellement le contenu
        Spacer(modifier = Modifier.height(30.dp))

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
                // Utilisation d'une Image au lieu d'une Icon pour le logo
                // Note : Remplacez R.drawable.ic_logo par votre propre ressource image dans res/drawable
                Image(
                    painter = painterResource(id = R.drawable.ic_logo),
                    contentDescription = "Logo TransScan",
                    modifier = Modifier.size(54.dp)
                )
            }

            Spacer(modifier = Modifier.height(20.dp))

            Text(
                text = "ORION-TRANSIT",
                fontSize = 32.sp,
                fontWeight = FontWeight.Black,
                color = darkBlue,
                letterSpacing = 2.sp
            )

//            Text(
//                text = "Espace Chauffeur connecté",
//                fontSize = 14.sp,
//                fontWeight = FontWeight.Medium,
//                color = textMuted,
//                modifier = Modifier.padding(top = 6.dp),
//                textAlign = TextAlign.Center
//            )
        }

        Spacer(modifier = Modifier.height(30.dp))

        // ================= FORMULAIRE DE SAISIE =================
        Column(
            modifier = Modifier.fillMaxWidth(),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // Champ Nom d'utilisateur
            Column(modifier = Modifier.fillMaxWidth()) {
                Text(
                    text = "Identifiant / Nom d'utilisateur",
                    fontWeight = FontWeight.Bold,
                    fontSize = 12.sp,
                    color = darkBlue,
                    modifier = Modifier.padding(bottom = 8.dp)
                )
                OutlinedTextField(
                    value = email,
                    onValueChange = { email = it },
                    placeholder = { Text("Ex: example@gmail.com", color = textMuted.copy(alpha = 0.6f), fontSize = 14.sp) },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(12.dp),
                    singleLine = true,
                    leadingIcon = {
                        Icon(
                            imageVector = Icons.Default.Person,
                            contentDescription = null,
                            tint = darkBlue.copy(alpha = 0.6f)
                        )
                    },
                    colors = OutlinedTextFieldDefaults.colors(
                        unfocusedBorderColor = inputBorderColor,
                        focusedBorderColor = accentTeal,
//                        containerColor = Color(0xFFF9FAFB) // Léger gris pour démarquer le champ sur fond blanc
                    )
                )
            }

            // Champ Mot de passe
            Column(modifier = Modifier.fillMaxWidth()) {
                Text(
                    text = "Mot de passe",
                    fontWeight = FontWeight.Bold,
                    fontSize = 12.sp,
                    color = darkBlue,
                    modifier = Modifier.padding(bottom = 8.dp)
                )
                OutlinedTextField(
                    value = password,
                    onValueChange = { password = it },
                    placeholder = { Text("Votre mot de passe", color = textMuted.copy(alpha = 0.6f), fontSize = 14.sp) },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(12.dp),
                    singleLine = true,
                    visualTransformation = if (isPasswordVisible) VisualTransformation.None else PasswordVisualTransformation(),
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
                    leadingIcon = {
                        Icon(
                            imageVector = Icons.Default.Lock,
                            contentDescription = null,
                            tint = darkBlue.copy(alpha = 0.6f)
                        )
                    },
                    trailingIcon = {
                        IconButton(onClick = { isPasswordVisible = !isPasswordVisible }) {
                            Icon(
                                imageVector = if (isPasswordVisible) Icons.Default.Person else Icons.Default.Person,
                                contentDescription = "Afficher/Masquer le mot de passe",
                                tint = textMuted
                            )
                        }
                    },
                    colors = OutlinedTextFieldDefaults.colors(
                        unfocusedBorderColor = inputBorderColor,
                        focusedBorderColor = accentTeal,
//                        containerColor = Color(0xFFF9FAFB) // Léger gris pour démarquer le champ sur fond blanc
                    )
                )
            }

            // ================= BOUTON IDENTIFIANTS OUBLIÉS =================
            Box(
                modifier = Modifier.fillMaxWidth(),
                contentAlignment = Alignment.CenterEnd
            ) {
                TextButton(
                    onClick = onForgotPasswordClick,
                    contentPadding = PaddingValues(0.dp)
                ) {
                    Text(
                        text = "Identifiants oubliés ?",
                        color = accentTeal,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.SemiBold
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        // ================= BOUTON DE CONNEXION =================
        Column(
            modifier = Modifier.fillMaxWidth(),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            // Affichage de l'erreur si elle existe
            error?.let {
                Text(
                    text = it,
                    color = Color.Red,
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Medium,
                    modifier = Modifier.padding(bottom = 16.dp),
                    textAlign = TextAlign.Center
                )
            }

            Button(
                onClick = {
                    if (email.isNotEmpty() && password.isNotEmpty()) {
                        viewModel.login(email, password){
                            Toast.makeText(context, "Connexion réussie !", Toast.LENGTH_SHORT).show()
                            onLoginSuccess(email)
                        }
                    }
                },
                enabled = !isLoading,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(54.dp),
                shape = RoundedCornerShape(14.dp),
                colors = ButtonDefaults.buttonColors(containerColor = accentTeal),
                elevation = ButtonDefaults.buttonElevation(
                    defaultElevation = 2.dp,
                    pressedElevation = 0.dp
                )
            ) {
                if (isLoading) {
                    CircularProgressIndicator(
                        modifier = Modifier.size(24.dp),
                        color = Color.White,
                        strokeWidth = 2.dp
                    )
                } else {
                    Text(
                        text = "SE CONNECTER",
                        fontWeight = FontWeight.ExtraBold,
                        fontSize = 15.sp,
                        color = Color.White,
                        letterSpacing = 1.sp
                    )
                }
            }

            Spacer(modifier = Modifier.height(16.dp))

            // ================= BOUTON D'ACTIVATION DE COMPTE =================
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.Center,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "Nouveau chauffeur ?",
                    color = textMuted,
                    fontSize = 13.sp
                )
                TextButton(
                    onClick = onActivateAccountClick,
                    contentPadding = PaddingValues(start = 6.dp)
                ) {
                    Text(
                        text = "Activer mon compte",
                        color = accentTeal,
                        fontWeight = FontWeight.Bold,
                        fontSize = 13.sp
                    )
                }
            }
        }

        // Espaceur flexible au-dessous pour équilibrer la mise en page
        Spacer(modifier = Modifier.height(24.dp))
    }
}
package com.orion.bustransport.screen

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

// 1. MISE À JOUR DU DATA CLASS (Pour correspondre à votre parent)
data class UserProfile(
    val id: String,
    val username: String, // Julianot@Orion
    val phoneNumber: String, // Julianot Lovasoa (Semble être le nom complet dans votre exemple parent)
    val email: String,
    val homeAddress: String
)

@Composable
fun ProfileScreen(
    user: UserProfile,
    onUpdateProfile: (UserProfile) -> Unit,
    onBack: () -> Unit,
    modifier: Modifier = Modifier // 2. AJOUT DU PARAMÈTRE MODIFIER ICI
) {
    // 3. MISE À JOUR DES ÉTATS (Correspondant au nouveau UserProfile)
    var username by remember { mutableStateOf(user.username) }
    var fullName by remember { mutableStateOf(user.phoneNumber) } // Utilisation du champ phoneNumber comme nom complet temporaire selon votre parent
    var email by remember { mutableStateOf(user.email) }
    var phoneNumber by remember { mutableStateOf("123 4567 8910") } // Champ téléphone simulé, car il manque dans votre UserProfile parent
    var homeAddress by remember { mutableStateOf(user.homeAddress) }

    // Palette de couleurs de la maquette
    val tealBackground = Color(0xFFF3F7F9)
    val tealPrimary = Color(0xFF00B29A)
    val inputBorderColor = Color(0xFFE0E0E0)

    Box(
        modifier = modifier // 4. APPLICATION DU MODIFIER PARENT ICI
            .fillMaxSize() // S'assure d'occuper tout l'espace
            .background(tealBackground)
            .padding(24.dp),
        contentAlignment = Alignment.Center
    ) {
        // Carte principale blanche
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .wrapContentHeight() // La carte s'adapte à son contenu
                // 5. AJOUT DU SCROLL (Crucial pour les petits écrans)
                .verticalScroll(rememberScrollState()),
            shape = RoundedCornerShape(24.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(24.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {

                // ================= AVATAR SELECTION =================
                // ... (Code de l'avatar inchangé) ...
                Box(
                    modifier = Modifier
                        .size(100.dp)
                        .padding(bottom = 16.dp),
                    contentAlignment = Alignment.BottomEnd
                ) {
                    Box(
                        modifier = Modifier
                            .fillMaxSize()
                            .clip(CircleShape)
                            .background(Color(0xFFCCCCCC)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(imageVector = Icons.Default.Person, contentDescription = null, modifier = Modifier.size(60.dp), tint = Color.White)
                    }
                    Box(
                        modifier = Modifier
                            .size(24.dp)
                            .clip(CircleShape)
                            .background(Color.White)
                            .border(1.dp, Color(0xFFE0E0E0), CircleShape),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(text = "+", color = Color(0xFF8BC34A), fontWeight = FontWeight.Bold, fontSize = 14.sp)
                    }
                }

                // ================= CHAMPS DE FORMULAIRE =================

                // Username (Julianot@Orion)
                CustomInputField(
                    label = "Username",
                    value = username,
                    onValueChange = { username = it },
                    placeholder = "@username",
                    trailingIcon = { Icon(Icons.Default.AccountCircle, contentDescription = null, tint = Color.DarkGray) }
                )

                // Full Name
                CustomInputField(
                    label = "Full Name",
                    value = fullName,
                    onValueChange = { fullName = it },
                    placeholder = "Your Name",
                    trailingIcon = { Icon(Icons.Default.Person, contentDescription = null, tint = Color.DarkGray) }
                )

                // Email Address
                CustomInputField(
                    label = "Email Address",
                    value = email,
                    onValueChange = { email = it },
                    placeholder = "example@your email",
                    trailingIcon = { Icon(Icons.Default.Email, contentDescription = null, tint = Color.DarkGray) }
                )

                // Phone Number (Avec sélecteur de pays fictif)
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 6.dp)
                ) {
                    Text(
                        text = "Phone Number",
                        fontWeight = FontWeight.Bold,
                        fontSize = 12.sp,
                        color = Color(0xFF1E1E1E),
                        modifier = Modifier.padding(bottom = 4.dp)
                    )
                    OutlinedTextField(
                        value = phoneNumber,
                        onValueChange = { phoneNumber = it },
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(8.dp),
                        colors = OutlinedTextFieldDefaults.colors(
                            unfocusedBorderColor = inputBorderColor,
                            focusedBorderColor = tealPrimary,
//                            containerColor = Color.White
                        ),
                        leadingIcon = {
                            Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.padding(start = 8.dp)) {
                                Text(text = "🇨🇮", fontSize = 18.sp)
                                Spacer(modifier = Modifier.width(4.dp))
                                Text(text = "123", fontSize = 12.sp, color = Color.Gray)
                                Icon(Icons.Default.KeyboardArrowDown, contentDescription = null, tint = Color.Gray)
                                Spacer(modifier = Modifier.width(4.dp))
                                Box(modifier = Modifier.width(1.dp).height(24.dp).background(Color.LightGray))
                            }
                        },
                        trailingIcon = { Icon(Icons.Default.Phone, contentDescription = null, tint = Color.DarkGray) },
                        placeholder = { Text("1234 5678 9101", color = Color(0xFF9E9E9E)) }
                    )
                }

                // Home Address
                CustomInputField(
                    label = "Home Address",
                    value = homeAddress,
                    onValueChange = { homeAddress = it },
                    placeholder = "Your Address",
                    trailingIcon = { Icon(Icons.Default.Home, contentDescription = null, tint = Color.DarkGray) }
                )

                Spacer(modifier = Modifier.height(20.dp))

                // ================= ACTION BUTTONS =================

                // Update Profile
                Button(
                    onClick = {
                        // 6. MISE À JOUR DE L'APPEL DE CALLBACK
                        onUpdateProfile(
                            user.copy(
                                username = username,
                                phoneNumber = fullName, // Re-mapping temporaire
                                email = email,
                                homeAddress = homeAddress
                            )
                        )
                    },
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(48.dp),
                    shape = RoundedCornerShape(8.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = tealPrimary)
                ) {
                    Text(text = "Update Profile", fontWeight = FontWeight.Bold, fontSize = 14.sp, color = Color.White)
                }

                Spacer(modifier = Modifier.height(8.dp))

                // Cancel / Back
                TextButton(onClick = onBack) {
                    Text(text = "Annuler", color = Color.Gray, fontWeight = FontWeight.Medium, fontSize = 14.sp)
                }
            }
        }
    }
}

// Composant d'entrée réutilisable (inchangé)
@Composable
fun CustomInputField(
    label: String,
    value: String,
    onValueChange: (String) -> Unit,
    placeholder: String,
    trailingIcon: @Composable (() -> Unit)? = null,
    singleLine: Boolean = true,
    minLines: Int = 1
) {
    Column(modifier = Modifier.fillMaxWidth().padding(vertical = 6.dp)) {
        Text(text = label, fontWeight = FontWeight.Bold, fontSize = 12.sp, color = Color(0xFF1E1E1E), modifier = Modifier.padding(bottom = 4.dp))
        OutlinedTextField(
            value = value,
            onValueChange = onValueChange,
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(8.dp),
            singleLine = singleLine,
            minLines = minLines,
            placeholder = { Text(placeholder, color = Color(0xFF9E9E9E), fontSize = 14.sp) },
            trailingIcon = trailingIcon,
            colors = OutlinedTextFieldDefaults.colors(
                unfocusedBorderColor = Color(0xFFE0E0E0),
                focusedBorderColor = Color(0xFF00B29A),
//                containerColor = Color.White
            )
        )
    }
}
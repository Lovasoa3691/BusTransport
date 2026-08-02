package com.orion.bustransport.screen

import android.widget.Button
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
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import com.orion.bustransport.network.User

data class UserProfile(
    val id: String,
    val username: String,
    val phoneNumber: String,
    val email: String,
    val homeAddress: String
)

@Composable
fun ProfileScreen(
    user: User,
    onUpdateProfile: (UserProfile) -> Unit,
    onBack: () -> Unit,
    onLogout: () -> Unit,
    imageBaseUrl: String,
    modifier: Modifier = Modifier
) {
    var username by remember { mutableStateOf(user.username) }
    var fullName by remember { mutableStateOf(user.username) }
    var email by remember { mutableStateOf(user.email) }
    var homeAddress by remember { mutableStateOf(user.email) }


    val tealBackground = Color(0xFFF3F7F9)
    val tealPrimary = Color(0xFF00B29A)
    val inputBorderColor = Color(0xFFE0E0E0)

    Box(
        modifier = modifier
            .fillMaxSize()
            .background(tealBackground),
//            .padding(24.dp),
        contentAlignment = Alignment.Center
    ) {
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .wrapContentHeight()
                .verticalScroll(rememberScrollState()),
//            shape = RoundedCornerShape(24.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(24.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
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
                        val imageUrl = user.photo?.let {
                            "$imageBaseUrl/uploads/$it"
                        }

                        if (imageUrl != null) {
                            AsyncImage(
                                model = imageUrl,
                                contentDescription = "Photo profil",
                                modifier = Modifier
                                    .fillMaxSize()
                                    .clip(CircleShape),
                                contentScale = ContentScale.Crop
                            )
                        } else {
                            Icon(
                                imageVector = Icons.Default.Person,
                                contentDescription = null,
                                modifier = Modifier.size(60.dp),
                                tint = Color.White
                            )
                        }
                    }
                }

                CustomInputField(
                    label = "Username",
                    value = username,
                    onValueChange = { username = it },
                    placeholder = "@username",
                    trailingIcon = { Icon(Icons.Default.AccountCircle, contentDescription = null, tint = Color.Gray) }
                )

                CustomInputField(
                    label = "Full Name",
                    value = fullName,
                    onValueChange = { fullName = it },
                    placeholder = "Your Name",
                    trailingIcon = { Icon(Icons.Default.Person, contentDescription = null, tint = Color.Gray) }
                )

                CustomInputField(
                    label = "Email Address",
                    value = email,
                    onValueChange = { email = it },
                    placeholder = "example@your email",
                    trailingIcon = { Icon(Icons.Default.Email, contentDescription = null, tint = Color.Gray) }
                )

                CustomInputField(
                    label = "Home Address",
                    value = homeAddress,
                    onValueChange = { homeAddress = it },
                    placeholder = "Your Address",
                    trailingIcon = { Icon(Icons.Default.Home, contentDescription = null, tint = Color.Gray) }
                )

                Spacer(modifier = Modifier.height(20.dp))

                Button(
                    onClick = {
                        // 6. MISE À JOUR DE L'APPEL DE CALLBACK
//                        onUpdateProfile(
//                            user.copy(
//                                username = username,
//                                phoneNumber = fullName, // Re-mapping temporaire
//                                email = email,
//                                homeAddress = homeAddress
//                            )
//                        )
                    },
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(48.dp),
                    shape = RoundedCornerShape(8.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = tealPrimary)
                ) {
                    Text(text = "Modifier", fontWeight = FontWeight.Bold, fontSize = 14.sp, color = Color.White)
                }

                Spacer(modifier = Modifier.height(16.dp))

                Button(
                    onClick = onLogout,
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(48.dp),
                    shape = RoundedCornerShape(8.dp),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = Color.Red
                    )
                ) {

                    Spacer(modifier = Modifier.width(8.dp))

                    Text(text = "Deconnexion", fontWeight = FontWeight.Bold, fontSize = 14.sp, color = Color.White)
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
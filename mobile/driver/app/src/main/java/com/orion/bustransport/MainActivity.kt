package com.orion.bustransport

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.lifecycle.viewmodel.compose.viewModel
import com.orion.bustransport.network.RetrofitClient
import com.orion.bustransport.screen.LoginScreen
import com.orion.bustransport.screen.MainDriverScreen
import com.orion.bustransport.ui.theme.BusTransportTheme
import com.orion.bustransport.viewModel.LoginViewModel
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Surface
import androidx.compose.ui.Alignment
import com.orion.bustransport.network.User

class MainActivity : ComponentActivity() {
    override fun onCreate(
        savedInstanceState: Bundle?
    ) {
        super.onCreate(savedInstanceState)
        RetrofitClient.initialize(
            applicationContext
        )
        enableEdgeToEdge()
        setContent {
            BusTransportTheme {
                // null = checking status, false = not logged in, true = logged in
                var isLoggedInState by remember { mutableStateOf<Boolean?>(null) }
                var driverName by remember { mutableStateOf("") }

                LaunchedEffect(Unit) {
                    val token = RetrofitClient.tokenManager.getToken()
                    val savedName = RetrofitClient.tokenManager.getUsername()

                    println("DEBUG: MainActivity. Token: $token, Username: $savedName")

                    if (!token.isNullOrEmpty() && !savedName.isNullOrEmpty()) {
                        driverName = savedName
                        isLoggedInState = true

                        try {
                            val response = RetrofitClient.apiService.getProfile()
                            if (response.isSuccessful) {
                                println("Response from server: ${response.body()?.user}")
                                driverName = (response.body()?.user?.username ?: savedName) as String
                            } else if (response.code() == 401) {
                                RetrofitClient.tokenManager.clearToken()
                                isLoggedInState = false
                            }
                        } catch (_: Exception) {
                            // Keep user logged in if it's just a network error
                        }
                    } else {
                        isLoggedInState = false
                    }
                }

                when (isLoggedInState) {
                    null -> {
                        Surface(modifier = Modifier.fillMaxSize()) {
                            Box(contentAlignment = Alignment.Center) {
                                CircularProgressIndicator()
                            }
                        }
                    }
                    false -> {
                        val loginViewModel: LoginViewModel =
                            viewModel(factory = LoginViewModel.Factory)
                        LoginScreen(
                            viewModel = loginViewModel,
                            onLoginSuccess = { username ->
                                // Force reload of token in interceptor by potentially re-initializing or ensuring next call gets new token
                                driverName = username
                                isLoggedInState = true
                            }
                        )
                    }
                    true -> {
                        MainDriverScreen(
                            driverName = driverName,
                            onLogout = {
                                isLoggedInState = false
                            }
                        )
                    }
                }
            }
        }
    }
}

//@Preview(showBackground = true)
//@Composable
//fun DefaultPreview() {
//    BusTransportTheme {
//        MainDriverScreen(driverName = "Julianot")
//    }
//}
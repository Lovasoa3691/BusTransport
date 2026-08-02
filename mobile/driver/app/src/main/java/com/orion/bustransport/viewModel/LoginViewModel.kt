package com.orion.bustransport.viewModel

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.orion.bustransport.network.LoginRequest
import com.orion.bustransport.network.TokenManager
import com.orion.bustransport.repository.AuthRepository
import kotlinx.coroutines.launch

import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.orion.bustransport.network.RetrofitClient

class LoginViewModel(
    private val repository: AuthRepository,
    private val tokenManager: TokenManager
): ViewModel() {

    companion object {
        val Factory: ViewModelProvider.Factory = viewModelFactory {
            initializer {
                val repository = AuthRepository(RetrofitClient.apiService)
                val tokenManager = RetrofitClient.tokenManager
                LoginViewModel(repository, tokenManager)
            }
        }
    }
    var isLoading by mutableStateOf(false)
        private set
    var errorMessage by mutableStateOf<String?>(null)
        private set

    fun login(
        email:String,
        password:String,
        onSuccess:()->Unit
    ){
        viewModelScope.launch {
            isLoading = true
            errorMessage = null
            try {
                val response =
                    repository.login(
                        LoginRequest(
                            email = email,
                            password = password
                        )
                    )
                if(response.isSuccessful){
                    val body = response.body()
                    if (body != null) {
                        println("DEBUG: Saving token and username: ${body.user.username}")
                        tokenManager.saveAuthData(body.token, body.user.username)
                        onSuccess()
                    }
                }else{
                    errorMessage =
                        "Identifiant ou mot de passe incorrect"
                }
            }catch(e:Exception){
                errorMessage =
                    e.message
            }
            isLoading=false
        }
    }
}
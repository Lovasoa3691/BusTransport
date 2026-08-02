package com.orion.bustransport.viewModel

import androidx.compose.runtime.*
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.google.gson.Gson
import com.orion.bustransport.network.DriverUiState
import com.orion.bustransport.network.RetrofitClient
import com.orion.bustransport.network.ScanRequest
import com.orion.bustransport.network.ScanResponse
import com.orion.bustransport.repository.DriverRepository
import kotlinx.coroutines.launch

class DriverViewModel(
    private val repository: DriverRepository
) : ViewModel() {
    companion object {
        val Factory: ViewModelProvider.Factory = viewModelFactory {
            initializer {
                val repository = DriverRepository(RetrofitClient.apiService)
                DriverViewModel(repository)
            }
        }
    }

    var uiState by mutableStateOf(DriverUiState())
        private set

    init {
        loadData()
    }

    fun loadData() {
        viewModelScope.launch {
            uiState = uiState.copy(loading = true)
            try {
                kotlinx.coroutines.delay(500)

                val user = repository.getProfile()
                val tickets = repository.getTodayTickets()

                println("User: $user")
                println("Tickets: $tickets")

                uiState = uiState.copy(
                    loading = false,
                    user = user,
                    tickets = tickets,
                    totalTickets = tickets.size
                )
            } catch (e: Exception) {
                println("DEBUG: loadData exception: ${e.message}")
                uiState = uiState.copy(loading = false)
            }
        }
    }

    fun scanTicket(qrCode: String) {
        viewModelScope.launch {
            try {
                val response = repository.scanTicket(
                    ScanRequest(qrcode = qrCode)
                )
                
                if (response.isSuccessful) {
                    val body = response.body()
                    if (body != null && body.success) {
                        loadData()
                        uiState = uiState.copy(
                            scanResult = Pair(true, body.message)
                        )
                    } else {
                        uiState = uiState.copy(
                            scanResult = Pair(false, body?.error ?: "Unknown error")
                        )
                    }
                } else {
                    val errorBody = response.errorBody()?.string()
                    val errorResponse = try {
                        Gson().fromJson(errorBody, ScanResponse::class.java)
                    } catch (_: Exception) {
                        null
                    }
                    
                    val displayMessage = errorResponse?.error ?: errorResponse?.message ?: "Server error: ${response.code()}"
                    uiState = uiState.copy(
                        scanResult = Pair(false, displayMessage)
                    )
                }
            } catch (e: Exception) {
                uiState = uiState.copy(
                    scanResult = Pair(false, "Network error: ${e.message}")
                )
            }
        }
    }

    fun logout(onComplete: () -> Unit) {
        viewModelScope.launch {
            RetrofitClient.tokenManager.clearToken()
            onComplete()
        }
    }
}
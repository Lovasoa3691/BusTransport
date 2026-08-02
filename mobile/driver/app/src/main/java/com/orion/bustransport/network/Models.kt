package com.orion.bustransport.network

import android.R
import java.util.Date

data class User(
    val id_user: Int,
    val username: String,
    val email: String,
    val role: String,
    val discriminator: String? = null,
    val photo: String?
)

data class Ticket(
    val id_ticket: Int,
    val num_ticket: String,
    val qr_code: String,
    val status_ticket: String,
    val price: Int,
    val created_at: String? = null,
    val expired_at: String? = null,
    val used_at: String? = null,
    val stop_id: Int? = null,
    val driver_id: Int? = null,
    val bus_id: Int? = null
)

data class TicketResponse(
    val success: Boolean,
    val data: List<Ticket>,
    val error: String
)

data class UserResponse(
    val success: Boolean,
    val user: User
)

data class DriverUiState(
    val loading: Boolean = false,
    val user: User? = null,
    val tickets: List<Ticket> = emptyList(),
    val totalTickets: Int = 0,
    val scanResult: Pair<Boolean, String>? = null
)

data class LoginRequest(
    val email: String,
    val password: String
)

data class LoginResponse(
    val success: Boolean,
    val message: String,
    val token: String,
    val user: User
)

data class ScanRequest(
    val qrcode: String
)

data class ScanResult(
    val success: Boolean,
    val message: String,
    val timestamp: Long = System.currentTimeMillis()
)

data class ScanResponse(
    val success: Boolean,
    val message: String,
    val error : String
//    val data:
)

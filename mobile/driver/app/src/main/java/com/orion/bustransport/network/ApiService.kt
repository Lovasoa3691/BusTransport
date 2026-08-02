package com.orion.bustransport.network

import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.*

interface ApiService {
    @POST("api/auth/login")
    suspend fun login(
        @Body request: LoginRequest
    ): Response<LoginResponse>

    @GET("api/users/me")
    suspend fun getProfile(
    ): Response<UserResponse>

    @GET("api/tickets/driver")
    suspend fun getTodayTickets(
    ): Response<TicketResponse>

    @POST("api/tickets/scan")
    suspend fun validateTicket(
        @Body request: ScanRequest
    ): Response<ScanResponse>
}

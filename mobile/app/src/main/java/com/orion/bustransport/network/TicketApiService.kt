package com.orion.bustransport.network

import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.Body
import retrofit2.http.POST

// 1. Modèles de données correspondant à la structure JSON de votre backend Express.js
data class ScanRequest(
    val id_ticket: String
)

data class ScanResponse(
    val success: Boolean,
    val message: String,
    val ticketId: String?
)

// 2. Déclaration de la route Express.js
interface TicketApiService {
    @POST("api/tickets/validate-scan")
    suspend fun validateTicket(@Body request: ScanRequest): Response<ScanResponse>
}

// 3. Singleton pour initialiser l'instance Retrofit
object RetrofitClient {
    // Remplacez par l'IP de votre serveur Express (Exemple avec l'IP passerelle de l'émulateur)
    private const val BASE_URL = "http://10.0.2.2:3000/"

    val apiService: TicketApiService by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(TicketApiService::class.java)
    }
}
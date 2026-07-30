package com.orion.bustransport.repository

import com.orion.bustransport.network.ApiService
import com.orion.bustransport.network.ScanRequest
import com.orion.bustransport.network.Ticket
import com.orion.bustransport.network.User

class DriverRepository(
    private val api: ApiService
) {
    suspend fun getProfile(): User? {
        val response = api.getProfile()
        return if (response.isSuccessful) response.body()?.user else null
    }

    suspend fun getTodayTickets(): List<Ticket> {
        val response = api.getTodayTickets()
        return if (response.isSuccessful) response.body()?.data ?: emptyList() else emptyList()
    }
    suspend fun scanTicket(request: ScanRequest) =
        api.validateTicket(request)
}
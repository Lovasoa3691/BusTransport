package com.orion.bustransport.repository

import com.orion.bustransport.network.ApiService
import com.orion.bustransport.network.LoginRequest

class AuthRepository(
    private val apiService: ApiService
){

    suspend fun login(
        request: LoginRequest
    ) =
        apiService.login(request)

}
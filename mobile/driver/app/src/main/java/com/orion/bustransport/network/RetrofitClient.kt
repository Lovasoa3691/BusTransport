package com.orion.bustransport.network

import android.content.Context
import kotlinx.coroutines.runBlocking
import okhttp3.OkHttpClient
import okhttp3.Interceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

import okhttp3.logging.HttpLoggingInterceptor

object RetrofitClient {
    private const val BASE_URL =
        "https://varying-jul-doe-cargo.trycloudflare.com"

    fun getBaseURL() : String {
        return BASE_URL
    }

    lateinit var tokenManager: TokenManager
        private set

    fun initialize(context: Context) {
        tokenManager = TokenManager(context)
    }

    private val authInterceptor = Interceptor { chain ->
        val token = runBlocking {
            tokenManager.getToken()
        }

        val requestBuilder = chain.request().newBuilder()
        
        if (!token.isNullOrEmpty()) {
            val cleanToken = token.trim()
            requestBuilder.header("Authorization", "Bearer $cleanToken")
            requestBuilder.addHeader("Cookie", "access_token=$cleanToken")
        }

        chain.proceed(requestBuilder.build())
    }

    private val loggingInterceptor = HttpLoggingInterceptor().apply {
        level = HttpLoggingInterceptor.Level.BODY
    }

    private val okHttpClient =
        OkHttpClient.Builder()
            .addInterceptor(authInterceptor)
            .addInterceptor(loggingInterceptor)
            .build()

    val apiService: ApiService by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .client(okHttpClient)
            .addConverterFactory(
                GsonConverterFactory.create()
            )
            .build()
            .create(ApiService::class.java)

    }
}
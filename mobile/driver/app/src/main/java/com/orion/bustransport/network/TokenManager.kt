package com.orion.bustransport.network

import android.content.Context
import androidx.datastore.preferences.core.*
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.first

val Context.dataStore by preferencesDataStore(
    name = "auth"
)

class TokenManager(
    private val context: Context
){
    companion object {
        val TOKEN =
            stringPreferencesKey("jwt_token")
        val USERNAME =
            stringPreferencesKey("username")
    }

    suspend fun saveAuthData(token: String, username: String) {
        context.dataStore.edit { preferences ->
            preferences[TOKEN] = token
            preferences[USERNAME] = username
        }
    }

    suspend fun getToken():String?{
        val preferences =
            context.dataStore.data.first()
        return preferences[TOKEN]
    }

    suspend fun getUsername(): String? {
        val preferences =
            context.dataStore.data.first()
        return preferences[USERNAME]
    }

    suspend fun clearToken(){
        context.dataStore.edit {
            it.remove(TOKEN)
            it.remove(USERNAME)
        }
    }
}
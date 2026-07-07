package com.orion.bustransport.utils

import android.content.Context
import android.speech.tts.TextToSpeech
import java.util.Locale

class TextToSpeechManager(context: Context) : TextToSpeech.OnInitListener {

    private var tts: TextToSpeech? = null
    private var isInitialized = false

    init {
        // Initialisation du moteur TTS d'Android
        tts = TextToSpeech(context, this)
    }

    override fun onInit(status: Int) {
        if (status == TextToSpeech.SUCCESS) {
            // Configuration de la langue en Français
            val result = tts?.setLanguage(Locale.FRANCE)
            if (result != TextToSpeech.LANG_MISSING_DATA && result != TextToSpeech.LANG_NOT_SUPPORTED) {
                isInitialized = true
            }
        }
    }

    // Fonction pour lire un texte à haute voix
    fun speak(message: String) {
        if (isInitialized) {
            tts?.speak(message, TextToSpeech.QUEUE_FLUSH, null, null)
        }
    }

    // Libérer la mémoire quand l'application se ferme
    fun shutdown() {
        tts?.stop()
        tts?.shutdown()
    }
}
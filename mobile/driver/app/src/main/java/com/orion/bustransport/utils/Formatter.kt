package com.orion.bustransport.utils

import java.text.NumberFormat
import java.util.Locale

fun formatAmount(amount: Number): String {
    val locale = Locale.FRANCE
    val formatter = NumberFormat.getNumberInstance(locale)
    formatter.minimumFractionDigits = 2
    formatter.maximumFractionDigits = 2

    return "${formatter.format(amount)}"
}
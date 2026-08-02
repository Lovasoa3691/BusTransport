package com.orion.bustransport.utils

fun formatIsoDate(date: String?): String {
    if (date == null) return "--"

    return try {
        val instant = java.time.Instant.parse(date)
        val localDateTime = instant
            .atZone(java.time.ZoneId.systemDefault())
            .toLocalDateTime()

        val formatter = java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")

        localDateTime.format(formatter)
    } catch (e: Exception) {
        "--"
    }
}
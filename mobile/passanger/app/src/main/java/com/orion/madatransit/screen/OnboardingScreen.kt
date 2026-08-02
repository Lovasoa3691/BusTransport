package com.orion.madatransit.screen

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import com.orion.madatransit.components.BottomSection
import com.orion.madatransit.ui.theme.AppBackground
import com.orion.madatransit.ui.theme.LightGreen
import com.orion.madatransit.ui.theme.PrimaryGreen

@Composable
fun OnboardingScreen(
    onFinishOnboarding: () -> Unit
) {
    val pagerState = rememberPagerState { 3 }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(
                if (pagerState.currentPage == 0) PrimaryGreen
                else AppBackground
            )
    ) {

        HorizontalPager(
            state = pagerState,
            modifier = Modifier
                .weight(1f)
                .fillMaxWidth()
        ) { page ->
            when (page) {
                0 -> SplashScreen()
                1 -> FeaturesScreen()
                2 -> HowItWorksScreen()
            }
        }

        BottomSection(
            currentPage = pagerState.currentPage,
            pageCount = 3,
            onFinish = onFinishOnboarding
        )
    }
}
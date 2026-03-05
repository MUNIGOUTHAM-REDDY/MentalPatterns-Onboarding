import React, { useCallback } from 'react';
import { View, StyleSheet, StatusBar, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';
import { useFonts } from 'expo-font';
import * as Haptics from 'expo-haptics';

import { useQuiz } from './src/hooks/useQuiz';
import { ProgressBar } from './src/components/ProgressBar';
import { StaticScreen } from './src/screens/StaticScreen';
import { QuestionScreen } from './src/screens/QuestionScreen';
import { InsightScreen } from './src/screens/InsightScreen';
import { AnalysisScreen } from './src/screens/AnalysisScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { NarrativeScreen } from './src/screens/NarrativeScreen';
import { PlanScreen } from './src/screens/PlanScreen';
import { SocialProofScreen } from './src/screens/SocialProofScreen';
import { PaywallScreen } from './src/screens/PaywallScreen';
import { DismissScreen } from './src/screens/DismissScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    'DMSerifDisplay': require('./assets/fonts/DMSerifDisplay-Regular.ttf'),
    'Inter': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Light': require('./assets/fonts/Inter-Light.ttf'),
  });

  const quiz = useQuiz();

  const triggerHaptic = useCallback((style: 'light' | 'medium' | 'heavy' = 'light') => {
    if (Platform.OS !== 'web') {
      const map = {
        light: Haptics.ImpactFeedbackStyle.Light,
        medium: Haptics.ImpactFeedbackStyle.Medium,
        heavy: Haptics.ImpactFeedbackStyle.Heavy,
      };
      Haptics.impactAsync(map[style]);
    }
  }, []);

  const handleSelect = useCallback((id: string) => {
    triggerHaptic('light');
    quiz.selectOption(id);
  }, [quiz.selectOption, triggerHaptic]);

  const handleNext = useCallback(() => {
    triggerHaptic('medium');
    quiz.goNext();
  }, [quiz.goNext, triggerHaptic]);

  const handleAnalysisComplete = useCallback(() => {
    triggerHaptic('heavy');
    quiz.goNext();
  }, [quiz.goNext, triggerHaptic]);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#0a0a0c" />
      </View>
    );
  }

  const { currentScreen, progress, currentIndex } = quiz;
  if (!currentScreen) return null;

  const showProgress = currentIndex >= 3 && currentScreen.type !== 'analysis' && currentScreen.phase < 6;

  const renderScreen = () => {
    switch (currentScreen.type) {
      case 'static':
        return (
          <StaticScreen
            screen={currentScreen}
            onNext={handleNext}
            screenIndex={currentIndex}
          />
        );

      case 'question':
        return (
          <QuestionScreen
            screen={currentScreen}
            selectedOptions={quiz.selectedOptions}
            onSelect={handleSelect}
            onNext={handleNext}
            canProceed={quiz.canProceed}
          />
        );

      case 'insight': {
        const insight = quiz.getInsightContent(currentScreen.id);
        return (
          <InsightScreen
            screen={currentScreen}
            insight={insight}
            onNext={handleNext}
          />
        );
      }

      case 'analysis':
        return <AnalysisScreen onComplete={handleAnalysisComplete} />;

      case 'profile': {
        const profileData = quiz.getProfileData();
        if (!profileData) return null;
        return <ProfileScreen profile={profileData} onNext={handleNext} />;
      }

      case 'narrative':
        return (
          <NarrativeScreen
            narrative={quiz.getNarrativeContent()}
            onNext={handleNext}
          />
        );

      case 'plan': {
        const planData = quiz.getPlanContent();
        if (!planData) return null;
        return <PlanScreen plan={planData} onNext={handleNext} />;
      }

      case 'social':
        return (
          <SocialProofScreen
            screen={currentScreen}
            onNext={handleNext}
          />
        );

      case 'paywall': {
        const paywallContent = quiz.getPaywallContent();
        return (
          <PaywallScreen
            headline={paywallContent.headline}
            subheadline={paywallContent.subheadline}
            onSubscribe={() => {
              triggerHaptic('heavy');
            }}
            onDismiss={() => {
              quiz.setShowDismiss(true);
              quiz.goNext();
            }}
          />
        );
      }

      case 'dismiss':
        return (
          <DismissScreen
            onSubscribe={() => {
              triggerHaptic('heavy');
            }}
            onSkip={() => {
              // Navigate to free content
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0c" translucent />
      <View style={styles.container}>
        {/* Ambient background glow */}
        <View style={styles.ambientGlow} />

        <SafeAreaView style={styles.safeArea} edges={['top']}>
          {/* Progress bar */}
          <View style={styles.progressContainer}>
            <ProgressBar progress={progress} visible={showProgress} />
          </View>

          {/* Screen content with slide transition */}
          <Animated.View
            key={currentIndex}
            entering={SlideInRight.duration(350).springify().damping(20)}
            exiting={SlideOutLeft.duration(250)}
            style={styles.screenContainer}
          >
            {renderScreen()}
          </Animated.View>
        </SafeAreaView>

        <SafeAreaView edges={['bottom']} style={styles.bottomSafe} />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0a0a0c',
  },
  container: {
    flex: 1,
    backgroundColor: '#0a0a0c',
  },
  ambientGlow: {
    position: 'absolute',
    top: -100,
    left: -50,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(139, 92, 246, 0.03)',
  },
  safeArea: {
    flex: 1,
  },
  progressContainer: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 4,
    minHeight: 15,
  },
  screenContainer: {
    flex: 1,
  },
  bottomSafe: {
    backgroundColor: '#0a0a0c',
  },
});

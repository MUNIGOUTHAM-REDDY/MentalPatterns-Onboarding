import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { colors, typography } from '../theme';
import { QuizScreen } from '../data/types';
import { CTAButton } from '../components/CTAButton';

interface Props {
  screen: QuizScreen;
  onNext: () => void;
  screenIndex: number;
}

export function StaticScreen({ screen, onNext, screenIndex }: Props) {
  const isFirstScreen = screen.id === 1;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {isFirstScreen && <View style={styles.spacerTop} />}

        <Animated.Text
          entering={FadeInUp.duration(800)}
          style={[
            isFirstScreen ? styles.heroTitle : styles.title,
            isFirstScreen && styles.heroGlow,
          ]}
        >
          {screen.headline}
        </Animated.Text>

        {screen.subtext && (
          <Animated.Text
            entering={FadeInUp.delay(600).duration(800)}
            style={styles.subtext}
          >
            {screen.subtext}
          </Animated.Text>
        )}

        {screen.body?.map((para, i) => (
          <Animated.Text
            key={i}
            entering={FadeInUp.delay(400 + i * 500).duration(600)}
            style={styles.bodyText}
          >
            {para}
          </Animated.Text>
        ))}
      </View>

      <View style={styles.ctaContainer}>
        <CTAButton
          label={screen.cta}
          onPress={onNext}
          delay={screen.body ? 400 + (screen.body.length) * 500 : 800}
        />
        {screen.id === 38 && (
          <CTAButton
            label="Maybe later"
            onPress={onNext}
            variant="ghost"
            delay={1200}
          />
        )}
        {screen.id === 39 && (
          <CTAButton
            label="Not now"
            onPress={onNext}
            variant="ghost"
            delay={1000}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  spacerTop: {
    height: 40,
  },
  heroTitle: {
    ...typography.heroTitle,
    color: colors.text.primary,
    fontSize: 30,
    lineHeight: 40,
    marginBottom: 20,
  },
  heroGlow: {
    textShadowColor: 'rgba(139, 92, 246, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 30,
  },
  title: {
    ...typography.title,
    color: colors.text.primary,
    marginBottom: 20,
  },
  subtext: {
    ...typography.bodyLarge,
    color: colors.text.secondary,
    marginBottom: 16,
  },
  bodyText: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: 16,
    lineHeight: 24,
  },
  ctaContainer: {
    gap: 8,
  },
});

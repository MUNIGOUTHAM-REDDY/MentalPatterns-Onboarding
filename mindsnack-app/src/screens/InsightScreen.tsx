import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography } from '../theme';
import { QuizScreen, InsightResult } from '../data/types';
import { CTAButton } from '../components/CTAButton';

interface Props {
  screen: QuizScreen;
  insight?: InsightResult | null;
  onNext: () => void;
}

export function InsightScreen({ screen, insight, onNext }: Props) {
  const hasInsight = insight && insight.patternName;
  const bodyContent = hasInsight ? insight.description : screen.body || [];
  const displayHeadline = screen.headline;
  const patternName = hasInsight ? insight.patternName : null;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.Text entering={FadeInUp.duration(600)} style={styles.headline}>
          {displayHeadline}
        </Animated.Text>

        {patternName && (
          <Animated.View entering={FadeInUp.delay(300).duration(600)}>
            <LinearGradient
              colors={['rgba(139, 92, 246, 0.12)', 'rgba(16, 185, 129, 0.06)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.patternBadge}
            >
              <Text style={styles.patternName}>{patternName}</Text>
            </LinearGradient>
          </Animated.View>
        )}

        <View style={styles.insightCard}>
          {bodyContent.map((para, i) => (
            <Animated.Text
              key={i}
              entering={FadeInUp.delay(600 + i * 500).duration(600)}
              style={styles.bodyText}
            >
              {para}
            </Animated.Text>
          ))}
        </View>
      </ScrollView>

      <View style={styles.ctaContainer}>
        <CTAButton
          label={screen.cta}
          onPress={onNext}
          delay={600 + bodyContent.length * 500}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  headline: {
    ...typography.subtitle,
    color: colors.text.tertiary,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontSize: 13,
  },
  patternBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    marginBottom: 24,
  },
  patternName: {
    ...typography.subtitle,
    color: colors.text.primary,
    fontSize: 20,
  },
  insightCard: {
    backgroundColor: 'rgba(28, 28, 30, 0.4)',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
  },
  bodyText: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: 18,
    lineHeight: 25,
  },
  ctaContainer: {
    paddingTop: 16,
  },
});

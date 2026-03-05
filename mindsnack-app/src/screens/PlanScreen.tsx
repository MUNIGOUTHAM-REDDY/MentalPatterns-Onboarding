import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography } from '../theme';
import { CTAButton } from '../components/CTAButton';

interface Props {
  plan: {
    primary: { name: string; description: string; lessons: number };
    secondary: { name: string; description: string; lessons: number };
    tertiary: { name: string; description: string; lessons: number };
    timePerDay: string;
  };
  onNext: () => void;
}

export function PlanScreen({ plan, onNext }: Props) {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.Text entering={FadeInUp.duration(600)} style={styles.headline}>
          Your 30-Day MindSnack Plan
        </Animated.Text>

        <Animated.Text entering={FadeInUp.delay(200).duration(600)} style={styles.subtext}>
          Built for your profile. Backed by psychology. Designed to fit your schedule.
        </Animated.Text>

        {/* Phase 1 */}
        <Animated.View entering={FadeInUp.delay(500).duration(600)}>
          <LinearGradient
            colors={['rgba(139, 92, 246, 0.08)', 'rgba(139, 92, 246, 0.02)']}
            style={styles.phaseCard}
          >
            <Text style={styles.phaseLabel}>PHASE 1 · WEEK 1–2</Text>
            <Text style={styles.courseName}>{plan.primary.name}</Text>
            <Text style={styles.courseDesc}>{plan.primary.description}</Text>
            <View style={styles.courseMetaRow}>
              <Text style={styles.courseMeta}>{plan.primary.lessons} lessons</Text>
              <Text style={styles.courseMetaDot}>·</Text>
              <Text style={styles.courseMeta}>{plan.timePerDay}</Text>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Phase 2 */}
        <Animated.View entering={FadeInUp.delay(800).duration(600)}>
          <LinearGradient
            colors={['rgba(16, 185, 129, 0.06)', 'rgba(16, 185, 129, 0.02)']}
            style={styles.phaseCard}
          >
            <Text style={styles.phaseLabel}>PHASE 2 · WEEK 3–4</Text>
            <Text style={styles.courseName}>{plan.secondary.name}</Text>
            <Text style={styles.courseDesc}>{plan.secondary.description}</Text>
            <View style={styles.courseMetaRow}>
              <Text style={styles.courseMeta}>{plan.secondary.lessons} lessons</Text>
              <Text style={styles.courseMetaDot}>·</Text>
              <Text style={styles.courseMeta}>{plan.timePerDay}</Text>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Then */}
        <Animated.View entering={FadeInUp.delay(1100).duration(600)} style={styles.thenCard}>
          <Text style={styles.phaseLabel}>THEN</Text>
          <Text style={styles.courseName}>{plan.tertiary.name}</Text>
          <Text style={styles.courseDesc}>{plan.tertiary.description}</Text>
        </Animated.View>

        {/* Includes */}
        <Animated.View entering={FadeInUp.delay(1400).duration(600)} style={styles.includesCard}>
          <Text style={styles.includesTitle}>Your plan includes:</Text>
          {[
            'Personalized course sequence based on your profile',
            'Psychology-backed lessons written to stick',
            'Actionable exercises for real-world change',
            'New courses added monthly',
          ].map((item, i) => (
            <View key={i} style={styles.includeRow}>
              <Text style={styles.includeCheck}>✓</Text>
              <Text style={styles.includeText}>{item}</Text>
            </View>
          ))}
        </Animated.View>
      </ScrollView>

      <View style={styles.ctaContainer}>
        <CTAButton label="Start my plan" onPress={onNext} delay={1700} />
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
    ...typography.title,
    color: colors.text.primary,
    marginBottom: 6,
  },
  subtext: {
    ...typography.bodySmall,
    color: colors.text.tertiary,
    marginBottom: 24,
  },
  phaseCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
  },
  phaseLabel: {
    ...typography.caption,
    color: colors.text.tertiary,
    marginBottom: 8,
    fontSize: 11,
  },
  courseName: {
    ...typography.subtitle,
    color: colors.text.primary,
    marginBottom: 6,
    fontSize: 17,
  },
  courseDesc: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    marginBottom: 10,
  },
  courseMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  courseMeta: {
    ...typography.bodySmall,
    color: colors.text.tertiary,
    fontSize: 12,
  },
  courseMetaDot: {
    color: colors.text.muted,
  },
  thenCard: {
    backgroundColor: 'rgba(28, 28, 30, 0.4)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
  },
  includesCard: {
    paddingHorizontal: 4,
  },
  includesTitle: {
    ...typography.label,
    color: colors.text.primary,
    marginBottom: 14,
  },
  includeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
  },
  includeCheck: {
    color: colors.sage.primary,
    fontSize: 15,
    fontWeight: '700',
    marginTop: 1,
  },
  includeText: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    flex: 1,
  },
  ctaContainer: {
    paddingTop: 16,
  },
});

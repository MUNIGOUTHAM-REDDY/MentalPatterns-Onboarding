import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography } from '../theme';
import { ScoreProfile } from '../data/types';
import { RadarChart } from '../components/RadarChart';
import { CTAButton } from '../components/CTAButton';

interface Props {
  profile: {
    scores: ScoreProfile;
    strength: { area: string; score: number; description: string };
    weakness: { area: string; score: number; description: string };
  };
  onNext: () => void;
}

export function ProfileScreen({ profile, onNext }: Props) {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.Text entering={FadeIn.duration(600)} style={styles.headline}>
          Your MindSnack Profile
        </Animated.Text>

        <Animated.View entering={FadeInUp.delay(300).duration(800)}>
          <RadarChart profile={profile.scores} size={280} />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(800).duration(600)} style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.strengthIndicator} />
            <View style={styles.summaryContent}>
              <Text style={styles.summaryLabel}>Your #1 strength</Text>
              <Text style={styles.summaryArea}>
                {profile.strength.area} ({profile.strength.score}/10)
              </Text>
              <Text style={styles.summaryDesc}>{profile.strength.description}</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(1100).duration(600)} style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.growthIndicator} />
            <View style={styles.summaryContent}>
              <Text style={styles.summaryLabel}>Biggest growth opportunity</Text>
              <Text style={styles.summaryArea}>
                {profile.weakness.area} ({profile.weakness.score}/10)
              </Text>
              <Text style={styles.summaryDesc}>{profile.weakness.description}</Text>
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      <View style={styles.ctaContainer}>
        <CTAButton label="See what this means" onPress={onNext} delay={1400} />
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
    paddingTop: 12,
    paddingBottom: 20,
  },
  headline: {
    ...typography.title,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  summaryCard: {
    backgroundColor: 'rgba(28, 28, 30, 0.5)',
    borderRadius: 20,
    padding: 20,
    marginTop: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 16,
  },
  strengthIndicator: {
    width: 4,
    borderRadius: 2,
    backgroundColor: colors.sage.primary,
  },
  growthIndicator: {
    width: 4,
    borderRadius: 2,
    backgroundColor: colors.warm.amber,
  },
  summaryContent: {
    flex: 1,
  },
  summaryLabel: {
    ...typography.caption,
    color: colors.text.tertiary,
    marginBottom: 4,
  },
  summaryArea: {
    ...typography.subtitle,
    color: colors.text.primary,
    marginBottom: 4,
    fontSize: 17,
  },
  summaryDesc: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  ctaContainer: {
    paddingTop: 16,
  },
});

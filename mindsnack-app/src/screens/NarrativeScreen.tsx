import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { colors, typography } from '../theme';
import { CTAButton } from '../components/CTAButton';

interface Props {
  narrative: string[];
  onNext: () => void;
}

export function NarrativeScreen({ narrative, onNext }: Props) {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.Text entering={FadeInUp.duration(600)} style={styles.headline}>
          Here's what your profile tells us:
        </Animated.Text>

        <View style={styles.narrativeCard}>
          {narrative.map((para, i) => (
            <Animated.Text
              key={i}
              entering={FadeInUp.delay(500 + i * 600).duration(600)}
              style={[
                styles.bodyText,
                i === narrative.length - 1 && styles.lastPara,
              ]}
            >
              {para}
            </Animated.Text>
          ))}
        </View>
      </ScrollView>

      <View style={styles.ctaContainer}>
        <CTAButton
          label="Show me my plan"
          onPress={onNext}
          delay={500 + narrative.length * 600}
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
    ...typography.title,
    color: colors.text.primary,
    marginBottom: 24,
  },
  narrativeCard: {
    backgroundColor: 'rgba(28, 28, 30, 0.4)',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.1)',
  },
  bodyText: {
    ...typography.bodyLarge,
    color: colors.text.secondary,
    marginBottom: 20,
    lineHeight: 28,
  },
  lastPara: {
    color: colors.accent.purpleLight,
    fontWeight: '500',
  },
  ctaContainer: {
    paddingTop: 16,
  },
});

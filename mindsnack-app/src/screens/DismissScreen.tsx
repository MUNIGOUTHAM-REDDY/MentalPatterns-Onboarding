import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { colors, typography } from '../theme';
import { CTAButton } from '../components/CTAButton';

interface Props {
  onSubscribe: () => void;
  onSkip: () => void;
}

export function DismissScreen({ onSubscribe, onSkip }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.Text entering={FadeInUp.duration(600)} style={styles.headline}>
          Wait — your profile and plan took time to build.
        </Animated.Text>

        <Animated.Text entering={FadeInUp.delay(300).duration(600)} style={styles.bodyText}>
          If you leave now, your personalized results will expire.
        </Animated.Text>

        <Animated.Text entering={FadeInUp.delay(600).duration(600)} style={styles.bodyTextHighlight}>
          We get it — committing to yourself is hard. That's literally one of the patterns MindSnack helps you break.
        </Animated.Text>

        <Animated.Text entering={FadeInUp.delay(900).duration(600)} style={styles.boldText}>
          Try it for free. 7 days. $0. What do you have to lose?
        </Animated.Text>
      </View>

      <View style={styles.ctaContainer}>
        <CTAButton
          label="Start free trial"
          onPress={onSubscribe}
          delay={1200}
        />
        <CTAButton
          label="Continue without a plan"
          onPress={onSkip}
          variant="ghost"
          delay={1400}
        />
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
  headline: {
    ...typography.title,
    color: colors.text.primary,
    marginBottom: 24,
  },
  bodyText: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: 18,
    lineHeight: 25,
  },
  bodyTextHighlight: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: 18,
    lineHeight: 25,
    fontStyle: 'italic',
  },
  boldText: {
    ...typography.bodyLarge,
    color: colors.text.primary,
    fontWeight: '600',
    marginTop: 8,
  },
  ctaContainer: {
    gap: 8,
  },
});

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { colors, typography } from '../theme';

interface Props {
  onComplete: () => void;
}

const steps = [
  'Emotional patterns mapped',
  'Core beliefs identified',
  'Relationship dynamics analyzed',
  'Decision-making style assessed',
  'Behavioral patterns detected',
  'Growth areas prioritized',
];

export function AnalysisScreen({ onComplete }: Props) {
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [showPreparing, setShowPreparing] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    steps.forEach((_, index) => {
      timers.push(
        setTimeout(() => {
          setVisibleSteps(index + 1);
        }, 800 + index * 800)
      );
    });

    timers.push(
      setTimeout(() => {
        setShowPreparing(true);
      }, 800 + steps.length * 800)
    );

    timers.push(
      setTimeout(() => {
        onComplete();
      }, 800 + steps.length * 800 + 1200)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.Text entering={FadeIn.duration(600)} style={styles.headline}>
          Analyzing your psychological profile...
        </Animated.Text>

        <View style={styles.stepsContainer}>
          {steps.map((step, index) => (
            index < visibleSteps ? (
              <Animated.View
                key={index}
                entering={FadeInUp.duration(400)}
                style={styles.stepRow}
              >
                <View style={styles.checkCircle}>
                  <Text style={styles.checkmark}>✓</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </Animated.View>
            ) : (
              <View key={index} style={[styles.stepRow, styles.stepHidden]}>
                <View style={styles.pendingCircle} />
                <Text style={styles.stepTextPending}>{step}</Text>
              </View>
            )
          ))}
        </View>

        {showPreparing && (
          <Animated.Text entering={FadeIn.duration(600)} style={styles.preparing}>
            Preparing your results...
          </Animated.Text>
        )}
      </View>

      {/* Ambient glow effect */}
      <View style={styles.glowOrb} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  content: {
    width: '100%',
  },
  headline: {
    ...typography.title,
    color: colors.text.primary,
    marginBottom: 40,
    textAlign: 'center',
  },
  stepsContainer: {
    gap: 16,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  stepHidden: {
    opacity: 0.15,
  },
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(16, 185, 129, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pendingCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  checkmark: {
    color: '#10b981',
    fontSize: 14,
    fontWeight: '700',
  },
  stepText: {
    ...typography.body,
    color: colors.text.secondary,
  },
  stepTextPending: {
    ...typography.body,
    color: colors.text.muted,
  },
  preparing: {
    ...typography.bodyLarge,
    color: colors.accent.purpleLight,
    textAlign: 'center',
    marginTop: 40,
  },
  glowOrb: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(139, 92, 246, 0.06)',
    bottom: '10%',
    alignSelf: 'center',
  },
});

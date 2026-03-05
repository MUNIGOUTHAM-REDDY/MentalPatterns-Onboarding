import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography } from '../theme';

interface Props {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  style?: ViewStyle;
  delay?: number;
}

export function CTAButton({ label, onPress, disabled, variant = 'primary', style, delay = 0 }: Props) {
  if (variant === 'ghost') {
    return (
      <Animated.View entering={FadeInUp.delay(delay).duration(400)}>
        <TouchableOpacity
          style={[styles.ghost, style]}
          onPress={onPress}
          activeOpacity={0.6}
        >
          <Text style={styles.ghostLabel}>{label}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  if (variant === 'secondary') {
    return (
      <Animated.View entering={FadeInUp.delay(delay).duration(400)}>
        <TouchableOpacity
          style={[styles.secondary, disabled && styles.disabled, style]}
          onPress={onPress}
          disabled={disabled}
          activeOpacity={0.7}
        >
          <Text style={[styles.secondaryLabel, disabled && styles.disabledLabel]}>{label}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <Animated.View entering={FadeInUp.delay(delay).duration(400)}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
        style={[disabled && styles.disabled, style]}
      >
        <LinearGradient
          colors={['#8b5cf6', '#7c3aed']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <Text style={styles.label}>{label} →</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    paddingHorizontal: 32,
    paddingVertical: 18,
    borderRadius: 100,
    alignItems: 'center',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  label: {
    ...typography.cta,
    color: '#ffffff',
  },
  disabled: {
    opacity: 0.4,
  },
  disabledLabel: {
    opacity: 0.5,
  },
  secondary: {
    paddingHorizontal: 32,
    paddingVertical: 18,
    borderRadius: 100,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(139, 92, 246, 0.3)',
    backgroundColor: 'rgba(139, 92, 246, 0.08)',
  },
  secondaryLabel: {
    ...typography.cta,
    color: colors.accent.purpleLight,
  },
  ghost: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  ghostLabel: {
    ...typography.bodySmall,
    color: colors.text.tertiary,
  },
});

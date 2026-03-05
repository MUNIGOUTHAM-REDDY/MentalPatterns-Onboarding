import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { colors } from '../theme';

interface Props {
  progress: number;
  visible: boolean;
}

export function ProgressBar({ progress, visible }: Props) {
  const fillStyle = useAnimatedStyle(() => ({
    width: withTiming(`${Math.min(progress * 100, 100)}%` as any, { duration: 700 }),
  }));

  if (!visible) return null;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.fill, fillStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 2,
    backgroundColor: colors.accent.purple,
  },
});

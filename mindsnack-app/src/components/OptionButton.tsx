import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { colors, typography } from '../theme';

interface Props {
  icon?: string;
  label: string;
  selected: boolean;
  onPress: () => void;
  index: number;
}

export function OptionButton({ icon, label, selected, onPress, index }: Props) {
  return (
    <Animated.View entering={FadeInUp.delay(index * 60).duration(400).springify()}>
      <TouchableOpacity
        style={[styles.container, selected && styles.selected]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.content}>
          {icon ? <Text style={styles.icon}>{icon}</Text> : null}
          <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
        </View>
        {selected && <View style={styles.checkmark}><Text style={styles.checkIcon}>✓</Text></View>}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(28, 28, 30, 0.5)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    marginBottom: 10,
  },
  selected: {
    backgroundColor: 'rgba(139, 92, 246, 0.12)',
    borderColor: 'rgba(139, 92, 246, 0.4)',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 12,
  },
  icon: {
    fontSize: 20,
    marginRight: 14,
  },
  label: {
    ...typography.body,
    color: colors.text.secondary,
    flex: 1,
  },
  labelSelected: {
    color: colors.text.primary,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.accent.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
});

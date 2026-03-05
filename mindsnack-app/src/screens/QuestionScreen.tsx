import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { colors, typography } from '../theme';
import { QuizScreen } from '../data/types';
import { OptionButton } from '../components/OptionButton';
import { CTAButton } from '../components/CTAButton';

interface Props {
  screen: QuizScreen;
  selectedOptions: string[];
  onSelect: (id: string) => void;
  onNext: () => void;
  canProceed: boolean;
}

export function QuestionScreen({ screen, selectedOptions, onSelect, onNext, canProceed }: Props) {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.Text entering={FadeInUp.duration(500)} style={styles.headline}>
          {screen.headline}
        </Animated.Text>

        {screen.subtext && (
          <Animated.Text entering={FadeInUp.delay(100).duration(500)} style={styles.subtext}>
            {screen.subtext}
          </Animated.Text>
        )}

        <View style={styles.optionsContainer}>
          {screen.options?.map((option, index) => (
            <OptionButton
              key={option.id}
              icon={option.icon || undefined}
              label={option.label}
              selected={selectedOptions.includes(option.id)}
              onPress={() => onSelect(option.id)}
              index={index}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.ctaContainer}>
        <CTAButton
          label={screen.cta}
          onPress={onNext}
          disabled={!canProceed}
          delay={0}
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
    marginBottom: 8,
  },
  subtext: {
    ...typography.bodySmall,
    color: colors.text.tertiary,
    marginBottom: 24,
    fontStyle: 'italic',
  },
  optionsContainer: {
    gap: 2,
  },
  ctaContainer: {
    paddingTop: 16,
  },
});

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { colors, typography } from '../theme';
import { QuizScreen } from '../data/types';
import { CTAButton } from '../components/CTAButton';

interface Props {
  screen: QuizScreen;
  onNext: () => void;
}

function parseTestimonial(text: string): { quote: string; author: string } {
  const match = text.match(/"(.+?)" — (.+)/);
  if (match) return { quote: match[1], author: match[2] };
  return { quote: text, author: '' };
}

export function SocialProofScreen({ screen, onNext }: Props) {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.Text entering={FadeInUp.duration(600)} style={styles.headline}>
          {screen.headline}
        </Animated.Text>

        <View style={styles.testimonials}>
          {screen.body?.map((text, i) => {
            const { quote, author } = parseTestimonial(text);
            return (
              <Animated.View
                key={i}
                entering={FadeInUp.delay(300 + i * 200).duration(600)}
                style={styles.testimonialCard}
              >
                <Text style={styles.quoteMarks}>"</Text>
                <Text style={styles.quoteText}>{quote}</Text>
                {author && <Text style={styles.author}>— {author}</Text>}
              </Animated.View>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.ctaContainer}>
        <CTAButton label={screen.cta} onPress={onNext} delay={800} />
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
    justifyContent: 'center',
    flexGrow: 1,
  },
  headline: {
    ...typography.title,
    color: colors.text.primary,
    marginBottom: 28,
    textAlign: 'center',
  },
  testimonials: {
    gap: 12,
  },
  testimonialCard: {
    backgroundColor: 'rgba(28, 28, 30, 0.4)',
    borderRadius: 20,
    paddingHorizontal: 22,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
  },
  quoteMarks: {
    fontFamily: 'DMSerifDisplay',
    fontSize: 32,
    color: 'rgba(139, 92, 246, 0.3)',
    lineHeight: 32,
    marginBottom: -4,
  },
  quoteText: {
    ...typography.body,
    color: colors.text.secondary,
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 8,
  },
  author: {
    ...typography.bodySmall,
    color: colors.text.tertiary,
  },
  ctaContainer: {
    paddingTop: 16,
  },
});

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography } from '../theme';
import { CTAButton } from '../components/CTAButton';

interface Props {
  headline: string;
  subheadline: string;
  onSubscribe: () => void;
  onDismiss: () => void;
}

export function PaywallScreen({ headline, subheadline, onSubscribe, onDismiss }: Props) {
  const [showClose, setShowClose] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'annual' | 'weekly'>('annual');

  useEffect(() => {
    const timer = setTimeout(() => setShowClose(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Close button - appears after 3.5s */}
      {showClose && (
        <Animated.View entering={FadeIn.duration(300)} style={styles.closeContainer}>
          <TouchableOpacity onPress={onDismiss} style={styles.closeButton}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.Text entering={FadeInUp.duration(600)} style={styles.headline}>
          {headline}
        </Animated.Text>

        <Animated.Text entering={FadeInUp.delay(200).duration(600)} style={styles.subheadline}>
          {subheadline}
        </Animated.Text>

        {/* Pricing Cards */}
        <Animated.View entering={FadeInUp.delay(500).duration(600)} style={styles.pricingContainer}>
          {/* Annual Plan */}
          <TouchableOpacity
            style={[styles.pricingCard, selectedPlan === 'annual' && styles.pricingCardSelected]}
            onPress={() => setSelectedPlan('annual')}
            activeOpacity={0.8}
          >
            <View style={styles.popularBadge}>
              <Text style={styles.popularText}>MOST POPULAR</Text>
            </View>
            <Text style={styles.planName}>Annual Plan</Text>
            <View style={styles.priceRow}>
              <Text style={styles.priceStrike}>$119.99</Text>
              <Text style={styles.priceMain}>$59.99/year</Text>
            </View>
            <Text style={styles.priceMonthly}>Just $4.99/mo — billed annually</Text>
            <View style={styles.saveBadge}>
              <Text style={styles.saveText}>SAVE 83%</Text>
            </View>
            <Text style={styles.trialText}>✓ 7-day free trial — pay nothing today</Text>
            {selectedPlan === 'annual' && <View style={styles.selectedIndicator} />}
          </TouchableOpacity>

          {/* Weekly Plan */}
          <TouchableOpacity
            style={[styles.pricingCard, selectedPlan === 'weekly' && styles.pricingCardSelected]}
            onPress={() => setSelectedPlan('weekly')}
            activeOpacity={0.8}
          >
            <Text style={styles.planName}>Weekly Plan</Text>
            <Text style={styles.priceMain}>$6.99/week</Text>
            <Text style={styles.priceYearly}>$363.48/year</Text>
            {selectedPlan === 'weekly' && <View style={styles.selectedIndicator} />}
          </TouchableOpacity>
        </Animated.View>

        {/* What's included */}
        <Animated.View entering={FadeInUp.delay(800).duration(600)} style={styles.includesSection}>
          <Text style={styles.includesTitle}>What's included:</Text>
          {[
            'Full access to your personalized growth plan',
            'All courses and lessons — current and future',
            'Psychology-backed exercises and tools',
            'New courses added monthly',
            'Your skill profile tracked over time',
          ].map((item, i) => (
            <View key={i} style={styles.includeRow}>
              <Text style={styles.includeCheck}>✓</Text>
              <Text style={styles.includeText}>{item}</Text>
            </View>
          ))}
        </Animated.View>
      </ScrollView>

      <View style={styles.ctaContainer}>
        <CTAButton
          label="Start My Free Trial — $0 Today"
          onPress={onSubscribe}
          delay={1000}
        />
        <Animated.Text entering={FadeInUp.delay(1200).duration(400)} style={styles.legalText}>
          7-day free trial. Then $59.99/year. Cancel anytime in Settings.
        </Animated.Text>
        <Animated.View entering={FadeInUp.delay(1400).duration(400)} style={styles.legalLinks}>
          <Text style={styles.legalLink}>Restore purchase</Text>
          <Text style={styles.legalDot}>·</Text>
          <Text style={styles.legalLink}>Terms</Text>
          <Text style={styles.legalDot}>·</Text>
          <Text style={styles.legalLink}>Privacy</Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  closeContainer: {
    position: 'absolute',
    top: 0,
    left: 20,
    zIndex: 10,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: colors.text.tertiary,
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 50,
    paddingBottom: 20,
  },
  headline: {
    ...typography.title,
    color: colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subheadline: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 28,
    fontStyle: 'italic',
  },
  pricingContainer: {
    gap: 10,
    marginBottom: 24,
  },
  pricingCard: {
    borderRadius: 20,
    padding: 20,
    backgroundColor: 'rgba(28, 28, 30, 0.5)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    position: 'relative',
    overflow: 'hidden',
  },
  pricingCardSelected: {
    borderColor: 'rgba(139, 92, 246, 0.4)',
    backgroundColor: 'rgba(139, 92, 246, 0.08)',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 40,
    borderBottomWidth: 40,
    borderLeftWidth: 0,
    borderTopColor: 'transparent',
    borderRightColor: colors.accent.purple,
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    transform: [{ rotate: '-90deg' }],
  },
  popularBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 10,
  },
  popularText: {
    ...typography.caption,
    color: colors.accent.purpleLight,
    fontSize: 10,
  },
  planName: {
    ...typography.label,
    color: colors.text.primary,
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 4,
  },
  priceStrike: {
    ...typography.body,
    color: colors.text.muted,
    textDecorationLine: 'line-through',
  },
  priceMain: {
    ...typography.subtitle,
    color: colors.text.primary,
    fontSize: 20,
  },
  priceMonthly: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  priceYearly: {
    ...typography.bodySmall,
    color: colors.text.tertiary,
    marginTop: 2,
  },
  saveBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 8,
  },
  saveText: {
    ...typography.caption,
    color: colors.sage.light,
    fontSize: 10,
  },
  trialText: {
    ...typography.bodySmall,
    color: colors.sage.primary,
    fontWeight: '500',
  },
  includesSection: {
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
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },
  includeText: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    flex: 1,
  },
  ctaContainer: {
    gap: 10,
    paddingTop: 12,
  },
  legalText: {
    ...typography.bodySmall,
    color: colors.text.muted,
    textAlign: 'center',
    fontSize: 11,
  },
  legalLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  legalLink: {
    ...typography.bodySmall,
    color: colors.text.muted,
    fontSize: 11,
    textDecorationLine: 'underline',
  },
  legalDot: {
    color: colors.text.muted,
    fontSize: 11,
  },
});

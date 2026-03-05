import { StyleSheet } from 'react-native';

export const typography = StyleSheet.create({
  heroTitle: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '400',
    letterSpacing: -0.5,
    fontFamily: 'DMSerifDisplay',
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '400',
    letterSpacing: -0.3,
    fontFamily: 'DMSerifDisplay',
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '400',
    fontFamily: 'DMSerifDisplay',
  },
  bodyLarge: {
    fontSize: 17,
    lineHeight: 26,
    fontWeight: '400',
    fontFamily: 'Inter',
  },
  body: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '400',
    fontFamily: 'Inter',
  },
  bodySmall: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '400',
    fontFamily: 'Inter',
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
    letterSpacing: 0.5,
    textTransform: 'uppercase' as const,
  },
  label: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  cta: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    fontFamily: 'Inter',
    letterSpacing: 0.2,
  },
});

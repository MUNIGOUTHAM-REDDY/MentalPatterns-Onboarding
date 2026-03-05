import { useState, useCallback, useMemo } from 'react';
import { screens } from '../data/screens';
import { QuizAnswers, ScoreProfile } from '../data/types';
import {
  calculateScores,
  getEmotionalInsight,
  getThinkingInsight,
  getRelationshipInsight,
  getBehaviorInsight,
  generateNarrative,
  getRecommendedCourses,
  getPaywallHeadline,
  getStrength,
  getWeakness,
} from '../utils/scoring';

export function useQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [scores, setScores] = useState<ScoreProfile | null>(null);
  const [showDismiss, setShowDismiss] = useState(false);

  const currentScreen = screens[currentIndex];
  const totalScreens = screens.length;

  // Non-linear progress: fast Phase 1-2, slow Phase 3, fast Phase 4+
  const progress = useMemo(() => {
    if (currentIndex < 3) return 0; // No progress bar in Phase 1
    const adjustedIndex = currentIndex - 3;
    const adjustedTotal = totalScreens - 3;
    const ratio = adjustedIndex / adjustedTotal;

    // Non-linear curve
    if (ratio < 0.15) return ratio * 2.5; // Fast start
    if (ratio < 0.7) return 0.375 + (ratio - 0.15) * 0.6; // Slow middle
    return 0.705 + (ratio - 0.7) * 2.0; // Fast finish
  }, [currentIndex, totalScreens]);

  const selectOption = useCallback((optionId: string) => {
    const maxSelect = currentScreen?.maxSelect || 1;

    if (maxSelect === 1) {
      setSelectedOptions([optionId]);
    } else {
      setSelectedOptions(prev => {
        if (prev.includes(optionId)) {
          return prev.filter(id => id !== optionId);
        }
        if (prev.length >= maxSelect) {
          return [...prev.slice(1), optionId];
        }
        return [...prev, optionId];
      });
    }
  }, [currentScreen]);

  const goNext = useCallback(() => {
    // Store answer if it's a question
    if (currentScreen?.dataKey && selectedOptions.length > 0) {
      const maxSelect = currentScreen.maxSelect || 1;
      setAnswers(prev => ({
        ...prev,
        [currentScreen.dataKey!]: maxSelect > 1 ? selectedOptions : selectedOptions[0],
      }));
    }

    // Calculate scores when entering the analysis screen
    if (currentIndex + 1 < totalScreens && screens[currentIndex + 1].type === 'analysis') {
      const updatedAnswers = {
        ...answers,
        ...(currentScreen?.dataKey ? {
          [currentScreen.dataKey]: (currentScreen.maxSelect || 1) > 1 ? selectedOptions : selectedOptions[0],
        } : {}),
      };
      setScores(calculateScores(updatedAnswers));
    }

    setSelectedOptions([]);
    if (currentIndex < totalScreens - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, currentScreen, selectedOptions, answers, totalScreens]);

  const canProceed = useMemo(() => {
    if (!currentScreen) return false;
    if (currentScreen.type === 'question') return selectedOptions.length > 0;
    return true;
  }, [currentScreen, selectedOptions]);

  // Get dynamic content for insight screens
  const getInsightContent = useCallback((screenId: number) => {
    switch (screenId) {
      case 14: return getEmotionalInsight(answers);
      case 19: return getThinkingInsight(answers);
      case 25: return getRelationshipInsight(answers);
      case 30: return getBehaviorInsight(answers);
      default: return null;
    }
  }, [answers]);

  const getNarrativeContent = useCallback(() => {
    if (!scores) return [];
    return generateNarrative(scores, answers);
  }, [scores, answers]);

  const getPlanContent = useCallback(() => {
    if (!scores) return null;
    return getRecommendedCourses(scores, answers);
  }, [scores, answers]);

  const getPaywallContent = useCallback(() => {
    return getPaywallHeadline(answers);
  }, [answers]);

  const getProfileData = useCallback(() => {
    if (!scores) return null;
    return {
      scores,
      strength: getStrength(scores),
      weakness: getWeakness(scores),
    };
  }, [scores]);

  return {
    currentScreen,
    currentIndex,
    totalScreens,
    progress,
    answers,
    selectedOptions,
    scores,
    showDismiss,
    setShowDismiss,
    selectOption,
    goNext,
    canProceed,
    getInsightContent,
    getNarrativeContent,
    getPlanContent,
    getPaywallContent,
    getProfileData,
  };
}

export type ScreenType = 'static' | 'question' | 'insight' | 'analysis' | 'profile' | 'narrative' | 'plan' | 'social' | 'paywall' | 'dismiss';

export interface QuizOption {
  id: string;
  icon: string;
  label: string;
  /** Internal tag for scoring logic */
  tag?: string;
}

export interface QuizScreen {
  id: number;
  type: ScreenType;
  phase: number;
  /** Data key to store answer */
  dataKey?: string;
  /** Headline / question text */
  headline: string;
  /** Subtext shown below headline */
  subtext?: string;
  /** Additional body paragraphs */
  body?: string[];
  /** Options for question screens */
  options?: QuizOption[];
  /** Max selections (default 1) */
  maxSelect?: number;
  /** CTA button label */
  cta: string;
  /** Whether this is an insight that should use paragraph fade animation */
  paraFade?: boolean;
}

export interface QuizAnswers {
  [key: string]: string | string[];
}

export interface ScoreProfile {
  emotionalIntelligence: number;
  selfAwareness: number;
  relationshipSkills: number;
  decisionMaking: number;
  stressResilience: number;
}

export interface InsightResult {
  patternName: string;
  description: string[];
}

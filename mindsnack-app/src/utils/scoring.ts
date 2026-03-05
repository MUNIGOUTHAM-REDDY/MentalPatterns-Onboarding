import { QuizAnswers, ScoreProfile, InsightResult } from '../data/types';

function getAnswer(answers: QuizAnswers, key: string): string {
  const val = answers[key];
  if (Array.isArray(val)) return val[0] || '';
  return val || '';
}

function getAnswerArray(answers: QuizAnswers, key: string): string[] {
  const val = answers[key];
  if (Array.isArray(val)) return val;
  return val ? [val] : [];
}

export function calculateScores(answers: QuizAnswers): ScoreProfile {
  let ei = 5, sa = 5, rs = 5, dm = 5, sr = 5;

  // ===== Emotional Intelligence =====
  const baseline = getAnswer(answers, 'emotional_baseline');
  const triggers = getAnswerArray(answers, 'emotional_triggers');
  const processing = getAnswer(answers, 'emotional_processing');
  const duration = getAnswer(answers, 'emotional_duration');

  if (baseline === 'calm') ei += 2;
  else if (baseline === 'updown') ei += 0;
  else if (baseline === 'anxious') ei -= 2;
  else if (baseline === 'irritable') ei -= 2;
  else if (baseline === 'numb') ei -= 3;
  else if (baseline === 'chaotic') ei -= 3;

  if (processing === 'sit_with') ei += 2;
  else if (processing === 'rationalize') ei += 0;
  else if (processing === 'vent') ei -= 1;
  else if (processing === 'push_down') ei -= 2;
  else if (processing === 'distract') ei -= 2;
  else if (processing === 'lash_out') ei -= 3;

  if (duration === 'minutes') ei += 2;
  else if (duration === 'hours') ei += 0;
  else if (duration === 'varies') ei -= 1;
  else if (duration === 'day_plus') ei -= 2;
  else if (duration === 'unsure') ei -= 1;

  // High-reactivity triggers reduce score slightly
  const highReactivity = ['criticized', 'conflict'];
  if (triggers.some(t => highReactivity.includes(t))) ei -= 1;

  // ===== Self-Awareness =====
  const belief = getAnswer(answers, 'core_belief_pattern');
  const frequency = getAnswer(answers, 'self_talk_frequency');
  const bias = getAnswer(answers, 'cognitive_bias_primary');
  const blindSpot = getAnswer(answers, 'perceived_blind_spot');

  // Specific belief + high frequency = actually high awareness (they see it)
  const specificBeliefs = ['perfect', 'behind', 'leave', 'further', 'control', 'undeserving'];
  if (specificBeliefs.includes(belief)) {
    if (frequency === 'constantly') {
      sa += 2; // Painfully aware
      ei -= 1; // But can't manage it
    } else if (frequency === 'most_days') {
      sa += 1;
    }
  }

  if (bias === 'balanced') sa += 2;
  else if (bias === 'depends') sa += 1;
  else if (bias === 'self_blame') sa -= 1;
  else if (bias === 'overgeneralize') sa -= 2;
  else if (bias === 'catastrophize') sa -= 2;
  else if (bias === 'hindsight') sa += 0;

  if (['overthink', 'hard_on_self'].includes(blindSpot)) sa += 1;
  else if (blindSpot === 'unaware') sa -= 2;
  else if (blindSpot === 'avoid') sa -= 1;

  // ===== Relationship Skills =====
  const conflict = getAnswer(answers, 'conflict_style');
  const attachment = getAnswer(answers, 'attachment_fear');
  const relPattern = getAnswer(answers, 'relationship_pattern');
  const comm = getAnswer(answers, 'communication_style');

  if (conflict === 'calm') rs += 2;
  else if (conflict === 'heated') rs += 1;
  else if (conflict === 'shutdown') rs -= 2;
  else if (conflict === 'defensive') rs -= 2;
  else if (conflict === 'give_in') rs -= 2;
  else if (conflict === 'leave') rs -= 3;

  if (relPattern === 'balanced') rs += 2;
  else if (relPattern === 'give_more') rs -= 1;
  else if (relPattern === 'arms_length') rs -= 2;
  else if (relPattern === 'fixing') rs -= 1;
  else if (relPattern === 'lose_self') rs -= 2;
  else if (relPattern === 'nobody_there') rs -= 2;

  if (comm === 'direct') rs += 2;
  else if (comm === 'hint') rs -= 1;
  else if (comm === 'handle_self') rs -= 1;
  else if (comm === 'frustrated') rs -= 2;
  else if (comm === 'overexplain') rs -= 1;

  const deepFears = ['abandoned', 'vulnerable', 'lacking'];
  if (deepFears.includes(attachment)) rs -= 1;

  // ===== Decision-Making =====
  const decision = getAnswer(answers, 'decision_style');
  const procrastination = getAnswer(answers, 'procrastination_pattern');
  const sabotage = getAnswer(answers, 'self_sabotage_pattern');

  if (decision === 'gut') dm += 1;
  else if (decision === 'overthink') dm -= 2;
  else if (decision === 'research') dm -= 1;
  else if (decision === 'ask_others') dm -= 1;
  else if (decision === 'avoid') dm -= 3;
  else if (decision === 'second_guess') dm -= 2;

  if (procrastination === 'disciplined') dm += 2;
  else if (procrastination === 'everything') dm -= 3;
  else if (procrastination === 'scary') dm -= 1;
  else if (procrastination === 'busy_avoid') dm -= 2;
  else if (procrastination === 'pressure') dm += 0;
  else if (procrastination === 'lose_momentum') dm -= 2;

  if (sabotage === 'on_track') dm += 2;
  else if (sabotage === 'multiple') dm -= 2;
  else if (sabotage === 'scared') dm -= 1;
  else if (sabotage === 'pull_back') dm -= 1;
  else if (sabotage === 'not_sure') dm -= 1;

  // ===== Stress Resilience =====
  const stress = getAnswer(answers, 'stress_persona');

  if (stress === 'worrier') sr -= 2;
  else if (stress === 'robot') sr -= 1;
  else if (stress === 'controller') sr -= 1;
  else if (stress === 'escape') sr -= 3;
  else if (stress === 'pleaser') sr -= 2;
  else if (stress === 'destroyer') sr -= 3;

  // Use emotional processing as coping proxy
  if (processing === 'sit_with') sr += 2;
  else if (processing === 'push_down') sr -= 1;
  else if (processing === 'distract') sr -= 2;
  else if (processing === 'lash_out') sr -= 2;

  if (duration === 'minutes') sr += 1;
  else if (duration === 'day_plus') sr -= 2;
  else if (duration === 'varies') sr -= 1;

  // ===== Apply balancing rules =====
  let scores = { ei, sa, rs, dm, sr };

  // Clamp all scores to 2-9
  const clamp = (v: number) => Math.max(2, Math.min(9, v));
  scores.ei = clamp(scores.ei);
  scores.sa = clamp(scores.sa);
  scores.rs = clamp(scores.rs);
  scores.dm = clamp(scores.dm);
  scores.sr = clamp(scores.sr);

  const vals = [scores.ei, scores.sa, scores.rs, scores.dm, scores.sr];
  const sorted = [...vals].sort((a, b) => a - b);

  // Rule 2: At least 2 scores must be <= 5
  const lowCount = vals.filter(v => v <= 5).length;
  if (lowCount < 2) {
    // Reduce the two lowest by 2
    const twoLowest = sorted.slice(0, 2);
    const keys = ['ei', 'sa', 'rs', 'dm', 'sr'] as const;
    let reduced = 0;
    for (const k of keys) {
      if (reduced >= 2) break;
      if (twoLowest.includes(scores[k])) {
        scores[k] = Math.max(2, scores[k] - 2);
        reduced++;
      }
    }
  }

  // Rule 3: Highest must be 3+ above lowest
  const max = Math.max(scores.ei, scores.sa, scores.rs, scores.dm, scores.sr);
  const min = Math.min(scores.ei, scores.sa, scores.rs, scores.dm, scores.sr);
  if (max - min < 3) {
    const keys = ['ei', 'sa', 'rs', 'dm', 'sr'] as const;
    for (const k of keys) {
      if (scores[k] === min) {
        scores[k] = Math.max(2, max - 3);
        break;
      }
    }
  }

  return {
    emotionalIntelligence: scores.ei,
    selfAwareness: scores.sa,
    relationshipSkills: scores.rs,
    decisionMaking: scores.dm,
    stressResilience: scores.sr,
  };
}

export function getStrength(profile: ScoreProfile): { area: string; score: number; description: string } {
  const areas = [
    { key: 'emotionalIntelligence', label: 'Emotional Intelligence', desc: 'You navigate your inner world with unusual skill.' },
    { key: 'selfAwareness', label: 'Self-Awareness', desc: 'You see yourself more clearly than most people.' },
    { key: 'relationshipSkills', label: 'Relationship Skills', desc: 'You build meaningful connections with people.' },
    { key: 'decisionMaking', label: 'Decision-Making', desc: 'You trust your process and follow through.' },
    { key: 'stressResilience', label: 'Stress Resilience', desc: 'You hold steady when the pressure is on.' },
  ];

  let best = areas[0];
  let bestScore = profile[best.key as keyof ScoreProfile];
  for (const a of areas) {
    const s = profile[a.key as keyof ScoreProfile];
    if (s > bestScore) { best = a; bestScore = s; }
  }

  return { area: best.label, score: bestScore, description: best.desc };
}

export function getWeakness(profile: ScoreProfile): { area: string; score: number; description: string } {
  const areas = [
    { key: 'emotionalIntelligence', label: 'Emotional Intelligence', desc: 'You understand your patterns, but haven\'t learned to manage them yet.' },
    { key: 'selfAwareness', label: 'Self-Awareness', desc: 'There are patterns influencing you that you can\'t see yet.' },
    { key: 'relationshipSkills', label: 'Relationship Skills', desc: 'Your connection patterns may be holding you back.' },
    { key: 'decisionMaking', label: 'Decision-Making', desc: 'Clarity and confidence in choices is a learnable skill.' },
    { key: 'stressResilience', label: 'Stress Resilience', desc: 'Your stress response is working against you, not for you.' },
  ];

  let worst = areas[0];
  let worstScore = profile[worst.key as keyof ScoreProfile];
  for (const a of areas) {
    const s = profile[a.key as keyof ScoreProfile];
    if (s < worstScore) { worst = a; worstScore = s; }
  }

  return { area: worst.label, score: worstScore, description: worst.desc };
}

export function generateNarrative(profile: ScoreProfile, answers: QuizAnswers): string[] {
  const strength = getStrength(profile);
  const weakness = getWeakness(profile);

  const strengthIntro: Record<string, string> = {
    'Emotional Intelligence': 'You have an unusual ability to navigate your emotional landscape',
    'Self-Awareness': 'You\'re someone who sees yourself with unusual clarity — you know your patterns, your triggers, and probably even your blind spots',
    'Relationship Skills': 'You have a natural gift for connection — people feel safe around you and trust opens up quickly',
    'Decision-Making': 'You\'re more capable than you give yourself credit for — your decision-making instincts are strong, and you have a practical mind',
    'Stress Resilience': 'You have a core steadiness that most people don\'t — when things fall apart around you, something inside holds',
  };

  const weaknessMiddle: Record<string, string> = {
    'Emotional Intelligence': 'But knowing and managing are two different skills, and right now the gap between them is where your pain lives. You understand why you react the way you do, but you haven\'t yet built the tools to change the reaction in real-time.',
    'Self-Awareness': 'But there\'s a layer underneath your daily actions that you haven\'t explored yet — patterns of thought and belief that are influencing you in ways you can\'t see.',
    'Relationship Skills': 'But your relationship patterns tell a different story. The way you connect — or avoid connecting — is running on old programming that no longer serves you.',
    'Decision-Making': 'But when it comes to turning insight into action, something gets stuck. The gap between knowing what to do and actually doing it is where your growth edge lives.',
    'Stress Resilience': 'But under sustained pressure, a different version of you takes over — one that copes in ways that create new problems instead of solving the original one.',
  };

  return [
    strengthIntro[strength.area] + '.',
    weaknessMiddle[weakness.area],
    'That\'s not a character flaw — it\'s a missing skill set. And skills can be built.',
    'The good news: you\'re exactly the kind of person who makes rapid progress once you have the right framework.',
  ];
}

export function getEmotionalInsight(answers: QuizAnswers): InsightResult {
  const baseline = getAnswer(answers, 'emotional_baseline');
  const processing = getAnswer(answers, 'emotional_processing');
  const triggers = getAnswerArray(answers, 'emotional_triggers');

  if (['anxious', 'chaotic'].includes(baseline) && ['push_down', 'distract'].includes(processing)) {
    return {
      patternName: 'The Emotional Avoider',
      description: [
        'You feel things deeply — probably more deeply than people around you realize. But instead of processing emotions, your brain has learned to suppress or redirect them. This works short-term but creates a pressure cooker effect.',
        'Research shows this pattern is strongly linked to sudden emotional outbursts, physical tension, and decision fatigue.',
        'The good news: emotional regulation is one of the most trainable psychological skills. It responds to targeted practice within weeks, not months.',
      ],
    };
  }

  if (baseline === 'irritable' && ['rationalize', 'push_down'].includes(processing)) {
    return {
      patternName: 'The Over-Controller',
      description: [
        'Your mind tries to manage emotions by thinking harder. If you can just analyze the situation enough, the feeling should go away, right? Except it doesn\'t — because emotions don\'t respond to logic.',
        'This creates a loop: feel something → think harder → still feel it → feel frustrated at yourself for feeling it.',
        'This is actually one of the most common patterns in high-achievers, and it responds incredibly well to specific cognitive reframing techniques.',
      ],
    };
  }

  if (baseline === 'numb' && ['push_down', 'distract'].includes(processing)) {
    return {
      patternName: 'The Shutdown Response',
      description: [
        'Numbness isn\'t the absence of emotion — it\'s your brain\'s circuit breaker tripping because the emotional load exceeded capacity at some point. It\'s a protection mechanism that once served you well.',
        'The challenge is that when you numb the bad, you also numb the good — joy, excitement, connection all get muted too.',
        'This is one of the most misunderstood patterns, and also one of the most responsive to the right approach.',
      ],
    };
  }

  if (baseline === 'updown' && processing === 'vent') {
    return {
      patternName: 'The Emotional Reactor',
      description: [
        'Your emotions hit fast and hard — and your instinct is to discharge them immediately. This can look like venting, reacting impulsively, or saying things in the heat of the moment you wouldn\'t say when calm.',
        'The core issue isn\'t that you feel too much. It\'s that the gap between "feeling" and "responding" is too short. That gap is where emotional intelligence lives.',
        'The great news: expanding that gap is one of the most well-researched skills in psychology — and the results are often dramatic.',
      ],
    };
  }

  if (processing === 'lash_out') {
    return {
      patternName: 'The Pressure Valve',
      description: [
        'You hold things in until you can\'t anymore — and then they come out sideways. The snap, the sharp comment, the disproportionate reaction to something small. Followed by guilt.',
        'This isn\'t an anger problem. It\'s a containment problem. Emotions build with no healthy outlet, and your nervous system eventually forces a release.',
        'Understanding this pattern is the first step. The second is building micro-release habits that prevent the pressure from building in the first place.',
      ],
    };
  }

  // Default
  return {
    patternName: 'The Emotional Navigator',
    description: [
      'You have a complex relationship with your emotions — sometimes you handle them well, other times they catch you off guard. This inconsistency isn\'t random — it\'s pattern-driven.',
      'Certain situations activate old emotional programming that bypasses your conscious mind. In familiar territory, you\'re grounded. In triggering territory, a different version of you takes over.',
      'Mapping these trigger points is the key to building consistent emotional regulation — and it\'s more achievable than you might think.',
    ],
  };
}

export function getThinkingInsight(answers: QuizAnswers): InsightResult {
  const belief = getAnswer(answers, 'core_belief_pattern');
  const bias = getAnswer(answers, 'cognitive_bias_primary');

  if (belief === 'perfect' && bias === 'self_blame') {
    return {
      patternName: 'Contingent Self-Worth',
      description: [
        'You run on a mental operating system psychologists call "contingent self-worth" — your sense of being okay is tied to performance. When you succeed, you feel fine. When you don\'t, your brain doesn\'t just register failure — it registers threat.',
        'This is one of the most exhausting patterns to live with because there\'s never a finish line. You achieve something, the goalposts move, and the pressure starts again.',
        'It\'s also one of the most well-researched patterns in cognitive psychology — which means the techniques to rewire it are battle-tested.',
      ],
    };
  }

  if (belief === 'behind' && ['catastrophize', 'overgeneralize'].includes(bias)) {
    return {
      patternName: 'The Comparison Trap',
      description: [
        'You\'re running a mental comparison engine that\'s rigged against you. Your brain compares your internal experience (messy, uncertain, anxious) to everyone else\'s external presentation (polished, confident, together).',
        'Psychologists call this the "highlight reel vs. behind-the-scenes" distortion — and social media has made it 10x worse.',
        'The real issue isn\'t that you\'re behind. It\'s that your brain has a broken metric for measuring progress.',
      ],
    };
  }

  if (belief === 'leave' && ['overgeneralize', 'self_blame'].includes(bias)) {
    return {
      patternName: 'Rejection Sensitivity',
      description: [
        'This pattern has a name in attachment theory: anxious attachment with rejection sensitivity. Your brain is constantly scanning for signs that people are pulling away — and it often finds "evidence" even when there is none.',
        'This isn\'t a character flaw. It\'s almost always rooted in early relational experiences where love felt conditional or inconsistent.',
        'Understanding this pattern is often the single biggest unlock people experience in their personal growth journey.',
      ],
    };
  }

  if (belief === 'control' && bias === 'hindsight') {
    return {
      patternName: 'The Vigilance Loop',
      description: [
        'Your brain runs a constant background process: scanning for what could go wrong, planning for every contingency, and blaming yourself when something slips through.',
        'This hypervigilance was probably adaptive once — maybe in a childhood where being prepared meant being safe. But now it\'s consuming mental energy that could go toward creation, connection, and joy.',
        'The path forward isn\'t learning to "let go of control" — it\'s learning to feel safe without it.',
      ],
    };
  }

  // Default
  return {
    patternName: 'The Inner Critic',
    description: [
      'You have a voice inside that\'s running a story about who you are and what you deserve. This voice isn\'t random — it\'s a pattern formed from experiences, beliefs, and cognitive habits that have been reinforcing each other for years.',
      'The tricky part: this voice feels like truth. It doesn\'t announce itself as a pattern — it presents itself as reality. "I\'m not enough" doesn\'t feel like a thought. It feels like a fact.',
      'But it\'s not a fact. It\'s a well-worn neural pathway. And neural pathways can be redirected with the right techniques.',
    ],
  };
}

export function getRelationshipInsight(answers: QuizAnswers): InsightResult {
  const attachment = getAnswer(answers, 'attachment_fear');
  const relPattern = getAnswer(answers, 'relationship_pattern');
  const conflict = getAnswer(answers, 'conflict_style');

  if (attachment === 'abandoned' && relPattern === 'give_more' && conflict === 'give_in') {
    return {
      patternName: 'The Over-Giver',
      description: [
        'You\'ve learned that love is earned through effort. So you give, accommodate, and put others\' needs first — not because you\'re selfless, but because somewhere inside, your brain equates being needed with being safe.',
        'The cost: you build resentment, lose your sense of self in relationships, and attract partners or friends who are happy to take without reciprocating.',
        'This pattern runs on an unconscious belief: "If I stop giving, they\'ll stop staying." The first step to changing it is seeing it — and you just did.',
      ],
    };
  }

  if (['independence', 'trapped'].includes(attachment) && relPattern === 'arms_length' && ['shutdown', 'leave'].includes(conflict)) {
    return {
      patternName: 'The Self-Protector',
      description: [
        'Closeness feels dangerous to your nervous system — not because you don\'t want connection, but because your brain learned that depending on others leads to disappointment.',
        'So you maintain distance. You value independence above everything. When things get too intimate, you find reasons to pull back. People may call you "emotionally unavailable" — but that\'s not the full picture.',
        'The full picture: you want closeness. You just don\'t trust that it\'s safe. And that belief is more changeable than you think.',
      ],
    };
  }

  if (attachment === 'vulnerable' && ['fixing', 'give_more'].includes(relPattern) && conflict === 'defensive') {
    return {
      patternName: 'The Armor Wearer',
      description: [
        'You\'ve built a protective layer between who you really are and what you show the world. Letting someone past that armor feels like handing them a weapon.',
        'In conflict, this shows up as defensiveness — because criticism doesn\'t feel like feedback, it feels like an attack on the real you hiding behind the wall.',
        'This pattern almost always traces back to a specific experience where vulnerability was punished. Understanding that origin is the master key to unlocking every relationship struggle that follows.',
      ],
    };
  }

  // Default
  return {
    patternName: 'The Connection Seeker',
    description: [
      'You want deep, meaningful connection — but something in your relational wiring keeps creating friction. It might look like giving too much, pulling away, or choosing people who can\'t meet you where you are.',
      'This isn\'t bad luck or bad taste. It\'s a pattern — one that was likely shaped by your earliest experiences of love, safety, and belonging.',
      'The beautiful thing about relationship patterns: once you see them, you can\'t unsee them. And that visibility is what makes change possible.',
    ],
  };
}

export function getBehaviorInsight(answers: QuizAnswers): InsightResult {
  const decision = getAnswer(answers, 'decision_style');
  const procrastination = getAnswer(answers, 'procrastination_pattern');
  const sabotage = getAnswer(answers, 'self_sabotage_pattern');

  if (['overthink', 'second_guess'].includes(decision) && sabotage === 'multiple') {
    return {
      patternName: 'Fear of Success (disguised as fear of failure)',
      description: [
        'Here\'s the counterintuitive truth: you\'re not afraid of failing. You\'re afraid of what happens if you succeed — because success raises the stakes.',
        'Your brain\'s logic: "If I never fully try, I can never fully fail. If I get close to winning and pull back, at least the failure was on my terms."',
        'Psychologists call this self-handicapping. It\'s not laziness or lack of discipline — it\'s a sophisticated protection strategy your unconscious mind is running without your permission. This is one of the most life-changing patterns to become aware of.',
      ],
    };
  }

  if (decision === 'gut' && procrastination === 'lose_momentum' && ['scared', 'pull_back'].includes(sabotage)) {
    return {
      patternName: 'The Impulse-Crash Cycle',
      description: [
        'You don\'t lack motivation — you lack sustained motivation. You start with explosive energy (gut decisions, bold moves), but when the initial excitement fades, you interpret the natural dip as evidence it\'s "not right."',
        'This is often connected to a dopamine-seeking pattern where your brain is optimized for novelty and beginning, not for consistency and middle.',
        'Understanding this cycle is the first step to breaking it — because you can build systems that work WITH your brain\'s wiring instead of against it.',
      ],
    };
  }

  if (decision === 'research' && ['everything', 'busy_avoid'].includes(procrastination)) {
    return {
      patternName: 'The Analysis Trap',
      description: [
        'Your brain uses information-gathering as a substitute for action. It feels productive — and it IS thinking — but it\'s not the same as doing. Every additional piece of research creates two more questions, and the decision gets harder, not easier.',
        'This often runs on an unconscious belief: "If I just know enough, I can guarantee the outcome." But you can\'t. And chasing certainty in an uncertain world is the fastest path to paralysis.',
        'The fix isn\'t "just do it" — it\'s rewiring your relationship with uncertainty itself.',
      ],
    };
  }

  // Default
  return {
    patternName: 'The Pattern Repeater',
    description: [
      'You have a behavioral loop that keeps bringing you back to the same place — different situations, same outcomes. Whether it\'s procrastination, self-doubt, or pulling back at critical moments, the surface details change but the underlying pattern stays constant.',
      'This is your brain\'s default operating mode. It\'s not a choice you\'re making — it\'s a program that\'s running. And programs can be rewritten.',
      'The first step isn\'t willpower or discipline. It\'s understanding the specific trigger → thought → behavior → consequence chain that keeps the loop alive.',
    ],
  };
}

export function getRecommendedCourses(profile: ScoreProfile, answers: QuizAnswers) {
  const courseMap: Record<string, { name: string; description: string; lessons: number }> = {
    emotionalIntelligence: { name: 'Emotional Mastery: The Science of Feeling', description: 'Learn to decode, regulate, and harness your emotions using CBT-backed techniques.', lessons: 14 },
    selfAwareness: { name: 'Know Thyself: The Psychology of Self-Deception', description: 'Uncover the hidden beliefs driving your behavior and learn to rewrite them.', lessons: 12 },
    relationshipSkills: { name: 'The Connection Blueprint: Psychology of Relationships', description: 'Transform your attachment patterns and build deeper, safer connections.', lessons: 16 },
    decisionMaking: { name: 'Clear Thinking: Beat Your Brain\'s Worst Instincts', description: 'Master cognitive biases and build decision-making frameworks that actually work.', lessons: 10 },
    stressResilience: { name: 'Unbreakable: The Science of Mental Toughness', description: 'Build a nervous system that bends without breaking under sustained pressure.', lessons: 12 },
  };

  const entries = Object.entries(profile) as [keyof ScoreProfile, number][];
  entries.sort((a, b) => a[1] - b[1]);

  const primary = courseMap[entries[0][0]];
  const secondary = courseMap[entries[1][0]];

  const desiredOutcome = getAnswer(answers, 'desired_outcome');
  const outcomeMap: Record<string, string> = {
    self_compassion: 'selfAwareness',
    manage_emotions: 'emotionalIntelligence',
    relationships: 'relationshipSkills',
    decisions: 'decisionMaking',
    break_patterns: 'selfAwareness',
    understand_self: 'selfAwareness',
  };
  const tertiaryKey = outcomeMap[desiredOutcome] || 'selfAwareness';
  const tertiary = courseMap[tertiaryKey];

  const timeCommitment = getAnswer(answers, 'time_commitment');
  const timePerDay = timeCommitment === '5min' ? '5 min/day' : timeCommitment === '10-15min' ? '10 min/day' : timeCommitment === '20-30min' ? '20 min/day' : '10 min/day';

  return { primary, secondary, tertiary, timePerDay };
}

export function getPaywallHeadline(answers: QuizAnswers): { headline: string; subheadline: string } {
  const commitment = getAnswer(answers, 'commitment_level');
  const desiredOutcome = getAnswer(answers, 'desired_outcome');

  const headlines: Record<string, string> = {
    all_in: 'Your plan is ready. Let\'s build a sharper mind.',
    very: 'You\'ve seen the patterns. Now let\'s change them.',
    curious: 'Try it free. See what changes.',
    putting_off: 'This is the part where you usually stop. Not this time.',
  };

  const subheadlines: Record<string, string> = {
    self_compassion: 'Your inner critic has been running the show long enough.',
    manage_emotions: 'You feel deeply. It\'s time to learn what to do with that.',
    relationships: 'Every relationship you\'ll ever have starts with the one you have with yourself.',
    decisions: 'Clarity isn\'t a personality trait. It\'s a skill — and it\'s learnable.',
    break_patterns: 'You\'ve already named the pattern. That\'s the hardest step. The next ones are easier.',
    understand_self: 'You just learned more about yourself in 5 minutes than most people learn in years. Imagine what 30 days could do.',
  };

  return {
    headline: headlines[commitment] || headlines.very,
    subheadline: subheadlines[desiredOutcome] || subheadlines.understand_self,
  };
}

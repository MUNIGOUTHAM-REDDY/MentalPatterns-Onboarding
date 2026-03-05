# MindSnack — Complete Onboarding Flow (v2)

## Design Philosophy

This is not a quiz. This is a **guided self-discovery experience** that happens to end at a paywall. By the time the user reaches the paywall, they should feel like they just had a $200 therapy session for free — and the app hasn't even started yet.

**38 screens. 5-7 minutes. 6 psychological phases.**

Every screen earns the next tap. Micro-insights are sprinkled every 4-5 questions so the user is constantly receiving value, not just giving data. Trust-building elements are woven in — not as interruptions, but as natural beats in the journey.

**Design specs throughout:**
- Dark theme, premium feel
- One element per screen — no clutter
- Smooth horizontal slide transitions
- Haptic feedback on every selection
- No back button — forward momentum only
- Progress bar appears from Screen 4, fills non-linearly (fast → slow → fast)
- All data stored locally — account creation happens AFTER paywall

---

## PHASE 1: THE HOOK (Screens 1-3)

**Goal:** Create curiosity, establish tone, get first tap.

---

### Screen 1 — Cold Open

No logo. No branding. Just text on dark background.

> **You have mass of patterns running your life that you've never noticed.**

Small pause, then subtext fades in:

> MindSnack helps you see them — and change them.

CTA: **"Show me →"**

*Psychology: Opens a massive curiosity loop. No app branding yet — it feels like a message, not a product. "Patterns you've never noticed" is irresistible because it implies blind spots. Everyone wants to know what they can't see.*

---

### Screen 2 — The Promise

MindSnack logo fades in at top. Still minimal.

> **In the next 5 minutes, you'll learn more about how your mind works than most people learn in a lifetime.**

> This isn't a personality quiz. It's a psychological assessment based on frameworks used by cognitive behavioral therapists, behavioral economists, and relationship researchers.

> Your results are private. Always.

CTA: **"I'm ready →"**

*Psychology: Sets expectations (5 minutes — manageable), elevates the experience above "fun quiz" into something serious, and addresses privacy concern before it arises. The CBT/behavioral economics reference builds instant credibility.*

---

### Screen 3 — Social Proof + Framing

> **2.4M+ lessons completed by people working on themselves**

Three mini-testimonials, stacked:
> *"This app put words to things I've felt my entire life."* — Priya, 31
> *"I finally understand why I keep making the same mistakes."* — James, 28
> *"Better than 6 months of self-help books."* — Maria, 42

CTA: **"Let's begin →"**

*Psychology: Social proof, but notice the testimonials are about UNDERSTANDING, not features. This primes the user to expect self-discovery, which is exactly what the quiz delivers.*

---

## PHASE 2: IDENTITY & CONTEXT (Screens 4-9)

**Goal:** Light questions to build momentum. Get basic data. Make them self-label.

*Progress bar appears starting here.*

---

### Screen 4 — Primary Motivation

> **What brought you to MindSnack?**

Options (select ONE):
- 🧠 I want to understand myself better
- 😤 I struggle with my emotions
- 💬 I want better relationships
- 🎯 I want to make smarter decisions
- 😶‍🌫️ I feel stuck and don't know why
- 🔥 I want to become the best version of myself

**Data:** `primary_motivation`

*Psychology: The user now has a declared identity. They're no longer "someone browsing an app" — they're "someone who struggles with emotions" or "someone who wants to understand themselves." This self-label persists through the entire flow and makes abandoning feel like giving up on that goal.*

---

### Screen 5 — Age

> **How old are you?**

Options:
- 18-24
- 25-34
- 35-44
- 45+

**Data:** `age_range`

*Used for: copy tone calibration, testimonial matching, course recommendation relevance.*

---

### Screen 6 — Gender

> **What's your gender?**

Options:
- Male
- Female
- Non-binary
- Prefer not to say

**Data:** `gender`

---

### Screen 7 — Life Stage Context

> **What best describes where you are in life right now?**

Options:
- 🎓 Student / early career — figuring things out
- 💼 Building my career — trying to level up
- 👨‍👩‍👧 Balancing family and personal growth
- 🔄 Going through a major life transition
- 🧘 Focused on inner work and self-improvement
- 😤 Honestly, just trying to survive right now

**Data:** `life_stage`

*Psychology: This adds emotional context to everything that follows. Someone "trying to survive" gets different result framing than someone "trying to level up." Also, selecting "trying to survive" is an emotionally vulnerable admission that deepens commitment to the quiz.*

---

### Screen 8 — Previous Attempts

> **Have you tried working on yourself before?**

Options:
- 📚 Read self-help books
- 🎧 Listen to podcasts about personal growth
- 🧘 Tried therapy or coaching
- 📱 Used other self-improvement apps
- 🤷 Not really — this is new for me
- ✅ Multiple of the above

**Data:** `previous_attempts`

*Psychology: Two purposes. (1) If they've tried things before, the implicit message is "those didn't fully work — maybe this will." (2) It tells you their sophistication level for result copy calibration.*

---

### Screen 9 — First Micro-Insight 🔥

**This is NOT a question — it's a value drop.**

> **Here's something most people don't know:**

> The #1 reason self-improvement fails isn't lack of willpower.

> It's that most approaches treat symptoms — anxiety, procrastination, relationship issues — without addressing the **mental patterns** underneath.

> MindSnack is different. Every course is built on clinical psychology and behavioral science to target the root pattern, not just the surface behavior.

CTA: **"That makes sense →"**

*Psychology: This is the first trust-building beat. It validates their past failures ("it wasn't your fault"), positions MindSnack as different, and introduces the "root pattern" framework that the quiz is about to diagnose. The CTA "That makes sense" is a micro-agreement — they're nodding along.*

---

## PHASE 3: DEEP DIAGNOSTIC (Screens 10-25)

**Goal:** Progressively deeper, more personal questions across 4 domains. Micro-insights every 4-5 screens. By the end, the user has revealed things to this app they haven't told most people.

---

### — EMOTIONAL INTELLIGENCE BLOCK —

### Screen 10 — Emotional Baseline

> **On a typical day, how would you describe your inner emotional state?**

> (Not how you appear to others — how you actually feel inside.)

Options:
- 😌 Mostly calm and grounded
- 🎢 Up and down — depends on what happens
- 😰 Low-key anxious most of the time
- 😤 Irritable or on edge
- 😶 Numb — I don't really feel much
- 🌪️ Honestly, kind of all over the place

**Data:** `emotional_baseline`

*The parenthetical "(not how you appear to others)" is critical — it gives permission to be honest and signals that MindSnack understands the difference between performed and felt emotions.*

---

### Screen 11 — Emotional Triggers

> **What's most likely to knock you off balance emotionally?**

Options (select up to 2):
- Being criticized or judged
- Feeling ignored or unappreciated
- Losing control of a situation
- Comparing myself to others
- Uncertainty about the future
- Conflict with someone I care about

**Data:** `emotional_triggers` (array)

*Psychology: Multi-select creates more engagement than single-select and gives richer data. These triggers map directly to specific cognitive distortion patterns.*

---

### Screen 12 — Emotional Processing

> **When you're hit with a strong negative emotion, what do you usually do FIRST?**

> (Be honest — not what you wish you'd do.)

Options:
- Try to rationalize or "think" my way through it
- Push it down and keep going
- Reach for my phone, food, or some distraction
- Vent to someone immediately
- Sit with it — I let myself feel it
- Lash out or snap, then feel guilty

**Data:** `emotional_processing`

*The "(be honest)" nudge again gives permission for vulnerability. "What you do FIRST" is more diagnostic than general behavior — it captures the automatic response, which is the real pattern.*

---

### Screen 13 — Emotional Regulation Result

> **When an emotion takes over, how long does it usually control you?**

Options:
- Minutes — I bounce back quickly
- A few hours — it colors my whole morning/afternoon/evening
- A full day or more
- It depends — sometimes minutes, sometimes days
- I'm honestly not sure — I don't track it that closely

**Data:** `emotional_duration`

---

### Screen 14 — Micro-Insight: Emotional Intelligence 🔥

Based on their answers to Screens 10-13, show a TAILORED insight:

**If anxious/emotional baseline + criticism trigger + push down/distract processing:**
> **Your Pattern: The Emotional Avoider**
>
> You feel things deeply — probably more deeply than people around you realize. But instead of processing emotions, your brain has learned to suppress or redirect them. This works short-term but creates a pressure cooker effect.
>
> Research shows this pattern is strongly linked to sudden emotional outbursts, physical tension, and decision fatigue.
>
> The good news: emotional regulation is one of the most trainable psychological skills. It responds to targeted practice within weeks, not months.

**If irritable baseline + control trigger + rationalize processing:**
> **Your Pattern: The Over-Controller**
>
> Your mind tries to manage emotions by thinking harder. If you can just analyze the situation enough, the feeling should go away, right? Except it doesn't — because emotions don't respond to logic.
>
> This creates a loop: feel something → think harder → still feel it → feel frustrated at yourself for feeling it.
>
> This is actually one of the most common patterns in high-achievers, and it responds incredibly well to specific cognitive reframing techniques.

**If numb baseline + any trigger + push down processing:**
> **Your Pattern: The Shutdown Response**
>
> Numbness isn't the absence of emotion — it's your brain's circuit breaker tripping because the emotional load exceeded capacity at some point. It's a protection mechanism that once served you well.
>
> The challenge is that when you numb the bad, you also numb the good — joy, excitement, connection all get muted too.
>
> This is one of the most misunderstood patterns, and also one of the most responsive to the right approach.

**[Create 3-4 more pattern variants to cover remaining combinations]**

CTA: **"Keep going — there's more to uncover →"**

*Psychology: THIS is the moment the user starts to think "this app is reading my mind." They didn't just get a label — they got a description of their internal experience that they've probably never heard articulated before. Trust level goes through the roof. They will NOT abandon after this.*

---

### — SELF-AWARENESS & THINKING PATTERNS BLOCK —

### Screen 15 — Inner Narrative

> **When you're having a tough moment, what's the unhelpful thought that tends to pop up?**

Options:
- "I need to be perfect or I'm failing"
- "Everyone else has it figured out except me"
- "People will leave if they see the real me"
- "I should be further ahead by now"
- "If I don't stay in control, everything falls apart"
- "I don't deserve the good things in my life"

**Data:** `core_belief_pattern`

*This is the deepest question in the quiz. Every option maps to a clinically recognized cognitive distortion or core schema. The framing "unhelpful thought that pops up" does two things: (1) externalizes the thought — it's something that happens TO them, not who they ARE, which makes it safer to select a vulnerable option, and (2) uses natural CBT language ("unhelpful thought") which subtly primes trust in the methodology before they even realize it.*

---

### Screen 16 — Self-Talk Frequency

> **How often does that voice show up?**

Options:
- Almost constantly — it's my background noise
- Most days, especially when stressed
- A few times a week
- Occasionally — only when things go wrong
- Rarely

**Data:** `self_talk_frequency`

*Pairing this with the previous screen gives you intensity × frequency = severity. Someone with "I'm failing" + "almost constantly" is in a very different place than "I'm failing" + "rarely."*

---

### Screen 17 — Cognitive Bias Probe

> **When something goes wrong in your life, your first instinct is usually to think:**

Options:
- "This is my fault" (self-blame)
- "This always happens to me" (overgeneralization)
- "This is going to ruin everything" (catastrophizing)
- "What did I miss? I should have seen this coming" (hindsight bias)
- "Let me figure out what actually happened" (balanced)
- It depends on the situation

**Data:** `cognitive_bias_primary`

*(Label names in parentheses are NOT shown to user — they're for data mapping.)*

---

### Screen 18 — Blind Spots

> **People who know you well would probably say you...**

> (Pick the one that's most uncomfortably accurate.)

Options:
- Overthink everything
- Are too hard on yourself
- Don't ask for help enough
- Avoid dealing with things until they blow up
- Care too much about what others think
- Don't realize how you come across to others

**Data:** `perceived_blind_spot`

*"Most uncomfortably accurate" is a brilliant framing — it basically asks "what's your biggest flaw?" but in a way that feels insightful rather than harsh. This data is gold for personalization.*

---

### Screen 19 — Micro-Insight: Self-Awareness 🔥

> **Your Thinking Pattern:**

Based on `core_belief_pattern` + `cognitive_bias_primary`:

**If "perfect or failing" + self-blame:**
> You run on a mental operating system psychologists call **"contingent self-worth"** — your sense of being okay is tied to performance. When you succeed, you feel fine. When you don't, your brain doesn't just register failure — it registers threat.
>
> This is one of the most exhausting patterns to live with because there's never a finish line. You achieve something, the goalposts move, and the pressure starts again.
>
> It's also one of the most well-researched patterns in cognitive psychology — which means the techniques to rewire it are battle-tested.

**If "everyone else has it figured out" + catastrophizing:**
> You're running a mental comparison engine that's rigged against you. Your brain compares your internal experience (messy, uncertain, anxious) to everyone else's external presentation (polished, confident, together).
>
> Psychologists call this **the "highlight reel vs. behind-the-scenes" distortion** — and social media has made it 10x worse.
>
> The real issue isn't that you're behind. It's that your brain has a broken metric for measuring progress.

**If "people will leave" + overgeneralization:**
> This pattern has a name in attachment theory: **anxious attachment with rejection sensitivity**. Your brain is constantly scanning for signs that people are pulling away — and it often finds "evidence" even when there is none.
>
> This isn't a character flaw. It's almost always rooted in early relational experiences where love felt conditional or inconsistent.
>
> Understanding this pattern is often the single biggest unlock people experience in their personal growth journey.

**[Create 3-4 more variants for remaining combinations]**

CTA: **"This is eye-opening →"**

*The CTA itself is a micro-agreement that validates the experience.*

---

### — TRUST-BUILDING INTERLUDE —

### Screen 20 — Why That Insight Was So Accurate 🔥

**This is a credibility screen disguised as a continuation of the insight experience.**

The user has just received a deeply personal insight. Instead of breaking the emotional flow with a "how it works" explainer, we validate their experience and embed trust-building inside that validation.

> **The reason that last insight felt so accurate?**

> Every pattern MindSnack analyzes is grounded in peer-reviewed psychology — frameworks like Cognitive Behavioral Therapy, Attachment Theory, and Behavioral Economics that have decades of clinical evidence behind them.

> Our courses are built on the same science. No fluff. No generic advice. Just real psychology, broken into 5-minute reads that feel like your smartest friend explaining it over coffee.

> **This is what evidence-based personal growth actually looks like.**

CTA: **"I'm into it →"**

*Psychology: This screen accomplishes the same trust-building as a "how we work" explainer, but it doesn't feel like an interruption — it feels like a continuation of the insight experience. "The reason that felt so accurate" keeps them in the emotional state while sneaking in methodology credibility. The user doesn't feel like they left the experience; they feel like the experience just got explained. The CTA "I'm into it" is another micro-agreement that builds commitment.*

---

### — RELATIONSHIP & SOCIAL BLOCK —

### Screen 21 — Conflict Style

> **When you're in a disagreement with someone you care about, what happens?**

Options:
- I stay calm and try to find common ground
- I get heated but cool down and repair things
- I shut down — I literally can't access my words
- I get defensive and say things I regret
- I give in to avoid the conflict, then resent them
- I leave — emotionally or physically

**Data:** `conflict_style`

---

### Screen 22 — Attachment Probe

> **In close relationships, which fear runs deepest for you?**

> (Even if you'd never admit it out loud.)

Options:
- Being abandoned or left behind
- Losing my independence or sense of self
- Being truly seen and found lacking
- Being trapped in something that isn't working
- Not being needed or valued
- Being vulnerable and having it used against me

**Data:** `attachment_fear`

*This is attachment theory in disguise. Abandonment = anxious attachment. Independence/trapped = avoidant attachment. Vulnerability = disorganized. The "even if you'd never admit it" gives permission for radical honesty.*

---

### Screen 23 — Social Patterns

> **Think about your closest relationships. Which pattern feels most familiar?**

Options:
- I give more than I receive
- I keep people at arm's length
- I attract people who need "fixing"
- I lose myself in relationships
- I'm there for everyone but nobody's there for me
- My relationships are generally balanced and healthy

**Data:** `relationship_pattern`

---

### Screen 24 — Communication Style

> **When you need something from someone, you usually...**

Options:
- Say it directly — I'm straightforward
- Hint and hope they figure it out
- Don't say anything — I handle it myself
- Wait until I'm frustrated, then it comes out wrong
- Overexplain and apologize for having the need at all

**Data:** `communication_style`

---

### Screen 25 — Micro-Insight: Relationships 🔥

Based on `attachment_fear` + `relationship_pattern` + `conflict_style`:

**If abandonment fear + give more than receive + give in during conflict:**
> **Your Relationship Pattern: The Over-Giver**
>
> You've learned that love is earned through effort. So you give, accommodate, and put others' needs first — not because you're selfless, but because somewhere inside, your brain equates being needed with being safe.
>
> The cost: you build resentment, lose your sense of self in relationships, and attract partners or friends who are happy to take without reciprocating.
>
> This pattern runs on an unconscious belief: *"If I stop giving, they'll stop staying."* The first step to changing it is seeing it — and you just did.

**If independence fear + keep people at arm's length + shut down in conflict:**
> **Your Relationship Pattern: The Self-Protector**
>
> Closeness feels dangerous to your nervous system — not because you don't want connection, but because your brain learned that depending on others leads to disappointment.
>
> So you maintain distance. You value independence above everything. When things get too intimate, you find reasons to pull back. People may call you "emotionally unavailable" — but that's not the full picture.
>
> The full picture: you want closeness. You just don't trust that it's safe. And that belief is more changeable than you think.

**If vulnerability fear + attract fixers + get defensive in conflict:**
> **Your Relationship Pattern: The Armor Wearer**
>
> You've built a protective layer between who you really are and what you show the world. Letting someone past that armor feels like handing them a weapon.
>
> In conflict, this shows up as defensiveness — because criticism doesn't feel like feedback, it feels like an attack on the real you hiding behind the wall.
>
> This pattern almost always traces back to a specific experience where vulnerability was punished. Understanding that origin is the master key to unlocking every relationship struggle that follows.

**[Create 3-4 more variants]**

CTA: **"There's more →"**

---

### — DECISION-MAKING & BEHAVIOR BLOCK —

### Screen 26 — Decision Style

> **When facing a significant decision, what does your process actually look like?**

Options:
- Overthink until I'm paralyzed, then decide under pressure
- Go with my gut — I trust my instincts
- Research obsessively, still feel uncertain
- Ask everyone I know what they'd do
- Avoid it and hope it resolves itself
- Make a decision, then second-guess it for days

**Data:** `decision_style`

---

### Screen 27 — Procrastination Probe

> **Be honest: what's your relationship with procrastination?**

Options:
- I procrastinate on almost everything important
- I procrastinate selectively — only on things that scare me
- I don't procrastinate much — I'm pretty disciplined
- I stay busy with small things to avoid the big thing
- I work well under pressure, so I wait until the last minute on purpose
- I start strong then lose momentum every time

**Data:** `procrastination_pattern`

---

### Screen 28 — Self-Sabotage

> **Have you ever been close to getting something you wanted and then somehow messed it up?**

Options:
- Yes — it's happened multiple times and I don't understand why
- Yes — but I know exactly why (I was scared)
- Sometimes — I'll pull back right when things are going well
- Not really — once I'm on track, I stay on track
- I'm not sure — I haven't thought about it that way before

**Data:** `self_sabotage_pattern`

*This question hits HARD. Most people have never been asked this directly. The "multiple times and I don't understand why" option will get selected a lot — and it primes them perfectly for the insight that follows.*

---

### Screen 29 — Stress Response

> **Under sustained stress (weeks, not hours), which version of yourself shows up?**

Options:
- The worrier — I catastrophize and can't sleep
- The robot — I shut off emotions and just execute
- The controller — I micromanage everything around me
- The escape artist — I check out (scroll, drink, binge, avoid)
- The people-pleaser — I focus on everyone else's problems instead of mine
- The self-destroyer — I make choices I know are bad for me

**Data:** `stress_persona`

*"Which version of yourself" is a powerful reframe. It implies this is a MODE, not who they ARE — which makes it safer to select something unflattering.*

---

### Screen 30 — Micro-Insight: Behavior & Decisions 🔥

Based on `decision_style` + `procrastination_pattern` + `self_sabotage_pattern`:

**If overthink + procrastinate on scary things + self-sabotage multiple times:**
> **Your Behavior Pattern: Fear of Success (disguised as fear of failure)**
>
> Here's the counterintuitive truth: you're not afraid of failing. You're afraid of what happens if you succeed — because success raises the stakes.
>
> Your brain's logic: "If I never fully try, I can never fully fail. If I get close to winning and pull back, at least the failure was on my terms."
>
> Psychologists call this **self-handicapping**. It's not laziness or lack of discipline — it's a sophisticated protection strategy your unconscious mind is running without your permission.
>
> This is one of the most life-changing patterns to become aware of.

**If gut decisions + lose momentum + scared self-sabotage:**
> **Your Behavior Pattern: The Impulse-Crash Cycle**
>
> You don't lack motivation — you lack sustained motivation. You start with explosive energy (gut decisions, bold moves), but when the initial excitement fades, you interpret the natural dip as evidence it's "not right."
>
> This is often connected to a dopamine-seeking pattern where your brain is optimized for novelty and beginning, not for consistency and middle.
>
> Understanding this cycle is the first step to breaking it — because you can build systems that work WITH your brain's wiring instead of against it.

**If research obsessively + procrastinate on everything + not sure about self-sabotage:**
> **Your Behavior Pattern: The Analysis Trap**
>
> Your brain uses information-gathering as a substitute for action. It feels productive — and it IS thinking — but it's not the same as doing. Every additional piece of research creates two more questions, and the decision gets harder, not easier.
>
> This often runs on an unconscious belief: *"If I just know enough, I can guarantee the outcome."* But you can't. And chasing certainty in an uncertain world is the fastest path to paralysis.
>
> The fix isn't "just do it" — it's rewiring your relationship with uncertainty itself.

**[Create 3-4 more variants]**

CTA: **"Almost there — let's see the full picture →"**

---

### — GOAL & COMMITMENT BLOCK —

### Screen 31 — What They Want Most

> **If MindSnack could help you change ONE thing about yourself, what would matter most?**

Options:
- Stop being so hard on myself
- Actually manage my emotions instead of being managed by them
- Build deeper, healthier relationships
- Make decisions with confidence
- Break the patterns that keep holding me back
- Genuinely understand who I am and why I do what I do

**Data:** `desired_outcome`

*This is a BUYING INTENT question disguised as a goals question. They're literally telling you what to sell them on the paywall screen. Whatever they pick here should be echoed in the paywall copy.*

---

### Screen 32 — Time Commitment

> **How much time could you realistically dedicate to personal growth each day?**

Options:
- ⏱️ 5 minutes — I'm busy but I'll make it count
- ⏱️ 10-15 minutes — I can do that
- ⏱️ 20-30 minutes — I want to go deep
- ⏱️ I'm not sure yet — I want to see what works

**Data:** `time_commitment`

*Psychology: This is a "future pacing" question. They're now imagining using the app daily. They're mentally planning when they'd do it. This shifts the frame from "should I subscribe?" to "when will I do my daily lesson?"*

---

### Screen 33 — Commitment Declaration

> **How committed are you to actually changing these patterns?**

Options:
- 🔥 I'm all in — I've been waiting for the right tool
- 💪 Very committed — I just need guidance
- 🤔 Curious — I want to see what this can do
- 😬 I want to change but I keep putting things off

**Data:** `commitment_level`

*Every option works. "All in" = sell them hard. "Keep putting things off" = your paywall copy literally becomes "this is where you usually stop — let's change that." Even "curious" keeps them moving forward.*

---

## PHASE 4: THE REVEAL (Screens 34-37)

### Screen 34 — Analysis Animation

Full screen. Dark background. Animated sequence:

> Analyzing your psychological profile...

Sequence (each line appears with a 1-second pause, checkmark animation):

> ✓ Emotional patterns mapped
> ✓ Core beliefs identified
> ✓ Relationship dynamics analyzed
> ✓ Decision-making style assessed
> ✓ Behavioral patterns detected
> ✓ Growth areas prioritized

Then:
> **Preparing your results...**

5-6 seconds total. Auto-advances.

*Psychology: The fake loading screen is one of the highest-converting elements in app onboarding. It makes the results feel computed and scientific, not canned. Cal AI, Flo, Noom — everyone does this because it works.*

---

### Screen 35 — THE SKILL PROFILE (Primary Results Screen) 🔥🔥🔥

**This is the single most important screen in the entire onboarding.**

Headline:
> **Your MindSnack Profile**

Show a visual **radar chart / spider graph** with 5 skill areas scored out of 10:

#### 1. Emotional Intelligence (scored 1-10)

**Inputs:** `emotional_baseline` + `emotional_triggers` + `emotional_processing` + `emotional_duration`

| Score Range | Criteria |
|-------------|----------|
| 8-10 | Calm baseline + sits with feelings + bounces back in minutes + low-reactivity triggers |
| 5-7 | Mixed baseline + some healthy processing + hours recovery + common triggers |
| 2-4 | Anxious/chaotic/numb baseline + suppress/distract/lash out + days recovery + high-reactivity triggers |

#### 2. Self-Awareness (scored 1-10)

**Inputs:** `core_belief_pattern` + `self_talk_frequency` + `cognitive_bias_primary` + `perceived_blind_spot`

| Score Range | Criteria |
|-------------|----------|
| 8-10 | Identifies specific belief + rare frequency + balanced thinking + recognizes blind spot with nuance |
| 5-7 | Identifies belief + moderate frequency + some bias + knows blind spot |
| 2-4 | Vague on belief OR "not sure" + constant frequency + strong cognitive bias + unaware of blind spot |

**Special rule:** If someone selects a very specific core belief AND says it's "almost constant," they actually get a HIGHER self-awareness score (they're painfully aware, which IS awareness) but their emotional intelligence score drops (awareness without management = suffering).

#### 3. Relationship Skills (scored 1-10)

**Inputs:** `conflict_style` + `attachment_fear` + `relationship_pattern` + `communication_style`

| Score Range | Criteria |
|-------------|----------|
| 8-10 | Calm + find common ground + healthy fear awareness + balanced relationships + direct communication |
| 5-7 | Cool down after heat + some attachment fear + minor imbalance + mostly direct |
| 2-4 | Shut down/defensive/give in + deep attachment fear + strong imbalance (over-give/distance) + indirect/explosive communication |

#### 4. Decision-Making (scored 1-10)

**Inputs:** `decision_style` + `procrastination_pattern` + `self_sabotage_pattern`

| Score Range | Criteria |
|-------------|----------|
| 8-10 | Balanced process + disciplined + stays on track |
| 5-7 | Some overthinking + selective procrastination + occasional self-sabotage |
| 2-4 | Paralysis/avoidance + chronic procrastination + repeated self-sabotage |

#### 5. Stress Resilience (scored 1-10)

**Inputs:** `stress_persona` + `coping_mechanism` (from emotional_processing) + `emotional_duration`

| Score Range | Criteria |
|-------------|----------|
| 8-10 | Healthy stress response + active processing + quick recovery |
| 5-7 | Mixed stress response + some healthy coping + moderate recovery |
| 2-4 | Destructive stress persona (escape artist/self-destroyer/worrier) + suppression/numbing + extended recovery |

---

#### SCORE BALANCING RULES (Critical)

1. **No score above 9.** Everyone has room to grow.
2. **At least 2 scores must be ≤ 5.** If natural scoring produces all 6+, reduce the two lowest by 2 points each.
3. **Highest score must be 3+ points above lowest.** Creates dramatic visual contrast in the radar chart.
4. **No score below 2.** We're motivating, not demoralizing.
5. **If someone scores 7+ across the board naturally**, switch to "optimization" framing — "sharpen your edge" vs "address your weakness."

---

#### What's shown on screen:

The radar chart dominates the top half.

Below it:

> **Your #1 strength:** [highest scoring area] — [one-line positive framing]
> **Your biggest growth opportunity:** [lowest scoring area] — [one-line motivational framing]

Example:
> **Your #1 strength:** Self-Awareness (8/10) — You see yourself more clearly than most people.
> **Your biggest growth opportunity:** Emotional Intelligence (4/10) — You understand your patterns, but haven't learned to manage them yet.

CTA: **"See what this means →"**

---

### Screen 36 — The Narrative Interpretation 🔥

This screen translates their scores into a STORY about them. It's the "therapy moment."

Headline:
> **Here's what your profile tells us:**

Then a 3-4 sentence dynamically generated paragraph. Example for someone with high self-awareness but low emotional intelligence and low relationship skills:

> You're someone who sees yourself with unusual clarity — you know your patterns, your triggers, and probably even your blind spots. But **knowing** and **managing** are two different skills, and right now the gap between them is where your pain lives. You understand why you react the way you do in relationships, but you haven't yet built the tools to change the reaction in real-time. That's not a character flaw — it's a missing skill set. And skills can be built.

Another example for low self-awareness but high decision-making:

> You're more capable than you give yourself credit for — your decision-making instincts are strong, and you have a practical mind. But there's a layer underneath your daily actions that you haven't explored yet — patterns of thought and belief that are influencing you in ways you can't see. The good news: you're exactly the kind of person who makes rapid progress once you turn that analytical mind inward.

**Key writing principles for this paragraph:**
- Lead with a strength (so they don't feel attacked)
- Name the gap between where they are and where they could be
- Reframe the weakness as a "missing skill" not a "broken person"
- End with hope / forward momentum

CTA: **"Show me my plan →"**

*Psychology: This is the emotional PEAK of the entire onboarding. Reading an accurate paragraph about yourself is profoundly moving. This is what makes them think "I need this app." Every word matters here.*

---

### Screen 37 — The Personalized Plan

Headline:
> **Your 30-Day MindSnack Plan**

Based on their lowest 2 scores + `desired_outcome` + `time_commitment`:

> **Built for your profile. Backed by psychology. Designed to fit your schedule.**

**Phase 1 (Week 1-2): [Course name targeting #1 weakness]**
> *One-line description of what they'll learn and why it matters for their specific pattern.*
> [X] lessons · [estimated time per day based on time_commitment]

**Phase 2 (Week 3-4): [Course name targeting #2 weakness]**
> *One-line description.*
> [X] lessons · [estimated time]

**Then: [Course aligned with desired_outcome]**
> *One-line description.*

Below:
> **Your plan includes:**
> ✓ Personalized course sequence based on your profile
> ✓ Psychology-backed lessons written to stick
> ✓ Actionable exercises for real-world change
> ✓ New courses added monthly

CTA: **"Start my plan →"**

*Psychology: The plan makes the abstract concrete and personal. It's not "subscribe to an app" — it's "follow YOUR plan that was built for YOUR psychology." Much easier to say yes to.*

---

## PHASE 5: SOCIAL PROOF & PERMISSIONS (Screens 38-40)

These screens go BETWEEN the plan reveal and the paywall. They serve as final trust-building and capture high-value permissions while the user is at peak engagement.

---

### Screen 38 — Notification Permission (Framed as a Growth Tool)

> **Want a daily nudge to stay on track?**

> People who enable reminders are **3x more likely** to complete their plan and see lasting change.

> We'll send you one short reminder each day — that's it. No spam, ever.

Two buttons:
> **[Enable daily reminders]** (primary CTA — triggers iOS notification permission)
> [Maybe later] (greyed out text)

*Psychology: This isn't "allow notifications" — it's "do you want to be the kind of person who follows through?" Framing it as a commitment device tied to their goal makes opt-in rates 2-3x higher than a generic permission prompt. The "3x more likely" stat creates FOMO for their own growth.*

---

### Screen 39 — Rating Prompt (The "Help Others" Frame)

> **One quick thing before we continue —**

> If this assessment taught you something new about yourself, would you mind leaving a quick rating? It helps others find MindSnack when they need it.

> ⭐⭐⭐⭐⭐

Two buttons:
> **[Rate MindSnack]** (triggers App Store rating dialog)
> [Not now] (small text)

*Psychology: You're asking for the rating at the exact moment they feel most positively about the app — right after the personalized insight and plan reveal, before the paywall adds any friction. The "help others find it" frame triggers altruism rather than feeling like a favor to the company. This is the Headway / Blinkist strategy and it works incredibly well for generating early reviews.*

---

### Screen 40 — Final Social Proof Before Paywall

> **Join 100,000+ people already building sharper minds**

Show 3 short testimonials matched to user's profile where possible:

**Dynamic matching logic:**
- If user's lowest score is Emotional Intelligence → show EI-related testimonial
- If user's lowest score is Relationships → show relationship testimonial
- Match age/gender from quiz data when possible

Example testimonials:

> *"I used to lose my temper with my kids every evening. After the emotional regulation course, I caught myself before reacting for the first time in my life."*
> — David, 36

> *"I've read 30 self-help books. This app taught me more about my own patterns in a week than all of them combined."*
> — Amara, 28

> *"The attachment style course literally saved my relationship. I finally understood why I kept pushing people away."*
> — Ryan, 41

Auto-advances after 4 seconds or tap to continue.

---

## PHASE 6: THE PAYWALL (Screens 41-42)

### Screen 41 — The Paywall 🔥🔥🔥

**Visual Design:**
- Dark, premium background
- Faint radar chart from their profile visible in the background (subliminal reminder of the gap)
- Clean, focused layout

---

**Headline (dynamic based on `commitment_level`):**

| Commitment Level | Headline |
|------------------|----------|
| "All in" | **Your plan is ready. Let's build a sharper mind.** |
| "Very committed" | **You've seen the patterns. Now let's change them.** |
| "Curious" | **Try it free. See what changes.** |
| "Keep putting things off" | **This is the part where you usually stop. Not this time.** |

---

**Sub-headline (dynamic based on `desired_outcome`):**

| Desired Outcome | Sub-headline |
|-----------------|-------------|
| Stop being hard on myself | *Your inner critic has been running the show long enough.* |
| Manage emotions | *You feel deeply. It's time to learn what to do with that.* |
| Better relationships | *Every relationship you'll ever have starts with the one you have with yourself.* |
| Confident decisions | *Clarity isn't a personality trait. It's a skill — and it's learnable.* |
| Break patterns | *You've already named the pattern. That's the hardest step. The next ones are easier.* |
| Understand myself | *You just learned more about yourself in 5 minutes than most people learn in years. Imagine what 30 days could do.* |

---

**Pricing Block:**

Annual plan — highlighted, pre-selected:

> **Annual Plan**
> ~~$119.99~~ **$59.99/year**
> Just **$4.99/mo** — billed annually
> **SAVE 83%**
> 🏆 Most Popular
>
> **✓ 7-day free trial — pay nothing today**

Weekly plan (anchor price — exists to make annual look like a steal):

> **Weekly Plan**
> $6.99/week
> $363.48/year

---

**What's included:**

> ✓ Full access to your personalized growth plan
> ✓ All courses and lessons — current and future
> ✓ Psychology-backed exercises and tools
> ✓ New courses added monthly
> ✓ Your skill profile tracked over time

---

**CTA Button (large, full-width):**

> **Start My Free Trial — $0 Today**

Below in smaller text:
> 7-day free trial. Then $59.99/year. Cancel anytime in Settings.

Below that, very small:
> [Restore purchase] · [Terms] · [Privacy]

---

**Paywall Mechanics:**

1. **No X button for 3.5 seconds.** Let them absorb the screen. After 3.5s, small X appears top-left.

2. **Annual plan is pre-selected** and visually highlighted. Weekly is greyed out slightly.

3. **"$0 Today"** in the CTA is critical — it reframes the action as risk-free.

4. **The crossed-out $119.99** creates anchoring. Even if you never planned to charge $119.99, the perceived savings drive conversion.

---

### Screen 42 — Dismiss Recovery (If They Tap X)

**Don't just let them leave. Give them one more shot.**

> **Wait — your profile and plan took time to build.**

> If you leave now, your personalized results will expire.

> We get it — committing to yourself is hard. That's literally one of the patterns MindSnack helps you break.

> **Try it for free. 7 days. $0. What do you have to lose?**

Two buttons:
> **[Start free trial →]** (primary, prominent)
> [Continue without a plan] (small, greyed out text)

*Psychology: "Your results will expire" creates loss aversion. But the real power move is the middle paragraph — "committing to yourself is hard, that's literally one of the patterns MindSnack helps you break." You're using their own quiz data against their objection. If they said they self-sabotage or procrastinate, this line hits like a truck.*

---

## POST-PAYWALL EXPERIENCE

### If they subscribe:

→ Skip to account creation (Apple sign-in / email)
→ Drop them directly into Lesson 1 of their recommended course
→ Show a small celebration: "Day 1 starts now. Let's go."

### If they decline:

→ Create account (still useful for re-engagement)
→ Let them browse course catalog with blurred/locked content
→ They can read the FIRST LESSON of their #1 recommended course for free (this is your conversion hook for later)
→ Push notification sequence begins:
  - Day 1: "Your growth plan is waiting. Pick up where you left off."
  - Day 3: "[Their #1 weakness area] doesn't improve on its own. Start your free trial."
  - Day 7: "Remember your MindSnack profile? Here's one thing you can do today about your [lowest score area]." (link to free content teaser)

---

## COURSE MAPPING LOGIC

### Primary Recommendation (based on lowest score):

| Lowest Score | Recommended First Course |
|-------------|--------------------------|
| Emotional Intelligence | "Emotional Mastery: The Science of Feeling" |
| Self-Awareness | "Know Thyself: The Psychology of Self-Deception" |
| Relationship Skills | "The Connection Blueprint: Psychology of Relationships" |
| Decision-Making | "Clear Thinking: Beat Your Brain's Worst Instincts" |
| Stress Resilience | "Unbreakable: The Science of Mental Toughness" |

### Secondary Recommendation: Second lowest score → corresponding course.

### Tertiary Recommendation: Based on `desired_outcome` if different from above; otherwise third lowest score.

---

## KEY METRICS TO TRACK

| Metric | Target | Screen |
|--------|--------|--------|
| Quiz start rate (Screen 1 → 4) | 80%+ | Hook screens |
| Phase 2 completion (Screen 4 → 14) | 75%+ | Identity + early diagnostic |
| Phase 3 completion (Screen 14 → 30) | 70%+ | Deep diagnostic |
| Full quiz completion (→ Screen 35) | 65%+ | Results |
| Paywall view rate | 60%+ of all installers | Screen 41 |
| Notification opt-in rate | 55%+ | Screen 38 |
| Rating prompt engagement | 40%+ tap "Rate" | Screen 39 |
| Trial start rate | 35-50% of paywall views | Screen 41 |
| Dismiss recovery conversion | 15-25% | Screen 42 |
| Trial → Paid | 60-70% | Post-trial |

---

## A/B TEST PRIORITIES (In Order)

### Test First (Highest Revenue Impact):
1. **Paywall headline copy** — dynamic vs static
2. **Free trial length** — 3-day vs 7-day (shorter trials often convert better to paid)
3. **Pricing** — $49.99 vs $59.99 vs $69.99 annual
4. **Dismiss recovery screen** copy variants

### Test Second:
5. **Number of quiz screens** — current 30 vs shorter 20-screen version
6. **Micro-insight frequency** — every 4 questions vs every 6
7. **Notification permission placement** — before paywall vs after paywall
8. **Rating prompt** — before paywall vs after subscription

### Test Later:
9. Analysis animation length
10. Social proof screen — with testimonials vs without
11. Radar chart style — spider graph vs bar chart vs circular progress
12. Plan detail level — detailed weekly plan vs simple course list

---

## TECHNICAL IMPLEMENTATION NOTES

1. **Progress bar** fills non-linearly: fast through Phase 1-2, slows in Phase 3, speeds up in Phase 4. This creates a "almost done!" feeling right when the questions get deepest.

2. **No account creation until after paywall.** The entire quiz runs locally. This eliminates the #1 friction point (sign-up) from the critical path.

3. **Deep linking:** If a user abandons at the paywall, push notifications should deep-link to Screen 35 (their profile), NOT Screen 1. Never make them retake the quiz.

4. **Quiz data persistence:** Store all responses in local storage. If they close and reopen the app within 7 days, resume where they left off. After 7 days, restart (their "profile has expired" — urgency).

5. **Haptic feedback:** Light haptic on every option tap. Medium haptic on insight screens when the insight text appears. Heavy haptic on the profile reveal (Screen 35).

6. **Animation:** Insight screens should have text that fades in paragraph by paragraph (0.5s delay between paragraphs). This creates a "being read to" feeling and prevents skimming.

7. **Analytics events:** Fire events on every screen transition, every option selected, every CTA tap, time spent per screen, and scroll depth on insight screens. The per-screen time data is gold for understanding which screens create engagement vs confusion.

8. **Offline capability:** The entire onboarding should work offline after initial app download. Quiz logic and all copy variants should be bundled in the app binary, not fetched from a server. Speed = conversion.

import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Polygon, Line, Circle, Text as SvgText } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedProps, withTiming, withDelay } from 'react-native-reanimated';
import { colors, typography } from '../theme';
import { ScoreProfile } from '../data/types';

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);

interface Props {
  profile: ScoreProfile;
  size?: number;
}

const labels = ['EQ', 'Self', 'Relate', 'Decide', 'Stress'];
const fullLabels = ['Emotional\nIntelligence', 'Self-\nAwareness', 'Relationship\nSkills', 'Decision-\nMaking', 'Stress\nResilience'];
const chartColors = [
  colors.chart.emotional,
  colors.chart.selfAwareness,
  colors.chart.relationship,
  colors.chart.decision,
  colors.chart.stress,
];

function getPoint(index: number, value: number, center: number, radius: number) {
  const angle = (Math.PI * 2 * index) / 5 - Math.PI / 2;
  const r = (value / 10) * radius;
  return {
    x: center + r * Math.cos(angle),
    y: center + r * Math.sin(angle),
  };
}

export function RadarChart({ profile, size = 260 }: Props) {
  const center = size / 2;
  const radius = size / 2 - 40;
  const values = [
    profile.emotionalIntelligence,
    profile.selfAwareness,
    profile.relationshipSkills,
    profile.decisionMaking,
    profile.stressResilience,
  ];

  // Calculate points for the data polygon
  const dataPoints = values
    .map((v, i) => {
      const p = getPoint(i, v, center, radius);
      return `${p.x},${p.y}`;
    })
    .join(' ');

  // Grid levels
  const gridLevels = [2, 4, 6, 8, 10];

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        {/* Grid */}
        {gridLevels.map(level => {
          const points = Array.from({ length: 5 }, (_, i) => {
            const p = getPoint(i, level, center, radius);
            return `${p.x},${p.y}`;
          }).join(' ');
          return (
            <Polygon
              key={`grid-${level}`}
              points={points}
              fill="none"
              stroke="rgba(255, 255, 255, 0.06)"
              strokeWidth={1}
            />
          );
        })}

        {/* Axis lines */}
        {Array.from({ length: 5 }, (_, i) => {
          const p = getPoint(i, 10, center, radius);
          return (
            <Line
              key={`axis-${i}`}
              x1={center}
              y1={center}
              x2={p.x}
              y2={p.y}
              stroke="rgba(255, 255, 255, 0.04)"
              strokeWidth={1}
            />
          );
        })}

        {/* Data polygon */}
        <Polygon
          points={dataPoints}
          fill="rgba(139, 92, 246, 0.15)"
          stroke={colors.accent.purple}
          strokeWidth={2}
        />

        {/* Data points */}
        {values.map((v, i) => {
          const p = getPoint(i, v, center, radius);
          return (
            <Circle
              key={`point-${i}`}
              cx={p.x}
              cy={p.y}
              r={4}
              fill={chartColors[i]}
              stroke={colors.bg.primary}
              strokeWidth={2}
            />
          );
        })}

        {/* Labels */}
        {fullLabels.map((label, i) => {
          const p = getPoint(i, 11.5, center, radius);
          return (
            <SvgText
              key={`label-${i}`}
              x={p.x}
              y={p.y}
              fontSize={9}
              fontWeight="500"
              fill={colors.text.tertiary}
              textAnchor="middle"
              alignmentBaseline="central"
            >
              {labels[i]}
            </SvgText>
          );
        })}

        {/* Score values */}
        {values.map((v, i) => {
          const p = getPoint(i, v, center, radius);
          const offset = v > 5 ? -14 : 14;
          return (
            <SvgText
              key={`score-${i}`}
              x={p.x}
              y={p.y + offset}
              fontSize={11}
              fontWeight="700"
              fill={chartColors[i]}
              textAnchor="middle"
            >
              {v}
            </SvgText>
          );
        })}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

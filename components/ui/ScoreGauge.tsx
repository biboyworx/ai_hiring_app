/**
 * ScoreGauge — Circular score visualization with animated fill.
 * Used on the score summary and dashboard screens.
 */
import { Colors } from "@/constants/theme";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface ScoreGaugeProps {
  score: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  label?: string;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function ScoreGauge({
  score,
  size = 140,
  strokeWidth = 10,
  label = "Overall Score",
}: ScoreGaugeProps) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: score,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  }, [score]);

  // Determine color based on score
  const getColor = (s: number) => {
    if (s >= 80) return Colors.success;
    if (s >= 60) return Colors.warning;
    return Colors.danger;
  };

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <View style={{ width: size, height: size }}>
        <Svg width={size} height={size}>
          {/* Background circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={Colors.border}
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Animated progress circle */}
          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={getColor(score)}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </Svg>
        {/* Score text in center */}
        <View style={[StyleSheet.absoluteFill, styles.center]}>
          <Text style={[styles.score, { color: getColor(score) }]}>
            {score}
          </Text>
          <Text style={styles.maxScore}>/100</Text>
        </View>
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 8,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  score: {
    fontSize: 36,
    fontWeight: "700",
  },
  maxScore: {
    fontSize: 14,
    color: Colors.muted,
    fontWeight: "500",
    marginTop: -4,
  },
  label: {
    fontSize: 14,
    color: Colors.text.secondary,
    fontWeight: "500",
  },
});

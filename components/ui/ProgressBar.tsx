/**
 * ProgressBar — Animated horizontal progress indicator.
 * Used for resume upload, onboarding, and skill confidence levels.
 */
import { Colors } from "@/constants/theme";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

interface ProgressBarProps {
  progress: number; // 0 to 100
  color?: string;
  height?: number;
  showLabel?: boolean;
  animated?: boolean;
}

export default function ProgressBar({
  progress,
  color = Colors.primary,
  height = 6,
  showLabel = false,
  animated = true,
}: ProgressBarProps) {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animated) {
      Animated.timing(animatedWidth, {
        toValue: progress,
        duration: 800,
        useNativeDriver: false,
      }).start();
    } else {
      animatedWidth.setValue(progress);
    }
  }, [progress]);

  const width = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <View style={[styles.track, { height }]}>
        <Animated.View
          style={[
            styles.fill,
            {
              width,
              backgroundColor: color,
              height,
              borderRadius: height / 2,
            },
          ]}
        />
      </View>
      {showLabel && <Text style={styles.label}>{Math.round(progress)}%</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  track: {
    flex: 1,
    backgroundColor: Colors.border,
    borderRadius: 3,
    overflow: "hidden",
  },
  fill: {
    borderRadius: 3,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.text.secondary,
    minWidth: 32,
    textAlign: "right",
  },
});

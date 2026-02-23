/**
 * Interview Processing Screen — Post-interview analysis animation.
 * Shows AI analyzing responses with animated loading states.
 */
import ProgressBar from "@/components/ui/ProgressBar";
import { Colors } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ANALYSIS_STEPS = [
  { label: "Analyzing voice responses...", icon: "microphone" },
  { label: "Evaluating communication quality...", icon: "comments" },
  { label: "Matching skills to profile...", icon: "code" },
  { label: "Calculating behavioral indicators...", icon: "users" },
  { label: "Generating score report...", icon: "bar-chart" },
];

export default function InterviewProcessingScreen() {
  const { jobId } = useLocalSearchParams<{ jobId: string }>();
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const spinAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0.8)).current;

  // Spinning animation
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  // Pulse animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.9,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  // Simulate progress
  useEffect(() => {
    const stepTimer = setInterval(() => {
      setStep((prev) => {
        if (prev >= ANALYSIS_STEPS.length - 1) {
          clearInterval(stepTimer);
          setTimeout(
            () =>
              router.replace(
                jobId
                  ? `/interview-completed?jobId=${jobId}`
                  : "/interview-completed",
              ),
            800,
          );
          return prev;
        }
        return prev + 1;
      });
    }, 1500);

    const progressTimer = setInterval(() => {
      setProgress((prev) => Math.min(prev + 2, 100));
    }, 140);

    return () => {
      clearInterval(stepTimer);
      clearInterval(progressTimer);
    };
  }, []);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Animated icon */}
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <View style={styles.iconCircle}>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <FontAwesome name="cog" size={40} color={Colors.secondary} />
            </Animated.View>
          </View>
        </Animated.View>

        <Text style={styles.title}>Processing Your Interview</Text>
        <Text style={styles.subtitle}>
          Our AI is analyzing your responses to generate your score report.
        </Text>

        {/* Progress */}
        <View style={styles.progressSection}>
          <ProgressBar progress={progress} color={Colors.secondary} showLabel />
        </View>

        {/* Steps */}
        <View style={styles.steps}>
          {ANALYSIS_STEPS.map((s, i) => (
            <View
              key={i}
              style={[styles.stepRow, i > step && styles.stepInactive]}
            >
              <FontAwesome
                name={
                  i < step
                    ? "check-circle"
                    : i === step
                      ? (s.icon as any)
                      : "circle-o"
                }
                size={18}
                color={
                  i < step
                    ? Colors.success
                    : i === step
                      ? Colors.secondary
                      : Colors.border
                }
              />
              <Text
                style={[styles.stepLabel, i <= step && styles.stepLabelActive]}
              >
                {s.label}
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.note}>This usually takes about 30 seconds...</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: `${Colors.secondary}12`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 28,
    paddingHorizontal: 20,
  },
  progressSection: { width: "100%", marginBottom: 28 },
  steps: { width: "100%", gap: 16 },
  stepRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  stepInactive: { opacity: 0.35 },
  stepLabel: { fontSize: 14, color: Colors.text.secondary },
  stepLabelActive: { color: Colors.text.primary, fontWeight: "500" },
  note: { fontSize: 12, color: Colors.muted, marginTop: 32 },
});

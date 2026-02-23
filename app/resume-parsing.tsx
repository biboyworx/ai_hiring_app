/**
 * Resume Parsing Screen — AI analysis animation while parsing resume.
 * When jobId is provided, also matches resume against job requirements.
 * Navigates to application-match (job flow) or resume-preview (standalone).
 */
import ProgressBar from "@/components/ui/ProgressBar";
import { Colors } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BASE_STEPS = [
  "Extracting text content...",
  "Identifying skills & keywords...",
  "Analyzing work experience...",
  "Evaluating education...",
  "Generating profile summary...",
];

const JOB_MATCH_STEPS = [
  "Comparing skills to job requirements...",
  "Evaluating experience relevance...",
  "Calculating match score...",
  "Finalizing results...",
];

export default function ResumeParsingScreen() {
  const { jobId } = useLocalSearchParams<{ jobId: string }>();
  const isJobFlow = !!jobId;

  const PARSING_STEPS = useMemo(
    () =>
      isJobFlow
        ? [...BASE_STEPS, ...JOB_MATCH_STEPS]
        : [...BASE_STEPS, "Finalizing results..."],
    [isJobFlow],
  );

  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Pulsing animation for the AI icon
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  // Rotation animation for the gear icon
  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  // Simulate parsing progress
  useEffect(() => {
    const totalSteps = PARSING_STEPS.length;
    const stepDuration = 1200;

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= totalSteps - 1) {
          clearInterval(stepInterval);
          // Navigate based on flow
          setTimeout(() => {
            if (isJobFlow) {
              router.replace(`/application-match?jobId=${jobId}`);
            } else {
              router.replace("/resume-preview");
            }
          }, 500);
          return prev;
        }
        return prev + 1;
      });
    }, stepDuration);

    const totalDuration = totalSteps * stepDuration;
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 100 / (totalDuration / 120);
      });
    }, 120);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [PARSING_STEPS.length, isJobFlow, jobId]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Animated AI icon */}
        <Animated.View
          style={[styles.iconContainer, { transform: [{ scale: pulseAnim }] }]}
        >
          <View style={styles.iconCircle}>
            <FontAwesome name="magic" size={36} color={Colors.secondary} />
          </View>
          <Animated.View
            style={[styles.gearOverlay, { transform: [{ rotate: spin }] }]}
          >
            <FontAwesome name="cog" size={20} color={Colors.primary} />
          </Animated.View>
        </Animated.View>

        <Text style={styles.title}>
          {isJobFlow ? "Analyzing & Matching" : "Analyzing Your Resume"}
        </Text>
        <Text style={styles.subtitle}>
          {isJobFlow
            ? "Our AI is parsing your resume and matching it against the job requirements."
            : "Our AI is parsing and extracting key information from your resume."}
        </Text>

        {/* Progress bar */}
        <View style={styles.progressSection}>
          <ProgressBar progress={progress} color={Colors.secondary} showLabel />
        </View>

        {/* Current step */}
        <View style={styles.stepContainer}>
          {PARSING_STEPS.map((step, index) => (
            <View
              key={index}
              style={[
                styles.stepRow,
                index <= currentStep && styles.stepActive,
              ]}
            >
              <FontAwesome
                name={
                  index < currentStep
                    ? "check-circle"
                    : index === currentStep
                      ? "spinner"
                      : "circle-o"
                }
                size={16}
                color={
                  index < currentStep
                    ? Colors.success
                    : index === currentStep
                      ? Colors.secondary
                      : Colors.border
                }
              />
              <Text
                style={[
                  styles.stepText,
                  index <= currentStep ? styles.stepTextActive : null,
                ]}
              >
                {step}
              </Text>
            </View>
          ))}
        </View>
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
  iconContainer: { marginBottom: 28, position: "relative" },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: `${Colors.secondary}12`,
    alignItems: "center",
    justifyContent: "center",
  },
  gearOverlay: { position: "absolute", top: -4, right: -4 },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 28,
    paddingHorizontal: 16,
  },
  progressSection: { width: "100%", marginBottom: 28 },
  stepContainer: { width: "100%", gap: 14 },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    opacity: 0.4,
  },
  stepActive: { opacity: 1 },
  stepText: { fontSize: 14, color: Colors.text.secondary },
  stepTextActive: { color: Colors.text.primary, fontWeight: "500" },
});

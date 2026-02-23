/**
 * Interview Instructions Screen — Pre-interview preparation guide.
 * Shows tips, requirements, and mic permission check before starting.
 */
import Avatar from "@/components/ui/Avatar";
import Header from "@/components/ui/Header";
import ThemedButton from "@/components/ui/ThemedButton";
import { DUMMY_JOBS } from "@/constants/dummyData";
import { Colors } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InterviewInstructionsScreen() {
  const { jobId } = useLocalSearchParams<{ jobId: string }>();
  const job = jobId ? DUMMY_JOBS.find((j) => j.id === jobId) : null;
  const [micGranted, setMicGranted] = useState(false);

  // Simulate requesting microphone permission
  const requestMicPermission = () => {
    Alert.alert(
      "Microphone Access",
      "NexHire needs access to your microphone for the AI interview.",
      [
        { text: "Deny", style: "cancel" },
        { text: "Allow", onPress: () => setMicGranted(true) },
      ],
    );
  };

  const handleStart = () => {
    if (!micGranted) {
      requestMicPermission();
      return;
    }
    router.push(jobId ? `/interview-live?jobId=${jobId}` : "/interview-live");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Interview Prep" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Job context banner */}
        {job && (
          <View style={styles.jobBanner}>
            <Avatar name={job.company} size={40} />
            <View style={styles.jobBannerInfo}>
              <Text style={styles.jobBannerLabel}>Interview for</Text>
              <Text style={styles.jobBannerTitle}>{job.title}</Text>
              <Text style={styles.jobBannerCompany}>{job.company}</Text>
            </View>
          </View>
        )}

        {/* Hero section */}
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <FontAwesome name="microphone" size={36} color={Colors.accent} />
          </View>
          <Text style={styles.heroTitle}>AI Voice Interview</Text>
          <Text style={styles.heroSubtitle}>
            {job
              ? `You'll answer 5 questions tailored to the ${job.title} position. Take your time and speak clearly.`
              : "You'll answer 5 questions asked by our AI interviewer. Take your time and speak clearly."}
          </Text>
        </View>

        {/* How it works */}
        <Text style={styles.sectionTitle}>How It Works</Text>
        <View style={styles.stepsContainer}>
          <InstructionStep
            number="1"
            title="Listen to the Question"
            description="The AI will ask you a question. Read it carefully."
            icon="headphones"
          />
          <InstructionStep
            number="2"
            title="Tap to Answer"
            description="Press the mic button and speak your answer clearly."
            icon="microphone"
          />
          <InstructionStep
            number="3"
            title="AI Processes Response"
            description="Our AI analyzes your response in real-time."
            icon="magic"
          />
          <InstructionStep
            number="4"
            title="Get Your Score"
            description="Receive instant feedback and scoring after the interview."
            icon="bar-chart"
          />
        </View>

        {/* Tips */}
        <Text style={styles.sectionTitle}>Tips for Success</Text>
        <View style={styles.tipsCard}>
          <TipItem
            icon="check"
            text="Find a quiet environment with minimal background noise"
          />
          <TipItem icon="check" text="Speak clearly and at a natural pace" />
          <TipItem
            icon="check"
            text="Give specific examples from your experience"
          />
          <TipItem icon="check" text="Keep answers between 1-2 minutes each" />
          <TipItem icon="check" text="Be honest and authentic" />
        </View>

        {/* Mic permission status */}
        <View style={styles.permissionCard}>
          <View style={styles.permissionRow}>
            <FontAwesome
              name={micGranted ? "check-circle" : "microphone-slash"}
              size={20}
              color={micGranted ? Colors.success : Colors.warning}
            />
            <View style={styles.permissionInfo}>
              <Text style={styles.permissionTitle}>Microphone Access</Text>
              <Text style={styles.permissionStatus}>
                {micGranted ? "Permission granted" : "Permission required"}
              </Text>
            </View>
            {!micGranted && (
              <Pressable
                onPress={requestMicPermission}
                style={styles.grantButton}
              >
                <Text style={styles.grantText}>Grant</Text>
              </Pressable>
            )}
          </View>
        </View>

        {/* Duration note */}
        <View style={styles.durationCard}>
          <FontAwesome name="clock-o" size={18} color={Colors.primary} />
          <Text style={styles.durationText}>
            Estimated duration: <Text style={styles.bold}>15–25 minutes</Text>
          </Text>
        </View>

        {/* Start button */}
        <ThemedButton
          title={
            micGranted ? "Start Interview" : "Grant Permission to Continue"
          }
          onPress={handleStart}
          variant="accent"
          size="lg"
          fullWidth
          icon={
            <FontAwesome
              name={micGranted ? "play" : "microphone"}
              size={16}
              color="#FFF"
            />
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function InstructionStep({
  number,
  title,
  description,
  icon,
}: {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentProps<typeof FontAwesome>["name"];
}) {
  return (
    <View style={styles.step}>
      <View style={styles.stepNumber}>
        <Text style={styles.stepNumberText}>{number}</Text>
      </View>
      <View style={styles.stepContent}>
        <Text style={styles.stepTitle}>{title}</Text>
        <Text style={styles.stepDescription}>{description}</Text>
      </View>
      <FontAwesome name={icon} size={18} color={Colors.secondary} />
    </View>
  );
}

function TipItem({
  icon,
  text,
}: {
  icon: React.ComponentProps<typeof FontAwesome>["name"];
  text: string;
}) {
  return (
    <View style={styles.tipItem}>
      <FontAwesome name={icon} size={12} color={Colors.success} />
      <Text style={styles.tipText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 32 },
  jobBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    backgroundColor: `${Colors.accent}08`,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: `${Colors.accent}20`,
    marginBottom: 8,
    marginTop: 4,
  },
  jobBannerInfo: { flex: 1 },
  jobBannerLabel: { fontSize: 11, color: Colors.muted, fontWeight: "500" },
  jobBannerTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text.primary,
    marginTop: 1,
  },
  jobBannerCompany: { fontSize: 13, color: Colors.text.secondary },
  hero: { alignItems: "center", paddingVertical: 24 },
  heroIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${Colors.accent}12`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: "center",
    lineHeight: 21,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: Colors.text.primary,
    marginBottom: 14,
  },
  stepsContainer: { gap: 12, marginBottom: 24 },
  step: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumberText: { fontSize: 13, fontWeight: "700", color: "#FFF" },
  stepContent: { flex: 1 },
  stepTitle: { fontSize: 14, fontWeight: "600", color: Colors.text.primary },
  stepDescription: { fontSize: 12, color: Colors.text.secondary, marginTop: 2 },
  tipsCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 10,
    marginBottom: 20,
  },
  tipItem: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  permissionCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  permissionRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  permissionInfo: { flex: 1 },
  permissionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text.primary,
  },
  permissionStatus: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  grantButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: Colors.secondary,
  },
  grantText: { fontSize: 13, fontWeight: "600", color: "#FFF" },
  durationCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: `${Colors.primary}08`,
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
  },
  durationText: { fontSize: 14, color: Colors.text.secondary },
  bold: { fontWeight: "600", color: Colors.text.primary },
});

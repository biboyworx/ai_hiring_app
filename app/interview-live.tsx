/**
 * Interview Live Screen — The main AI interview interface.
 * Features animated voice waveform, question display, timer, and transcript.
 */
import { DUMMY_INTERVIEW_QUESTIONS, DUMMY_JOBS } from "@/constants/dummyData";
import { Colors } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InterviewLiveScreen() {
  const { jobId } = useLocalSearchParams<{ jobId: string }>();
  const job = jobId ? DUMMY_JOBS.find((j) => j.id === jobId) : null;
  const [currentQ, setCurrentQ] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(
    DUMMY_INTERVIEW_QUESTIONS[0].timeLimit,
  );
  const [transcript, setTranscript] = useState("");
  const [phase, setPhase] = useState<"listening" | "answering" | "processing">(
    "listening",
  );

  const question = DUMMY_INTERVIEW_QUESTIONS[currentQ];
  const totalQuestions = DUMMY_INTERVIEW_QUESTIONS.length;

  // Waveform animation values
  const bars = useRef(
    Array.from({ length: 20 }, () => new Animated.Value(0.3)),
  ).current;

  // Timer countdown
  useEffect(() => {
    if (phase !== "answering") return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleStopRecording();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase]);

  // Waveform animation when recording
  useEffect(() => {
    if (!isRecording) return;

    const animations = bars.map((bar) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(bar, {
            toValue: Math.random() * 0.7 + 0.3,
            duration: 200 + Math.random() * 300,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(bar, {
            toValue: 0.2,
            duration: 200 + Math.random() * 300,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ]),
      ),
    );

    animations.forEach((anim) => anim.start());

    return () => {
      animations.forEach((anim) => anim.stop());
      bars.forEach((bar) => bar.setValue(0.3));
    };
  }, [isRecording]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setPhase("answering");
    // Simulate live transcript
    const responses = [
      "In my experience working as a developer, ",
      "I've had the opportunity to lead several projects... ",
      "One particular challenge I faced was when we needed to scale our application... ",
      "The approach I took involved breaking down the problem into smaller components...",
    ];
    let idx = 0;
    const transcriptInterval = setInterval(() => {
      if (idx < responses.length) {
        setTranscript((prev) => prev + responses[idx]);
        idx++;
      } else {
        clearInterval(transcriptInterval);
      }
    }, 2000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setPhase("processing");
    setTranscript("");

    // Simulate processing, then move to next question or finish
    setTimeout(() => {
      if (currentQ < totalQuestions - 1) {
        setCurrentQ((prev) => prev + 1);
        setTimeLeft(DUMMY_INTERVIEW_QUESTIONS[currentQ + 1]?.timeLimit || 120);
        setPhase("listening");
      } else {
        router.replace(
          jobId
            ? `/interview-processing?jobId=${jobId}`
            : "/interview-processing",
        );
      }
    }, 1500);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* ── Top bar: progress + timer ── */}
        <View style={styles.topBar}>
          <Pressable onPress={() => router.back()} style={styles.exitButton}>
            <FontAwesome name="times" size={18} color={Colors.danger} />
          </Pressable>
          <View style={styles.progressInfo}>
            <Text style={styles.questionCount}>
              {currentQ + 1} / {totalQuestions}
            </Text>
            {/* Progress bar */}
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${((currentQ + 1) / totalQuestions) * 100}%` },
                ]}
              />
            </View>
          </View>
          <View style={styles.timerBadge}>
            <FontAwesome
              name="clock-o"
              size={14}
              color={timeLeft <= 30 ? Colors.danger : Colors.primary}
            />
            <Text
              style={[
                styles.timerText,
                timeLeft <= 30 && { color: Colors.danger },
              ]}
            >
              {formatTime(timeLeft)}
            </Text>
          </View>
        </View>

        {/* ── Question category ── */}
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{question.category}</Text>
        </View>

        {/* ── AI Question bubble ── */}
        <View style={styles.questionBubble}>
          <View style={styles.aiAvatar}>
            <FontAwesome
              name="user-circle"
              size={18}
              color={Colors.secondary}
            />
          </View>
          <Text style={styles.questionText}>{question.question}</Text>
        </View>

        {/* ── Waveform visualization ── */}
        <View style={styles.waveformContainer}>
          {phase === "processing" ? (
            <View style={styles.processingState}>
              <FontAwesome name="spinner" size={24} color={Colors.secondary} />
              <Text style={styles.processingText}>Processing response...</Text>
            </View>
          ) : (
            <View style={styles.waveform}>
              {bars.map((bar, i) => (
                <Animated.View
                  key={i}
                  style={[
                    styles.waveBar,
                    {
                      transform: [{ scaleY: isRecording ? bar : 0.2 }],
                      backgroundColor: isRecording
                        ? Colors.accent
                        : Colors.border,
                    },
                  ]}
                />
              ))}
            </View>
          )}
        </View>

        {/* ── Live transcript ── */}
        {transcript.length > 0 && (
          <View style={styles.transcriptContainer}>
            <Text style={styles.transcriptLabel}>Your response:</Text>
            <Text style={styles.transcriptText}>{transcript}</Text>
          </View>
        )}

        <View style={styles.spacer} />

        {/* ── Mic control button ── */}
        <View style={styles.controlArea}>
          {phase === "listening" && (
            <Text style={styles.tapHint}>
              Tap the button to start answering
            </Text>
          )}
          <Pressable
            onPress={isRecording ? handleStopRecording : handleStartRecording}
            disabled={phase === "processing"}
            style={({ pressed }) => [
              styles.micButton,
              isRecording && styles.micButtonActive,
              phase === "processing" && styles.micButtonDisabled,
              pressed && { transform: [{ scale: 0.95 }] },
            ]}
          >
            <FontAwesome
              name={isRecording ? "stop" : "microphone"}
              size={28}
              color="#FFF"
            />
          </Pressable>
          <Text style={styles.micLabel}>
            {phase === "processing"
              ? "Processing..."
              : isRecording
                ? "Tap to stop"
                : "Tap to answer"}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 8 },
  // ── Top bar
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  exitButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: `${Colors.danger}10`,
    alignItems: "center",
    justifyContent: "center",
  },
  progressInfo: { flex: 1, gap: 4 },
  questionCount: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.text.secondary,
    textAlign: "center",
  },
  progressTrack: {
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: 4,
    backgroundColor: Colors.secondary,
    borderRadius: 2,
  },
  timerBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  timerText: { fontSize: 14, fontWeight: "600", color: Colors.primary },
  // ── Category
  categoryBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: `${Colors.secondary}12`,
    marginBottom: 12,
  },
  categoryText: { fontSize: 12, fontWeight: "600", color: Colors.secondary },
  // ── Question
  questionBubble: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 12,
  },
  aiAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: `${Colors.secondary}12`,
    alignItems: "center",
    justifyContent: "center",
  },
  questionText: {
    fontSize: 17,
    fontWeight: "500",
    color: Colors.text.primary,
    lineHeight: 26,
  },
  // ── Waveform
  waveformContainer: {
    height: 80,
    justifyContent: "center",
    marginVertical: 20,
  },
  waveform: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    height: 60,
  },
  waveBar: {
    width: 4,
    height: 60,
    borderRadius: 2,
    backgroundColor: Colors.border,
  },
  processingState: { alignItems: "center", gap: 8 },
  processingText: { fontSize: 14, color: Colors.text.secondary },
  // ── Transcript
  transcriptContainer: {
    backgroundColor: `${Colors.primary}06`,
    borderRadius: 12,
    padding: 14,
    maxHeight: 120,
  },
  transcriptLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: Colors.muted,
    marginBottom: 6,
  },
  transcriptText: { fontSize: 14, color: Colors.text.primary, lineHeight: 22 },
  spacer: { flex: 1 },
  // ── Controls
  controlArea: { alignItems: "center", paddingBottom: 24 },
  tapHint: { fontSize: 13, color: Colors.muted, marginBottom: 12 },
  micButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.accent,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  micButtonActive: { backgroundColor: Colors.danger },
  micButtonDisabled: { backgroundColor: Colors.muted, elevation: 0 },
  micLabel: { fontSize: 13, color: Colors.text.secondary, marginTop: 10 },
});

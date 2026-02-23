/**
 * Interview Completed Screen — Success celebration after interview.
 * Confirms completion and offers navigation to results.
 */
import ThemedButton from "@/components/ui/ThemedButton";
import { DUMMY_JOBS } from "@/constants/dummyData";
import { Colors } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InterviewCompletedScreen() {
  const { jobId } = useLocalSearchParams<{ jobId: string }>();
  const job = jobId ? DUMMY_JOBS.find((j) => j.id === jobId) : null;
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Bounce-in animation for the success icon
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 60,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Success icon */}
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <View style={styles.successCircle}>
            <FontAwesome name="check" size={48} color={Colors.success} />
          </View>
        </Animated.View>

        <Text style={styles.title}>Interview Complete!</Text>
        <Text style={styles.subtitle}>
          {job
            ? `Great job! Your AI interview for ${job.title} at ${job.company} has been completed and scored.`
            : "Great job! Your AI interview has been completed and scored. Here's a quick summary:"}
        </Text>

        {/* Quick stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <FontAwesome
              name="question-circle"
              size={20}
              color={Colors.secondary}
            />
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Questions</Text>
          </View>
          <View style={styles.statCard}>
            <FontAwesome name="clock-o" size={20} color={Colors.primary} />
            <Text style={styles.statValue}>18 min</Text>
            <Text style={styles.statLabel}>Duration</Text>
          </View>
          <View style={styles.statCard}>
            <FontAwesome name="bar-chart" size={20} color={Colors.success} />
            <Text style={styles.statValue}>87</Text>
            <Text style={styles.statLabel}>Score</Text>
          </View>
        </View>

        <View style={styles.spacer} />

        {/* CTAs */}
        <View style={styles.actions}>
          <ThemedButton
            title="View Full Results"
            onPress={() =>
              router.replace(
                jobId ? `/score-summary?jobId=${jobId}` : "/score-summary",
              )
            }
            fullWidth
            size="lg"
            icon={<FontAwesome name="bar-chart" size={16} color="#FFF" />}
          />
          <ThemedButton
            title="Back to Dashboard"
            onPress={() => router.replace("/(tabs)")}
            variant="outline"
            fullWidth
            size="md"
          />
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
    paddingTop: 60,
  },
  successCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: `${Colors.success}12`,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: Colors.success,
    marginBottom: 28,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.text.secondary,
    textAlign: "center",
    lineHeight: 23,
    paddingHorizontal: 8,
  },
  statsRow: { flexDirection: "row", gap: 12, marginTop: 28 },
  statCard: {
    flex: 1,
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statValue: { fontSize: 22, fontWeight: "700", color: Colors.text.primary },
  statLabel: { fontSize: 11, color: Colors.muted },
  spacer: { flex: 1 },
  actions: { width: "100%", gap: 12, paddingBottom: 24 },
});

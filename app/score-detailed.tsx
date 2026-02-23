/**
 * Score Detailed Screen — Per-category deep dive with question-level breakdown.
 */
import Header from "@/components/ui/Header";
import ProgressBar from "@/components/ui/ProgressBar";
import { DUMMY_INTERVIEW_QUESTIONS, DUMMY_SCORES } from "@/constants/dummyData";
import { Colors } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/** Simulated per-question scores */
const QUESTION_SCORES = DUMMY_INTERVIEW_QUESTIONS.map((q, i) => ({
  ...q,
  score: [92, 78, 85, 70, 88][i] || 75,
  feedback:
    [
      "Excellent structure with clear examples. Great use of the STAR method.",
      "Good answer but could benefit from more specific metrics and outcomes.",
      "Strong technical depth shown. Consider mentioning team collaboration.",
      "Response was a bit lengthy. Try to be more concise while keeping key points.",
      "Creative approach demonstrated. Well-articulated vision.",
    ][i] || "Good response overall.",
}));

export default function ScoreDetailedScreen() {
  const { categories } = DUMMY_SCORES;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Detailed Report" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Category cards */}
        <Text style={styles.sectionTitle}>Category Scores</Text>
        <View style={styles.catGrid}>
          {categories.map((cat, i) => {
            const color =
              cat.score >= 80
                ? Colors.success
                : cat.score >= 60
                  ? Colors.secondary
                  : Colors.warning;
            return (
              <View key={i} style={styles.catCard}>
                <View
                  style={[styles.catIcon, { backgroundColor: `${color}12` }]}
                >
                  <FontAwesome
                    name={
                      [
                        "comments",
                        "code",
                        "users",
                        "lightbulb-o",
                        "puzzle-piece",
                      ][i] as any
                    }
                    size={18}
                    color={color}
                  />
                </View>
                <Text style={styles.catCardName}>{cat.name}</Text>
                <Text style={[styles.catCardScore, { color }]}>
                  {cat.score}%
                </Text>
                <ProgressBar progress={cat.score} color={color} height={4} />
              </View>
            );
          })}
        </View>

        {/* Question-by-question breakdown */}
        <Text style={styles.sectionTitle}>Question Breakdown</Text>
        {QUESTION_SCORES.map((q, i) => {
          const scoreColor =
            q.score >= 80
              ? Colors.success
              : q.score >= 60
                ? Colors.secondary
                : Colors.warning;
          return (
            <View key={i} style={styles.questionCard}>
              <View style={styles.qHeader}>
                <View style={styles.qNumberBadge}>
                  <Text style={styles.qNumber}>Q{i + 1}</Text>
                </View>
                <View style={styles.qMeta}>
                  <Text style={styles.qCategory}>{q.category}</Text>
                </View>
                <View
                  style={[
                    styles.scoreBadge,
                    { backgroundColor: `${scoreColor}12` },
                  ]}
                >
                  <Text style={[styles.scoreBadgeText, { color: scoreColor }]}>
                    {q.score}%
                  </Text>
                </View>
              </View>
              <Text style={styles.qText}>{q.question}</Text>
              <View style={styles.feedbackRow}>
                <FontAwesome
                  name="commenting-o"
                  size={12}
                  color={Colors.muted}
                />
                <Text style={styles.feedbackText}>{q.feedback}</Text>
              </View>
            </View>
          );
        })}

        {/* Overall insights */}
        <View style={styles.insightCard}>
          <FontAwesome name="info-circle" size={16} color={Colors.secondary} />
          <View style={styles.insightContent}>
            <Text style={styles.insightTitle}>Performance Insight</Text>
            <Text style={styles.insightText}>
              Your strongest area is communication. To improve, focus on
              providing more quantitative metrics in your answers and practicing
              concise responses to behavioral questions.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 32 },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: Colors.text.primary,
    marginBottom: 14,
    marginTop: 16,
  },
  // ── Category cards
  catGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 8 },
  catCard: {
    width: "48%",
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 6,
  },
  catIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  catCardName: { fontSize: 13, fontWeight: "500", color: Colors.text.primary },
  catCardScore: { fontSize: 20, fontWeight: "700" },
  // ── Question cards
  questionCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
    gap: 10,
  },
  qHeader: { flexDirection: "row", alignItems: "center", gap: 10 },
  qNumberBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  qNumber: { fontSize: 12, fontWeight: "700", color: "#FFF" },
  qMeta: { flex: 1 },
  qCategory: { fontSize: 12, fontWeight: "600", color: Colors.secondary },
  scoreBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  scoreBadgeText: { fontSize: 14, fontWeight: "700" },
  qText: { fontSize: 14, color: Colors.text.primary, lineHeight: 22 },
  feedbackRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    paddingTop: 4,
  },
  feedbackText: {
    flex: 1,
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 20,
    fontStyle: "italic",
  },
  // ── Insight
  insightCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    backgroundColor: `${Colors.secondary}08`,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  insightContent: { flex: 1 },
  insightTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: 4,
  },
  insightText: { fontSize: 13, color: Colors.text.secondary, lineHeight: 20 },
});

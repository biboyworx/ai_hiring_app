/**
 * Score Feedback Screen — AI-generated feedback with actionable tips.
 * Shows strengths, weaknesses, improvement tips, and recommended roles.
 */
import Badge from "@/components/ui/Badge";
import Header from "@/components/ui/Header";
import ThemedButton from "@/components/ui/ThemedButton";
import { DUMMY_SCORES } from "@/constants/dummyData";
import { Colors } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ScoreFeedbackScreen() {
  const { strengths, weaknesses, recommendedRoles, overall, improvementTips } =
    DUMMY_SCORES;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="AI Feedback" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* AI summary */}
        <View style={styles.aiCard}>
          <View style={styles.aiRow}>
            <View style={styles.aiAvatar}>
              <FontAwesome
                name="user-circle"
                size={20}
                color={Colors.secondary}
              />
            </View>
            <Text style={styles.aiLabel}>NexHire AI Coach</Text>
          </View>
          <Text style={styles.aiMessage}>
            Based on your interview performance, you scored {overall}/100 which
            puts you in the "Strong" tier. Here's a detailed breakdown of your
            strengths, areas for improvement, and actionable tips to boost your
            next interview.
          </Text>
        </View>

        {/* Strengths */}
        <Text style={styles.sectionTitle}>
          <FontAwesome name="star" size={16} color={Colors.success} /> Your
          Strengths
        </Text>
        <View style={styles.listCard}>
          {strengths.map((s, i) => (
            <View key={i} style={styles.listItem}>
              <View
                style={[styles.bullet, { backgroundColor: Colors.success }]}
              />
              <Text style={styles.listText}>{s}</Text>
            </View>
          ))}
        </View>

        {/* Weaknesses */}
        <Text style={styles.sectionTitle}>
          <FontAwesome
            name="exclamation-triangle"
            size={15}
            color={Colors.warning}
          />{" "}
          Areas to Improve
        </Text>
        <View style={styles.listCard}>
          {weaknesses.map((w, i) => (
            <View key={i} style={styles.listItem}>
              <View
                style={[styles.bullet, { backgroundColor: Colors.warning }]}
              />
              <Text style={styles.listText}>{w}</Text>
            </View>
          ))}
        </View>

        {/* Tips */}
        <Text style={styles.sectionTitle}>
          <FontAwesome name="lightbulb-o" size={16} color={Colors.accent} />{" "}
          Improvement Tips
        </Text>
        <View style={styles.tipsCard}>
          {improvementTips.map((tip, i) => (
            <View key={i} style={styles.tipItem}>
              <View style={styles.tipNumber}>
                <Text style={styles.tipNumberText}>{i + 1}</Text>
              </View>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        {/* Recommended roles */}
        <Text style={styles.sectionTitle}>
          <FontAwesome name="briefcase" size={15} color={Colors.primary} />{" "}
          Recommended Roles
        </Text>
        <View style={styles.rolesWrap}>
          {recommendedRoles.map((role, i) => (
            <Badge key={i} label={role} variant="primary" size="md" />
          ))}
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <ThemedButton
            title="Retake Interview"
            onPress={() => router.replace("/interview-instructions")}
            variant="outline"
            fullWidth
            icon={
              <FontAwesome name="refresh" size={14} color={Colors.primary} />
            }
          />
          <ThemedButton
            title="Browse Jobs"
            onPress={() => router.replace("/(tabs)/jobs")}
            fullWidth
            icon={<FontAwesome name="search" size={14} color="#FFF" />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 32 },
  // ── AI card
  aiCard: {
    backgroundColor: `${Colors.secondary}08`,
    borderRadius: 14,
    padding: 18,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: `${Colors.secondary}20`,
  },
  aiRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  aiAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: `${Colors.secondary}15`,
    alignItems: "center",
    justifyContent: "center",
  },
  aiLabel: { fontSize: 14, fontWeight: "700", color: Colors.secondary },
  aiMessage: { fontSize: 14, color: Colors.text.primary, lineHeight: 22 },
  // ── Sections
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: Colors.text.primary,
    marginBottom: 12,
    marginTop: 12,
  },
  listCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 12,
    marginBottom: 8,
  },
  listItem: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  bullet: { width: 8, height: 8, borderRadius: 4, marginTop: 6 },
  listText: {
    flex: 1,
    fontSize: 14,
    color: Colors.text.primary,
    lineHeight: 22,
  },
  // ── Tips
  tipsCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 14,
    marginBottom: 8,
  },
  tipItem: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  tipNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  tipNumberText: { fontSize: 12, fontWeight: "700", color: "#FFF" },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: Colors.text.primary,
    lineHeight: 22,
  },
  // ── Roles
  rolesWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 24,
  },
  // ── Actions
  actions: { gap: 10 },
});

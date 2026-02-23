/**
 * Score Summary Screen — Overall interview score with category breakdown.
 * Displays the main ScoreGauge and per-category mini progress bars.
 */
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Header from "@/components/ui/Header";
import ScoreGauge from "@/components/ui/ScoreGauge";
import ThemedButton from "@/components/ui/ThemedButton";
import { DUMMY_JOBS, DUMMY_SCORES } from "@/constants/dummyData";
import { Colors } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ScoreSummaryScreen() {
  const { jobId } = useLocalSearchParams<{ jobId: string }>();
  const job = jobId ? DUMMY_JOBS.find((j) => j.id === jobId) : null;
  const { overall, categories, recommendedRoles } = DUMMY_SCORES;

  // Determine score tier
  const tier =
    overall >= 90
      ? "Exceptional"
      : overall >= 75
        ? "Strong"
        : overall >= 50
          ? "Average"
          : "Needs Work";
  const tierColor =
    overall >= 90
      ? Colors.success
      : overall >= 75
        ? Colors.secondary
        : overall >= 50
          ? Colors.warning
          : Colors.danger;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Score Summary" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Job context */}
        {job && (
          <View style={styles.jobBanner}>
            <Avatar name={job.company} size={40} />
            <View style={styles.jobBannerInfo}>
              <Text style={styles.jobBannerLabel}>Interview Score for</Text>
              <Text style={styles.jobBannerTitle}>{job.title}</Text>
              <Text style={styles.jobBannerCompany}>{job.company}</Text>
            </View>
          </View>
        )}

        {/* Main score gauge */}
        <View style={styles.gaugeContainer}>
          <ScoreGauge score={overall} size={180} strokeWidth={12} />
          <View
            style={[styles.tierBadge, { backgroundColor: `${tierColor}15` }]}
          >
            <Text style={[styles.tierText, { color: tierColor }]}>{tier}</Text>
          </View>
        </View>

        {/* Category breakdown */}
        <Text style={styles.sectionTitle}>Category Breakdown</Text>
        <View style={styles.categoriesCard}>
          {categories.map((cat, idx) => (
            <View key={idx} style={styles.categoryRow}>
              <View style={styles.catInfo}>
                <Text style={styles.catName}>{cat.name}</Text>
                <Text style={styles.catScore}>{cat.score}%</Text>
              </View>
              <View style={styles.catTrack}>
                <View
                  style={[
                    styles.catFill,
                    {
                      width: `${cat.score}%`,
                      backgroundColor:
                        cat.score >= 80
                          ? Colors.success
                          : cat.score >= 60
                            ? Colors.secondary
                            : Colors.warning,
                    },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Recommended roles */}
        <Text style={styles.sectionTitle}>Recommended Roles</Text>
        <View style={styles.rolesWrap}>
          {recommendedRoles.map((role, i) => (
            <Badge key={i} label={role} variant="info" size="md" />
          ))}
        </View>

        {/* Quick strengths/weaknesses */}
        <View style={styles.quickCards}>
          <View style={[styles.miniCard, { borderLeftColor: Colors.success }]}>
            <FontAwesome name="arrow-up" size={14} color={Colors.success} />
            <Text style={styles.miniLabel}>Top Strength</Text>
            <Text style={styles.miniValue}>{DUMMY_SCORES.strengths[0]}</Text>
          </View>
          <View style={[styles.miniCard, { borderLeftColor: Colors.warning }]}>
            <FontAwesome name="arrow-down" size={14} color={Colors.warning} />
            <Text style={styles.miniLabel}>Improve</Text>
            <Text style={styles.miniValue}>{DUMMY_SCORES.weaknesses[0]}</Text>
          </View>
        </View>

        {/* CTAs */}
        <View style={styles.actions}>
          <ThemedButton
            title="View Detailed Report"
            onPress={() => router.push("/score-detailed")}
            fullWidth
            icon={<FontAwesome name="file-text-o" size={15} color="#FFF" />}
          />
          <ThemedButton
            title="View AI Feedback"
            onPress={() => router.push("/score-feedback")}
            variant="secondary"
            fullWidth
            icon={<FontAwesome name="lightbulb-o" size={15} color="#FFF" />}
          />
          <ThemedButton
            title="Back to Dashboard"
            onPress={() => router.replace("/(tabs)")}
            variant="ghost"
            fullWidth
          />
        </View>
      </ScrollView>
    </SafeAreaView>
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
    marginBottom: 4,
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
  gaugeContainer: { alignItems: "center", paddingVertical: 24 },
  tierBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 12,
  },
  tierText: { fontSize: 14, fontWeight: "700" },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: Colors.text.primary,
    marginBottom: 14,
    marginTop: 8,
  },
  categoriesCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 16,
    marginBottom: 20,
  },
  categoryRow: { gap: 6 },
  catInfo: { flexDirection: "row", justifyContent: "space-between" },
  catName: { fontSize: 14, fontWeight: "500", color: Colors.text.primary },
  catScore: { fontSize: 14, fontWeight: "600", color: Colors.text.primary },
  catTrack: {
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: 3,
    overflow: "hidden",
  },
  catFill: { height: 6, borderRadius: 3 },
  rolesWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  quickCards: { flexDirection: "row", gap: 12, marginBottom: 24 },
  miniCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 10,
    padding: 14,
    borderLeftWidth: 3,
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  miniLabel: { fontSize: 11, color: Colors.muted, fontWeight: "600" },
  miniValue: { fontSize: 13, color: Colors.text.primary, fontWeight: "500" },
  actions: { gap: 10 },
});

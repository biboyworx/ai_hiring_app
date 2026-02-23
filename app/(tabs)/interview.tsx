/**
 * Applications Tab Screen — Track all job applications through the pipeline.
 * Shows application status, resume match scores, and interview scores.
 * Flow: Apply → Resume Scored → Interview → Scored → Decision
 */
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import {
  DUMMY_APPLICATIONS,
  type ApplicationStatus,
} from "@/constants/dummyData";
import { Colors } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type FilterOption = "All" | "Active" | "Completed";

const STATUS_BADGE: Record<
  ApplicationStatus,
  {
    variant: "info" | "success" | "warning" | "danger" | "accent";
    label: string;
  }
> = {
  "Resume Submitted": { variant: "info", label: "Resume Submitted" },
  "Resume Scoring": { variant: "info", label: "Scoring..." },
  "Resume Scored": { variant: "accent", label: "Resume Scored" },
  "Interview Pending": { variant: "warning", label: "Interview Pending" },
  "Interview Completed": { variant: "success", label: "Interview Done" },
  "Under Review": { variant: "info", label: "Under Review" },
  Shortlisted: { variant: "success", label: "Shortlisted" },
  Offered: { variant: "success", label: "Offered" },
  Rejected: { variant: "danger", label: "Rejected" },
};

// Pipeline steps for visual indicator
const PIPELINE_STEPS = ["Applied", "Resume Scored", "Interview", "Decision"];

function getPipelineStage(status: ApplicationStatus): number {
  switch (status) {
    case "Resume Submitted":
    case "Resume Scoring":
      return 0;
    case "Resume Scored":
    case "Interview Pending":
      return 1;
    case "Interview Completed":
    case "Under Review":
      return 2;
    case "Shortlisted":
    case "Offered":
    case "Rejected":
      return 3;
    default:
      return 0;
  }
}

export default function ApplicationsScreen() {
  const [filter, setFilter] = useState<FilterOption>("All");

  const filteredApps = DUMMY_APPLICATIONS.filter((app) => {
    if (filter === "All") return true;
    if (filter === "Active")
      return !["Offered", "Rejected"].includes(app.status);
    return ["Offered", "Rejected", "Interview Completed"].includes(app.status);
  });

  const activeCount = DUMMY_APPLICATIONS.filter(
    (a) => !["Offered", "Rejected"].includes(a.status),
  ).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <Text style={styles.title}>My Applications</Text>
        <Text style={styles.subtitle}>
          Track your job applications through the pipeline
        </Text>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{DUMMY_APPLICATIONS.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: Colors.secondary }]}>
              {activeCount}
            </Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: Colors.success }]}>
              {DUMMY_APPLICATIONS.filter((a) => a.status === "Offered").length}
            </Text>
            <Text style={styles.statLabel}>Offers</Text>
          </View>
        </View>

        {/* Filter tabs */}
        <View style={styles.filterRow}>
          {(["All", "Active", "Completed"] as FilterOption[]).map((f) => (
            <Pressable
              key={f}
              style={[styles.filterTab, filter === f && styles.filterTabActive]}
              onPress={() => setFilter(f)}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === f && styles.filterTextActive,
                ]}
              >
                {f}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Application cards */}
        {filteredApps.map((app) => {
          const stage = getPipelineStage(app.status);
          const badge = STATUS_BADGE[app.status];

          return (
            <Card
              key={app.id}
              onPress={() => router.push(`/application-status?id=${app.id}`)}
              style={styles.appCard}
            >
              {/* Top row: company + status */}
              <View style={styles.appTop}>
                <View style={styles.appTopLeft}>
                  <Avatar name={app.company} size={38} />
                  <View style={styles.appInfo}>
                    <Text style={styles.appTitle}>{app.jobTitle}</Text>
                    <Text style={styles.appCompany}>{app.company}</Text>
                  </View>
                </View>
                <Badge label={badge.label} variant={badge.variant} size="sm" />
              </View>

              {/* Pipeline progress */}
              <View style={styles.pipeline}>
                {PIPELINE_STEPS.map((step, i) => (
                  <View key={i} style={styles.pipelineStep}>
                    <View
                      style={[
                        styles.pipelineDot,
                        i <= stage && styles.pipelineDotActive,
                        i < stage && styles.pipelineDotComplete,
                      ]}
                    >
                      {i < stage ? (
                        <FontAwesome name="check" size={8} color="#FFF" />
                      ) : null}
                    </View>
                    {i < PIPELINE_STEPS.length - 1 && (
                      <View
                        style={[
                          styles.pipelineLine,
                          i < stage && styles.pipelineLineActive,
                        ]}
                      />
                    )}
                  </View>
                ))}
              </View>
              <View style={styles.pipelineLabels}>
                {PIPELINE_STEPS.map((step, i) => (
                  <Text
                    key={i}
                    style={[
                      styles.pipelineLabel,
                      i <= stage && styles.pipelineLabelActive,
                    ]}
                  >
                    {step}
                  </Text>
                ))}
              </View>

              {/* Scores row */}
              <View style={styles.scoresRow}>
                <View style={styles.scoreItem}>
                  <FontAwesome
                    name="file-text-o"
                    size={13}
                    color={Colors.secondary}
                  />
                  <Text style={styles.scoreLabel}>Resume Match</Text>
                  <Text
                    style={[
                      styles.scoreValue,
                      app.resumeMatchScore !== null &&
                        app.resumeMatchScore >= 70 && { color: Colors.success },
                    ]}
                  >
                    {app.resumeMatchScore !== null
                      ? `${app.resumeMatchScore}%`
                      : "—"}
                  </Text>
                </View>
                <View style={styles.scoreDivider} />
                <View style={styles.scoreItem}>
                  <FontAwesome
                    name="microphone"
                    size={13}
                    color={Colors.accent}
                  />
                  <Text style={styles.scoreLabel}>Interview</Text>
                  <Text
                    style={[
                      styles.scoreValue,
                      app.interviewScore !== null &&
                        app.interviewScore >= 70 && { color: Colors.success },
                    ]}
                  >
                    {app.interviewScore !== null
                      ? `${app.interviewScore}/100`
                      : "—"}
                  </Text>
                </View>
              </View>

              {/* Date */}
              <Text style={styles.appDate}>
                Applied {app.appliedDate} • Updated {app.lastUpdate}
              </Text>

              {/* Action hint for pending interviews */}
              {app.status === "Interview Pending" && (
                <View style={styles.actionHint}>
                  <FontAwesome
                    name="play-circle"
                    size={16}
                    color={Colors.accent}
                  />
                  <Text style={styles.actionHintText}>
                    Tap to start your AI interview
                  </Text>
                </View>
              )}
              {app.status === "Resume Scored" &&
                app.resumeMatchScore !== null &&
                app.resumeMatchScore >= 70 && (
                  <View style={styles.actionHint}>
                    <FontAwesome
                      name="arrow-right"
                      size={14}
                      color={Colors.secondary}
                    />
                    <Text style={styles.actionHintText}>
                      Eligible for AI interview — proceed when ready
                    </Text>
                  </View>
                )}
            </Card>
          );
        })}

        {filteredApps.length === 0 && (
          <View style={styles.emptyState}>
            <FontAwesome name="inbox" size={40} color={Colors.border} />
            <Text style={styles.emptyText}>No applications found</Text>
            <Text style={styles.emptySubtext}>
              Browse jobs and apply to get started
            </Text>
          </View>
        )}

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 24 },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 4,
  },
  subtitle: { fontSize: 14, color: Colors.text.secondary, marginBottom: 16 },
  // Stats
  statsRow: { flexDirection: "row", gap: 10, marginBottom: 16 },
  statCard: {
    flex: 1,
    alignItems: "center",
    padding: 14,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statValue: { fontSize: 22, fontWeight: "700", color: Colors.text.primary },
  statLabel: { fontSize: 11, color: Colors.muted, marginTop: 2 },
  // Filters
  filterRow: {
    flexDirection: "row",
    backgroundColor: Colors.surface,
    borderRadius: 10,
    padding: 3,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 8,
  },
  filterTabActive: { backgroundColor: Colors.primary },
  filterText: { fontSize: 13, fontWeight: "500", color: Colors.text.secondary },
  filterTextActive: { color: "#FFF", fontWeight: "600" },
  // App cards
  appCard: { marginBottom: 14 },
  appTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  appTopLeft: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  appInfo: { flex: 1 },
  appTitle: { fontSize: 15, fontWeight: "600", color: Colors.text.primary },
  appCompany: { fontSize: 13, color: Colors.text.secondary, marginTop: 1 },
  // Pipeline
  pipeline: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    paddingHorizontal: 4,
  },
  pipelineStep: { flexDirection: "row", alignItems: "center", flex: 1 },
  pipelineDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  pipelineDotActive: { borderColor: Colors.secondary },
  pipelineDotComplete: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  pipelineLine: {
    flex: 1,
    height: 2,
    backgroundColor: Colors.border,
  },
  pipelineLineActive: { backgroundColor: Colors.secondary },
  pipelineLabels: {
    flexDirection: "row",
    marginBottom: 12,
    paddingHorizontal: 0,
  },
  pipelineLabel: {
    flex: 1,
    fontSize: 9,
    color: Colors.muted,
    textAlign: "center",
  },
  pipelineLabelActive: { color: Colors.text.secondary, fontWeight: "500" },
  // Scores
  scoresRow: {
    flexDirection: "row",
    backgroundColor: `${Colors.secondary}06`,
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  scoreItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  scoreLabel: { fontSize: 12, color: Colors.text.secondary, flex: 1 },
  scoreValue: { fontSize: 14, fontWeight: "700", color: Colors.text.primary },
  scoreDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 8,
  },
  appDate: { fontSize: 11, color: Colors.muted },
  actionHint: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
    padding: 10,
    backgroundColor: `${Colors.accent}08`,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: `${Colors.accent}18`,
  },
  actionHintText: {
    flex: 1,
    fontSize: 12,
    fontWeight: "500",
    color: Colors.accent,
  },
  // Empty
  emptyState: { alignItems: "center", paddingVertical: 40, gap: 8 },
  emptyText: { fontSize: 16, fontWeight: "600", color: Colors.text.primary },
  emptySubtext: { fontSize: 13, color: Colors.muted },
});

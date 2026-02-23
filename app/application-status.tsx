/**
 * Application Status Screen — Detailed view of a single application.
 * Shows pipeline progress, resume match, interview score, and actions.
 */
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Header from "@/components/ui/Header";
import ProgressBar from "@/components/ui/ProgressBar";
import ThemedButton from "@/components/ui/ThemedButton";
import {
  DUMMY_APPLICATIONS,
  DUMMY_JOBS,
  type ApplicationStatus as AppStatus,
} from "@/constants/dummyData";
import { Colors } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const STATUS_BADGE: Record<
  AppStatus,
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

const PIPELINE = [
  { key: "applied", label: "Applied" },
  { key: "resume_scored", label: "Resume Scored" },
  { key: "interview", label: "Interview" },
  { key: "decision", label: "Decision" },
];

function getStage(status: AppStatus): number {
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

export default function ApplicationStatusScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const app =
    DUMMY_APPLICATIONS.find((a) => a.id === id) || DUMMY_APPLICATIONS[0];
  const job = DUMMY_JOBS.find((j) => j.id === app.jobId);
  const stage = getStage(app.status);
  const badge = STATUS_BADGE[app.status];

  const handleStartInterview = () => {
    router.push(`/interview-instructions?jobId=${app.jobId}`);
  };

  const handleViewMatchResults = () => {
    router.push(`/application-match?jobId=${app.jobId}`);
  };

  const handleViewInterviewScore = () => {
    router.push(`/score-summary?jobId=${app.jobId}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Application Status" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Job + status header */}
        <View style={styles.jobCard}>
          <Avatar name={app.company} size={48} />
          <View style={styles.jobInfo}>
            <Text style={styles.jobTitle}>{app.jobTitle}</Text>
            <Text style={styles.jobCompany}>{app.company}</Text>
          </View>
          <Badge label={badge.label} variant={badge.variant} size="sm" />
        </View>

        {/* Pipeline timeline */}
        <Text style={styles.sectionTitle}>Application Pipeline</Text>
        <View style={styles.pipelineCard}>
          {PIPELINE.map((step, i) => (
            <View key={step.key} style={styles.stepContainer}>
              <View style={styles.stepDotCol}>
                <View
                  style={[
                    styles.stepDot,
                    i <= stage && styles.stepDotActive,
                    i < stage && styles.stepDotCompleted,
                  ]}
                >
                  {i < stage && (
                    <FontAwesome name="check" size={8} color="#FFF" />
                  )}
                </View>
                {i < PIPELINE.length - 1 && (
                  <View
                    style={[
                      styles.stepLine,
                      i < stage && styles.stepLineActive,
                    ]}
                  />
                )}
              </View>
              <View style={styles.stepInfo}>
                <Text
                  style={[
                    styles.stepLabel,
                    i <= stage && styles.stepLabelActive,
                  ]}
                >
                  {step.label}
                </Text>
                {i === 0 && (
                  <Text style={styles.stepDate}>{app.appliedDate}</Text>
                )}
                {i === stage && i > 0 && (
                  <Text style={styles.stepDate}>{app.lastUpdate}</Text>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Resume Match Score */}
        <Text style={styles.sectionTitle}>Resume Match</Text>
        <View style={styles.scoreCard}>
          <View style={styles.scoreRow}>
            <FontAwesome
              name="file-text-o"
              size={20}
              color={Colors.secondary}
            />
            <Text style={styles.scoreLabel}>Resume vs Job Match</Text>
            <Text
              style={[
                styles.scoreValue,
                app.resumeMatchScore !== null &&
                  app.resumeMatchScore >= 70 && { color: Colors.success },
              ]}
            >
              {app.resumeMatchScore !== null
                ? `${app.resumeMatchScore}%`
                : "Pending"}
            </Text>
          </View>
          {app.resumeMatchScore !== null && (
            <ProgressBar
              progress={app.resumeMatchScore}
              color={
                app.resumeMatchScore >= 80
                  ? Colors.success
                  : app.resumeMatchScore >= 60
                    ? Colors.secondary
                    : Colors.warning
              }
              height={6}
            />
          )}
        </View>

        {/* Interview Score */}
        <Text style={styles.sectionTitle}>Interview Score</Text>
        <View style={styles.scoreCard}>
          <View style={styles.scoreRow}>
            <FontAwesome name="microphone" size={20} color={Colors.accent} />
            <Text style={styles.scoreLabel}>AI Interview Score</Text>
            <Text
              style={[
                styles.scoreValue,
                app.interviewScore !== null &&
                  app.interviewScore >= 70 && { color: Colors.success },
              ]}
            >
              {app.interviewScore !== null
                ? `${app.interviewScore}/100`
                : "Pending"}
            </Text>
          </View>
          {app.interviewScore !== null && (
            <ProgressBar
              progress={app.interviewScore}
              color={
                app.interviewScore >= 80
                  ? Colors.success
                  : app.interviewScore >= 60
                    ? Colors.secondary
                    : Colors.warning
              }
              height={6}
            />
          )}
        </View>

        {/* Dates */}
        <View style={styles.datesCard}>
          <View style={styles.dateRow}>
            <FontAwesome name="calendar" size={14} color={Colors.muted} />
            <Text style={styles.dateLabel}>Applied</Text>
            <Text style={styles.dateValue}>{app.appliedDate}</Text>
          </View>
          <View style={styles.dateDivider} />
          <View style={styles.dateRow}>
            <FontAwesome name="refresh" size={14} color={Colors.muted} />
            <Text style={styles.dateLabel}>Last Updated</Text>
            <Text style={styles.dateValue}>{app.lastUpdate}</Text>
          </View>
        </View>

        {/* Actions based on status */}
        <View style={styles.actions}>
          {(app.status === "Resume Scored" ||
            app.status === "Interview Pending") &&
            app.resumeMatchScore !== null &&
            app.resumeMatchScore >= 70 && (
              <ThemedButton
                title="Start AI Interview"
                onPress={handleStartInterview}
                fullWidth
                size="lg"
                variant="accent"
                icon={<FontAwesome name="microphone" size={16} color="#FFF" />}
              />
            )}
          {app.resumeMatchScore !== null && (
            <ThemedButton
              title="View Match Details"
              onPress={handleViewMatchResults}
              variant="outline"
              fullWidth
            />
          )}
          {app.interviewScore !== null && (
            <ThemedButton
              title="View Interview Results"
              onPress={handleViewInterviewScore}
              variant="secondary"
              fullWidth
              icon={<FontAwesome name="bar-chart" size={14} color="#FFF" />}
            />
          )}
          <ThemedButton
            title="Back to Applications"
            onPress={() => router.push("/(tabs)/interview")}
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
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  jobCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
    marginTop: 4,
  },
  jobInfo: { flex: 1 },
  jobTitle: { fontSize: 16, fontWeight: "700", color: Colors.text.primary },
  jobCompany: { fontSize: 13, color: Colors.text.secondary, marginTop: 2 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text.primary,
    marginBottom: 10,
    marginTop: 4,
  },
  pipelineCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  stepContainer: { flexDirection: "row", gap: 12 },
  stepDotCol: { alignItems: "center", width: 20 },
  stepDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  stepDotActive: { borderColor: Colors.secondary },
  stepDotCompleted: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  stepLine: {
    width: 2,
    height: 28,
    backgroundColor: Colors.border,
  },
  stepLineActive: { backgroundColor: Colors.secondary },
  stepInfo: { flex: 1, paddingBottom: 16 },
  stepLabel: { fontSize: 14, color: Colors.muted, fontWeight: "500" },
  stepLabelActive: { color: Colors.text.primary, fontWeight: "600" },
  stepDate: { fontSize: 12, color: Colors.text.secondary, marginTop: 2 },
  scoreCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
    gap: 10,
  },
  scoreRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  scoreLabel: { flex: 1, fontSize: 14, color: Colors.text.secondary },
  scoreValue: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text.primary,
  },
  datesCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },
  dateRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  dateLabel: { flex: 1, fontSize: 13, color: Colors.text.secondary },
  dateValue: { fontSize: 13, fontWeight: "600", color: Colors.text.primary },
  dateDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 10,
  },
  actions: { gap: 10 },
});

/**
 * Home / Dashboard Screen — Main landing page after login.
 * Shows greeting, resume status, quick actions, score summary, and job recommendations.
 */
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import {
  DUMMY_APPLICATIONS,
  DUMMY_JOBS,
  DUMMY_NOTIFICATIONS,
  DUMMY_SCORES,
  DUMMY_USER,
} from "@/constants/dummyData";
import { Colors, Shadows } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const unreadCount = DUMMY_NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Header: Greeting + Avatar + Notifications ── */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.userName}>{DUMMY_USER.firstName} 👋</Text>
          </View>
          <View style={styles.headerRight}>
            <Pressable
              onPress={() => router.push("/notifications")}
              style={styles.notifButton}
            >
              <FontAwesome name="bell-o" size={20} color={Colors.primary} />
              {unreadCount > 0 && (
                <View style={styles.notifBadge}>
                  <Text style={styles.notifCount}>{unreadCount}</Text>
                </View>
              )}
            </Pressable>
            <Pressable onPress={() => router.push("/(tabs)/profile")}>
              <Avatar
                name={`${DUMMY_USER.firstName} ${DUMMY_USER.lastName}`}
                size={44}
              />
            </Pressable>
          </View>
        </View>

        {/* ── Resume Status Card ── */}
        <Card style={styles.resumeCard}>
          <View style={styles.resumeHeader}>
            <View style={styles.resumeIcon}>
              <FontAwesome
                name="file-text-o"
                size={20}
                color={Colors.secondary}
              />
            </View>
            <View style={styles.resumeInfo}>
              <Text style={styles.resumeTitle}>Resume Status</Text>
              <Badge label="Parsed" variant="success" />
            </View>
          </View>
          <Text style={styles.resumeFile}>JohnDoe_Resume_2025.pdf</Text>
          <ProgressBar progress={100} color={Colors.success} showLabel />
          <Pressable
            onPress={() => router.push("/resume-upload")}
            style={styles.resumeAction}
          >
            <Text style={styles.resumeActionText}>Update Resume</Text>
            <FontAwesome
              name="chevron-right"
              size={12}
              color={Colors.secondary}
            />
          </Pressable>
        </Card>

        {/* ── Quick Actions ── */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <QuickActionCard
            icon="briefcase"
            label="Browse Jobs"
            color={Colors.accent}
            onPress={() => router.push("/(tabs)/jobs")}
          />
          <QuickActionCard
            icon="list-alt"
            label="My Applications"
            color={Colors.secondary}
            onPress={() => router.push("/(tabs)/interview")}
          />
          <QuickActionCard
            icon="bar-chart"
            label="View Scores"
            color={Colors.success}
            onPress={() => router.push("/score-summary")}
          />
          <QuickActionCard
            icon="sliders"
            label="Preferences"
            color={Colors.primary}
            onPress={() => router.push("/job-preferences")}
          />
        </View>

        {/* ── Score Summary ── */}
        <Text style={styles.sectionTitle}>Your Score</Text>
        <Card style={styles.scoreCard}>
          <View style={styles.scoreRow}>
            <View style={styles.scoreCircle}>
              <Text style={styles.scoreValue}>{DUMMY_SCORES.overall}</Text>
              <Text style={styles.scoreMax}>/100</Text>
            </View>
            <View style={styles.scoreDetails}>
              {DUMMY_SCORES.categories.slice(0, 3).map((cat) => (
                <View key={cat.name} style={styles.scoreCatRow}>
                  <Text style={styles.scoreCatName}>{cat.name}</Text>
                  <View style={styles.scoreCatBar}>
                    <ProgressBar
                      progress={cat.score}
                      color={
                        cat.score >= 80
                          ? Colors.success
                          : cat.score >= 60
                            ? Colors.warning
                            : Colors.danger
                      }
                    />
                  </View>
                  <Text style={styles.scoreCatValue}>{cat.score}</Text>
                </View>
              ))}
            </View>
          </View>
          <Pressable
            onPress={() => router.push("/score-summary")}
            style={styles.viewAllLink}
          >
            <Text style={styles.viewAllText}>View Full Report</Text>
            <FontAwesome
              name="arrow-right"
              size={12}
              color={Colors.secondary}
            />
          </Pressable>
        </Card>

        {/* ── Active Applications ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Applications</Text>
          <Pressable onPress={() => router.push("/(tabs)/interview")}>
            <Text style={styles.seeAll}>See All</Text>
          </Pressable>
        </View>
        {DUMMY_APPLICATIONS.filter(
          (a) => !["Offered", "Rejected"].includes(a.status),
        )
          .slice(0, 2)
          .map((app) => (
            <Card
              key={app.id}
              onPress={() => router.push(`/application-status?id=${app.id}`)}
              style={styles.jobCard}
            >
              <View style={styles.jobHeader}>
                <View style={styles.jobInfo}>
                  <Text style={styles.jobTitle}>{app.jobTitle}</Text>
                  <Text style={styles.jobCompany}>{app.company}</Text>
                </View>
                <Badge
                  label={app.status}
                  variant={
                    app.status === "Interview Pending"
                      ? "warning"
                      : app.status === "Interview Completed"
                        ? "success"
                        : "info"
                  }
                  size="sm"
                />
              </View>
              <View style={styles.jobTags}>
                {app.resumeMatchScore !== null && (
                  <Badge
                    label={`Match: ${app.resumeMatchScore}%`}
                    variant="secondary"
                    size="sm"
                  />
                )}
                {app.interviewScore !== null && (
                  <Badge
                    label={`Interview: ${app.interviewScore}/100`}
                    variant="accent"
                    size="sm"
                  />
                )}
              </View>
            </Card>
          ))}

        {/* ── Recommended Jobs ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended Jobs</Text>
          <Pressable onPress={() => router.push("/(tabs)/jobs")}>
            <Text style={styles.seeAll}>See All</Text>
          </Pressable>
        </View>
        {DUMMY_JOBS.slice(0, 3).map((job) => (
          <Card
            key={job.id}
            onPress={() => router.push(`/job-detail?id=${job.id}`)}
            style={styles.jobCard}
          >
            <View style={styles.jobHeader}>
              <View style={styles.jobInfo}>
                <Text style={styles.jobTitle}>{job.title}</Text>
                <Text style={styles.jobCompany}>{job.company}</Text>
              </View>
              <View style={styles.matchBadge}>
                <Text style={styles.matchText}>{job.matchScore}%</Text>
              </View>
            </View>
            <View style={styles.jobTags}>
              <Badge label={job.location} variant="secondary" size="sm" />
              <Badge label={job.type} variant="muted" size="sm" />
              <Badge label={job.salary} variant="accent" size="sm" />
            </View>
          </Card>
        ))}

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Quick Action Card Component ─────────────────────
function QuickActionCard({
  icon,
  label,
  color,
  onPress,
}: {
  icon: React.ComponentProps<typeof FontAwesome>["name"];
  label: string;
  color: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionCard,
        { opacity: pressed ? 0.85 : 1 },
      ]}
    >
      <View style={[styles.actionIcon, { backgroundColor: `${color}15` }]}>
        <FontAwesome name={icon} size={22} color={color} />
      </View>
      <Text style={styles.actionLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerLeft: {},
  greeting: { fontSize: 14, color: Colors.text.secondary },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.primary,
    marginTop: 2,
  },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 12 },
  notifButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: `${Colors.primary}08`,
    alignItems: "center",
    justifyContent: "center",
  },
  notifBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.danger,
    alignItems: "center",
    justifyContent: "center",
  },
  notifCount: { fontSize: 10, fontWeight: "700", color: "#FFF" },
  resumeCard: {
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: Colors.secondary,
  },
  resumeHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 10,
  },
  resumeIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: `${Colors.secondary}12`,
    alignItems: "center",
    justifyContent: "center",
  },
  resumeInfo: { flexDirection: "row", alignItems: "center", gap: 8 },
  resumeTitle: { fontSize: 16, fontWeight: "600", color: Colors.text.primary },
  resumeFile: { fontSize: 13, color: Colors.text.secondary, marginBottom: 10 },
  resumeAction: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 6,
    marginTop: 8,
  },
  resumeActionText: {
    fontSize: 13,
    fontWeight: "500",
    color: Colors.secondary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text.primary,
    marginBottom: 14,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  seeAll: { fontSize: 13, fontWeight: "500", color: Colors.secondary },
  quickActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  actionCard: {
    width: "47%",
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  actionLabel: { fontSize: 13, fontWeight: "500", color: Colors.text.primary },
  scoreCard: { marginBottom: 24 },
  scoreRow: { flexDirection: "row", gap: 16 },
  scoreCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${Colors.success}12`,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: Colors.success,
  },
  scoreValue: { fontSize: 26, fontWeight: "800", color: Colors.success },
  scoreMax: { fontSize: 11, color: Colors.muted, marginTop: -4 },
  scoreDetails: { flex: 1, justifyContent: "center", gap: 8 },
  scoreCatRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  scoreCatName: { fontSize: 12, color: Colors.text.secondary, width: 72 },
  scoreCatBar: { flex: 1 },
  scoreCatValue: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.text.primary,
    width: 24,
    textAlign: "right",
  },
  viewAllLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  viewAllText: { fontSize: 14, fontWeight: "500", color: Colors.secondary },
  jobCard: { marginBottom: 12 },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  jobInfo: { flex: 1 },
  jobTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text.primary,
    marginBottom: 2,
  },
  jobCompany: { fontSize: 13, color: Colors.text.secondary },
  matchBadge: {
    backgroundColor: `${Colors.success}15`,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  matchText: { fontSize: 13, fontWeight: "700", color: Colors.success },
  jobTags: { flexDirection: "row", gap: 6, flexWrap: "wrap" },
});

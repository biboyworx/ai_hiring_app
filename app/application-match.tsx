/**
 * Application Match Screen — Shows resume vs job match score.
 * If the match is >= 70%, the user can proceed to the AI interview.
 * If below, they get improvement suggestions.
 */
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import ScoreGauge from "@/components/ui/ScoreGauge";
import ThemedButton from "@/components/ui/ThemedButton";
import { DUMMY_JOBS, DUMMY_PARSED_RESUME } from "@/constants/dummyData";
import { Colors } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MATCH_THRESHOLD = 70;

interface MatchDetail {
  category: string;
  score: number;
  icon: React.ComponentProps<typeof FontAwesome>["name"];
}

export default function ApplicationMatchScreen() {
  const { jobId } = useLocalSearchParams<{ jobId: string }>();
  const job = DUMMY_JOBS.find((j) => j.id === jobId) || DUMMY_JOBS[0];

  // Simulate a match score based on the job's existing matchScore
  const matchScore = job.matchScore;
  const isGoodMatch = matchScore >= MATCH_THRESHOLD;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const matchDetails: MatchDetail[] = [
    {
      category: "Skills Match",
      score: Math.min(matchScore + 5, 100),
      icon: "code",
    },
    {
      category: "Experience Level",
      score: Math.min(matchScore - 3, 100),
      icon: "briefcase",
    },
    {
      category: "Education",
      score: Math.min(matchScore + 8, 100),
      icon: "graduation-cap",
    },
    {
      category: "Keywords",
      score: Math.min(matchScore - 5, 100),
      icon: "tags",
    },
  ];

  const matchedSkills = DUMMY_PARSED_RESUME.skills.slice(0, 5);
  const missingSkills = ["GraphQL", "Docker", "CI/CD"].filter(
    () => matchScore < 95,
  ); // Show less missing skills for high matches

  const handleProceedToInterview = () => {
    router.push(`/interview-instructions?jobId=${job.id}`);
  };

  const handleBackToJobs = () => {
    router.push("/(tabs)/jobs");
  };

  const handleViewResume = () => {
    router.push("/resume-preview");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
        >
          {/* Job context */}
          <View style={styles.jobCard}>
            <Avatar name={job.company} size={44} />
            <View style={styles.jobInfo}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.jobCompany}>{job.company}</Text>
            </View>
            <Badge
              label={isGoodMatch ? "Good Match" : "Low Match"}
              variant={isGoodMatch ? "success" : "warning"}
              size="sm"
            />
          </View>

          {/* Match Score Gauge */}
          <View style={styles.gaugeContainer}>
            <ScoreGauge
              score={matchScore}
              size={160}
              strokeWidth={12}
              label="Resume Match"
            />
            <Text style={styles.matchVerdict}>
              {matchScore >= 90
                ? "Excellent Match!"
                : matchScore >= 80
                  ? "Strong Match!"
                  : matchScore >= MATCH_THRESHOLD
                    ? "Good Match"
                    : matchScore >= 50
                      ? "Partial Match"
                      : "Low Match"}
            </Text>
            <Text style={styles.matchDescription}>
              {isGoodMatch
                ? "Your resume aligns well with this position. You're eligible for the AI interview."
                : "Your resume doesn't strongly align with this job's requirements. Consider updating your resume."}
            </Text>
          </View>

          {/* Category breakdown */}
          <Text style={styles.sectionTitle}>Match Breakdown</Text>
          <View style={styles.breakdownCard}>
            {matchDetails.map((detail, index) => (
              <View key={index} style={styles.breakdownRow}>
                <View style={styles.breakdownLabel}>
                  <FontAwesome
                    name={detail.icon}
                    size={14}
                    color={Colors.secondary}
                  />
                  <Text style={styles.breakdownCategory}>
                    {detail.category}
                  </Text>
                </View>
                <View style={styles.breakdownBar}>
                  <View style={styles.barBackground}>
                    <View
                      style={[
                        styles.barFill,
                        {
                          width: `${detail.score}%`,
                          backgroundColor:
                            detail.score >= 80
                              ? Colors.success
                              : detail.score >= 60
                                ? Colors.secondary
                                : Colors.warning,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.breakdownScore}>{detail.score}%</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Matched Skills */}
          <Text style={styles.sectionTitle}>Matched Skills</Text>
          <View style={styles.skillsCard}>
            <View style={styles.skillsRow}>
              {matchedSkills.map((skill, i) => (
                <View key={i} style={styles.skillChip}>
                  <FontAwesome
                    name="check-circle"
                    size={12}
                    color={Colors.success}
                  />
                  <Text style={styles.skillChipText}>{skill.name}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Missing Skills (if any) */}
          {missingSkills.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Missing Skills</Text>
              <View style={styles.skillsCard}>
                <View style={styles.skillsRow}>
                  {missingSkills.map((skill, i) => (
                    <View key={i} style={styles.missingChip}>
                      <FontAwesome
                        name="times-circle"
                        size={12}
                        color={Colors.danger}
                      />
                      <Text style={styles.missingChipText}>{skill}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </>
          )}

          {/* Action Buttons */}
          <View style={styles.actions}>
            {isGoodMatch ? (
              <>
                <ThemedButton
                  title="Proceed to AI Interview"
                  onPress={handleProceedToInterview}
                  fullWidth
                  size="lg"
                  icon={
                    <FontAwesome name="microphone" size={16} color="#FFF" />
                  }
                />
                <ThemedButton
                  title="View Parsed Resume"
                  variant="outline"
                  fullWidth
                  onPress={handleViewResume}
                  icon={
                    <FontAwesome
                      name="file-text-o"
                      size={14}
                      color={Colors.primary}
                    />
                  }
                />
              </>
            ) : (
              <>
                <View style={styles.lowMatchBanner}>
                  <FontAwesome
                    name="info-circle"
                    size={18}
                    color={Colors.warning}
                  />
                  <Text style={styles.lowMatchText}>
                    Your match score is below {MATCH_THRESHOLD}%. We recommend
                    updating your resume to better align with the job
                    requirements before interviewing.
                  </Text>
                </View>
                <ThemedButton
                  title="Update Resume & Retry"
                  onPress={() => router.push(`/resume-upload?jobId=${jobId}`)}
                  fullWidth
                  size="lg"
                  variant="secondary"
                  icon={<FontAwesome name="refresh" size={14} color="#FFF" />}
                />
                <ThemedButton
                  title="Browse Other Jobs"
                  variant="outline"
                  fullWidth
                  onPress={handleBackToJobs}
                />
              </>
            )}
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40, paddingTop: 16 },
  jobCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 24,
  },
  jobInfo: { flex: 1 },
  jobTitle: { fontSize: 15, fontWeight: "700", color: Colors.text.primary },
  jobCompany: { fontSize: 13, color: Colors.text.secondary, marginTop: 1 },
  gaugeContainer: {
    alignItems: "center",
    marginBottom: 28,
    gap: 12,
  },
  matchVerdict: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.primary,
    marginTop: 4,
  },
  matchDescription: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: "center",
    lineHeight: 21,
    paddingHorizontal: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text.primary,
    marginBottom: 10,
    marginTop: 6,
  },
  breakdownCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 14,
    marginBottom: 16,
  },
  breakdownRow: { gap: 6 },
  breakdownLabel: { flexDirection: "row", alignItems: "center", gap: 8 },
  breakdownCategory: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.text.primary,
  },
  breakdownBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  barBackground: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: `${Colors.border}60`,
  },
  barFill: {
    height: 6,
    borderRadius: 3,
  },
  breakdownScore: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.text.primary,
    width: 36,
    textAlign: "right",
  },
  skillsCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  skillsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  skillChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: `${Colors.success}10`,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: `${Colors.success}30`,
  },
  skillChipText: {
    fontSize: 13,
    fontWeight: "500",
    color: Colors.text.primary,
  },
  missingChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: `${Colors.danger}08`,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: `${Colors.danger}20`,
  },
  missingChipText: {
    fontSize: 13,
    fontWeight: "500",
    color: Colors.text.secondary,
  },
  actions: { gap: 10, marginTop: 12 },
  lowMatchBanner: {
    flexDirection: "row",
    gap: 10,
    padding: 14,
    backgroundColor: `${Colors.warning}10`,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: `${Colors.warning}25`,
    marginBottom: 4,
  },
  lowMatchText: {
    flex: 1,
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
});

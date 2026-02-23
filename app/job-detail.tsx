/**
 * Job Detail Screen — Full job listing view with company info and actions.
 */
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Header from "@/components/ui/Header";
import ProgressBar from "@/components/ui/ProgressBar";
import ThemedButton from "@/components/ui/ThemedButton";
import { DUMMY_JOBS } from "@/constants/dummyData";
import { Colors } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function JobDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const job = DUMMY_JOBS.find((j) => j.id === id) || DUMMY_JOBS[0];
  const [saved, setSaved] = useState(false);

  const handleApply = () => {
    // Navigate to resume upload with the job context
    router.push(`/resume-upload?jobId=${job.id}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Job Details"
        rightIcon={saved ? "bookmark" : "bookmark-o"}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Company header */}
        <View style={styles.companyHeader}>
          <Avatar name={job.company} size={56} />
          <View style={styles.companyInfo}>
            <Text style={styles.jobTitle}>{job.title}</Text>
            <Text style={styles.companyName}>{job.company}</Text>
          </View>
        </View>

        {/* Meta row */}
        <View style={styles.metaRow}>
          <MetaItem icon="map-marker" text={job.location} />
          <MetaItem icon="money" text={job.salary} />
          <MetaItem icon="clock-o" text={job.type} />
        </View>

        {/* Match score */}
        <View style={styles.matchCard}>
          <View style={styles.matchHeader}>
            <FontAwesome name="bolt" size={16} color={Colors.accent} />
            <Text style={styles.matchTitle}>Match Score</Text>
            <Text style={styles.matchValue}>{job.matchScore}%</Text>
          </View>
          <ProgressBar
            progress={job.matchScore}
            color={
              job.matchScore >= 80
                ? Colors.success
                : job.matchScore >= 60
                  ? Colors.secondary
                  : Colors.warning
            }
            height={6}
          />
        </View>

        {/* Tags */}
        <View style={styles.tagsRow}>
          {job.tags.map((tag, i) => (
            <Badge key={i} label={tag} variant={"info"} size="sm" />
          ))}
        </View>

        {/* Job description */}
        <Text style={styles.sectionTitle}>About This Role</Text>
        <View style={styles.descCard}>
          <Text style={styles.descText}>
            We're looking for a talented {job.title} to join our growing team at{" "}
            {job.company}. This is an exciting opportunity to work on
            cutting-edge projects in a collaborative environment. You'll be
            responsible for designing, developing, and deploying high-quality
            software solutions.
          </Text>
        </View>

        {/* Responsibilities */}
        <Text style={styles.sectionTitle}>Responsibilities</Text>
        <View style={styles.descCard}>
          {[
            "Design and build advanced applications",
            "Collaborate with cross-functional teams",
            "Troubleshoot and debug to optimize performance",
            "Continuously discover and implement new technologies",
            "Mentor junior developers and conduct code reviews",
          ].map((r, i) => (
            <View key={i} style={styles.bulletItem}>
              <View style={styles.bullet} />
              <Text style={styles.bulletText}>{r}</Text>
            </View>
          ))}
        </View>

        {/* Requirements */}
        <Text style={styles.sectionTitle}>Requirements</Text>
        <View style={styles.descCard}>
          {[
            "3+ years of professional experience",
            "Proficiency in relevant technologies",
            "Strong problem-solving skills",
            "Excellent communication abilities",
            "Bachelor's degree in CS or related field",
          ].map((r, i) => (
            <View key={i} style={styles.bulletItem}>
              <FontAwesome name="check" size={11} color={Colors.success} />
              <Text style={styles.bulletText}>{r}</Text>
            </View>
          ))}
        </View>

        {/* Company info */}
        <Text style={styles.sectionTitle}>About {job.company}</Text>
        <View style={styles.descCard}>
          <Text style={styles.descText}>
            {job.company} is a leading technology company committed to building
            innovative solutions that make a difference. With a team of
            passionate professionals, we foster a culture of creativity,
            collaboration, and continuous learning.
          </Text>
        </View>

        {/* Action buttons */}
        <View style={styles.actions}>
          <ThemedButton
            title="Apply Now"
            onPress={handleApply}
            fullWidth
            size="lg"
            icon={<FontAwesome name="paper-plane" size={14} color="#FFF" />}
          />
          <ThemedButton
            title={saved ? "Saved" : "Save for Later"}
            variant="outline"
            fullWidth
            onPress={() => setSaved(!saved)}
            icon={
              <FontAwesome
                name={saved ? "bookmark" : "bookmark-o"}
                size={14}
                color={Colors.primary}
              />
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function MetaItem({
  icon,
  text,
}: {
  icon: React.ComponentProps<typeof FontAwesome>["name"];
  text: string;
}) {
  return (
    <View style={styles.metaItem}>
      <FontAwesome name={icon} size={13} color={Colors.muted} />
      <Text style={styles.metaText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 32 },
  companyHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 16,
  },
  companyInfo: { flex: 1 },
  jobTitle: { fontSize: 20, fontWeight: "700", color: Colors.text.primary },
  companyName: { fontSize: 14, color: Colors.text.secondary, marginTop: 2 },
  metaRow: { flexDirection: "row", gap: 16, marginBottom: 16 },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  metaText: { fontSize: 12, color: Colors.text.secondary },
  matchCard: {
    backgroundColor: `${Colors.accent}08`,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: `${Colors.accent}20`,
    marginBottom: 16,
    gap: 10,
  },
  matchHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  matchTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text.primary,
  },
  matchValue: { fontSize: 18, fontWeight: "700", color: Colors.accent },
  tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 20 },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: Colors.text.primary,
    marginBottom: 10,
    marginTop: 6,
  },
  descCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
    gap: 10,
  },
  descText: { fontSize: 14, color: Colors.text.primary, lineHeight: 23 },
  bulletItem: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.secondary,
    marginTop: 7,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    color: Colors.text.primary,
    lineHeight: 22,
  },
  actions: { gap: 10, marginTop: 10 },
});

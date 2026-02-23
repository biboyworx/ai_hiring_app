/**
 * Resume Preview Screen — Displays parsed resume data for user review.
 * Shows extracted skills, experience, education, and keywords.
 */
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Header from "@/components/ui/Header";
import ProgressBar from "@/components/ui/ProgressBar";
import ThemedButton from "@/components/ui/ThemedButton";
import { DUMMY_PARSED_RESUME } from "@/constants/dummyData";
import { Colors } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ResumePreviewScreen() {
  const handleConfirm = () => {
    // Save parsed resume and go back to dashboard
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Resume Preview" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Success banner */}
        <View style={styles.successBanner}>
          <FontAwesome name="check-circle" size={24} color={Colors.success} />
          <View style={styles.successInfo}>
            <Text style={styles.successTitle}>Successfully Parsed!</Text>
            <Text style={styles.successFile}>
              {DUMMY_PARSED_RESUME.fileName} • {DUMMY_PARSED_RESUME.fileSize}
            </Text>
          </View>
        </View>

        {/* Summary */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.summaryText}>{DUMMY_PARSED_RESUME.summary}</Text>
        </Card>

        {/* Extracted Skills with confidence bars */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Skills Detected</Text>
          {DUMMY_PARSED_RESUME.skills.map((skill) => (
            <View key={skill.name} style={styles.skillRow}>
              <Text style={styles.skillName}>{skill.name}</Text>
              <View style={styles.skillBar}>
                <ProgressBar
                  progress={skill.confidence}
                  color={
                    skill.confidence >= 80
                      ? Colors.success
                      : skill.confidence >= 60
                        ? Colors.warning
                        : Colors.accent
                  }
                />
              </View>
              <Text style={styles.skillScore}>{skill.confidence}%</Text>
            </View>
          ))}
        </Card>

        {/* Experience */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {DUMMY_PARSED_RESUME.experience.map((exp, i) => (
            <View key={i} style={styles.expItem}>
              <View style={styles.expDot} />
              <View style={styles.expContent}>
                <Text style={styles.expRole}>{exp.role}</Text>
                <Text style={styles.expCompany}>
                  {exp.company} • {exp.duration}
                </Text>
              </View>
            </View>
          ))}
        </Card>

        {/* Education */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {DUMMY_PARSED_RESUME.education.map((edu, i) => (
            <View key={i} style={styles.eduItem}>
              <FontAwesome
                name="graduation-cap"
                size={16}
                color={Colors.secondary}
              />
              <View>
                <Text style={styles.eduDegree}>{edu.degree}</Text>
                <Text style={styles.eduSchool}>
                  {edu.school} • {edu.year}
                </Text>
              </View>
            </View>
          ))}
        </Card>

        {/* Keywords */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Keywords</Text>
          <View style={styles.keywordGrid}>
            {DUMMY_PARSED_RESUME.keywords.map((kw) => (
              <Badge key={kw} label={kw} variant="primary" size="md" />
            ))}
          </View>
        </Card>

        {/* Action buttons */}
        <View style={styles.actions}>
          <ThemedButton
            title="Confirm & Save"
            onPress={handleConfirm}
            fullWidth
            size="lg"
          />
          <ThemedButton
            title="Upload Different Resume"
            onPress={() => router.back()}
            variant="outline"
            fullWidth
            size="md"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 32 },
  successBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: `${Colors.success}08`,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: `${Colors.success}20`,
    marginBottom: 20,
  },
  successInfo: { flex: 1 },
  successTitle: { fontSize: 16, fontWeight: "600", color: Colors.success },
  successFile: { fontSize: 12, color: Colors.text.secondary, marginTop: 2 },
  section: { marginBottom: 16 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text.primary,
    marginBottom: 12,
  },
  summaryText: { fontSize: 14, color: Colors.text.secondary, lineHeight: 22 },
  skillRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  skillName: {
    fontSize: 13,
    fontWeight: "500",
    color: Colors.text.primary,
    width: 80,
  },
  skillBar: { flex: 1 },
  skillScore: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.text.secondary,
    width: 34,
    textAlign: "right",
  },
  expItem: { flexDirection: "row", gap: 10, marginBottom: 12 },
  expDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.secondary,
    marginTop: 6,
  },
  expContent: { flex: 1 },
  expRole: { fontSize: 15, fontWeight: "600", color: Colors.text.primary },
  expCompany: { fontSize: 13, color: Colors.text.secondary, marginTop: 2 },
  eduItem: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  eduDegree: { fontSize: 15, fontWeight: "600", color: Colors.text.primary },
  eduSchool: { fontSize: 13, color: Colors.text.secondary, marginTop: 2 },
  keywordGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  actions: { gap: 12, marginTop: 8 },
});

/**
 * Profile Tab Screen — User profile overview with stats, skills, and edit options.
 */
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import ThemedButton from "@/components/ui/ThemedButton";
import { DUMMY_SCORES, DUMMY_USER } from "@/constants/dummyData";
import { Colors, Shadows } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Profile Header ── */}
        <View style={styles.profileHeader}>
          <Avatar
            name={`${DUMMY_USER.firstName} ${DUMMY_USER.lastName}`}
            size={90}
          />
          <Text style={styles.fullName}>
            {DUMMY_USER.firstName} {DUMMY_USER.lastName}
          </Text>
          <Text style={styles.expectedRole}>{DUMMY_USER.expectedRole}</Text>
          <View style={styles.locationRow}>
            <FontAwesome name="map-marker" size={14} color={Colors.muted} />
            <Text style={styles.location}>{DUMMY_USER.location}</Text>
          </View>
          <ThemedButton
            title="Edit Profile"
            onPress={() => router.push("/edit-profile")}
            variant="outline"
            size="sm"
            icon={
              <FontAwesome name="pencil" size={13} color={Colors.primary} />
            }
          />
        </View>

        {/* ── Stats Row ── */}
        <View style={styles.statsRow}>
          <StatItem
            label="Score"
            value={`${DUMMY_SCORES.overall}`}
            icon="bar-chart"
          />
          <StatItem
            label="Skills"
            value={`${DUMMY_USER.skills.length}`}
            icon="code"
          />
          <StatItem label="Applied" value="3" icon="send" />
          <StatItem label="Interviews" value="2" icon="microphone" />
        </View>

        {/* ── About ── */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bio}>{DUMMY_USER.bio}</Text>
        </Card>

        {/* ── Contact Info ── */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Contact</Text>
          <InfoRow icon="envelope" label="Email" value={DUMMY_USER.email} />
          <InfoRow icon="phone" label="Phone" value={DUMMY_USER.phone} />
          <InfoRow
            icon="briefcase"
            label="Work Setup"
            value={DUMMY_USER.preferredWorkSetup}
          />
          <InfoRow
            icon="money"
            label="Expected Salary"
            value={DUMMY_USER.salaryExpectation}
          />
        </Card>

        {/* ── Skills ── */}
        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Pressable onPress={() => router.push("/career-info")}>
              <Text style={styles.editLink}>Edit</Text>
            </Pressable>
          </View>
          <View style={styles.skillsGrid}>
            {DUMMY_USER.skills.map((skill) => (
              <Badge key={skill} label={skill} variant="secondary" size="md" />
            ))}
          </View>
        </Card>

        {/* ── Experience ── */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {DUMMY_USER.experience.map((exp, i) => (
            <View
              key={i}
              style={[
                styles.expItem,
                i < DUMMY_USER.experience.length - 1 && styles.expDivider,
              ]}
            >
              <View style={styles.expDot} />
              <View style={styles.expContent}>
                <Text style={styles.expRole}>{exp.role}</Text>
                <Text style={styles.expCompany}>{exp.company}</Text>
                <Text style={styles.expDuration}>{exp.duration}</Text>
                <Text style={styles.expDesc}>{exp.description}</Text>
              </View>
            </View>
          ))}
        </Card>

        {/* ── Education ── */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {DUMMY_USER.education.map((edu, i) => (
            <View key={i} style={styles.eduItem}>
              <FontAwesome
                name="graduation-cap"
                size={16}
                color={Colors.secondary}
              />
              <View style={styles.eduContent}>
                <Text style={styles.eduDegree}>{edu.degree}</Text>
                <Text style={styles.eduSchool}>
                  {edu.school} • {edu.year}
                </Text>
              </View>
            </View>
          ))}
        </Card>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function StatItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ComponentProps<typeof FontAwesome>["name"];
}) {
  return (
    <View style={styles.statItem}>
      <FontAwesome name={icon} size={18} color={Colors.secondary} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ComponentProps<typeof FontAwesome>["name"];
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIcon}>
        <FontAwesome name={icon} size={14} color={Colors.secondary} />
      </View>
      <View>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 24 },
  profileHeader: { alignItems: "center", paddingVertical: 20, gap: 6 },
  fullName: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.primary,
    marginTop: 12,
  },
  expectedRole: { fontSize: 15, color: Colors.secondary, fontWeight: "500" },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 8,
  },
  location: { fontSize: 13, color: Colors.muted },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  statItem: { alignItems: "center", gap: 4 },
  statValue: { fontSize: 20, fontWeight: "700", color: Colors.text.primary },
  statLabel: { fontSize: 11, color: Colors.muted },
  section: { marginBottom: 16 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text.primary,
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editLink: { fontSize: 13, fontWeight: "500", color: Colors.secondary },
  bio: { fontSize: 14, color: Colors.text.secondary, lineHeight: 22 },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: `${Colors.border}80`,
  },
  infoIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: `${Colors.secondary}12`,
    alignItems: "center",
    justifyContent: "center",
  },
  infoLabel: { fontSize: 11, color: Colors.muted },
  infoValue: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.text.primary,
    marginTop: 1,
  },
  skillsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  expItem: { flexDirection: "row", gap: 12, paddingBottom: 14 },
  expDivider: {
    borderBottomWidth: 1,
    borderBottomColor: `${Colors.border}80`,
    marginBottom: 14,
  },
  expDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.secondary,
    marginTop: 5,
  },
  expContent: { flex: 1 },
  expRole: { fontSize: 15, fontWeight: "600", color: Colors.text.primary },
  expCompany: { fontSize: 13, color: Colors.secondary, marginTop: 1 },
  expDuration: { fontSize: 12, color: Colors.muted, marginTop: 2 },
  expDesc: {
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 20,
    marginTop: 6,
  },
  eduItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingVertical: 4,
  },
  eduContent: { flex: 1 },
  eduDegree: { fontSize: 15, fontWeight: "600", color: Colors.text.primary },
  eduSchool: { fontSize: 13, color: Colors.text.secondary, marginTop: 2 },
});

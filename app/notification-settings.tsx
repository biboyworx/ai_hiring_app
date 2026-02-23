/**
 * Notification Settings Screen — Toggle notification preferences.
 */
import Header from "@/components/ui/Header";
import { Colors } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ToggleSetting {
  key: string;
  label: string;
  description: string;
  icon: React.ComponentProps<typeof FontAwesome>["name"];
}

const SETTINGS: ToggleSetting[] = [
  {
    key: "push",
    label: "Push Notifications",
    description: "Receive push notifications on your device",
    icon: "bell",
  },
  {
    key: "email",
    label: "Email Notifications",
    description: "Get updates via email",
    icon: "envelope",
  },
  {
    key: "jobs",
    label: "New Job Matches",
    description: "When new jobs match your profile",
    icon: "briefcase",
  },
  {
    key: "interview",
    label: "Interview Reminders",
    description: "Reminders before scheduled interviews",
    icon: "calendar",
  },
  {
    key: "score",
    label: "Score Updates",
    description: "When your interview scores are ready",
    icon: "bar-chart",
  },
  {
    key: "tips",
    label: "Tips & Insights",
    description: "Career tips and platform updates",
    icon: "lightbulb-o",
  },
];

export default function NotificationSettingsScreen() {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    push: true,
    email: true,
    jobs: true,
    interview: true,
    score: true,
    tips: false,
  });

  const toggle = (key: string) =>
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <SafeAreaView style={styles.safe}>
      <Header title="Notifications" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {SETTINGS.map((s) => (
          <Pressable
            key={s.key}
            onPress={() => toggle(s.key)}
            style={styles.row}
          >
            <View style={styles.iconWrap}>
              <FontAwesome name={s.icon} size={16} color={Colors.secondary} />
            </View>
            <View style={styles.info}>
              <Text style={styles.label}>{s.label}</Text>
              <Text style={styles.desc}>{s.description}</Text>
            </View>
            <View style={[styles.toggle, toggles[s.key] && styles.toggleOn]}>
              <View style={[styles.thumb, toggles[s.key] && styles.thumbOn]} />
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { paddingHorizontal: 20, paddingBottom: 24, gap: 10, paddingTop: 8 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: `${Colors.secondary}10`,
    alignItems: "center",
    justifyContent: "center",
  },
  info: { flex: 1 },
  label: { fontSize: 14, fontWeight: "600", color: Colors.text.primary },
  desc: { fontSize: 12, color: Colors.text.secondary, marginTop: 2 },
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.border,
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  toggleOn: { backgroundColor: Colors.success },
  thumb: { width: 22, height: 22, borderRadius: 11, backgroundColor: "#FFF" },
  thumbOn: { alignSelf: "flex-end" },
});

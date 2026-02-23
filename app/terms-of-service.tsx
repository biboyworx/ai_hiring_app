/**
 * Terms of Service Screen — Static legal content display.
 */
import Header from "@/components/ui/Header";
import { Colors } from "@/constants/theme";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or using NexHire, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.",
  },
  {
    title: "2. Service Description",
    body: "NexHire provides an AI-powered recruitment platform that includes resume parsing, AI-driven interview simulations, skills scoring, and job matching services. Features may be updated or modified at our discretion.",
  },
  {
    title: "3. User Accounts",
    body: "You must create an account to use NexHire. You are responsible for maintaining the security of your account credentials. You must provide accurate and complete information during registration.",
  },
  {
    title: "4. Acceptable Use",
    body: "You agree to use NexHire only for lawful purposes. You must not upload false or misleading information, attempt to manipulate scoring algorithms, or use the platform to harass or discriminate against others.",
  },
  {
    title: "5. Intellectual Property",
    body: "All content, features, and functionality of NexHire are owned by Advanced Virtual Staff PH and are protected by international copyright, trademark, and other intellectual property laws.",
  },
  {
    title: "6. AI Interview Content",
    body: "Interview questions and scoring methodologies are proprietary. You may not record, reproduce, or share interview content outside the platform without explicit permission.",
  },
  {
    title: "7. Limitation of Liability",
    body: "NexHire provides interview coaching and job matching services as tools to assist your career development. We do not guarantee job placement or specific outcomes from using our services.",
  },
  {
    title: "8. Termination",
    body: "We reserve the right to suspend or terminate your account if we believe you have violated these terms. You may also delete your account at any time through the app settings.",
  },
  {
    title: "9. Changes to Terms",
    body: "We may update these terms from time to time. We will notify you of significant changes via email or in-app notification. Continued use after changes constitutes acceptance of the updated terms.",
  },
];

export default function TermsOfServiceScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <Header title="Terms of Service" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.updated}>Effective: January 15, 2025</Text>
        {SECTIONS.map((s, i) => (
          <View key={i} style={styles.section}>
            <Text style={styles.sectionTitle}>{s.title}</Text>
            <Text style={styles.sectionBody}>{s.body}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { paddingHorizontal: 20, paddingBottom: 32 },
  updated: {
    fontSize: 12,
    color: Colors.muted,
    marginTop: 8,
    marginBottom: 16,
  },
  section: { marginBottom: 18 },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: 6,
  },
  sectionBody: { fontSize: 14, color: Colors.text.secondary, lineHeight: 23 },
});

/**
 * Privacy Policy Screen — Static legal content display.
 */
import Header from "@/components/ui/Header";
import { Colors } from "@/constants/theme";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SECTIONS = [
  {
    title: "Information We Collect",
    body: "We collect information you provide directly, such as your name, email, resume data, and interview responses. We also collect usage data to improve our services, including device information, interaction patterns, and performance metrics.",
  },
  {
    title: "How We Use Your Information",
    body: "Your information is used to provide and improve our AI-powered recruitment services, match you with relevant job opportunities, generate interview scores and feedback, and communicate important updates about your applications.",
  },
  {
    title: "Data Storage & Security",
    body: "We employ industry-standard security measures to protect your data including encryption at rest and in transit, regular security audits, and access controls. Your data is stored on secure cloud servers with automatic backups.",
  },
  {
    title: "AI & Interview Data",
    body: "Interview recordings and transcripts are processed by our AI system to generate scores and feedback. This data is encrypted and only accessible to you. We do not share your interview responses with employers without your explicit consent.",
  },
  {
    title: "Third-Party Services",
    body: "We may use third-party services for analytics, payment processing, and cloud infrastructure. These services are bound by their own privacy policies and our data processing agreements.",
  },
  {
    title: "Your Rights",
    body: "You have the right to access, correct, or delete your personal data. You can request a copy of your data or account deletion at any time through the app settings or by contacting our support team.",
  },
  {
    title: "Contact Us",
    body: "If you have questions about this privacy policy or our data practices, please contact us at privacy@nexhire.com or through our in-app support channel.",
  },
];

export default function PrivacyPolicyScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <Header title="Privacy Policy" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.updated}>Last updated: January 15, 2025</Text>
        <Text style={styles.intro}>
          At NexHire, we are committed to protecting your privacy and ensuring
          the security of your personal information. This policy outlines how we
          collect, use, and safeguard your data.
        </Text>
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
    marginBottom: 12,
  },
  intro: {
    fontSize: 14,
    color: Colors.text.primary,
    lineHeight: 23,
    marginBottom: 20,
  },
  section: { marginBottom: 20 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: 8,
  },
  sectionBody: { fontSize: 14, color: Colors.text.secondary, lineHeight: 23 },
});

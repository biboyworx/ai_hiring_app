/**
 * Contact Support Screen — Support options and contact information.
 */
import Header from "@/components/ui/Header";
import ThemedButton from "@/components/ui/ThemedButton";
import { Colors } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CONTACT_OPTIONS = [
  {
    icon: "envelope" as const,
    label: "Email Us",
    value: "support@nexhire.com",
    action: "mailto:support@nexhire.com",
  },
  {
    icon: "phone" as const,
    label: "Call Us",
    value: "+1 (800) 123-4567",
    action: "tel:+18001234567",
  },
  {
    icon: "clock-o" as const,
    label: "Business Hours",
    value: "Mon–Fri, 9 AM – 6 PM EST",
    action: null,
  },
];

export default function ContactSupportScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <Header title="Contact Support" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <FontAwesome name="life-ring" size={36} color={Colors.secondary} />
          </View>
          <Text style={styles.heroTitle}>How Can We Help?</Text>
          <Text style={styles.heroSubtitle}>
            Our support team is ready to assist you with any questions or
            issues.
          </Text>
        </View>

        {/* Submit ticket CTA */}
        <ThemedButton
          title="Submit a Ticket"
          onPress={() => router.push("/submit-ticket")}
          fullWidth
          size="lg"
          icon={<FontAwesome name="pencil-square-o" size={15} color="#FFF" />}
        />

        {/* Contact options */}
        <Text style={styles.sectionTitle}>Other Ways to Reach Us</Text>
        {CONTACT_OPTIONS.map((opt, i) => (
          <Pressable
            key={i}
            onPress={() => opt.action && Linking.openURL(opt.action)}
            disabled={!opt.action}
            style={styles.contactCard}
          >
            <View style={styles.contactIcon}>
              <FontAwesome name={opt.icon} size={18} color={Colors.secondary} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>{opt.label}</Text>
              <Text style={styles.contactValue}>{opt.value}</Text>
            </View>
            {opt.action && (
              <FontAwesome
                name="chevron-right"
                size={12}
                color={Colors.muted}
              />
            )}
          </Pressable>
        ))}

        {/* FAQ link */}
        <View style={styles.faqCard}>
          <FontAwesome name="question-circle" size={18} color={Colors.accent} />
          <View style={styles.faqInfo}>
            <Text style={styles.faqTitle}>Check our FAQ</Text>
            <Text style={styles.faqText}>
              Many common questions are answered there.
            </Text>
          </View>
          <ThemedButton
            title="View FAQ"
            size="sm"
            variant="outline"
            onPress={() => router.push("/faq")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { paddingHorizontal: 20, paddingBottom: 32 },
  hero: { alignItems: "center", paddingVertical: 24 },
  heroIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${Colors.secondary}10`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: "center",
    lineHeight: 21,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: Colors.text.primary,
    marginTop: 24,
    marginBottom: 14,
  },
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 10,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${Colors.secondary}10`,
    alignItems: "center",
    justifyContent: "center",
  },
  contactInfo: { flex: 1 },
  contactLabel: { fontSize: 14, fontWeight: "600", color: Colors.text.primary },
  contactValue: { fontSize: 13, color: Colors.text.secondary, marginTop: 2 },
  faqCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: `${Colors.accent}08`,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: `${Colors.accent}15`,
    marginTop: 20,
  },
  faqInfo: { flex: 1 },
  faqTitle: { fontSize: 14, fontWeight: "600", color: Colors.text.primary },
  faqText: { fontSize: 12, color: Colors.text.secondary, marginTop: 2 },
});

/**
 * Submit Ticket Screen — Support ticket submission form.
 */
import Header from "@/components/ui/Header";
import ThemedButton from "@/components/ui/ThemedButton";
import ThemedInput from "@/components/ui/ThemedInput";
import { Colors } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CATEGORIES = [
  "Account Issues",
  "Interview Problems",
  "Score Questions",
  "Job Applications",
  "Technical Bug",
  "Feature Request",
  "Other",
];

export default function SubmitTicketScreen() {
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!category) e.category = "Please select a category";
    if (!subject.trim()) e.subject = "Subject is required";
    if (!description.trim()) e.description = "Description is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    Alert.alert(
      "Ticket Submitted",
      "We'll get back to you within 24 hours. Ticket #NX-2025-0042",
      [{ text: "OK", onPress: () => router.back() }],
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Header title="Submit Ticket" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Category selection */}
        <Text style={styles.label}>Category</Text>
        {errors.category && <Text style={styles.error}>{errors.category}</Text>}
        <View style={styles.chipWrap}>
          {CATEGORIES.map((cat) => (
            <Pressable key={cat} onPress={() => setCategory(cat)}>
              <View
                style={[styles.chip, category === cat && styles.chipActive]}
              >
                <Text
                  style={[
                    styles.chipText,
                    category === cat && styles.chipTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Subject */}
        <ThemedInput
          label="Subject"
          value={subject}
          onChangeText={setSubject}
          placeholder="Brief description of the issue"
          error={errors.subject}
        />

        {/* Description */}
        <ThemedInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          placeholder="Describe your issue in detail..."
          multiline
          numberOfLines={6}
          error={errors.description}
        />

        {/* Attachment hint */}
        <Pressable style={styles.attachRow}>
          <FontAwesome name="paperclip" size={16} color={Colors.secondary} />
          <Text style={styles.attachText}>Attach a screenshot (optional)</Text>
        </Pressable>

        {/* Info */}
        <View style={styles.infoCard}>
          <FontAwesome name="info-circle" size={14} color={Colors.secondary} />
          <Text style={styles.infoText}>
            Our support team typically responds within 24 hours during business
            days. For urgent issues, please call us directly.
          </Text>
        </View>

        <ThemedButton
          title="Submit Ticket"
          onPress={handleSubmit}
          fullWidth
          size="lg"
          icon={<FontAwesome name="paper-plane" size={14} color="#FFF" />}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { paddingHorizontal: 20, paddingBottom: 32 },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text.primary,
    marginBottom: 8,
    marginTop: 16,
  },
  error: { fontSize: 12, color: Colors.danger, marginBottom: 4 },
  chipWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: { fontSize: 13, color: Colors.text.secondary },
  chipTextActive: { color: "#FFF", fontWeight: "600" },
  attachRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginTop: 8,
  },
  attachText: { fontSize: 14, color: Colors.secondary, fontWeight: "500" },
  infoCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    backgroundColor: `${Colors.secondary}08`,
    borderRadius: 10,
    padding: 14,
    marginVertical: 16,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
});

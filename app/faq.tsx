/**
 * FAQ Screen — Expandable frequently asked questions.
 */
import Header from "@/components/ui/Header";
import { DUMMY_FAQ } from "@/constants/dummyData";
import { Colors } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FAQScreen() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) =>
    setExpandedId((prev) => (prev === id ? null : id));

  return (
    <SafeAreaView style={styles.safe}>
      <Header title="FAQ" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.subtitle}>
          Find answers to commonly asked questions about NexHire.
        </Text>
        {DUMMY_FAQ.map((item) => {
          const isOpen = expandedId === item.id;
          return (
            <Pressable key={item.id} onPress={() => toggle(item.id)}>
              <View style={[styles.card, isOpen && styles.cardOpen]}>
                <View style={styles.qRow}>
                  <Text style={styles.question}>{item.question}</Text>
                  <FontAwesome
                    name={isOpen ? "chevron-up" : "chevron-down"}
                    size={14}
                    color={Colors.muted}
                  />
                </View>
                {isOpen && <Text style={styles.answer}>{item.answer}</Text>}
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { paddingHorizontal: 20, paddingBottom: 24 },
  subtitle: {
    fontSize: 13,
    color: Colors.text.secondary,
    marginVertical: 12,
    lineHeight: 20,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 10,
  },
  cardOpen: { borderColor: Colors.secondary },
  qRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  question: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text.primary,
    lineHeight: 22,
  },
  answer: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 22,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
});

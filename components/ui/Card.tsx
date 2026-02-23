/**
 * Card — Reusable card component with consistent shadow, radius, and padding.
 */
import { Colors, Shadows } from "@/constants/theme";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  className?: string;
  style?: object;
}

export default function Card({ children, onPress, style }: CardProps) {
  const Wrapper = onPress ? Pressable : View;

  return (
    <Wrapper
      onPress={onPress}
      style={({ pressed }: any) => [
        styles.card,
        pressed && onPress ? { opacity: 0.95 } : null,
        style,
      ]}
    >
      {children}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    ...Shadows.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
});

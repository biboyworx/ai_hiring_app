/**
 * Badge — Small colored label for tags, status indicators, and categories.
 */
import { Colors } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type BadgeVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "muted";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: "sm" | "md";
}

const variantColors: Record<BadgeVariant, { bg: string; text: string }> = {
  primary: { bg: `${Colors.primary}15`, text: Colors.primary },
  secondary: { bg: `${Colors.secondary}15`, text: Colors.secondary },
  accent: { bg: `${Colors.accent}15`, text: Colors.accent },
  success: { bg: `${Colors.success}15`, text: Colors.success },
  danger: { bg: `${Colors.danger}15`, text: Colors.danger },
  warning: { bg: `${Colors.warning}15`, text: Colors.warning },
  muted: { bg: `${Colors.border}`, text: Colors.muted },
  info: { bg: `${Colors.info}15`, text: Colors.info },
};

export default function Badge({
  label,
  variant = "primary",
  size = "sm",
}: BadgeProps) {
  const colors = variantColors[variant];

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: colors.bg,
          paddingHorizontal: size === "sm" ? 8 : 12,
          paddingVertical: size === "sm" ? 3 : 5,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: colors.text,
            fontSize: size === "sm" ? 11 : 13,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  text: {
    fontWeight: "600",
    letterSpacing: 0.2,
  },
});

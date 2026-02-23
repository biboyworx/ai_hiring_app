/**
 * ThemedButton — Reusable button component with multiple variants.
 * Follows the NexHire design system for consistent CTAs.
 *
 * Variants: primary | secondary | outline | ghost | danger | accent
 * Sizes: sm | md | lg
 */
import { Colors } from "@/constants/theme";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "accent";
type ButtonSize = "sm" | "md" | "lg";

interface ThemedButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

const variantStyles: Record<
  ButtonVariant,
  { bg: string; text: string; border: string }
> = {
  primary: { bg: Colors.primary, text: "#FFFFFF", border: Colors.primary },
  secondary: {
    bg: Colors.secondary,
    text: "#FFFFFF",
    border: Colors.secondary,
  },
  outline: { bg: "transparent", text: Colors.primary, border: Colors.primary },
  ghost: { bg: "transparent", text: Colors.primary, border: "transparent" },
  danger: { bg: Colors.danger, text: "#FFFFFF", border: Colors.danger },
  accent: { bg: Colors.accent, text: "#FFFFFF", border: Colors.accent },
};

const sizeStyles: Record<
  ButtonSize,
  { height: number; fontSize: number; px: number; radius: number }
> = {
  sm: { height: 36, fontSize: 13, px: 14, radius: 6 },
  md: { height: 48, fontSize: 16, px: 20, radius: 10 },
  lg: { height: 56, fontSize: 18, px: 24, radius: 12 },
};

export default function ThemedButton({
  title,
  onPress,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
}: ThemedButtonProps) {
  const v = variantStyles[variant];
  const s = sizeStyles[size];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: disabled ? "#CBD5E1" : v.bg,
          borderColor: disabled ? "#CBD5E1" : v.border,
          height: s.height,
          paddingHorizontal: s.px,
          borderRadius: s.radius,
          opacity: pressed ? 0.85 : 1,
          alignSelf: fullWidth ? "stretch" : "auto",
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={v.text} />
      ) : (
        <View style={styles.content}>
          {icon && <View style={styles.icon}>{icon}</View>}
          <Text
            style={[
              styles.text,
              {
                color: disabled ? "#94A3B8" : v.text,
                fontSize: s.fontSize,
              },
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  icon: {
    marginRight: 2,
  },
  text: {
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});

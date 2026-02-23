/**
 * ThemedInput — Styled text input with label, error, and helper text support.
 * Follows NexHire design system with consistent spacing and colors.
 */
import { Colors } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

export interface ThemedInputProps extends TextInputProps {
  label?: string;
  error?: string;
  name?: string; // only used on the react hook form fields
  helperText?: string;
  leftIcon?: React.ComponentProps<typeof FontAwesome>["name"];
  isPassword?: boolean;
}

export default function ThemedInput({
  label,
  error,
  helperText,
  leftIcon,
  isPassword = false,
  ...props
}: ThemedInputProps) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const borderColor = error
    ? Colors.danger
    : focused
      ? Colors.secondary
      : Colors.border;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={[styles.inputWrapper, { borderColor }]}>
        {leftIcon && (
          <FontAwesome
            name={leftIcon}
            size={16}
            color={Colors.muted}
            style={styles.leftIcon}
          />
        )}

        <TextInput
          style={[styles.input, leftIcon ? { paddingLeft: 0 } : null]}
          placeholderTextColor={Colors.muted}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          secureTextEntry={isPassword && !showPassword}
          {...props}
        />

        {/* Toggle password visibility */}
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <FontAwesome
              name={showPassword ? "eye" : "eye-slash"}
              size={16}
              color={Colors.muted}
            />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.error}>{error}</Text>}
      {helperText && !error && <Text style={styles.helper}>{helperText}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.text.primary,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 10,
    backgroundColor: Colors.surface,
    paddingHorizontal: 14,
    height: 50,
  },
  leftIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.text.primary,
    paddingVertical: 0,
  },
  eyeIcon: {
    padding: 4,
  },
  error: {
    fontSize: 12,
    color: Colors.danger,
    marginTop: 4,
    marginLeft: 2,
  },
  helper: {
    fontSize: 12,
    color: Colors.muted,
    marginTop: 4,
    marginLeft: 2,
  },
});

/**
 * Header — Reusable screen header with optional back button and right action.
 */
import { Colors } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface HeaderProps {
  title: string;
  showBack?: boolean;
  rightIcon?:
    | React.ReactNode
    | React.ComponentProps<typeof FontAwesome>["name"];
  onRightPress?: () => void;
}

export default function Header({
  title,
  showBack = true,
  rightIcon,
  onRightPress,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      {showBack ? (
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
          hitSlop={8}
        >
          <FontAwesome name="chevron-left" size={18} color={Colors.primary} />
        </Pressable>
      ) : (
        <View style={styles.placeholder} />
      )}

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      {rightIcon ? (
        typeof rightIcon === "string" ? (
          <Pressable
            onPress={onRightPress}
            style={styles.rightButton}
            hitSlop={8}
          >
            <FontAwesome name={"link"} size={20} color={Colors.primary} />
          </Pressable>
        ) : (
          <View style={styles.rightButton}>{rightIcon}</View>
        )
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: `${Colors.primary}10`,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text.primary,
    flex: 1,
    textAlign: "center",
    marginHorizontal: 12,
  },
  rightButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholder: {
    width: 40,
  },
});

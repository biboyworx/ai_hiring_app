/**
 * Onboarding Layout — Headerless stack for the onboarding flow.
 */
import { Stack } from "expo-router";
import React from "react";

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}

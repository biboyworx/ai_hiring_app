/**
 * Onboarding Screen — Horizontal swipeable carousel with 4 slides.
 *
 * Slide 1: Splash/brand introduction with progress bar animation
 * Slide 2: "Find Remote Opportunities" feature highlight
 * Slide 3: "Interview with AI First" feature highlight
 * Slide 4: "Get Hired Faster" with CTA buttons
 *
 * Uses FlatList for performant horizontal pagination.
 */
import { ONBOARDING_SLIDES } from "@/constants/dummyData";
import { Colors } from "@/constants/theme";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function OnboardingScreen() {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  // Splash screen progress bar animation (auto-advances after loading)
  const splashProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate the progress bar on the splash slide
    Animated.timing(splashProgress, {
      toValue: 100,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  }, []);

  // Track which slide is currently visible
  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index);
      }
    },
    [],
  );

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  // Navigate to next slide
  const goToNext = () => {
    if (currentIndex < ONBOARDING_SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  // Skip to auth
  const handleSkip = () => {
    router.push("/(auth)/login");
  };

  // Get started → go to signup
  const handleGetStarted = () => {
    router.push("/(auth)/signup");
  };

  // Already have account → go to login
  const handleLogin = () => {
    router.push("/(auth)/login");
  };

  // ─── Render individual slide ───────────────────────
  const renderSlide = ({
    item,
    index,
  }: {
    item: (typeof ONBOARDING_SLIDES)[0];
    index: number;
  }) => {
    const isLast = index === ONBOARDING_SLIDES.length - 1;

    return (
      <View style={styles.slide}>
        {/* Feature image */}
        <View style={styles.imageContainer}>
          <Image
            source={item.image}
            style={styles.featureImage}
            resizeMode="contain"
          />
        </View>

        {/* Content */}
        <View style={styles.featureContent}>
          <Text style={styles.featureTitle}>{item.title}</Text>
          <Text style={styles.featureDescription}>{item.description}</Text>
        </View>

        {/* Spacer to push bottom content */}
        <View style={styles.spacer} />
      </View>
    );
  };

  const isLast = currentIndex === ONBOARDING_SLIDES.length - 1;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <FlatList
        ref={flatListRef}
        data={ONBOARDING_SLIDES}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        scrollEventThrottle={16}
        contentContainerStyle={styles.listContent}
      />

      <View pointerEvents="box-none" style={styles.stickyBottom}>
        {/* Pagination dots */}
        <PaginationDots currentIndex={currentIndex} scrollX={scrollX} />

        {/* Action buttons */}
        <View style={styles.actionArea}>
          {isLast ? (
            <>
              <Pressable
                style={styles.getStartedButton}
                onPress={handleGetStarted}
              >
                <Text style={styles.getStartedText}>Get started</Text>
              </Pressable>
              <Pressable onPress={handleLogin} style={styles.loginLink}>
                <Text style={styles.loginText}>
                  Already have an account?{" "}
                  <Text style={styles.loginBold}>Login</Text>
                </Text>
              </Pressable>
            </>
          ) : (
            <Pressable style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.skipText}>Skip</Text>
            </Pressable>
          )}
        </View>

        {/* Bottom branding */}
        <Text style={styles.branding}>Advanced Virtual Staff PH</Text>
      </View>
    </SafeAreaView>
  );
}

// ─── Pagination Dots ─────────────────────────────────
function PaginationDots({
  currentIndex,
  scrollX,
}: {
  currentIndex: number;
  scrollX: Animated.Value;
}) {
  return (
    <View style={styles.dotsContainer}>
      {ONBOARDING_SLIDES.map((_, index) => {
        // Animated dot width — active dot is wider
        const dotWidth = scrollX.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH,
          ],
          outputRange: [8, 24, 8],
          extrapolate: "clamp",
        });

        const dotOpacity = scrollX.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH,
          ],
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              {
                width: dotWidth,
                opacity: dotOpacity,
                backgroundColor: Colors.primary,
              },
            ]}
          />
        );
      })}
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    paddingBottom: 220,
  },
  slide: {
    width: SCREEN_WIDTH,
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },

  // ── Splash slide
  splashImageContainer: {
    backgroundColor: `${Colors.border}60`,
    borderRadius: 20,
    padding: 16,
    alignItems: "center",
    marginBottom: 24,
  },
  splashImage: {
    width: SCREEN_WIDTH - 80,
    height: 220,
  },
  brandTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: Colors.primary,
    textAlign: "center",
    letterSpacing: -0.5,
  },
  brandSubtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.secondary,
    textAlign: "center",
    marginTop: 4,
    marginBottom: 16,
  },
  splashDescription: {
    fontSize: 15,
    color: Colors.accent,
    textAlign: "center",
    lineHeight: 22,
  },

  // ── Feature slides
  imageContainer: {
    backgroundColor: `${Colors.background}`,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 24,
    overflow: "hidden",
  },
  featureImage: {
    width: SCREEN_WIDTH - 48,
    height: 250,
    borderRadius: 16,
  },
  featureContent: {
    paddingHorizontal: 4,
  },
  featureTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: Colors.secondary,
    marginBottom: 12,
    lineHeight: 34,
  },
  featureDescription: {
    fontSize: 15,
    color: Colors.text.secondary,
    lineHeight: 23,
  },

  // ── Shared
  spacer: {
    flex: 1,
  },

  // ── Progress bar (splash)
  progressArea: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  progressTrack: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: 8,
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  progressLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.text.secondary,
    minWidth: 36,
    textAlign: "right",
  },

  // ── Pagination dots
  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    gap: 6,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },

  // ── Action buttons
  stickyBottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: "5%",
    alignItems: "center",
  },
  actionArea: {
    alignItems: "center",
    marginBottom: 20,
    gap: 16,
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  skipText: {
    fontSize: 15,
    fontWeight: "500",
    color: Colors.text.secondary,
  },
  getStartedButton: {
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 10,
    backgroundColor: Colors.accent,
  },
  getStartedText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  loginLink: {
    padding: 8,
  },
  loginText: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  loginBold: {
    fontWeight: "600",
    color: Colors.secondary,
    textDecorationLine: "underline",
  },

  // ── Bottom branding
  bottomBranding: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  branding: {
    fontSize: 13,
    fontWeight: "500",
    color: Colors.text.secondary,
    textAlign: "center",
    marginBottom: 4,
  },
  brandAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  brandAvatarText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
});

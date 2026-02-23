/**
 * AuthContext — Zustand store for global authentication state.
 *
 * Responsibilities:
 *  - Persist the Supabase session to SecureStore so it survives app restarts.
 *  - Initialize auth state on startup by restoring the persisted session and
 *    subscribing to Supabase's onAuthStateChange listener.
 *  - Expose `isInitialized` so the entry screen can wait for the check to
 *    complete before deciding where to route the user.
 */

import { zustandStorage } from "@/lib/secureStorage";
import { supabase } from "@/lib/supabase";
import { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AuthState {
  /** Supabase session object — null when logged out. */
  session: Session | null;
  /** Convenience shortcut for session.user */
  user: User | null;
  /** True while the initial session check / Supabase call is in flight. */
  isLoading: boolean;
  /** True once initialize() has finished running (regardless of outcome). */
  isInitialized: boolean;

  // ── Actions ──────────────────────────────────────────────────────────────
  /**
   * Call once from the root layout on app startup.
   * Restores the persisted session, confirms it is still valid with Supabase,
   * and registers the onAuthStateChange listener for future changes.
   */
  initialize: () => Promise<void>;
  /** Imperatively set the session (used by the onAuthStateChange callback). */
  setSession: (session: Session | null) => void;
  /** Sign the user out and clear local state. */
  signOut: () => Promise<void>;
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      user: null,
      isLoading: true,
      isInitialized: false,

      setSession: (session) => set({ session, user: session?.user ?? null }),

      initialize: async () => {
        set({ isLoading: true });
        try {
          // Fetch the current active session from Supabase (validates the
          // token and refreshes it if necessary using the persisted value).
          const {
            data: { session },
          } = await supabase.auth.getSession();

          set({ session, user: session?.user ?? null });

          // Keep store in sync for the lifetime of the app.
          supabase.auth.onAuthStateChange((_event, newSession) => {
            set({ session: newSession, user: newSession?.user ?? null });
          });
        } catch (error) {
          console.error("[Auth] Initialization failed:", error);
          set({ session: null, user: null });
        } finally {
          set({ isLoading: false, isInitialized: true });
        }
      },

      signOut: async () => {
        await supabase.auth.signOut();
        set({ session: null, user: null });
      },
    }),
    {
      name: "nexhire-auth",
      storage: createJSONStorage(() => zustandStorage),
      // Only persist the session — loading/initialized flags reset each launch.
      partialize: (state) => ({
        session: state.session,
        user: state.user,
      }),
    },
  ),
);

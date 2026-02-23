/**
 * secureStorage — Expo SecureStore adapter with transparent chunking.
 *
 * SecureStore enforces a hard 2 048-byte limit per key.  Supabase sessions
 * (access token + user object JSON) regularly exceed that, so we split large
 * values into 1 800-byte chunks and reassemble them on read.
 *
 * This module exposes two objects:
 *
 *  • `supabaseStorage`  — Shape expected by `createClient({ auth: { storage } })`
 *  • `zustandStorage`   — Drop-in for Zustand's `createJSONStorage()`
 */

import * as SecureStore from "expo-secure-store";

// Keep each chunk safely under the 2 048-byte limit.
const CHUNK_SIZE = 1800;

// ─── Core helpers ─────────────────────────────────────────────────────────────

async function getSecureItem(key: string): Promise<string | null> {
  const first = await SecureStore.getItemAsync(key);
  if (first === null) return null;

  const countRaw = await SecureStore.getItemAsync(`${key}__count`);
  if (!countRaw) return first; // single chunk

  const count = parseInt(countRaw, 10);
  const chunks = [first];
  for (let i = 1; i < count; i++) {
    const chunk = await SecureStore.getItemAsync(`${key}__${i}`);
    chunks.push(chunk ?? "");
  }
  return chunks.join("");
}

async function setSecureItem(key: string, value: string): Promise<void> {
  if (value.length <= CHUNK_SIZE) {
    await SecureStore.setItemAsync(key, value);
    // Clean up any previous chunks.
    await SecureStore.deleteItemAsync(`${key}__count`);
    return;
  }

  const chunks: string[] = [];
  for (let i = 0; i < value.length; i += CHUNK_SIZE) {
    chunks.push(value.slice(i, i + CHUNK_SIZE));
  }

  await SecureStore.setItemAsync(key, chunks[0]);
  for (let i = 1; i < chunks.length; i++) {
    await SecureStore.setItemAsync(`${key}__${i}`, chunks[i]);
  }
  await SecureStore.setItemAsync(`${key}__count`, String(chunks.length));
}

async function removeSecureItem(key: string): Promise<void> {
  const countRaw = await SecureStore.getItemAsync(`${key}__count`);
  if (countRaw) {
    const count = parseInt(countRaw, 10);
    for (let i = 1; i < count; i++) {
      await SecureStore.deleteItemAsync(`${key}__${i}`);
    }
    await SecureStore.deleteItemAsync(`${key}__count`);
  }
  await SecureStore.deleteItemAsync(key);
}

// ─── Supabase storage adapter ─────────────────────────────────────────────────
// Matches the `SupportedStorage` type from @supabase/auth-js.

export const supabaseStorage = {
  getItem: (key: string) => getSecureItem(key),
  setItem: (key: string, value: string) => setSecureItem(key, value),
  removeItem: (key: string) => removeSecureItem(key),
};

// ─── Zustand storage adapter ──────────────────────────────────────────────────
// Matches the interface expected by `createJSONStorage()`.

export const zustandStorage = {
  getItem: (key: string) => getSecureItem(key),
  setItem: (key: string, value: string) => setSecureItem(key, value),
  removeItem: (key: string) => removeSecureItem(key),
};

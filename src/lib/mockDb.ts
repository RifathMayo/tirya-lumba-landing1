import type { UserProfile } from '@/types';
// Penyimpanan demo di browser. Hanya dipakai bila backend Express belum tersedia.
export type Db = { users: Record<string, UserProfile & { pw?: string }>; me: string | null };
export const isMock = !process.env.NEXT_PUBLIC_API_URL;
export function readDb(): Db {
  try { return JSON.parse(localStorage.getItem('tl') || '') as Db; } catch { return { users: {}, me: null }; }
}
export function writeDb(db: Db) { localStorage.setItem('tl', JSON.stringify(db)); }
export function setSession(email: string | null) {
  document.cookie = email ? `tl_token=${encodeURIComponent(email)}; path=/; max-age=604800` : 'tl_token=; path=/; max-age=0';
}

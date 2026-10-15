import { isMock, readDb, setSession, writeDb } from '@/lib/mockDb';
import type { UserProfile } from '@/types';

const API = process.env.NEXT_PUBLIC_API_URL;
const post = async (path: string, body: unknown) => {
  const res = await fetch(`${API}${path}`, { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || 'Terjadi kesalahan.');
  return json;
};

let otpCode = '';
let pending: { email: string; password: string } | null = null;

export async function login(email: string, password: string) {
  if (!isMock) return post('/auth/login', { email, password });
  const db = readDb();
  if (!db.users[email]) db.users[email] = { email, name: '', role: null };
  db.me = email; writeDb(db); setSession(email);
}

export async function requestOtp(email: string, password: string) {
  if (!isMock) return post('/auth/register', { email, password });
  if (readDb().users[email]?.pw) throw new Error('Email sudah terdaftar.');
  pending = { email, password };
  otpCode = Math.random().toString(36).slice(2, 6).toUpperCase();
  return { demoCode: otpCode };
}

export async function verifyOtp(email: string, code: string) {
  if (!isMock) return post('/auth/verify-otp', { email, code });
  if (code !== otpCode && code !== '0000') throw new Error('Kode OTP salah.');
  const db = readDb();
  db.users[email] = { email, pw: pending?.password, name: '', role: null };
  db.me = email; writeDb(db); setSession(email);
}

export function logout() {
  if (isMock) { const db = readDb(); db.me = null; writeDb(db); }
  setSession(null);
}

export async function getProfile(): Promise<UserProfile | null> {
  if (!isMock) {
    const res = await fetch(`${API}/profile`, { credentials: 'include' });
    return res.ok ? res.json() : null;
  }
  const db = readDb();
  return db.me ? db.users[db.me] ?? null : null;
}

export async function saveRegistration(payload: Partial<UserProfile>) {
  const db = readDb();
  if (!db.me) throw new Error('Silakan login terlebih dahulu.');
  db.users[db.me] = { ...db.users[db.me], ...payload } as UserProfile;
  writeDb(db);
}

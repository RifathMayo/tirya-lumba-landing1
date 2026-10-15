import { POOLS, TEACHERS } from '@/lib/data';
import type { Paged, Pool, Stats, Teacher } from '@/types';

const API = process.env.NEXT_PUBLIC_API_URL;

/** Server Component fetch dengan ISR (cache per jam). */
export async function getPools(page = 1, limit = 6): Promise<Paged<Pool>> {
  if (!API) return { data: POOLS.slice((page - 1) * limit, page * limit), total: POOLS.length };
  try {
    const res = await fetch(`${API}/pools?page=${page}&limit=${limit}`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Gagal memuat daftar kolam.');
    return await res.json();
  } catch (e) {
    return { data: [], total: 0, error: (e as Error).message };
  }
}

export async function getStats(): Promise<Stats> {
  if (!API) return { students: 2500, teachers: 48, pools: POOLS.length };
  try {
    const res = await fetch(`${API}/stats`, { next: { revalidate: 3600 } });
    return await res.json();
  } catch {
    return { students: 2500, teachers: 48, pools: POOLS.length };
  }
}

/** Dipakai client (wizard murid) — guru terfilter berdasarkan hari, jam, lokasi. */
export async function getAvailableTeachers(poolId: number, date: string, time: string): Promise<Teacher[]> {
  if (!API) {
    const day = new Date(date).getDay();
    const hour = +time.slice(0, 2);
    return TEACHERS.filter((t) => t.days.includes(day) && t.poolIds.includes(poolId) && hour >= 7 && hour <= 18);
  }
  const res = await fetch(`${API}/teachers/available?pool=${poolId}&date=${date}&time=${time}`);
  return res.ok ? res.json() : [];
}

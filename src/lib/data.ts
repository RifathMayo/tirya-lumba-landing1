import type { Pool, Teacher } from '@/types';

// Data demo — dipakai saat NEXT_PUBLIC_API_URL kosong.
const raw: [string, string, number, number, Pool['category'], number, number][] = [
  ['Kolam Taman Kota Tangerang', 'Jl. Daan Mogot No.12, Tangerang', -6.1783, 106.6319, 'kota', 150000, 350000],
  ['GOR Benteng Aquatic', 'Jl. Veteran, Kota Tangerang', -6.1702, 106.6403, 'kota', 140000, 330000],
  ['Kolam Cipondoh Biru', 'Jl. KH Hasyim Ashari, Cipondoh', -6.2, 106.69, 'kota', 145000, 340000],
  ['Kolam Karawaci Tirta', 'Jl. Imam Bonjol, Karawaci', -6.2262, 106.6094, 'kota', 160000, 360000],
  ['Aquatic BSD Center', 'Jl. Pahlawan Seribu, BSD', -6.3022, 106.6527, 'tangsel', 170000, 400000],
  ['Kolam Pamulang Raya', 'Jl. Siliwangi, Pamulang', -6.3419, 106.7389, 'tangsel', 150000, 350000],
  ['Kolam Ciputat Mulia', 'Jl. Ir. H. Juanda, Ciputat', -6.3156, 106.7547, 'tangsel', 150000, 350000],
  ['Serpong Swim Park', 'Jl. Raya Serpong', -6.3, 106.67, 'tangsel', 165000, 380000],
  ['Kolam Tigaraksa Asri', 'Jl. Raya Tigaraksa', -6.2661, 106.4733, 'kab', 130000, 300000],
  ['Kolam Balaraja Jaya', 'Jl. Raya Balaraja', -6.2, 106.4339, 'kab', 130000, 300000],
  ['Kolam Cikupa Tirta', 'Jl. Raya Cikupa', -6.2271, 106.5145, 'kab', 135000, 310000],
  ['Kolam Pasar Kemis', 'Jl. Raya Pasar Kemis', -6.1667, 106.5333, 'kab', 125000, 295000],
  ['Grand Wave Pool Alam Sutera', 'Jl. Alam Sutera Boulevard', -6.2428, 106.6564, 'non', 190000, 450000],
  ['Splash Club Gading Serpong', 'Jl. Boulevard Gading Serpong', -6.2294, 106.6283, 'non', 185000, 440000],
];
export const POOLS: Pool[] = raw.map(([name, address, lat, lng, category, priceRegular, pricePrivate], id) => ({
  id, name, address, lat, lng, category, priceRegular, pricePrivate,
}));

export const TEACHERS: Teacher[] = [
  { id: 1, name: 'Coach Rina Apsari', license: 'PRSI Level 2', days: [1, 3, 5], poolIds: [0, 1, 2, 3, 12] },
  { id: 2, name: 'Coach Dimas Pratama', license: 'PRSI Level 3', days: [2, 4, 6], poolIds: [4, 5, 6, 7, 13] },
  { id: 3, name: 'Coach Sari Widya', license: 'PRSI Level 2', days: [0, 1, 2, 3, 4, 5, 6], poolIds: [8, 9, 10, 11, 0, 4] },
  { id: 4, name: 'Coach Bayu Nugraha', license: 'Pelatih Nasional', days: [0, 6, 5], poolIds: [0, 4, 12, 13, 3, 7] },
];

export const CATEGORY_LABEL = {
  kota: 'Kerjasama Kota Tangerang', tangsel: 'Kerjasama Tangsel',
  kab: 'Kerjasama Kab. Tangerang', non: 'Non Kerjasama',
} as const;
export const CLASSES = ['Reguler', 'Privat', 'Prestasi', 'Ekstrakurikuler'] as const;
export const DAYS = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
export const SESSIONS = ['Pagi (07-10)', 'Siang (10-14)', 'Sore (15-18)'];
export const BRANDS = ['AquaGear', 'SpeedoPro', 'Dispora Tangerang', 'PRSI', 'HydroFit', 'Tirta Sehat'];

export function classPrice(pool: Pool, cls: string): number {
  const map: Record<string, number> = {
    Reguler: pool.priceRegular, Privat: pool.pricePrivate,
    Prestasi: Math.round((pool.pricePrivate * 1.2) / 1000) * 1000,
    Ekstrakurikuler: Math.round((pool.priceRegular * 0.8) / 1000) * 1000,
  };
  return map[cls] ?? pool.priceRegular;
}

// Demo: jumlah murid per hari mengajar. Di produksi, ambil dari API.
export const studentsOnDay = (day: number) => ([1, 3].includes(day) ? 3 : day === 6 ? 2 : 0);

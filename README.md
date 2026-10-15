# PT Tirya Lumba — Frontend 1 (Landing Page)

Next.js 14 (App Router) + TypeScript + Tailwind CSS + TanStack Query.

## Menjalankan
```bash
npm install
cp .env.local.example .env.local   # biarkan NEXT_PUBLIC_API_URL kosong untuk mode demo
npm run dev
```
Buka http://localhost:3000

## Mode demo vs backend
- `NEXT_PUBLIC_API_URL` kosong → data kolam, guru, login, OTP (kode `0000`), dan pendaftaran memakai data demo (localStorage).
- Isi dengan URL Express.js (mis. `http://localhost:4000/api`) → `src/services/*` memanggil endpoint:
  `GET /pools?page&limit`, `GET /stats`, `GET /teachers/available`, `POST /auth/login|register|verify-otp`,
  `GET /profile`, `POST /bookings/murid|guru` (FormData).

## Struktur
`src/app` routing · `src/components/{ui,features}` · `src/services` API · `src/hooks` logika client · `src/lib` utilitas/data · `src/types`

Rute proteksi (`/daftar/*`, `/profile`, `/guru/*`) dijaga `src/middleware.ts` lewat cookie `tl_token`
(backend sebaiknya menyetel cookie ini sebagai httpOnly).

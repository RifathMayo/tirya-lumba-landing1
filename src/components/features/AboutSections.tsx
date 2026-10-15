import Link from 'next/link';
import Button from '@/components/ui/Button';
import { BRANDS } from '@/lib/data';
import type { Stats } from '@/types';

export function BrandSection() {
  return (
    <section className="py-9">
      <div className="wrap text-center">
        <p className="font-semibold">Bekerjasama dengan</p>
        <ul className="mt-6 flex flex-wrap justify-center gap-[34px] opacity-75">
          {BRANDS.map((b) => <li key={b} className="font-head text-xl font-extrabold text-pb">{b}</li>)}
        </ul>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section id="tentang-kami" className="py-[70px]">
      <div className="wrap max-w-[760px]">
        <h2 className="h2">Tentang Kami</h2>
        <p className="mb-5 mt-3.5">
          PT Tirya Lumba adalah penyelenggara kursus renang yang telah melatih ribuan murid dari anak-anak hingga dewasa sejak 2003.
          Dengan metode bertahap, pelatih berlisensi, dan fasilitas kolam mitra terpilih, kami memastikan setiap murid belajar dengan aman dan percaya diri.
        </p>
        <Link href="/#tentang-kami" className="underline-up">Kenal kami lebih dalam →</Link>
      </div>
    </section>
  );
}

const reasons = [
  ['🎓 Guru Berkualitas', 'Pelatih bersertifikat dan berpengalaman.'],
  ['🕒 Kelas Fleksibel', 'Pilih hari, jam, dan lokasi sesuai jadwal Anda.'],
  ['🛡 Aman & Terarah', 'Kurikulum bertahap dari pengenalan air hingga prestasi.'],
];

export function WhySection({ stats }: { stats: Stats }) {
  const items: [string, string][] = [[stats.students.toLocaleString('id-ID') + '+', 'Total Murid'], [String(stats.teachers), 'Total Guru'], [String(stats.pools), 'Kolam Mitra']];
  return (
    <section id="kenapa-pilih-kami" className="bg-az py-[70px]">
      <div className="wrap text-center">
        <h2 className="h2">Kenapa Pilih Kami</h2>
        <div className="my-[30px] grid gap-5 text-left md:grid-cols-3">
          {reasons.map(([t, d]) => <article key={t} className="card"><h3 className="text-lg font-bold">{t}</h3><p>{d}</p></article>)}
        </div>
        <dl className="mb-[30px] grid gap-5 md:grid-cols-3">
          {items.map(([v, l]) => (
            <div key={l}><dd className="font-head text-[40px] font-extrabold text-cy">{v}</dd><dt>{l}</dt></div>
          ))}
        </dl>
        <Button href="/daftar/murid">Daftar Sebagai Murid</Button>
      </div>
    </section>
  );
}

import type { Metadata } from 'next';
import Button from '@/components/ui/Button';

export const metadata: Metadata = { title: 'Daftar' };
export const dynamic = 'force-dynamic'; // dilarang di-cache

export default function DaftarPage() {
  const cards = [
    { icon: '🏊', title: 'Daftar sebagai Murid', desc: 'Ikuti kelas renang bersama pelatih terbaik.', href: '/daftar/murid', label: 'Daftar Murid', variant: 'primary' as const },
    { icon: '🎓', title: 'Daftar sebagai Pelatih / Guru', desc: 'Bergabung dan ajar murid di kolam mitra kami.', href: '/daftar/guru', label: 'Daftar Guru', variant: 'outline' as const },
  ];
  return (
    <section className="py-[70px]">
      <div className="wrap text-center">
        <h1 className="h2">Mulai Perjalananmu</h1>
        <p className="mb-8 mt-2.5">Pilih jalur pendaftaran yang sesuai.</p>
        <div className="mx-auto grid max-w-[800px] gap-5 md:grid-cols-2">
          {cards.map((c) => (
            <article key={c.href} className="card p-9">
              <div className="text-[56px]" aria-hidden="true">{c.icon}</div>
              <h2 className="text-lg font-bold">{c.title}</h2>
              <p className="mb-5 mt-2.5">{c.desc}</p>
              <Button href={c.href} variant={c.variant}>{c.label}</Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

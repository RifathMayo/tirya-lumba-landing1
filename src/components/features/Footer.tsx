import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-td pb-6 pt-[50px] text-sm text-slate-300">
      <div className="wrap grid gap-8 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <Image src="/logo.webp" alt="Logo PT Tirya Lumba" width={72} height={68} className="mb-3 rounded-lg bg-white p-1" />
          <h2 className="mb-2.5 text-base font-bold text-white">PT Tirya Lumba</h2>
          <p>Sekolah renang profesional untuk semua usia di Tangerang Raya.</p>
          <p className="mt-4">📍 Jl. Boulevard Raya No. 8, Tangerang<br />📞 0812-3456-7890 · ✉ halo@tiryalumba.id</p>
        </div>
        <nav aria-label="Sitemap" className="space-y-1.5">
          <h2 className="mb-2.5 text-base font-bold text-white">Sitemap</h2>
          {[['/', 'Beranda'], ['/#program', 'Program'], ['/daftar', 'Daftar'], ['/login', 'Login']].map(([h, l]) => (
            <Link key={h} href={h} className="block hover:text-cy">{l}</Link>
          ))}
        </nav>
        <div className="space-y-1.5">
          <h2 className="mb-2.5 text-base font-bold text-white">Sosial Media</h2>
          <a className="block hover:text-cy" href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a className="block hover:text-cy" href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a>
          <a className="block hover:text-cy" href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
      </div>
      <p className="mt-6 text-center opacity-60">© 2026 PT Tirya Lumba</p>
    </footer>
  );
}

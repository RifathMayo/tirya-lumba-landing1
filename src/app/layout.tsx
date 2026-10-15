import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import '@/styles/globals.css';
import Providers from '@/components/features/Providers';
import Navbar from '@/components/features/Navbar';
import Footer from '@/components/features/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-jakarta' });

export const metadata: Metadata = {
  icons: { icon: '/logo.webp' },
  title: { default: 'PT Tirya Lumba - Sekolah Renang', template: '%s | PT Tirya Lumba' },
  description: 'Sekolah renang profesional untuk semua usia di Tangerang Raya. Pelatih bersertifikat, kelas fleksibel, kolam mitra terbaik.',
  openGraph: { title: 'PT Tirya Lumba - Sekolah Renang', description: 'Belajar berenang aman dan menyenangkan.', locale: 'id_ID', type: 'website' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} ${jakarta.variable}`}>
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

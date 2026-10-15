'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Logo from './Logo';
import { useProfile } from '@/hooks/useProfile';

const links = [['/', 'Beranda'], ['/#program', 'Program'], ['/#tentang-kami', 'Tentang Kami'], ['/#kenapa-pilih-kami', 'Kenapa Kami']];

export default function Navbar() {
  const { data: user, signOut } = useProfile();
  const router = useRouter();
  return (
    <header className="sticky top-0 z-50 border-b border-pb/10 bg-white/70 backdrop-blur-md">
      <nav aria-label="Navigasi utama" className="wrap flex h-[68px] items-center justify-between gap-3">
        <Link href="/" aria-label="Beranda Tirya Lumba"><Logo /></Link>
        <div className="hidden gap-[22px] text-[15px] font-medium md:flex">
          {links.map(([href, label]) => <Link key={href} href={href} className="hover:text-cy">{label}</Link>)}
        </div>
        <div className="flex gap-2">
          {user ? (
            <>
              <Button small href="/profile">👤 {user.name || user.email.split('@')[0]}</Button>
              <Button small variant="outline" onClick={() => { signOut(); router.push('/'); }}>Keluar</Button>
            </>
          ) : (
            <>
              <Button small variant="outline" href="/login">Login</Button>
              <Button small href="/register">Daftar</Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

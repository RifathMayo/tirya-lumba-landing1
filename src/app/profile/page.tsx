import type { Metadata } from 'next';
import ProfileView from '@/components/features/ProfileView';
export const metadata: Metadata = { title: 'Profil' };
export const dynamic = 'force-dynamic';
export default function Page() { return <ProfileView />; }

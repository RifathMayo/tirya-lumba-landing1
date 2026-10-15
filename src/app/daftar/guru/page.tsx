import type { Metadata } from 'next';
import TeacherWizard from '@/components/features/TeacherWizard';
export const metadata: Metadata = { title: 'Pendaftaran Pelatih' };
export const dynamic = 'force-dynamic';
export default function Page() { return <TeacherWizard />; }

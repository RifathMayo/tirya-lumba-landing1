import type { Metadata } from 'next';
import StudentWizard from '@/components/features/StudentWizard';
export const metadata: Metadata = { title: 'Pendaftaran Murid' };
export const dynamic = 'force-dynamic';
export default function Page() { return <StudentWizard />; }

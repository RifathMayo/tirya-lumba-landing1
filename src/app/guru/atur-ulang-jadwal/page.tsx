import type { Metadata } from 'next';
import RescheduleForm from '@/components/features/RescheduleForm';
export const metadata: Metadata = { title: 'Atur Ulang Jadwal' };
export const dynamic = 'force-dynamic';
export default function Page() { return <RescheduleForm />; }

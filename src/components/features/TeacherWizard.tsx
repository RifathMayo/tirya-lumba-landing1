'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Input, Select } from '@/components/ui/Field';
import StepBar from './StepBar';
import WizardNav from './WizardNav';
import { useBooking } from '@/hooks/useBooking';
import { DAYS, POOLS, SESSIONS } from '@/lib/data';
import { calcAge } from '@/lib/utils';

const required: Record<number, string[]> = { 1: ['name', 'dob', 'sex', 'wa', 'addr'], 2: ['lic', 'exp'], 3: [] };

export default function TeacherWizard() {
  const router = useRouter();
  const booking = useBooking('guru');
  const [step, setStep] = useState(1);
  const [d, setD] = useState<Record<string, string>>({});
  const [pools, setPools] = useState<number[]>([]);
  const [slots, setSlots] = useState<string[]>([]);
  const [cv, setCv] = useState<File[]>([]);
  const [error, setError] = useState('');
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setD((p) => ({ ...p, [k]: e.target.value }));
  const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  function next() {
    if (required[step].some((k) => !d[k])) return setError('Lengkapi semua data yang wajib diisi.');
    if (step === 2 && !cv.length) return setError('Upload file CV.');
    if (step === 3 && (!pools.length || !slots.length)) return setError('Pilih minimal satu kolam dan satu sesi.');
    setError('');
    if (step < 3) return setStep(step + 1);
    booking.mutate(
      { fields: { ...d, pools, slots }, files: { cv }, name: d.name },
      { onSuccess: () => router.push('/profile'), onError: (e) => setError(e.message) },
    );
  }

  return (
    <div className="form-card">
      <h1 className="h2">Pendaftaran Pelatih</h1>
      <StepBar step={step} />
      {step === 1 && (<>
        <Input label="Nama Lengkap" value={d.name ?? ''} onChange={set('name')} />
        <div className="grid gap-3 md:grid-cols-2">
          <div><Input label="Tanggal Lahir" type="date" value={d.dob ?? ''} onChange={set('dob')} /></div>
          <div><Input label="Umur (otomatis)" readOnly value={d.dob ? `${calcAge(d.dob)} tahun` : ''} /></div>
        </div>
        <Select label="Jenis Kelamin" options={['Laki-laki', 'Perempuan']} value={d.sex ?? ''} onChange={set('sex')} />
        <Input label="No. WhatsApp Aktif" type="tel" value={d.wa ?? ''} onChange={set('wa')} />
        <Input label="Alamat Domisili" value={d.addr ?? ''} onChange={set('addr')} />
      </>)}
      {step === 2 && (<>
        <Input label="Nomor / Nama Lisensi" value={d.lic ?? ''} onChange={set('lic')} />
        <label htmlFor="exp">Pengalaman Mengajar</label>
        <textarea id="exp" rows={4} value={d.exp ?? ''} onChange={set('exp')} />
        <label htmlFor="cv">Upload CV (PDF)</label>
        <input id="cv" type="file" accept=".pdf,.doc,.docx" onChange={(e) => setCv(Array.from(e.target.files ?? []))} />
      </>)}
      {step === 3 && (<>
        <fieldset><legend className="mb-1.5 mt-3.5 text-sm font-semibold">Kolam Tempat Mengajar</legend>
          {POOLS.map((p) => (
            <label key={p.id} className="mt-2 flex cursor-pointer items-center gap-2.5 rounded-[10px] border border-gray-300 px-3.5 py-2.5 text-sm font-normal">
              <input type="checkbox" checked={pools.includes(p.id)} onChange={() => setPools(toggle(pools, p.id))} /> {p.name}
            </label>))}
        </fieldset>
        <p className="mb-1.5 mt-3.5 text-sm font-semibold">Hari &amp; Sesi Ketersediaan</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr><th className="p-2 text-left" />{SESSIONS.map((s) => <th key={s} className="p-2 text-left">{s.split(' ')[0]}</th>)}</tr></thead>
            <tbody>{DAYS.map((day, i) => (
              <tr key={day} className="border-t border-gray-200"><td className="p-2">{day}</td>
                {SESSIONS.map((s, j) => <td key={s} className="p-2"><input type="checkbox" aria-label={`${day} ${s}`} checked={slots.includes(`${i}|${j}`)} onChange={() => setSlots(toggle(slots, `${i}|${j}`))} /></td>)}
              </tr>))}</tbody>
          </table>
        </div>
      </>)}
      {error && <p role="alert" className="err">{error}</p>}
      <WizardNav step={step} max={3} finalLabel="Daftar" busy={booking.isPending} onBack={() => setStep(step - 1)} onNext={next} />
    </div>
  );
}

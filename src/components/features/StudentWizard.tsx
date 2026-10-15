'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input, Select } from '@/components/ui/Field';
import StepBar from './StepBar';
import WizardNav from './WizardNav';
import { useBooking } from '@/hooks/useBooking';
import { useProfile } from '@/hooks/useProfile';
import { CATEGORY_LABEL, CLASSES, POOLS, classPrice } from '@/lib/data';
import { calcAge, rupiah } from '@/lib/utils';
import { getAvailableTeachers } from '@/services/api';

const required: Record<number, string[]> = {
  1: ['name', 'pob', 'dob', 'sex', 'addr', 'wa', 'shirt'],
  2: ['pool', 'cls', 'date', 'time', 'teacher'],
  3: ['method'],
};

export default function StudentWizard() {
  const router = useRouter();
  const { data: user } = useProfile();
  const booking = useBooking('murid');
  const [step, setStep] = useState(1);
  const [d, setD] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<Record<string, File[]>>({});
  const [error, setError] = useState('');
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setD((p) => ({ ...p, [k]: e.target.value, ...(['pool', 'date', 'time'].includes(k) ? { teacher: '' } : {}) }));

  const ready = d.pool !== undefined && d.pool !== '' && d.date && d.time;
  const teachers = useQuery({
    queryKey: ['teachers', d.pool, d.date, d.time], enabled: !!ready,
    queryFn: () => getAvailableTeachers(+d.pool, d.date, d.time),
  });
  const pool = d.pool ? POOLS[+d.pool] : undefined;
  const price = pool && d.cls ? classPrice(pool, d.cls) * 8 : 0;

  function pickFiles(key: string, el: HTMLInputElement, max = 5) {
    const list = Array.from(el.files ?? []);
    if (list.length > max || list.some((f) => f.size > 100 * 1024 * 1024)) { setError('Maks 5 file, 100MB per file.'); el.value = ''; return; }
    setError(''); setFiles((p) => ({ ...p, [key]: list }));
  }

  function next() {
    if (required[step].some((k) => !d[k])) return setError('Lengkapi semua data yang wajib diisi.');
    if (step === 2 && !files.foto?.length) return setError('Upload foto pribadi 4x6 cm.');
    if (step === 3 && !files.bukti?.length) return setError('Upload bukti pembayaran.');
    if (step === 3 && d.method === 'Cash' && !files.dokumentasi?.length) return setError('Upload foto dokumentasi penyerahan uang.');
    setError('');
    if (step < 3) return setStep(step + 1);
    booking.mutate(
      { fields: { ...d, email: user?.email ?? '' }, files, name: d.name, price: price + 5000 },
      { onSuccess: () => router.push('/profile'), onError: (e) => setError(e.message) },
    );
  }

  return (
    <div className="form-card">
      <h1 className="h2">Pendaftaran Murid</h1>
      <StepBar step={step} />
      {step === 1 && (<>
        <Input label="Nama Lengkap" value={d.name ?? ''} onChange={set('name')} />
        <div className="grid gap-3 md:grid-cols-2">
          <div><Input label="Tempat Lahir" value={d.pob ?? ''} onChange={set('pob')} /></div>
          <div><Input label="Tanggal Lahir" type="date" value={d.dob ?? ''} onChange={set('dob')} /></div>
        </div>
        <Input label="Usia Saat Ini (otomatis)" readOnly value={d.dob ? `${calcAge(d.dob)} tahun` : ''} />
        <Select label="Jenis Kelamin" options={['Laki-laki', 'Perempuan']} value={d.sex ?? ''} onChange={set('sex')} />
        <Input label="Alamat Rumah" value={d.addr ?? ''} onChange={set('addr')} />
        <Input label="No. Telp / WA" type="tel" value={d.wa ?? ''} onChange={set('wa')} />
        <Input label="Email" readOnly value={user?.email ?? ''} />
        <Input label="Nama Sekolah / Kantor" value={d.org ?? ''} onChange={set('org')} />
        <Select label="Ukuran T-Shirt" options={['XS', 'S', 'M', 'L', 'XL', 'XXL']} value={d.shirt ?? ''} onChange={set('shirt')} />
      </>)}
      {step === 2 && (<>
        <label htmlFor="pool">Lokasi Kolam Renang</label>
        <select id="pool" value={d.pool ?? ''} onChange={set('pool')}>
          <option value="">-- Pilih --</option>
          {Object.entries(CATEGORY_LABEL).map(([c, label]) => (
            <optgroup key={c} label={label}>{POOLS.filter((p) => p.category === c).map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</optgroup>
          ))}
        </select>
        <Select label="Kelas Renang" options={[...CLASSES]} value={d.cls ?? ''} onChange={set('cls')} />
        <div className="grid gap-3 md:grid-cols-2">
          <div><Input label="Pertemuan ke-1 (Tanggal)" type="date" value={d.date ?? ''} onChange={set('date')} /></div>
          <div><Input label="Jam" type="time" value={d.time ?? ''} onChange={set('time')} /></div>
        </div>
        <label>Pilih Guru</label>
        {!ready ? <p className="text-sm text-slate-500">Pilih lokasi, tanggal, dan jam terlebih dahulu.</p>
          : teachers.isLoading ? <p className="animate-pulse text-sm">Mencari guru…</p>
          : teachers.data?.length ? teachers.data.map((t) => (
            <label key={t.id} className="mt-2 flex cursor-pointer items-center gap-2.5 rounded-[10px] border border-gray-300 px-3.5 py-2.5 text-sm font-normal">
              <input type="radio" name="teacher" checked={d.teacher === t.name} onChange={() => setD((p) => ({ ...p, teacher: t.name }))} /> <b>{t.name}</b> · {t.license}
            </label>))
          : <p role="alert" className="err">Tidak ada guru tersedia pada hari, jam, dan lokasi tersebut. Coba ubah jadwal.</p>}
        <label htmlFor="foto">Foto Pribadi 4x6 cm (maks 5 file, 100MB/file)</label>
        <input id="foto" type="file" accept="image/*" multiple onChange={(e) => pickFiles('foto', e.target)} />
      </>)}
      {step === 3 && pool && (<>
        <div className="rounded-2xl bg-az p-[22px]">
          <h2 className="mb-2 text-lg font-bold">Nota Pembayaran</h2>
          <table className="w-full text-sm">
            <tbody>
              <tr><td className="py-2">{pool.name}</td><td /></tr>
              <tr><td className="py-2">Kelas {d.cls} × 8 pertemuan</td><td className="text-right font-bold">{rupiah(price)}</td></tr>
              <tr><td className="py-2">Biaya admin</td><td className="text-right">{rupiah(5000)}</td></tr>
              <tr className="border-t border-pb/20"><td className="py-2 font-bold">Total</td><td className="text-right font-bold">{rupiah(price + 5000)}</td></tr>
            </tbody>
          </table>
        </div>
        <Select label="Metode Pembayaran" options={['QRIS', 'Transfer Bank', 'Cash']} value={d.method ?? ''} onChange={set('method')} />
        {d.method === 'QRIS' && <div className="mt-3 rounded-xl border border-gray-200 p-5 text-center"><div className="mx-auto grid h-36 w-36 place-items-center rounded-lg bg-td text-xs text-white">QR QRIS</div><p className="mt-2 text-sm">Scan QRIS untuk membayar</p></div>}
        {d.method === 'Transfer Bank' && <div className="mt-3 rounded-xl border border-gray-200 p-5 text-center">Bank Mandiri<br /><b className="text-xl">123-00-4567890-1</b><br />a.n. PT Tirya Lumba</div>}
        {d.method === 'Cash' && <><label htmlFor="dok">Foto dokumentasi penyerahan uang dengan pengelola</label><input id="dok" type="file" accept="image/*" onChange={(e) => pickFiles('dokumentasi', e.target, 1)} /></>}
        <label htmlFor="bukti">Upload Bukti Transfer / Pembayaran</label>
        <input id="bukti" type="file" onChange={(e) => pickFiles('bukti', e.target, 1)} />
      </>)}
      {error && <p role="alert" className="err">{error}</p>}
      <WizardNav step={step} max={3} finalLabel="Bayar Sekarang" busy={booking.isPending} onBack={() => setStep(step - 1)} onNext={next} />
    </div>
  );
}

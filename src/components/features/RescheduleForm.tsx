'use client';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import { useProfile } from '@/hooks/useProfile';
import { DAYS, SESSIONS, studentsOnDay } from '@/lib/data';
import { saveRegistration } from '@/services/auth';

export default function RescheduleForm() {
  const qc = useQueryClient();
  const { data: u } = useProfile();
  const [old, setOld] = useState('');
  const [nd, setNd] = useState('1');
  const [ns, setNs] = useState('0');
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  if (!u || u.role !== 'guru' || !u.registration) {
    return <div className="wrap py-20 text-center"><p className="mb-3">Halaman ini hanya untuk akun pelatih.</p><Button href="/profile">Kembali</Button></div>;
  }
  const reg = u.registration, slots = reg.slots ?? [];
  const update = async (patch: Partial<typeof reg>) => { await saveRegistration({ registration: { ...reg, ...patch } }); qc.invalidateQueries({ queryKey: ['profile'] }); };

  async function remove() {
    if (!old) return setMsg({ ok: false, text: 'Pilih jadwal terlebih dahulu.' });
    const day = Number(old.split('|')[0]);
    await update({ slots: slots.filter((s) => Number(s.split('|')[0]) !== day) });
    setOld(''); setMsg({ ok: true, text: `Ketersediaan mengajar hari ${DAYS[day]} dihapus.` });
  }
  async function request() {
    if (!old) return setMsg({ ok: false, text: 'Pilih jadwal terlebih dahulu.' });
    const [day, ses] = old.split('|').map(Number);
    if (studentsOnDay(day) > 0) return setMsg({ ok: false, text: `Request dibatalkan: Anda masih memiliki murid di hari ${DAYS[day]}.` });
    await update({ reqs: [...(reg.reqs ?? []), `${DAYS[day]} ${SESSIONS[ses]} → ${DAYS[+nd]} ${SESSIONS[+ns]}`] });
    setMsg({ ok: true, text: 'Request terkirim ke admin.' });
  }

  return (
    <div className="form-card max-w-[560px]">
      <h1 className="h2">Atur Ulang Jadwal</h1>
      <label htmlFor="old">Jadwal yang ingin diganti</label>
      <select id="old" value={old} onChange={(e) => setOld(e.target.value)}>
        <option value="">-- Pilih --</option>
        {slots.map((s) => { const [d, k] = s.split('|').map(Number); return <option key={s} value={s}>{DAYS[d]} · {SESSIONS[k]}</option>; })}
      </select>
      <div className="grid gap-3 md:grid-cols-2">
        <div><label htmlFor="nd">Hari baru</label><select id="nd" value={nd} onChange={(e) => setNd(e.target.value)}>{DAYS.map((x, i) => <option key={x} value={i}>{x}</option>)}</select></div>
        <div><label htmlFor="ns">Sesi baru</label><select id="ns" value={ns} onChange={(e) => setNs(e.target.value)}>{SESSIONS.map((x, i) => <option key={x} value={i}>{x}</option>)}</select></div>
      </div>
      {msg && <p role="alert" className={`mt-3 text-sm ${msg.ok ? 'text-emerald-700' : 'text-co'}`}>{msg.text}</p>}
      <div className="mt-6 flex flex-wrap gap-3">
        <Button variant="coral" onClick={remove}>Hapus Jadwal</Button>
        <Button onClick={request}>Request Persetujuan</Button>
      </div>
    </div>
  );
}

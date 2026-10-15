'use client';
import Button from '@/components/ui/Button';
import Skeleton from '@/components/ui/Skeleton';
import { useProfile } from '@/hooks/useProfile';
import { DAYS, POOLS, SESSIONS, TEACHERS, studentsOnDay } from '@/lib/data';
import { rupiah } from '@/lib/utils';

export default function ProfileView() {
  const { data: u, isLoading } = useProfile();
  if (isLoading) return <div className="wrap py-10"><Skeleton className="h-48" /></div>;
  if (!u) return <div className="wrap py-20 text-center"><Button href="/login">Masuk untuk melihat profil</Button></div>;
  const r = u.registration;

  return (
    <div className="min-h-[70vh] bg-db py-9">
      <div className="wrap">
        <h1 className="h2 mb-1.5">Profil {u.role === 'guru' ? 'Pelatih' : u.role === 'murid' ? 'Murid' : 'Pengguna'}</h1>
        <p className="mb-5">{u.name} · {u.email}</p>

        {!u.role || !r ? (
          <div className="card text-center"><p className="mb-4">Anda belum mendaftar sebagai murid / pelatih.</p><Button href="/daftar">Daftar Sekarang</Button></div>
        ) : r.status === 'rejected' ? (
          <div className="card border border-gray-200">
            <span className="badge bg-red-100 !text-co">Pendaftaran Ditolak</span>
            <p className="my-3"><b>Alasan:</b> {r.rejectReason ?? 'Dokumen pendukung kurang jelas.'}</p>
            <Button variant="coral" href="https://wa.me/6281234567890">Hubungi CS via WhatsApp</Button>
          </div>
        ) : u.role === 'murid' ? <StudentDash r={r} /> : <TeacherDash r={r} />}
      </div>
    </div>
  );
}

function StudentDash({ r }: { r: NonNullable<ReturnType<typeof useProfile>['data']>['registration'] & object }) {
  const d = r.data, pool = POOLS[+d.pool], teacher = TEACHERS.find((t) => t.name === d.teacher) ?? TEACHERS[0];
  const done = r.done ?? 0, active = 8 - done, start = new Date(d.date);
  const sessions = Array.from({ length: 8 }, (_, i) => { const x = new Date(start); x.setDate(x.getDate() + 7 * i); return x; });
  return (
    <>
      <div className="grid gap-5 md:grid-cols-3">
        <article className="card border border-gray-200"><h2 className="font-bold">👨‍🏫 Guru Anda</h2><p className="mt-2 font-semibold">{teacher.name}</p><p className="text-sm">{teacher.license}</p></article>
        <article className="card border border-gray-200"><h2 className="font-bold">📅 Jadwal Les</h2><p className="mt-2 text-sm"><b>{pool.name}</b><br />Kelas {d.cls}<br />{DAYS[start.getDay()]}, {d.time}</p><span className="badge">{active} sesi aktif</span></article>
        <article className="card border border-gray-200"><h2 className="font-bold">💳 Pembayaran</h2><p className="mt-2">{rupiah(r.price ?? 0)}</p><span className="badge">{r.method}</span></article>
      </div>
      <section className="card mt-5 border border-gray-200">
        <h2 className="mb-2 font-bold">Riwayat Pertemuan</h2>
        <table className="w-full text-sm"><tbody>
          {sessions.map((x, i) => (
            <tr key={i} className="border-b border-gray-200"><td className="p-2.5">Pertemuan {i + 1}</td>
              <td className="p-2.5">{x.toLocaleDateString('id-ID', { dateStyle: 'long' })}</td>
              <td className="p-2.5"><span className="badge">{i < done ? 'Selesai' : 'Terjadwal'}</span></td></tr>))}
        </tbody></table>
      </section>
      {active === 0 && (
        <section className="card mt-5 text-center"><h2 className="font-bold">Paket Anda Habis</h2><p className="my-2">Lanjutkan belajar dengan perpanjang paket.</p><Button href="/daftar/murid">Perpanjang Paket</Button></section>
      )}
    </>
  );
}

function TeacherDash({ r }: { r: NonNullable<ReturnType<typeof useProfile>['data']>['registration'] & object }) {
  const slots = (r.slots ?? []).map((s) => s.split('|').map(Number) as [number, number]);
  const pools = ((r.data.pools as number[]) ?? []).map((i) => POOLS[i]?.name).filter(Boolean);
  const total = new Set(slots.map(([d]) => d)).size && slots.reduce((a, [d]) => a + studentsOnDay(d), 0);
  return (
    <>
      <div className="grid gap-5 md:grid-cols-3">
        <article className="card border border-gray-200"><h2 className="font-bold">Kolam Mengajar</h2><p className="mt-2 text-sm">{pools.join(', ') || '-'}</p></article>
        <article className="card border border-gray-200"><h2 className="font-bold">Lisensi</h2><p className="mt-2">{r.data.lic}</p></article>
        <article className="card border border-gray-200"><h2 className="font-bold">Total Murid</h2><p className="font-head text-[40px] font-extrabold text-cy">{total}</p></article>
      </div>
      <section className="card mt-5 border border-gray-200">
        <div className="mb-2.5 flex items-center justify-between"><h2 className="font-bold">Jadwal Mengajar</h2><Button small href="/guru/atur-ulang-jadwal">Ajukan Jadwal Ulang</Button></div>
        <div className="overflow-x-auto"><table className="w-full text-sm">
          <thead><tr className="text-left"><th className="p-2.5">Hari</th><th className="p-2.5">Sesi</th><th className="p-2.5">Lokasi</th><th className="p-2.5">Murid</th></tr></thead>
          <tbody>{slots.length ? slots.map(([d, s]) => (
            <tr key={`${d}${s}`} className="border-t border-gray-200"><td className="p-2.5">{DAYS[d]}</td><td className="p-2.5">{SESSIONS[s]}</td><td className="p-2.5">{pools[0] ?? '-'}</td><td className="p-2.5">{studentsOnDay(d)}</td></tr>
          )) : <tr><td colSpan={4} className="p-2.5">Belum ada jadwal.</td></tr>}</tbody>
        </table></div>
      </section>
      {!!r.reqs?.length && <section className="card mt-4 border border-gray-200"><h2 className="font-bold">Request Terkirim</h2>{r.reqs.map((x) => <p key={x} className="text-sm">• {x} <span className="badge">Menunggu admin</span></p>)}</section>}
    </>
  );
}

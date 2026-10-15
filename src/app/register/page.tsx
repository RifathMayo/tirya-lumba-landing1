'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Field';
import PasswordInput from '@/components/ui/PasswordInput';
import { useAuthForm } from '@/hooks/useAuthForm';

export default function RegisterPage() {
  const router = useRouter();
  const { sendOtp, verify } = useAuthForm();
  const [creds, setCreds] = useState<{ email: string; password: string } | null>(null);
  const [error, setError] = useState('');
  const [hint, setHint] = useState('');
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (!creds || seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [creds, seconds]);

  function request(c: { email: string; password: string }) {
    sendOtp.mutate(c, {
      onSuccess: (r: any) => { setCreds(c); setSeconds(60); setError(''); if (r?.demoCode) setHint(`Kode OTP demo: ${r.demoCode} (atau 0000)`); },
      onError: (e) => setError(e.message),
    });
  }

  function submitCreds(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get('email')).trim().toLowerCase(), password = String(f.get('password'));
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError('Email tidak valid.');
    if (password.length < 6) return setError('Password minimal 6 karakter.');
    request({ email, password });
  }

  function submitOtp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const code = String(new FormData(e.currentTarget).get('otp')).trim().toUpperCase();
    if (code.length !== 4) return setError('Kode OTP terdiri dari 4 karakter.');
    verify.mutate({ email: creds!.email, code }, { onSuccess: () => router.push('/daftar'), onError: (err) => setError(err.message) });
  }

  if (creds) {
    return (
      <form onSubmit={submitOtp} className="form-card max-w-[560px]">
        <h1 className="h2">Verifikasi OTP</h1>
        <p>Masukkan 4 karakter kode yang dikirim ke <b>{creds.email}</b>.</p>
        {hint && <p className="mt-2 rounded-lg bg-az p-2 text-sm">{hint}</p>}
        <label htmlFor="otp" className="sr-only">Kode OTP</label>
        <input id="otp" name="otp" maxLength={4} autoComplete="one-time-code" className="mt-3.5 text-center font-head !text-3xl font-bold uppercase tracking-[12px]" />
        {error && <p role="alert" className="err">{error}</p>}
        <p className="my-3 text-sm" aria-live="polite">
          {seconds > 0 ? `Kirim ulang dalam ${seconds} detik` : <button type="button" className="underline-up" onClick={() => request(creds)}>Kirim ulang kode</button>}
        </p>
        <Button type="submit" className="w-full" disabled={verify.isPending}>{verify.isPending ? 'Memverifikasi…' : 'Verifikasi'}</Button>
      </form>
    );
  }

  return (
    <form onSubmit={submitCreds} className="form-card max-w-[560px]">
      <h1 className="h2">Buat Akun</h1>
      <Input label="Email" name="email" type="email" placeholder="nama@email.com" autoComplete="email" />
      <PasswordInput label="Password (min. 6 karakter)" name="password" autoComplete="new-password" />
      {error && <p role="alert" className="err">{error}</p>}
      <Button type="submit" className="mt-6 w-full" disabled={sendOtp.isPending}>{sendOtp.isPending ? 'Mengirim…' : 'Kirim Kode OTP'}</Button>
      <p className="mt-3.5 text-sm">Sudah punya akun? <Link href="/login" className="underline-up">Masuk</Link></p>
    </form>
  );
}

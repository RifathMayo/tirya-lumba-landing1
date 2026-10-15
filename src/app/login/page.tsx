'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Field';
import PasswordInput from '@/components/ui/PasswordInput';
import { useAuthForm } from '@/hooks/useAuthForm';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthForm();
  const [error, setError] = useState('');

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get('email')).trim().toLowerCase(), password = String(f.get('password'));
    if (!/^\S+@\S+\.\S+$/.test(email) || !password) return setError('Masukkan email valid dan password.');
    setError('');
    login.mutate({ email, password }, { onSuccess: () => router.push('/profile'), onError: (err) => setError(err.message) });
  }

  return (
    <form onSubmit={submit} className="form-card max-w-[560px]">
      <h1 className="h2">Masuk</h1>
      <p>Selamat datang kembali!</p>
      <Input label="Email" name="email" type="email" placeholder="nama@email.com" autoComplete="email" />
      <PasswordInput name="password" placeholder="••••••••" autoComplete="current-password" />
      {error && <p role="alert" className="err">{error}</p>}
      <Button type="submit" className="mt-6 w-full" disabled={login.isPending}>{login.isPending ? 'Memproses…' : 'Masuk'}</Button>
      <p className="mt-3.5 text-sm">Belum punya akun? <Link href="/register" className="underline-up">Daftar</Link></p>
      <p className="mt-2 text-xs opacity-60">Mode demo: email apa pun akan diterima.</p>
    </form>
  );
}

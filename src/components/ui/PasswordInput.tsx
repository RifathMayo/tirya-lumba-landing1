'use client';
import { useState, type InputHTMLAttributes } from 'react';

export default function PasswordInput({ label = 'Password', ...p }: { label?: string } & InputHTMLAttributes<HTMLInputElement>) {
  const [show, setShow] = useState(false);
  return (
    <>
      <label htmlFor="password">{label}</label>
      <input id="password" type={show ? 'text' : 'password'} {...p} />
      <button type="button" onClick={() => setShow(!show)} className="mt-1.5 text-[13px] text-pb underline focus:outline-none focus:ring-2 focus:ring-cy">
        {show ? '🙈 Sembunyikan' : '👁 Tampilkan'} password
      </button>
    </>
  );
}

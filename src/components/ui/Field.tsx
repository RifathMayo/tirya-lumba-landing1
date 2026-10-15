import type { InputHTMLAttributes, SelectHTMLAttributes } from 'react';

export function Input({ label, ...p }: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return <><label htmlFor={p.id || p.name}>{label}</label><input id={p.id || p.name} {...p} /></>;
}
export function Select({ label, options, ...p }: { label: string; options: string[] } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <><label htmlFor={p.id || p.name}>{label}</label>
      <select id={p.id || p.name} {...p}><option value="">-- Pilih --</option>{options.map((o) => <option key={o}>{o}</option>)}</select></>
  );
}

'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isMock } from '@/lib/mockDb';
import { saveRegistration } from '@/services/auth';
import type { Role } from '@/types';

/** Mengirim FormData ke server (atau menyimpan demo lokal) lalu menyegarkan profil. */
export function useBooking(role: Role) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (v: { fields: Record<string, any>; files: Record<string, File[]>; name: string; price?: number }) => {
      if (isMock) {
        return saveRegistration({
          name: v.name, role,
          registration: { status: 'approved', data: v.fields, price: v.price, done: 0, method: v.fields.method, slots: v.fields.slots, reqs: [] },
        });
      }
      const fd = new FormData();
      Object.entries(v.fields).forEach(([k, val]) => fd.append(k, typeof val === 'string' ? val : JSON.stringify(val)));
      Object.entries(v.files).forEach(([k, list]) => list.forEach((f) => fd.append(k, f)));
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${role}`, { method: 'POST', body: fd, credentials: 'include' });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).message || 'Gagal mengirim data.');
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['profile'] }),
  });
}

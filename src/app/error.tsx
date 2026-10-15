'use client';
import Button from '@/components/ui/Button';
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="wrap py-24 text-center">
      <h1 className="h2">Terjadi kesalahan</h1>
      <p className="my-4">Data tidak dapat dimuat. Coba muat ulang halaman.</p>
      <Button onClick={reset}>Coba Lagi</Button>
    </div>
  );
}

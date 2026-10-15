import Link from 'next/link';
import { cx } from '@/lib/utils';

export default function Pagination({ page, total, basePath = '/' }: { page: number; total: number; basePath?: string }) {
  if (total <= 1) return null;
  return (
    <nav aria-label="Halaman program" className="mt-7 flex justify-center gap-2">
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <Link
          key={n} href={`${basePath}?page=${n}#program`} scroll={false} aria-current={n === page ? 'page' : undefined}
          className={cx('grid h-[38px] w-[38px] place-items-center rounded-full border border-cy font-semibold focus:outline-none focus:ring-2 focus:ring-cy',
            n === page ? 'bg-cy text-white' : 'bg-white text-pb')}
        >{n}</Link>
      ))}
    </nav>
  );
}

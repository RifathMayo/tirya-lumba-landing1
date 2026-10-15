import Button from '@/components/ui/Button';
import ErrorMessage from '@/components/ui/ErrorMessage';
import PoolCard from './PoolCard';
import Pagination from './Pagination';
import type { Paged, Pool } from '@/types';

export const PAGE_SIZE = 6;

export default function ProgramSection({ pools, page }: { pools: Paged<Pool>; page: number }) {
  return (
    <section id="program" className="bg-az py-[70px]">
      <div className="wrap">
        <div className="mb-[26px] flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="h2">Program &amp; Kolam Renang</h2>
            <p>Pilih lokasi terdekat dengan Anda.</p>
          </div>
          <Button href="/daftar/murid">Daftar Sebagai Murid</Button>
        </div>
        {pools.error ? <ErrorMessage message={pools.error} /> : (
          <div className="grid gap-5 md:grid-cols-3">
            {pools.data.map((p) => <PoolCard key={p.id} data={p} />)}
          </div>
        )}
        <Pagination page={page} total={Math.ceil(pools.total / PAGE_SIZE)} />
      </div>
    </section>
  );
}

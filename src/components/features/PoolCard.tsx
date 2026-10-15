import type { Pool } from '@/types';
import { mapsUrl, rupiah } from '@/lib/utils';

export default function PoolCard({ data }: { data: Pool }) {
  return (
    <article className="card transition duration-300 hover:-translate-y-1">
      <h3 className="text-lg font-bold text-pb">🏊 {data.name}</h3>
      <a href={mapsUrl(data.lat, data.lng)} target="_blank" rel="noopener noreferrer" className="my-2 block text-sm text-slate-600">
        📍 {data.address} <span className="underline-up text-[13px]">Lihat peta ↗</span>
      </a>
      {[['Reguler', data.priceRegular], ['Private', data.pricePrivate]].map(([label, price]) => (
        <div key={label} className="mt-2 flex justify-between rounded-[10px] bg-az px-3 py-2 text-sm">
          <span>{label}</span><b>{rupiah(price as number)}</b>
        </div>
      ))}
    </article>
  );
}

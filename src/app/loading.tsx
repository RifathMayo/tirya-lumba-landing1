import Skeleton from '@/components/ui/Skeleton';
export default function Loading() {
  return (
    <div className="wrap space-y-6 py-16" aria-busy="true">
      <Skeleton className="h-64" />
      <div className="grid gap-5 md:grid-cols-3">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-40" />)}</div>
    </div>
  );
}

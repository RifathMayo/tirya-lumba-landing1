export default function StepBar({ step, total = 3 }: { step: number; total?: number }) {
  return (
    <div role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={total} aria-label={`Langkah ${step} dari ${total}`}>
      <div className="mb-2 flex gap-1.5">
        {Array.from({ length: total }, (_, i) => <i key={i} className={`h-1.5 flex-1 rounded-full ${i < step ? 'bg-cy' : 'bg-gray-300'}`} />)}
      </div>
      <p className="text-[13px]">Langkah {step} dari {total}</p>
    </div>
  );
}

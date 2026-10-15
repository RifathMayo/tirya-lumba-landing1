import Button from '@/components/ui/Button';

export default function WizardNav({ step, max, finalLabel, busy, onBack, onNext }: {
  step: number; max: number; finalLabel: string; busy?: boolean; onBack: () => void; onNext: () => void;
}) {
  return (
    <div className="mt-6 flex justify-between">
      {step > 1 ? <Button variant="outline" onClick={onBack}>Kembali</Button> : <span />}
      <Button onClick={onNext} disabled={busy}>{busy ? 'Mengirim…' : step === max ? finalLabel : 'Lanjut'}</Button>
    </div>
  );
}

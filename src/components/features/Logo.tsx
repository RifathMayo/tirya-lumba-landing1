import Image from 'next/image';

export default function Logo({ size = 44 }: { size?: number }) {
  return (
    <span className="flex items-center gap-2.5 font-head text-lg font-extrabold leading-tight text-pb">
      <Image src="/logo.webp" alt="Logo PT Tirya Lumba Swimming School" width={size} height={Math.round(size * 0.94)} priority />
      <span className="hidden sm:block">Tirya Lumba<small className="block text-[11px] font-semibold text-slate-500">Swimming School</small></span>
    </span>
  );
}

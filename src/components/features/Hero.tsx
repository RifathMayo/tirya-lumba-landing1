import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="overflow-hidden bg-gradient-to-br from-az via-white to-white pb-[130px] pt-[90px]">
      <div className="wrap grid items-center gap-8 md:grid-cols-[1.1fr_.9fr]">
        <div>
          <span className="badge">🌊 Sekolah Renang Terpercaya</span>
          <h1 className="mt-3.5 text-[34px] font-extrabold leading-[42px] text-pb md:text-5xl md:leading-[56px]">
            Selami Kepercayaan Diri Bersama Tirya Lumba
          </h1>
          <p className="my-[18px] mb-7 max-w-[520px] text-lg">
            Belajar berenang aman, menyenangkan, dan terarah bersama pelatih bersertifikat di kolam terbaik se-Tangerang Raya.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/daftar">Daftar Sekarang</Button>
            <Button href="/#tentang-kami" variant="outline">Tentang Kami</Button>
          </div>
        </div>
        <div className="relative mx-auto grid w-full max-w-[420px] place-items-center rounded-[32px] bg-gradient-to-b from-cy to-pb p-10 shadow-soft">
          <div className="rounded-3xl bg-white/90 p-6">
            <Image src="/logo.webp" alt="Logo PT Tirya Lumba Swimming School, sejak 2003" width={294} height={277} priority className="h-auto w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

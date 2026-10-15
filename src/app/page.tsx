import Hero from '@/components/features/Hero';
import ProgramSection, { PAGE_SIZE } from '@/components/features/ProgramSection';
import { AboutSection, BrandSection, WhySection } from '@/components/features/AboutSections';
import { getPools, getStats } from '@/services/api';

export default async function HomePage({ searchParams }: { searchParams: { page?: string } }) {
  const page = Math.max(1, Number(searchParams.page) || 1);
  // Query paralel untuk mencegah waterfall.
  const [pools, stats] = await Promise.all([getPools(page, PAGE_SIZE), getStats()]);
  return (
    <>
      <Hero />
      <BrandSection />
      <ProgramSection pools={pools} page={page} />
      <AboutSection />
      <WhySection stats={stats} />
    </>
  );
}

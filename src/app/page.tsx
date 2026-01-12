import { HeroSection } from '@/components/home/HeroSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { AboutPreview } from '@/components/home/AboutPreview';
import { LocationSection } from '@/components/home/LocationSection';
import { ReviewsSection } from '@/components/home/ReviewsSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutPreview />
      <LocationSection />
      <ReviewsSection />
    </>
  );
}








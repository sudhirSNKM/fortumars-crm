import { useEffect } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { ParticleBackground } from "@/components/landing/ParticleBackground";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { DashboardPreview } from "@/components/landing/DashboardPreview";
import { WorkflowSection } from "@/components/landing/WorkflowSection";
import { ComparisonSection } from "@/components/landing/ComparisonSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";
import { MobileStickyCTA } from "@/components/landing/MobileStickyCTA";

const Index = () => {
  // Set dark mode by default
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Particle background */}
      <ParticleBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <HeroSection />
        <FeaturesSection />
        <DashboardPreview />
        <WorkflowSection />
        <ComparisonSection />
        <TestimonialsSection />
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile sticky CTA */}
      <MobileStickyCTA />
    </div>
  );
};

export default Index;

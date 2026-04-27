import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import BentoFeatures from "@/components/landing/BenefitsSection";
import CustomizationSection from "@/components/landing/CustomizationSection";
import PricingSection from "@/components/landing/PricingSection";
import FinalCTASection from "@/components/landing/FinalCTASection";
import Footer from "@/components/landing/Footer";
import Reveal from "@/components/landing/Reveal";

const Index = () => {
  const { user, loading } = useAuth();

  // Redirect authenticated users to dashboard
  if (!loading && user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <Reveal><HowItWorksSection /></Reveal>
      <Reveal delay={80}><BentoFeatures /></Reveal>
      <Reveal delay={80}><CustomizationSection /></Reveal>
      <Reveal delay={80}><PricingSection /></Reveal>
      <Reveal delay={120}><FinalCTASection /></Reveal>
      <Footer />
    </div>
  );
};

export default Index;

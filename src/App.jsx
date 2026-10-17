import { useState } from "react";
import SmoothScroll from "./components/SmoothScroll.jsx";
import Preloader from "./components/Preloader.jsx";
import ScrollTelemetry from "./components/ScrollTelemetry.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import ThreeReasons from "./components/ThreeReasons.jsx";
import ArchScrollSequence from "./components/ArchScrollSequence.jsx";
import DragExplore from "./components/DragExplore.jsx";
import AboutPillars from "./components/AboutPillars.jsx";
import SpaceArchTransition from "./components/SpaceArchTransition.jsx";
import SpaceToLive from "./components/SpaceToLive.jsx";
import Materiality from "./components/Materiality.jsx";
import ServicesBento from "./components/ServicesBento.jsx";
import GrandClosingSequence from "./components/GrandClosingSequence.jsx";
import BookingSection from "./components/BookingSection.jsx";
import Footer from "./components/Footer.jsx";
import BookCallModal from "./components/BookCallModal.jsx";
import CookiesBanner from "./components/CookiesBanner.jsx";

export default function App() {
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  return (
    <SmoothScroll>
      <Preloader />
      <ScrollTelemetry />
      <main className="relative w-full max-w-full overflow-x-hidden bg-[var(--bg-parchment)] text-[var(--text-ink)] selection:bg-[var(--accent-gold)] selection:text-[var(--text-bone)]">
        <Navbar onOpenBookModal={() => setIsBookModalOpen(true)} />
        {/* Hero with direct rising arch dome ("buletan") and BUILT TO STAY transition */}
        <Hero />

        {/* 1. ERA Residence Horizontal Pinned Card Scroll */}
        <ThreeReasons />

        {/* 2. ERA Residence Diptych Windows (Clean & Flower-Free) + Monumental Architecture Reveal */}
        <ArchScrollSequence />

        {/* 3. Drag & Horizontal Typologies */}
        <DragExplore />

        {/* 4. About REdesign (Image 2) */}
        <AboutPillars />

        {/* 5. ERA Rising White Arch Dome Transition ("buletan") connecting About to Space to Live */}
        <SpaceArchTransition />

        {/* 6. Space to Live (Image 3) */}
        <SpaceToLive />
        <Materiality />
        <ServicesBento />

        {/* 7. ERA Residence Grand Closing Sequence (Images 2 -> 3 -> 4 with Photo 5 Background) */}
        <GrandClosingSequence onOpenBookModal={() => setIsBookModalOpen(true)} />

        {/* 8. Dedicated Consultation & Project Inquiry Section */}
        <BookingSection />

        <Footer />
      </main>

      {/* Global Slide-In Modal for Consultation Requests */}
      <BookCallModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
      />

      {/* Architectural Cookies Consent Card */}
      <CookiesBanner />
    </SmoothScroll>
  );
}
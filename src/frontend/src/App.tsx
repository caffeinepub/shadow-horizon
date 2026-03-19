import { useEffect, useState } from "react";
import AdminPanel from "./components/AdminPanel";
import CommunityRequestsSection from "./components/CommunityRequestsSection";
import DiscordFloatingButton from "./components/DiscordFloatingButton";
import Footer from "./components/Footer";
import FreeServicesSection from "./components/FreeServicesSection";
import HeroSection from "./components/HeroSection";
import InviteRewardsSection from "./components/InviteRewardsSection";
import MinecraftHostingSection from "./components/MinecraftHostingSection";
import Navbar from "./components/Navbar";
import StoreSection from "./components/StoreSection";
import { useActor } from "./hooks/useActor";

const PARTICLE_COUNT = 20;

function Particles() {
  const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    duration: `${10 + Math.random() * 20}s`,
    delay: `${Math.random() * 15}s`,
    color: i % 2 === 0 ? "#00f5ff" : "#a855f7",
    size: `${2 + Math.random() * 3}px`,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            animationDuration: p.duration,
            animationDelay: p.delay,
            background: p.color,
            width: p.size,
            height: p.size,
            boxShadow: `0 0 6px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
}

function useRoute() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const handler = () => setHash(window.location.hash);
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  return hash;
}

function MainApp() {
  const { actor } = useActor();

  useEffect(() => {
    if (actor) {
      actor.incrementVisits().catch(() => {});
    }
  }, [actor]);

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage:
          "url('/assets/generated/city-bridge-bg.dim_1920x1080.jpg')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/65 z-0" aria-hidden="true" />
      {/* Ambient particles */}
      <Particles />

      <div className="relative z-10">
        <Navbar />
        <main>
          <HeroSection />
          <FreeServicesSection />
          <InviteRewardsSection />
          <StoreSection />
          <MinecraftHostingSection />
          <CommunityRequestsSection />
        </main>
        <Footer />
      </div>

      <DiscordFloatingButton />
    </div>
  );
}

export default function App() {
  const hash = useRoute();

  if (hash === "#/panel") {
    return <AdminPanel />;
  }

  return <MainApp />;
}

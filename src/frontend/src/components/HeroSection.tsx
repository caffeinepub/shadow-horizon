export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center text-center px-4"
      style={{ paddingTop: "64px" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Main title */}
        <div className="fade-up">
          <h1 className="font-orbitron text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#00f5ff] hero-glow-anim mb-4 leading-tight">
            🌌 SHADOW HORIZON
          </h1>
        </div>

        <div className="fade-up-delay-1">
          <p className="font-orbitron text-base sm:text-lg md:text-xl text-white/80 tracking-widest mb-8 uppercase">
            Community&nbsp;•&nbsp;Services&nbsp;•&nbsp;Gaming&nbsp;•&nbsp;Rewards
          </p>
        </div>

        {/* CTA buttons */}
        <div className="fade-up-delay-2 flex flex-wrap items-center justify-center gap-4 mb-12">
          <a
            href="https://discord.gg/dSk3AGntm"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neon-cyan"
            data-ocid="hero.primary_button"
          >
            Join Discord
          </a>
          <a
            href="#rewards"
            className="btn-neon-purple"
            data-ocid="hero.secondary_button"
          >
            Explore Rewards
          </a>
        </div>

        {/* Trust badges */}
        <div className="fade-up-delay-3 flex flex-wrap justify-center gap-3">
          {[
            { icon: "👥", text: "500+ Members" },
            { icon: "✅", text: "Verified Seller" },
            { icon: "⚡", text: "Instant Delivery" },
            { icon: "🛡️", text: "24/7 Support" },
          ].map((badge) => (
            <div
              key={badge.text}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide"
              style={{
                background: "rgba(0, 245, 255, 0.06)",
                border: "1px solid rgba(0, 245, 255, 0.35)",
                color: "#00f5ff",
              }}
            >
              <span>{badge.icon}</span>
              <span className="font-orbitron">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 fade-up-delay-4">
        <div className="w-6 h-10 rounded-full border-2 border-[#00f5ff]/40 flex items-start justify-center pt-2">
          <div
            className="w-1.5 h-3 rounded-full bg-[#00f5ff]"
            style={{
              animation: "float-particle 1.5s ease-in-out infinite alternate",
            }}
          />
        </div>
      </div>
    </section>
  );
}

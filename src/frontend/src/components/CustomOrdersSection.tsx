const DISCORD_URL = "https://discord.gg/dSk3AGntm";

const customItems = [
  "🎮 Any Game",
  "🌐 Any Website",
  "💎 Any Account",
  "📈 Any Growth",
  "🛠️ Any Service",
];

export default function CustomOrdersSection() {
  return (
    <section
      className="py-20 px-4 relative overflow-hidden"
      style={{ background: "#080C15" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(168,85,247,0.08) 0%, transparent 70%)",
        }}
      />
      <div className="max-w-[800px] mx-auto text-center relative z-10">
        <h2
          className="section-title text-[#A855F7] glow-purple"
          style={{ fontSize: "clamp(1.4rem, 4vw, 2rem)" }}
        >
          🌟 Need Something Else?
        </h2>
        <p className="mt-4 text-[#A9B3C7] font-rajdhani text-lg leading-relaxed max-w-xl mx-auto">
          Anything you need, we provide.{" "}
          <span className="text-[#EAF0FF]">
            Custom orders are available for any service or game.
          </span>{" "}
          We have proofs for everything — your trust is our priority.
        </p>
        <div
          className="mt-8 p-6 rounded-2xl"
          style={{
            background: "linear-gradient(135deg, #0E0A1E 0%, #130E28 100%)",
            border: "1px solid rgba(168,85,247,0.3)",
            boxShadow: "0 0 30px rgba(168,85,247,0.15)",
          }}
        >
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {customItems.map((item) => (
              <span
                key={item}
                className="font-rajdhani font-semibold text-sm px-4 py-1.5 rounded-full"
                style={{
                  background: "rgba(168,85,247,0.1)",
                  border: "1px solid rgba(168,85,247,0.25)",
                  color: "#D4A8FF",
                }}
              >
                {item}
              </span>
            ))}
          </div>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-purple inline-block px-10 py-3 rounded-full font-orbitron text-sm font-bold tracking-widest uppercase"
            data-ocid="custom-orders.primary_button"
          >
            Place Custom Order
          </a>
        </div>
      </div>
    </section>
  );
}

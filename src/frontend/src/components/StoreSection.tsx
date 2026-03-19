const DISCORD = "https://discord.gg/dSk3AGntm";

const CATEGORIES = [
  {
    name: "Game Development",
    icon: "🎮",
    items: [
      { name: "Basic Game Dev", price: "$10" },
      { name: "Standard Game Dev", price: "$25" },
      { name: "Pro Game Dev", price: "$50" },
    ],
  },
  {
    name: "Web Development",
    icon: "🌐",
    items: [
      { name: "Landing Page", price: "$15" },
      { name: "Full Website", price: "$40" },
      { name: "E-commerce Site", price: "$80" },
    ],
  },
  {
    name: "Premium Games",
    icon: "🕹️",
    items: [
      { name: "Budget Game Account", price: "$3" },
      { name: "Mid-Tier Account", price: "$8" },
      { name: "Premium Account", price: "$15" },
    ],
  },
  {
    name: "Discord Perks",
    icon: "💬",
    items: [
      { name: "Bot Setup", price: "$5" },
      { name: "Server Setup", price: "$10" },
      { name: "Full Discord Package", price: "$20" },
    ],
  },
  {
    name: "Social Growth",
    icon: "📈",
    items: [
      { name: "1k YouTube Views", price: "$5" },
      { name: "1k Instagram Followers", price: "$8" },
      { name: "Growth Bundle", price: "$20" },
    ],
  },
];

export default function StoreSection() {
  return (
    <section id="store" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-orbitron text-xs tracking-[0.3em] text-[#00f5ff] uppercase mb-3">
            Premium Services
          </p>
          <h2 className="section-title text-4xl sm:text-5xl glow-cyan">
            Paid Store
          </h2>
          <div className="gradient-divider max-w-xs mx-auto mt-4" />
          <div
            className="inline-flex items-center gap-2 mt-5 px-5 py-2 rounded-full text-sm"
            style={{
              background: "rgba(0,245,255,0.06)",
              border: "1px solid rgba(0,245,255,0.3)",
              color: "#00f5ff",
            }}
          >
            <span>✅</span>
            <span className="font-orbitron text-xs tracking-wider">
              We Have Proofs For Everything — Legit & Non-Drop
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, ci) => (
            <div
              key={cat.name}
              className="glass-card p-6"
              data-ocid={`store.item.${ci + 1}`}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="font-orbitron font-bold text-sm uppercase tracking-wide text-[#00f5ff]">
                  {cat.name}
                </h3>
              </div>
              <div className="space-y-3 mb-5">
                {cat.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between py-2 border-b border-white/10"
                  >
                    <span className="text-white/75 text-sm">{item.name}</span>
                    <span className="font-orbitron font-bold text-[#a855f7] text-sm">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
              <a
                href={DISCORD}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-neon-cyan w-full block text-center text-xs"
                data-ocid={`store.primary_button.${ci + 1}`}
              >
                Order via Discord
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const DISCORD = "https://discord.gg/Af8PrYaJyJ";

const CATEGORIES = [
  {
    name: "Services",
    icon: "💻",
    color: "cyan",
    items: [
      { name: "3D Game Development (PC/Mobile)", price: "₹99 / $1" },
      { name: "Website Development", price: "₹49 / $0.50" },
    ],
  },
  {
    name: "Gaming",
    icon: "🎮",
    color: "purple",
    items: [{ name: "Premium Games (GTA V, RE, Forza...)", price: "₹9" }],
  },
  {
    name: "Minecraft Hosting",
    icon: "🖥️",
    color: "cyan",
    items: [
      {
        name: "32GB RAM / 800% CPU / 160GB",
        price: "₹299",
        badge: "30% OFF + Free Dev",
      },
      { name: "8GB RAM / 300% CPU / 20GB", price: "₹79" },
    ],
  },
  {
    name: "Discord",
    icon: "💜",
    color: "purple",
    items: [
      { name: "Nitro Basic", price: "₹19" },
      { name: "Nitro + 15 Boosts", price: "₹49" },
    ],
  },
  {
    name: "Social Growth",
    icon: "📈",
    color: "cyan",
    items: [
      { name: "YouTube 100 Subscribers", price: "₹3" },
      {
        name: "YouTube 1000 Subs (No Drop)",
        price: "₹29",
        badge: "Guaranteed",
      },
      { name: "YouTube Views 2K", price: "₹5" },
      { name: "Instagram 1K Followers", price: "₹5" },
      { name: "Instagram 50K Views", price: "₹10" },
    ],
  },
];

export default function StoreSection() {
  return (
    <section id="store" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-orbitron text-xs tracking-[0.3em] text-[#00f5ff] uppercase mb-3">
            Premium Offerings
          </p>
          <h2 className="section-title text-4xl sm:text-5xl glow-cyan">
            🛒 Paid Store
          </h2>
          <div className="gradient-divider max-w-xs mx-auto mt-4" />
          <div className="flex flex-wrap justify-center gap-3 mt-5">
            {["✔ NON DROP", "✔ 100% Legit", "✔ Proof Available"].map((b) => (
              <span
                key={b}
                className="font-orbitron text-xs px-4 py-1.5 rounded-full"
                style={{
                  background: "rgba(0,245,255,0.06)",
                  border: "1px solid rgba(0,245,255,0.3)",
                  color: "#00f5ff",
                }}
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, ci) => {
            const isCyan = cat.color === "cyan";
            return (
              <div
                key={cat.name}
                className="glass-card p-6 flex flex-col"
                style={{
                  borderColor: isCyan
                    ? "rgba(0,245,255,0.2)"
                    : "rgba(168,85,247,0.2)",
                }}
                data-ocid={`store.item.${ci + 1}`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">{cat.icon}</span>
                  <h3
                    className="font-orbitron font-bold text-sm uppercase tracking-wide"
                    style={{ color: isCyan ? "#00f5ff" : "#a855f7" }}
                  >
                    {cat.name}
                  </h3>
                </div>
                <div className="space-y-3 mb-5 flex-1">
                  {cat.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-start justify-between gap-2 py-2 border-b border-white/10"
                    >
                      <div>
                        <span className="text-white/75 text-sm block leading-snug">
                          {item.name}
                        </span>
                        {"badge" in item && item.badge && (
                          <span
                            className="text-[10px] font-orbitron px-2 py-0.5 rounded mt-1 inline-block"
                            style={{
                              background: isCyan
                                ? "rgba(0,245,255,0.12)"
                                : "rgba(168,85,247,0.12)",
                              color: isCyan ? "#00f5ff" : "#a855f7",
                              border: `1px solid ${isCyan ? "rgba(0,245,255,0.3)" : "rgba(168,85,247,0.3)"}`,
                            }}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <span
                        className="font-orbitron font-bold text-sm whitespace-nowrap"
                        style={{ color: isCyan ? "#00f5ff" : "#a855f7" }}
                      >
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
                <a
                  href={DISCORD}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={isCyan ? "btn-neon-cyan" : "btn-neon-purple"}
                  style={{
                    textAlign: "center",
                    display: "block",
                    fontSize: "0.75rem",
                  }}
                  data-ocid={`store.primary_button.${ci + 1}`}
                >
                  Order via Discord
                </a>
              </div>
            );
          })}
        </div>

        {/* Extra / custom orders */}
        <div
          className="mt-12 glass-card p-8 text-center"
          style={{
            border: "1px solid rgba(168,85,247,0.3)",
            boxShadow: "0 0 30px rgba(168,85,247,0.1)",
          }}
        >
          <p className="font-orbitron text-xs tracking-[0.3em] text-[#a855f7] uppercase mb-3">
            Custom Orders
          </p>
          <h3 className="font-orbitron text-2xl sm:text-3xl font-bold text-white mb-3">
            🌟 Anything You Need, We Provide
          </h3>
          <p className="text-white/65 text-sm max-w-xl mx-auto mb-2">
            Don't see what you're looking for? We take custom orders for almost
            anything.
          </p>
          <p className="text-[#a855f7] text-sm font-semibold mb-6">
            We have proofs for everything.
          </p>
          <a
            href={DISCORD}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neon-purple"
            data-ocid="store.custom_button"
          >
            Place a Custom Order
          </a>
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  {
    icon: "🎮",
    title: "Free Minecraft Hosting",
    desc: "Limited free tier Minecraft server hosting for our community members. Get started with your own server today.",
    color: "cyan",
  },
  {
    icon: "🌐",
    title: "Free Website Dev",
    desc: "We build free websites for community members. Landing pages, portfolios, and simple projects covered.",
    color: "purple",
  },
  {
    icon: "💻",
    title: "Dev Help & Tech Support",
    desc: "Need coding help or tech support? Our team assists with bugs, setups, and development questions.",
    color: "cyan",
  },
  {
    icon: "🎁",
    title: "Weekly Giveaways",
    desc: "Every Sunday — game keys, gift cards, accounts and more. Join Discord to participate in our weekly drops.",
    color: "purple",
  },
  {
    icon: "🏆",
    title: "Free Game Rewards",
    desc: "Free game accounts and in-game rewards for active community members. Stay active, earn more.",
    color: "cyan",
  },
];

export default function FreeServicesSection() {
  return (
    <section id="services" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-orbitron text-xs tracking-[0.3em] text-[#00f5ff] uppercase mb-3">
            What We Offer
          </p>
          <h2 className="section-title text-4xl sm:text-5xl glow-cyan">
            Free Services
          </h2>
          <div className="gradient-divider max-w-xs mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className="glass-card p-6 group transition-all duration-300 hover:-translate-y-1"
              style={{
                borderColor:
                  s.color === "cyan"
                    ? "rgba(0,245,255,0.2)"
                    : "rgba(168,85,247,0.2)",
                animationDelay: `${i * 0.1}s`,
              }}
              data-ocid={`services.item.${i + 1}`}
            >
              <div
                className="text-4xl mb-4"
                style={{
                  filter:
                    s.color === "cyan"
                      ? "drop-shadow(0 0 8px rgba(0,245,255,0.7))"
                      : "drop-shadow(0 0 8px rgba(168,85,247,0.7))",
                }}
              >
                {s.icon}
              </div>
              <h3
                className="font-orbitron font-bold text-base mb-2 uppercase tracking-wide"
                style={{ color: s.color === "cyan" ? "#00f5ff" : "#a855f7" }}
              >
                {s.title}
              </h3>
              <p className="text-white/65 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

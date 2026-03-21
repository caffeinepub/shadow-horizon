import { useEffect, useState } from "react";
import type { MCPlan } from "../backend.d";
import { useActor } from "../hooks/useActor";

const DEFAULT_PLANS: MCPlan[] = [
  {
    id: "free",
    name: "Free Tier",
    price: "Free",
    description: "Perfect for small communities just starting out.",
    features: [
      "512MB RAM",
      "5 Player Slots",
      "Basic Plugins",
      "Community Support",
    ],
    isActive: true,
  },
  {
    id: "basic",
    name: "Basic",
    price: "$3/mo",
    description: "Great for growing servers with more players.",
    features: [
      "2GB RAM",
      "20 Player Slots",
      "Full Plugin Support",
      "Daily Backups",
      "Priority Support",
    ],
    isActive: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$7/mo",
    description: "Maximum performance for serious server owners.",
    features: [
      "4GB RAM",
      "50 Player Slots",
      "DDoS Protection",
      "Custom Domain",
      "24/7 Priority Support",
      "Unlimited Plugins",
    ],
    isActive: true,
  },
];

export default function MinecraftHostingSection() {
  const { actor, isFetching } = useActor();
  const [plans, setPlans] = useState<MCPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!actor || isFetching) return;
    actor
      .getActivePlans()
      .then((p) => setPlans(p.length > 0 ? p : DEFAULT_PLANS))
      .catch(() => setPlans(DEFAULT_PLANS))
      .finally(() => setLoading(false));
  }, [actor, isFetching]);

  return (
    <section id="hosting" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-orbitron text-xs tracking-[0.3em] text-[#a855f7] uppercase mb-3">
            Game Servers
          </p>
          <h2 className="section-title text-4xl sm:text-5xl glow-purple">
            Minecraft Hosting
          </h2>
          <div className="gradient-divider max-w-xs mx-auto mt-4" />
          <p className="text-white/60 mt-4 text-sm">
            High-performance Minecraft servers for every budget.
          </p>
        </div>

        {loading ? (
          <div
            className="flex justify-center items-center py-20"
            data-ocid="hosting.loading_state"
          >
            <div className="w-10 h-10 rounded-full border-2 border-[#a855f7] border-t-transparent animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <div
                key={plan.id}
                className={`glass-card p-7 flex flex-col relative transition-all duration-300 hover:-translate-y-1 ${
                  i === 1 ? "border-[#a855f7]/40 box-glow-purple" : ""
                }`}
                data-ocid={`hosting.item.${i + 1}`}
              >
                {i === 1 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span
                      className="font-orbitron text-xs px-3 py-1 rounded-full"
                      style={{
                        background: "rgba(168,85,247,0.25)",
                        border: "1px solid rgba(168,85,247,0.6)",
                        color: "#a855f7",
                      }}
                    >
                      ✦ POPULAR
                    </span>
                  </div>
                )}
                <h3 className="font-orbitron font-bold text-lg text-white mb-1">
                  {plan.name}
                </h3>
                <p className="text-[#a855f7] font-orbitron font-black text-3xl mb-2">
                  {plan.price}
                </p>
                <p className="text-white/55 text-sm mb-5">{plan.description}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-white/75"
                    >
                      <span className="text-[#00f5ff] text-xs">◈</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://discord.gg/Af8PrYaJyJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    i === 1
                      ? "btn-neon-purple w-full block text-center text-xs"
                      : "btn-neon-cyan w-full block text-center text-xs"
                  }
                  data-ocid={`hosting.primary_button.${i + 1}`}
                >
                  Order via Discord
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

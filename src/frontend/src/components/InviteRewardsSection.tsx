const REWARDS = [
  {
    invites: 2,
    icon: "🎮",
    reward: "Random Minecraft/Steam Account",
    extra: "+ MCFA Donut Unban (4 Months)",
  },
  {
    invites: 3,
    icon: "🌐",
    reward: "Free Website Development",
    extra: "+ Tech Support",
  },
  {
    invites: 4,
    icon: "🏆",
    reward: "Premium Game Account",
    extra: "+ Free Games (GTA, etc.)",
  },
  {
    invites: 5,
    icon: "💎",
    reward: "80 Diamonds (Free Fire)",
    extra: "+ Minecraft Server 3GB 24/7",
  },
  {
    invites: 6,
    icon: "🕹️",
    reward: "Free Game Accounts",
    extra: "+ Methods",
  },
  {
    invites: 8,
    icon: "🚀",
    reward: "Discord Nitro Basic",
    extra: "6 Months",
  },
  {
    invites: 10,
    icon: "✨",
    reward: "Premium Discord Account",
    extra: "+ Robux Voucher",
  },
  {
    invites: 12,
    icon: "🖥️",
    reward: "Minecraft Server 4GB 24/7",
    extra: "+ Dev Support",
  },
  {
    invites: 16,
    icon: "💵",
    reward: "₹80 / $1 Cash Reward",
    extra: "",
  },
  {
    invites: 20,
    icon: "🎁",
    reward: "₹150 / $2 Google Play Gift Card",
    extra: "",
  },
  {
    invites: 25,
    icon: "⭐",
    reward: "Premium Role",
    extra: "+ Boost Benefits",
  },
  {
    invites: 30,
    icon: "👑",
    reward: "MEGA REWARD BUNDLE",
    extra: "See details below",
    mega: true,
  },
];

const MEGA_REWARDS = [
  "3 Minecraft Premium Accounts",
  "Steam/Epic Account (50+ Games)",
  "YouTube Promotion (30K+ Views)",
  "OR ₹800 / $10 Equivalent",
  "Free Website with Custom Domain",
  "Any In-Game Account (FF, MC, BGMI, GTA V...)",
];

export default function InviteRewardsSection() {
  return (
    <section id="rewards" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-orbitron text-xs tracking-[0.3em] text-[#a855f7] uppercase mb-3">
            Grow the Community
          </p>
          <h2 className="section-title text-4xl sm:text-5xl glow-purple">
            🎉 Invite Rewards 🎉
          </h2>
          <div className="gradient-divider max-w-xs mx-auto mt-4" />
          <p className="text-white/60 mt-4 max-w-lg mx-auto text-sm">
            Invite friends and unlock rewards. More invites = better rewards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {REWARDS.filter((r) => !r.mega).map((r, i) => (
            <div
              key={r.invites}
              className="glass-card p-5 text-center group transition-all duration-300 hover:-translate-y-1 hover:border-[#a855f7]/40"
              data-ocid={`rewards.item.${i + 1}`}
            >
              <div
                className="text-3xl mb-2"
                style={{ filter: "drop-shadow(0 0 8px rgba(168,85,247,0.7))" }}
              >
                {r.icon}
              </div>
              <div
                className="font-orbitron font-black text-3xl mb-1"
                style={{
                  color: "#00f5ff",
                  textShadow: "0 0 12px rgba(0,245,255,0.8)",
                }}
              >
                {r.invites}
              </div>
              <p className="font-orbitron text-xs text-white/50 uppercase tracking-widest mb-3">
                invites
              </p>
              <p className="text-white/90 text-sm font-semibold mb-1 leading-snug">
                {r.reward}
              </p>
              {r.extra && (
                <p className="text-[#a855f7] text-xs leading-snug mb-3">
                  {r.extra}
                </p>
              )}
              <p className="text-[#00f5ff]/60 text-xs font-orbitron tracking-wide mt-auto">
                DM Discord to Claim
              </p>
            </div>
          ))}
        </div>

        {/* 30 invites mega card */}
        <div
          className="glass-card p-8 mb-10 text-center"
          style={{
            border: "1px solid rgba(168,85,247,0.5)",
            boxShadow:
              "0 0 30px rgba(168,85,247,0.2), 0 0 60px rgba(0,245,255,0.1)",
          }}
        >
          <div
            className="text-5xl mb-3"
            style={{ filter: "drop-shadow(0 0 12px rgba(168,85,247,0.9))" }}
          >
            👑
          </div>
          <div
            className="font-orbitron font-black text-5xl mb-1"
            style={{
              color: "#a855f7",
              textShadow: "0 0 20px rgba(168,85,247,0.9)",
            }}
          >
            30
          </div>
          <p className="font-orbitron text-xs text-white/50 uppercase tracking-widest mb-4">
            invites — MEGA BUNDLE
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto mb-5">
            {MEGA_REWARDS.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/85"
                style={{
                  background: "rgba(168,85,247,0.1)",
                  border: "1px solid rgba(168,85,247,0.2)",
                }}
              >
                <span className="text-[#a855f7] text-base">✦</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
          <a
            href="https://discord.gg/dSk3AGntm"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neon-purple"
            data-ocid="rewards.mega_button"
          >
            Claim 30-Invite Reward on Discord
          </a>
        </div>

        <div className="text-center">
          <a
            href="https://discord.gg/dSk3AGntm"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neon-cyan"
            data-ocid="rewards.primary_button"
          >
            Join Discord & Start Inviting
          </a>
        </div>
      </div>
    </section>
  );
}

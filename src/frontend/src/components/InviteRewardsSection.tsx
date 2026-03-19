const REWARDS = [
  { invites: 2, reward: "Cheap Game Account", icon: "🎮" },
  { invites: 3, reward: "Minecraft Account", icon: "⛏️" },
  { invites: 4, reward: "Free Hosting (1 Month)", icon: "🖥️" },
  { invites: 5, reward: "Valorant Account", icon: "🔫" },
  { invites: 6, reward: "Discord Nitro Basic (1 Month)", icon: "💎" },
  { invites: 8, reward: "$5 Gift Card (Your Choice)", icon: "💳" },
  { invites: 10, reward: "Premium Game Account", icon: "🏆" },
  { invites: 12, reward: "Discord Nitro (1 Month)", icon: "✨" },
  { invites: 15, reward: "$10 Gift Card", icon: "💵" },
  { invites: 20, reward: "Nitro (3 Months) OR $15 Card", icon: "🌟" },
  { invites: 25, reward: "$25 Gift Card", icon: "💰" },
  { invites: 30, reward: "$50 Gift Card OR Nitro (6 Months)", icon: "👑" },
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
            Invite Rewards
          </h2>
          <div className="gradient-divider max-w-xs mx-auto mt-4" />
          <p className="text-white/60 mt-4 max-w-lg mx-auto text-sm">
            Invite friends to our Discord server and unlock amazing rewards. DM
            us on Discord to claim yours!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {REWARDS.map((r, i) => (
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
                className="font-orbitron font-black text-3xl mb-1 glow-cyan"
                style={{ color: "#00f5ff" }}
              >
                {r.invites}
              </div>
              <p className="font-orbitron text-xs text-white/50 uppercase tracking-widest mb-3">
                invites
              </p>
              <p className="text-white/85 text-sm font-medium mb-3 leading-snug">
                {r.reward}
              </p>
              <p className="text-[#a855f7] text-xs font-orbitron tracking-wide">
                DM on Discord to Claim
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://discord.gg/dSk3AGntm"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neon-purple"
            data-ocid="rewards.primary_button"
          >
            Join Discord & Start Inviting
          </a>
        </div>
      </div>
    </section>
  );
}

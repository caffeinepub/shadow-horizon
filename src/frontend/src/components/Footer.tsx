export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="py-12 px-4 mt-8">
      <div className="gradient-divider mb-12" />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <h3 className="font-orbitron font-black text-xl text-[#00f5ff] glow-cyan mb-3">
              🌌 SHADOW HORIZON
            </h3>
            <p className="text-white/55 text-sm leading-relaxed max-w-xs">
              Your premier destination for gaming community, premium services,
              and exclusive rewards.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-orbitron text-xs uppercase tracking-widest text-white/50 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                ["Services", "#services"],
                ["Invite Rewards", "#rewards"],
                ["Paid Store", "#store"],
                ["Minecraft Hosting", "#hosting"],
                ["Requests", "#requests"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-white/55 hover:text-[#00f5ff] text-sm transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-orbitron text-xs uppercase tracking-widest text-white/50 mb-4">
              Community
            </h4>
            <a
              href="https://discord.gg/Af8PrYaJyJ"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-neon-purple inline-block text-xs"
              data-ocid="footer.primary_button"
            >
              Join Discord Server
            </a>
            <p className="text-white/40 text-xs mt-4">
              🔒 Secure • Trusted • Verified
            </p>
          </div>
        </div>

        <div className="gradient-divider mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© {year} Shadow Horizon. All rights reserved.</p>
          <p>
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00f5ff]/70 hover:text-[#00f5ff] transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

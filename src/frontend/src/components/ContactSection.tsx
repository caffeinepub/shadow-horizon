const DISCORD_URL = "https://discord.gg/Af8PrYaJyJ";

const contactItems = [
  { icon: "🛡️", label: "Support", desc: "Get help with any issue or question." },
  {
    icon: "🛒",
    label: "Orders",
    desc: "Place and manage your orders directly.",
  },
  {
    icon: "📊",
    label: "Invite Tracking",
    desc: "Track your invite progress and rewards.",
  },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-20 px-4"
      style={{ background: "#070A0F" }}
    >
      <div className="max-w-[900px] mx-auto">
        <div className="text-center mb-12">
          <h2
            className="section-title text-[#20E6FF] glow-cyan"
            style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}
          >
            📞 Contact &amp; Support
          </h2>
          <div className="gradient-divider mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {contactItems.map((item) => (
            <div
              key={item.label}
              className="card-cyber card-cyber-cyan text-center"
              data-ocid={`contact.item.${contactItems.indexOf(item) + 1}`}
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-orbitron font-bold text-[#20E6FF] text-sm uppercase tracking-widest mb-2">
                {item.label}
              </h3>
              <p className="text-[#A9B3C7] font-rajdhani text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div
          className="text-center p-8 rounded-2xl"
          style={{
            background: "linear-gradient(135deg, #0C1426 0%, #0E1A2E 100%)",
            border: "1px solid rgba(32,230,255,0.3)",
            boxShadow: "0 0 40px rgba(32,230,255,0.12)",
          }}
        >
          <p className="font-rajdhani text-[#A9B3C7] text-lg mb-2">
            Join our Discord for instant support:
          </p>
          <p className="font-orbitron text-[#20E6FF] glow-cyan text-xl mb-6 break-all">
            discord.gg/Af8PrYaJyJ
          </p>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cyan-solid inline-flex items-center gap-3 px-10 py-4 rounded-full font-orbitron text-sm font-bold tracking-widest uppercase"
            data-ocid="contact.primary_button"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-label="Discord"
              role="img"
            >
              <title>Discord</title>
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.09.119 18.12.143 18.14a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
            </svg>
            Open Discord
          </a>
        </div>
      </div>
    </section>
  );
}

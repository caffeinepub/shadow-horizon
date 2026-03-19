import { useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Rewards", href: "#rewards" },
  { label: "Store", href: "#store" },
  { label: "Hosting", href: "#hosting" },
  { label: "Requests", href: "#requests" },
  { label: "Panel", href: "#/panel" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="glass-nav fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="#home"
            className="flex items-center gap-2"
            data-ocid="nav.link"
          >
            <span className="text-lg font-orbitron font-bold text-[#00f5ff] glow-cyan tracking-wider">
              🌌 SHADOW HORIZON
            </span>
          </a>

          <nav
            className="hidden md:flex items-center gap-6"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link"
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="md:hidden text-white p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            <div className="space-y-1.5">
              <span
                className={`block w-6 h-0.5 bg-[#00f5ff] transition-all ${open ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block w-6 h-0.5 bg-[#00f5ff] transition-all ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`block w-6 h-0.5 bg-[#00f5ff] transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="md:hidden border-t border-[#00f5ff]/20 px-4 py-4 flex flex-col gap-4 bg-black/70 backdrop-blur-xl"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link text-sm"
              onClick={() => setOpen(false)}
              data-ocid="nav.link"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

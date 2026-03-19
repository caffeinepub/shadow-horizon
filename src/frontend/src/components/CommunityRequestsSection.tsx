import { useState } from "react";
import { useActor } from "../hooks/useActor";

export default function CommunityRequestsSection() {
  const { actor } = useActor();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [cooldown, setCooldown] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!actor || !name.trim() || !message.trim()) return;

    setStatus("loading");
    try {
      await actor.submitRequest(name.trim(), message.trim());
      setStatus("success");
      setName("");
      setMessage("");
      setCooldown(true);
      setTimeout(() => {
        setCooldown(false);
        setStatus("idle");
      }, 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  return (
    <section id="requests" className="py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-orbitron text-xs tracking-[0.3em] text-[#00f5ff] uppercase mb-3">
            Have an Idea?
          </p>
          <h2 className="section-title text-4xl sm:text-5xl glow-cyan">
            Community Requests
          </h2>
          <div className="gradient-divider max-w-xs mx-auto mt-4" />
          <p className="text-white/60 mt-4 text-sm">
            Submit your request and we'll review it. The best ideas get built!
          </p>
        </div>

        <div className="glass-card p-8" data-ocid="requests.panel">
          {status === "success" ? (
            <div
              className="text-center py-10"
              data-ocid="requests.success_state"
            >
              <div
                className="text-5xl mb-4"
                style={{ filter: "drop-shadow(0 0 12px rgba(0,245,255,0.8))" }}
              >
                ✓
              </div>
              <p className="font-orbitron text-[#00f5ff] text-xl glow-cyan">
                Submitted!
              </p>
              <p className="text-white/60 mt-2 text-sm">
                We'll review your request soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  className="block font-orbitron text-xs uppercase tracking-widest text-[#00f5ff] mb-2"
                  htmlFor="req-name"
                >
                  Your Name
                </label>
                <input
                  id="req-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name..."
                  required
                  className="w-full px-4 py-3 rounded-lg text-white placeholder-white/30 text-sm outline-none focus:ring-1 focus:ring-[#00f5ff]/50"
                  style={{
                    background: "rgba(0,0,0,0.4)",
                    border: "1px solid rgba(0,245,255,0.2)",
                  }}
                  data-ocid="requests.input"
                />
              </div>
              <div>
                <label
                  className="block font-orbitron text-xs uppercase tracking-widest text-[#00f5ff] mb-2"
                  htmlFor="req-message"
                >
                  Your Request
                </label>
                <textarea
                  id="req-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your request..."
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg text-white placeholder-white/30 text-sm outline-none focus:ring-1 focus:ring-[#00f5ff]/50 resize-none"
                  style={{
                    background: "rgba(0,0,0,0.4)",
                    border: "1px solid rgba(0,245,255,0.2)",
                  }}
                  data-ocid="requests.textarea"
                />
              </div>

              {status === "error" && (
                <p
                  className="text-red-400 text-sm font-orbitron"
                  data-ocid="requests.error_state"
                >
                  ✗ Failed to submit. Please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading" || cooldown || !actor}
                className="btn-neon-cyan w-full disabled:opacity-50 disabled:cursor-not-allowed"
                data-ocid="requests.submit_button"
              >
                {status === "loading" ? "Submitting..." : "Submit Request"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

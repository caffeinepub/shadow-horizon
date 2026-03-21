import { useCallback, useEffect, useRef, useState } from "react";
import type { CommunityRequest, MCPlan } from "../backend.d";
import type { RequestStatus } from "../backend.d";
import { useActor } from "../hooks/useActor";

const PANEL_PASSWORD = "yugank2010";
const SESSION_KEY = "sh_panel_auth";

function formatDate(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleString();
}

export default function AdminPanel() {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === "1",
  );
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [lockout, setLockout] = useState(0);
  const [activeTab, setActiveTab] = useState<
    "stats" | "requests" | "plans" | "settings"
  >("stats");
  const lockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (lockout > 0) return;
    if (pw === PANEL_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setAuthed(true);
      setError("");
    } else {
      setError("Incorrect password.");
      let remaining = 60;
      setLockout(remaining);
      countdownRef.current = setInterval(() => {
        remaining -= 1;
        setLockout(remaining);
        if (remaining <= 0) {
          clearInterval(countdownRef.current!);
          setLockout(0);
          setError("");
        }
      }, 1000);
    }
  }

  useEffect(() => {
    return () => {
      if (lockTimer.current) clearTimeout(lockTimer.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, []);

  if (!authed) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{
          backgroundImage:
            "url('/assets/generated/city-bridge-bg.dim_1920x1080.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
        <div
          className="relative z-10 glass-card p-8 w-full max-w-sm"
          data-ocid="panel.dialog"
        >
          <h1 className="font-orbitron font-black text-xl text-[#00f5ff] glow-cyan text-center mb-2">
            🔐 ADMIN PANEL
          </h1>
          <p className="text-white/50 text-center text-xs font-orbitron mb-8 uppercase tracking-widest">
            Shadow Horizon
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                className="block font-orbitron text-xs uppercase tracking-widest text-[#00f5ff] mb-2"
                htmlFor="panel-pw"
              >
                Password
              </label>
              <input
                id="panel-pw"
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="Enter panel password..."
                disabled={lockout > 0}
                className="w-full px-4 py-3 rounded-lg text-white placeholder-white/30 text-sm outline-none focus:ring-1 focus:ring-[#00f5ff]/50 disabled:opacity-50"
                style={{
                  background: "rgba(0,0,0,0.5)",
                  border: "1px solid rgba(0,245,255,0.2)",
                }}
                data-ocid="panel.input"
              />
            </div>
            {error && (
              <p
                className="text-red-400 text-sm font-orbitron"
                data-ocid="panel.error_state"
              >
                {lockout > 0 ? `🔒 Try again in ${lockout}s` : `✗ ${error}`}
              </p>
            )}
            <button
              type="submit"
              disabled={lockout > 0}
              className="btn-neon-cyan w-full disabled:opacity-50 disabled:cursor-not-allowed"
              data-ocid="panel.submit_button"
            >
              {lockout > 0 ? `Locked (${lockout}s)` : "Enter Panel"}
            </button>
          </form>
          <p className="text-center mt-6">
            <a
              href="#home"
              className="text-white/40 hover:text-white/70 text-xs font-orbitron transition-colors"
            >
              ← Back to Site
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage:
          "url('/assets/generated/city-bridge-bg.dim_1920x1080.jpg')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-orbitron font-black text-2xl text-[#00f5ff] glow-cyan">
              ⚙️ ADMIN PANEL
            </h1>
            <p className="text-white/50 text-xs font-orbitron mt-1">
              Shadow Horizon Control Center
            </p>
          </div>
          <div className="flex gap-3">
            <a href="#home" className="btn-neon-cyan text-xs">
              ← Back to Site
            </a>
            <button
              type="button"
              className="btn-neon-purple text-xs"
              onClick={() => {
                sessionStorage.removeItem(SESSION_KEY);
                setAuthed(false);
              }}
              data-ocid="panel.secondary_button"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(["stats", "requests", "plans", "settings"] as const).map((tab) => (
            <button
              type="button"
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-orbitron text-xs uppercase tracking-widest px-5 py-2 rounded-lg transition-all ${
                activeTab === tab
                  ? "bg-[#00f5ff]/15 border border-[#00f5ff]/60 text-[#00f5ff]"
                  : "bg-black/30 border border-white/10 text-white/50 hover:text-white/80"
              }`}
              data-ocid="panel.tab"
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "stats" && <StatsTab />}
        {activeTab === "requests" && <RequestsTab />}
        {activeTab === "plans" && <PlansTab />}
        {activeTab === "settings" && <SettingsTab />}
      </div>
    </div>
  );
}

function StatsTab() {
  const { actor, isFetching } = useActor();
  const [stats, setStats] = useState<{
    pageVisits: bigint;
    totalRequests: bigint;
    activePlans: bigint;
  } | null>(null);

  useEffect(() => {
    if (!actor || isFetching) return;
    const doFetch = () =>
      actor
        .getStats()
        .then(setStats)
        .catch(() => {});
    doFetch();
    const interval = setInterval(doFetch, 30000);
    return () => clearInterval(interval);
  }, [actor, isFetching]);

  const items = stats
    ? [
        { label: "Page Visits", value: String(stats.pageVisits), icon: "👁️" },
        {
          label: "Total Requests",
          value: String(stats.totalRequests),
          icon: "📋",
        },
        { label: "Active Plans", value: String(stats.activePlans), icon: "🖥️" },
      ]
    : [];

  return (
    <div>
      {!stats ? (
        <div
          className="flex justify-center py-20"
          data-ocid="panel.loading_state"
        >
          <div className="w-8 h-8 rounded-full border-2 border-[#00f5ff] border-t-transparent animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.label} className="glass-card p-6 text-center">
              <div className="text-3xl mb-2">{item.icon}</div>
              <p className="font-orbitron font-black text-4xl text-[#00f5ff] glow-cyan mb-1">
                {item.value}
              </p>
              <p className="text-white/55 text-xs font-orbitron uppercase tracking-widest">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function RequestsTab() {
  const { actor, isFetching } = useActor();
  const [requests, setRequests] = useState<CommunityRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRequests = useCallback(() => {
    if (!actor) return;
    actor
      .getAllRequests()
      .then((r) =>
        setRequests(
          r.sort((a, b) => Number(b.timestamp) - Number(a.timestamp)),
        ),
      )
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [actor]);

  useEffect(() => {
    if (!actor || isFetching) return;
    loadRequests();
    const interval = setInterval(loadRequests, 30000);
    return () => clearInterval(interval);
  }, [actor, isFetching, loadRequests]);

  async function handleStatusChange(id: bigint, status: string) {
    if (!actor) return;
    const s = status as RequestStatus;
    await actor.updateRequestStatus(id, s);
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: s } : r)),
    );
  }

  if (loading) {
    return (
      <div
        className="flex justify-center py-20"
        data-ocid="requests.loading_state"
      >
        <div className="w-8 h-8 rounded-full border-2 border-[#00f5ff] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden" data-ocid="requests.table">
      {requests.length === 0 ? (
        <div
          className="text-center py-16 text-white/50 font-orbitron"
          data-ocid="requests.empty_state"
        >
          No requests yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                {["Name", "Message", "Status", "Timestamp"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 font-orbitron text-xs uppercase tracking-widest text-[#00f5ff]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr
                  key={String(req.id)}
                  className="border-b border-white/5 hover:bg-white/5"
                  data-ocid="requests.row"
                >
                  <td className="px-5 py-3 text-white/80 text-sm font-medium">
                    {req.requesterName}
                  </td>
                  <td className="px-5 py-3 text-white/60 text-sm max-w-xs">
                    <p className="line-clamp-2">{req.message}</p>
                  </td>
                  <td className="px-5 py-3">
                    <select
                      value={req.status}
                      onChange={(e) =>
                        handleStatusChange(req.id, e.target.value)
                      }
                      className="bg-black/50 border border-white/20 text-white text-xs rounded px-2 py-1 font-orbitron"
                      data-ocid="requests.select"
                    >
                      <option value="pending">Pending</option>
                      <option value="seen">Seen</option>
                      <option value="done">Done</option>
                    </select>
                  </td>
                  <td className="px-5 py-3 text-white/40 text-xs">
                    {formatDate(req.timestamp)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function PlansTab() {
  const { actor, isFetching } = useActor();
  const [plans, setPlans] = useState<MCPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    features: "",
    isActive: true,
  });
  const [editing, setEditing] = useState(false);

  const loadPlans = useCallback(() => {
    if (!actor) return;
    actor
      .getActivePlans()
      .then(setPlans)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [actor]);

  useEffect(() => {
    if (!actor || isFetching) return;
    loadPlans();
  }, [actor, isFetching, loadPlans]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!actor) return;
    await actor.createOrUpdatePlan(
      form.id || String(Date.now()),
      form.name,
      form.description,
      form.price,
      form.features
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean),
      form.isActive,
    );
    setForm({
      id: "",
      name: "",
      description: "",
      price: "",
      features: "",
      isActive: true,
    });
    setEditing(false);
    loadPlans();
  }

  async function handleDelete(id: string) {
    if (!actor) return;
    await actor.deletePlan(id);
    setPlans((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="space-y-6">
      {editing && (
        <div className="glass-card p-6" data-ocid="plans.panel">
          <h3 className="font-orbitron text-sm text-[#00f5ff] uppercase tracking-widest mb-4">
            {form.id ? "Edit Plan" : "Add New Plan"}
          </h3>
          <form
            onSubmit={handleSave}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <input
              placeholder="Plan Name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
              className="px-4 py-2.5 rounded-lg text-white text-sm bg-black/40 border border-white/20 outline-none focus:border-[#00f5ff]/50"
              data-ocid="plans.input"
            />
            <input
              placeholder="Price (e.g. $3/mo)"
              value={form.price}
              onChange={(e) =>
                setForm((f) => ({ ...f, price: e.target.value }))
              }
              required
              className="px-4 py-2.5 rounded-lg text-white text-sm bg-black/40 border border-white/20 outline-none focus:border-[#00f5ff]/50"
            />
            <input
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              className="px-4 py-2.5 rounded-lg text-white text-sm bg-black/40 border border-white/20 outline-none focus:border-[#00f5ff]/50 sm:col-span-2"
            />
            <input
              placeholder="Features (comma separated)"
              value={form.features}
              onChange={(e) =>
                setForm((f) => ({ ...f, features: e.target.value }))
              }
              className="px-4 py-2.5 rounded-lg text-white text-sm bg-black/40 border border-white/20 outline-none focus:border-[#00f5ff]/50 sm:col-span-2"
            />
            <div className="flex items-center gap-3 sm:col-span-2">
              <input
                type="checkbox"
                id="is-active"
                checked={form.isActive}
                onChange={(e) =>
                  setForm((f) => ({ ...f, isActive: e.target.checked }))
                }
                className="accent-[#00f5ff]"
                data-ocid="plans.checkbox"
              />
              <label htmlFor="is-active" className="text-white/70 text-sm">
                Active
              </label>
            </div>
            <div className="flex gap-3 sm:col-span-2">
              <button
                type="submit"
                className="btn-neon-cyan text-xs"
                data-ocid="plans.save_button"
              >
                Save Plan
              </button>
              <button
                type="button"
                className="btn-neon-purple text-xs"
                onClick={() => {
                  setEditing(false);
                  setForm({
                    id: "",
                    name: "",
                    description: "",
                    price: "",
                    features: "",
                    isActive: true,
                  });
                }}
                data-ocid="plans.cancel_button"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {!editing && (
        <button
          type="button"
          className="btn-neon-cyan text-xs"
          onClick={() => setEditing(true)}
          data-ocid="plans.primary_button"
        >
          + Add New Plan
        </button>
      )}

      {loading ? (
        <div
          className="flex justify-center py-12"
          data-ocid="plans.loading_state"
        >
          <div className="w-8 h-8 rounded-full border-2 border-[#00f5ff] border-t-transparent animate-spin" />
        </div>
      ) : plans.length === 0 ? (
        <div
          className="glass-card p-8 text-center text-white/50 font-orbitron text-sm"
          data-ocid="plans.empty_state"
        >
          No plans yet. Add one above.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <div
              key={plan.id}
              className="glass-card p-5"
              data-ocid={`plans.item.${i + 1}`}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-orbitron font-bold text-sm text-white">
                  {plan.name}
                </h4>
                <span className="font-orbitron text-[#a855f7] font-black text-lg">
                  {plan.price}
                </span>
              </div>
              <p className="text-white/50 text-xs mb-3">{plan.description}</p>
              <ul className="space-y-1 mb-4">
                {plan.features.map((f) => (
                  <li key={f} className="text-xs text-white/60 flex gap-1.5">
                    <span className="text-[#00f5ff]">◈</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="btn-neon-cyan text-xs flex-1"
                  onClick={() => {
                    setForm({
                      id: plan.id,
                      name: plan.name,
                      description: plan.description,
                      price: plan.price,
                      features: plan.features.join(", "),
                      isActive: plan.isActive,
                    });
                    setEditing(true);
                  }}
                  data-ocid={`plans.edit_button.${i + 1}`}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn-neon-purple text-xs"
                  onClick={() => handleDelete(plan.id)}
                  data-ocid={`plans.delete_button.${i + 1}`}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SettingsTab() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="space-y-4 max-w-lg">
      <div className="glass-card p-6" data-ocid="settings.panel">
        <h3 className="font-orbitron text-xs uppercase tracking-widest text-[#00f5ff] mb-4">
          Discord Server
        </h3>
        <p className="text-white/70 text-sm">https://discord.gg/Af8PrYaJyJ</p>
        <a
          href="https://discord.gg/Af8PrYaJyJ"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-neon-purple text-xs mt-4 inline-block"
        >
          Open Discord
        </a>
      </div>
      <div className="glass-card p-6">
        <h3 className="font-orbitron text-xs uppercase tracking-widest text-[#00f5ff] mb-4">
          Panel Password
        </h3>
        <div className="flex items-center gap-3">
          <p
            className={`text-white/70 text-sm font-mono ${revealed ? "" : "blur-sm select-none"}`}
          >
            {PANEL_PASSWORD}
          </p>
          <button
            type="button"
            className="btn-neon-cyan text-xs"
            onClick={() => setRevealed((v) => !v)}
            data-ocid="settings.toggle"
          >
            {revealed ? "Hide" : "Reveal"}
          </button>
        </div>
      </div>
    </div>
  );
}

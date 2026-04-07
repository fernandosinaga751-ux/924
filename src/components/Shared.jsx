// ============================================================
// Shared UI Components
// ============================================================
import { MessageCircle } from "lucide-react";

export const G = "#C9A227";
export const D = "#07070f";
export const fmt = (n) => "Rp " + Number(n).toLocaleString("id-ID");

export function SectionHeader({ label, title, sub }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 52 }}>
      <span style={{ color: G, fontWeight: 700, fontSize: 12, letterSpacing: 3, textTransform: "uppercase" }}>
        {label}
      </span>
      <h2 style={{ color: "white", fontSize: "clamp(24px,4vw,38px)", fontWeight: 800, margin: "12px 0 14px", fontFamily: "Georgia, serif" }}>
        {title}
      </h2>
      {sub && (
        <p style={{ color: "#888", fontSize: 15, maxWidth: 540, margin: "0 auto", lineHeight: 1.8 }}>
          {sub}
        </p>
      )}
    </div>
  );
}

export function WAButton({ wa, waMsg, label = "Chat WhatsApp" }) {
  const href = `https://wa.me/${wa}?text=${encodeURIComponent(waMsg)}`;
  return (
    <button
      onClick={() => window.open(href, "_blank")}
      style={{
        position: "fixed", bottom: 24, right: 24, zIndex: 999,
        background: "#25D366", color: "white", border: "none",
        borderRadius: 60, padding: "13px 22px", fontWeight: 700,
        fontSize: 14, cursor: "pointer",
        boxShadow: "0 8px 28px rgba(37,211,102,0.45)",
        display: "flex", alignItems: "center", gap: 9,
        transition: "transform 0.2s",
      }}
      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
      onMouseLeave={e => e.currentTarget.style.transform = ""}
    >
      <MessageCircle size={20} /> {label}
    </button>
  );
}

export function Spinner() {
  return (
    <div style={{ minHeight: "100vh", background: D, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div>
        <div style={{
          width: 48, height: 48, borderRadius: "50%",
          border: `3px solid rgba(201,162,39,0.2)`,
          borderTop: `3px solid ${G}`,
          animation: "spin 0.8s linear infinite",
          margin: "0 auto 16px",
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ color: "#666", fontSize: 14, textAlign: "center" }}>Memuat data...</p>
      </div>
    </div>
  );
}

export function FormInput({ label, value, onChange, type = "text", rows, options, hint, placeholder }) {
  const base = {
    width: "100%", background: "#111120",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 8, padding: "10px 14px",
    color: "white", fontSize: 14, outline: "none",
    boxSizing: "border-box", fontFamily: "inherit",
  };
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ color: "#bbb", fontSize: 13, fontWeight: 700, display: "block", marginBottom: 5 }}>{label}</label>
      {hint && <p style={{ color: "#555", fontSize: 12, marginBottom: 7, lineHeight: 1.5 }}>{hint}</p>}
      {options ? (
        <select value={value} onChange={e => onChange(e.target.value)} style={base}>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : rows ? (
        <textarea rows={rows} value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} style={{ ...base, resize: "vertical" }} />
      ) : (
        <input type={type} value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} style={base} />
      )}
    </div>
  );
}

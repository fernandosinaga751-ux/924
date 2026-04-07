import { MessageCircle, ArrowRight } from "lucide-react";
import { G, fmt } from "../Shared";

export default function Hero({ settings, cars, setPage }) {
  const waHref = `https://wa.me/${settings?.wa}?text=${encodeURIComponent(settings?.waMsg || "")}`;
  const preview = (cars || []).slice(0, 4);

  return (
    <section style={{
      background: "linear-gradient(135deg, #07070f 0%, #0d0d20 60%, #07070f 100%)",
      minHeight: "88vh", display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden",
    }}>
      {/* Glow blobs */}
      <div style={{ position: "absolute", top: "-20%", right: "-8%", width: 660, height: 660, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,162,39,0.1) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-5%", left: "-5%", width: 440, height: 440, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,162,39,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "80px 20px", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 52, alignItems: "center" }}
        className="hero-grid">
        {/* Left */}
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(201,162,39,0.1)", border: "1px solid rgba(201,162,39,0.35)",
            borderRadius: 100, padding: "6px 18px", marginBottom: 28,
          }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: G }} />
            <span style={{ color: G, fontSize: 13, fontWeight: 700 }}>Terpercaya di Medan sejak 2015</span>
          </div>

          <h1 style={{ color: "white", fontSize: "clamp(28px,4vw,52px)", fontWeight: 900, lineHeight: 1.15, marginBottom: 20, fontFamily: "Georgia, serif" }}>
            {settings?.heroTitle || "Rental Mobil Terbaik di Kota Medan"}
          </h1>
          <p style={{ color: "#999", fontSize: 15, lineHeight: 1.85, marginBottom: 34, maxWidth: 460 }}>
            {settings?.heroSub || "Armada lengkap & terawat · Pengemudi profesional · Pelayanan 24 jam"}
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
            <button onClick={() => window.open(waHref, "_blank")}
              style={{ background: G, color: "#000", border: "none", borderRadius: 10, padding: "13px 26px", fontWeight: 700, fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              <MessageCircle size={18} /> Pesan via WhatsApp
            </button>
            <button onClick={() => { setPage("fleet"); window.scrollTo(0, 0); }}
              style={{ background: "transparent", color: "white", border: "2px solid rgba(255,255,255,0.18)", borderRadius: 10, padding: "13px 26px", fontWeight: 700, fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              Lihat Armada <ArrowRight size={17} />
            </button>
          </div>

          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            {[["500+","Pelanggan Puas"],["50+","Armada"],["10+","Tahun"],["24/7","Layanan"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ color: G, fontSize: 26, fontWeight: 900, lineHeight: 1 }}>{n}</div>
                <div style={{ color: "#666", fontSize: 12, marginTop: 5, fontWeight: 600 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — armada preview */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }} className="desktop-only">
          {preview.map(c => (
            <div key={c.id} style={{
              background: `linear-gradient(135deg, ${c.grad})`,
              borderRadius: 12, padding: "15px 20px",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              border: "1px solid rgba(255,255,255,0.08)",
            }}>
              <div>
                <div style={{ color: "white", fontWeight: 700, fontSize: 14 }}>{c.name}</div>
                <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, marginTop: 2 }}>{c.cat}</div>
              </div>
              <div style={{ color: G, fontWeight: 800, fontSize: 13 }}>{fmt(c.price)}/hari</div>
            </div>
          ))}
          {cars.length > 4 && (
            <div style={{ background: "rgba(201,162,39,0.07)", border: "1px dashed rgba(201,162,39,0.3)", borderRadius: 12, padding: 14, textAlign: "center" }}>
              <span style={{ color: G, fontSize: 13, fontWeight: 700 }}>+ {cars.length - 4} Armada Lainnya Tersedia</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

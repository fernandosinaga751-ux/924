import { Car, FileText, Eye, TrendingUp } from "lucide-react";
import { G } from "../Shared";

export default function Overview({ cars, articles }) {
  const totalViews = (articles || []).reduce((s, a) => s + (a.views || 0), 0);
  const published  = (articles || []).filter(a => a.published).length;

  const stats = [
    { label: "Total Armada",    val: cars?.length || 0,                 icon: <Car size={26} color={G} />,       bg: "#1a3a6e" },
    { label: "Total Artikel",   val: articles?.length || 0,             icon: <FileText size={26} color={G} />,  bg: "#1a4a2e" },
    { label: "Artikel Tayang",  val: published,                         icon: <TrendingUp size={26} color={G}/>, bg: "#4a3a1a" },
    { label: "Total Views",     val: totalViews.toLocaleString("id-ID"),icon: <Eye size={26} color={G} />,       bg: "#2d1a6e" },
  ];

  return (
    <div>
      <h2 style={{ color: "white", fontWeight: 800, fontSize: 24, marginBottom: 6 }}>Dashboard</h2>
      <p style={{ color: "#555", marginBottom: 32, fontSize: 14 }}>Selamat datang di panel CMS 924 Rental Mobil Medan</p>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: 18, marginBottom: 36 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: "#0d0d1c", borderRadius: 14, padding: "22px 24px", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ width: 50, height: 50, borderRadius: 12, background: `${s.bg}55`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
              {s.icon}
            </div>
            <div style={{ color: "white", fontSize: 30, fontWeight: 900, lineHeight: 1 }}>{s.val}</div>
            <div style={{ color: "#555", fontSize: 13, marginTop: 6, fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Recent articles */}
      <div style={{ background: "#0d0d1c", borderRadius: 14, padding: 26, border: "1px solid rgba(255,255,255,0.06)", marginBottom: 24 }}>
        <h3 style={{ color: "white", fontWeight: 700, fontSize: 16, marginBottom: 20 }}>Artikel Terbaru</h3>
        {(articles || []).length === 0
          ? <p style={{ color: "#555", fontSize: 14 }}>Belum ada artikel.</p>
          : (articles || []).slice(0, 5).map(a => (
            <div key={a.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <div>
                <div style={{ color: "white", fontSize: 14, fontWeight: 600 }}>{a.title}</div>
                <div style={{ color: "#555", fontSize: 12, marginTop: 3 }}>{a.cat} · {a.date} · 👁 {a.views || 0}</div>
              </div>
              <span style={{ color: a.published ? G : "#ef4444", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                {a.published ? "✅ TAYANG" : "📝 DRAFT"}
              </span>
            </div>
          ))
        }
      </div>

      {/* Quick links */}
      <div style={{ background: "#0d0d1c", borderRadius: 14, padding: 26, border: "1px solid rgba(255,255,255,0.06)" }}>
        <h3 style={{ color: "white", fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Armada Terdaftar</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {(cars || []).map(c => (
            <div key={c.id} style={{ background: `linear-gradient(135deg, ${c.grad})`, borderRadius: 9, padding: "8px 16px", fontSize: 13, color: "white", fontWeight: 600 }}>
              🚗 {c.name} <span style={{ opacity: 0.7 }}>— Rp {Number(c.price).toLocaleString("id-ID")}/hari</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

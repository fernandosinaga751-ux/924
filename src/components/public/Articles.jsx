import { ArrowRight, MessageCircle } from "lucide-react";
import { G, D, SectionHeader } from "../Shared";

function ArticleCard({ article, onClick }) {
  return (
    <div
      style={{ background: "#0d0d1c", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)", cursor: "pointer", transition: "transform 0.2s" }}
      onClick={onClick}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
      onMouseLeave={e => e.currentTarget.style.transform = ""}
    >
      <div style={{ background: `linear-gradient(135deg, ${article.color}, ${article.color}88)`, height: 155, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <span style={{ fontSize: 50 }}>📰</span>
        <div style={{ position: "absolute", top: 11, left: 11, background: "rgba(0,0,0,0.6)", color: G, fontSize: 11, padding: "3px 11px", borderRadius: 100, fontWeight: 700 }}>{article.cat}</div>
      </div>
      <div style={{ padding: 20 }}>
        <div style={{ color: "#555", fontSize: 12, marginBottom: 10 }}>📅 {article.date} · 👁 {article.views || 0} views</div>
        <h3 style={{ color: "white", fontWeight: 700, fontSize: 15, marginBottom: 9, lineHeight: 1.45 }}>{article.title}</h3>
        <p style={{ color: "#888", fontSize: 13, lineHeight: 1.65, marginBottom: 14 }}>{article.excerpt}</p>
        <div style={{ color: G, fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", gap: 5 }}>
          Baca Selengkapnya <ArrowRight size={13} />
        </div>
      </div>
    </div>
  );
}

export function ArticleList({ articles, setPage, setSelArticle, mini }) {
  const pub  = (articles || []).filter(a => a.published);
  const list = mini ? pub.slice(0, 3) : pub;

  return (
    <section style={{ padding: "80px 20px", background: mini ? D : "#080813" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <SectionHeader
          label="Artikel & Tips"
          title="Panduan Perjalanan"
          sub={mini ? "Tips dan informasi wisata dari Medan untuk perjalanan yang lebih menyenangkan" : undefined}
        />
        {list.length === 0 ? (
          <p style={{ color: "#666", textAlign: "center", padding: "40px 0" }}>Belum ada artikel yang diterbitkan.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))", gap: 22 }}>
            {list.map(a => (
              <ArticleCard key={a.id} article={a} onClick={() => { setSelArticle(a); setPage("article"); window.scrollTo(0, 0); }} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function ArticleDetail({ article, setPage, settings }) {
  if (!article) return null;
  const waHref = `https://wa.me/${settings?.wa}?text=${encodeURIComponent(settings?.waMsg || "")}`;

  return (
    <div style={{ maxWidth: 740, margin: "60px auto", padding: "0 20px 80px" }}>
      <button onClick={() => { setPage("articles"); window.scrollTo(0, 0); }}
        style={{ background: "none", border: "none", color: G, cursor: "pointer", fontWeight: 700, fontSize: 14, marginBottom: 24, display: "flex", alignItems: "center", gap: 6 }}>
        ← Kembali ke Artikel
      </button>

      <div style={{ background: `linear-gradient(135deg, ${article.color}, ${article.color}66)`, borderRadius: 16, height: 210, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 30 }}>
        <span style={{ fontSize: 72 }}>📰</span>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <span style={{ background: "rgba(201,162,39,0.1)", color: G, padding: "4px 14px", borderRadius: 100, fontSize: 12, fontWeight: 700 }}>{article.cat}</span>
        <span style={{ color: "#666", fontSize: 12 }}>📅 {article.date}</span>
        <span style={{ color: "#666", fontSize: 12 }}>👁 {article.views || 0} views</span>
      </div>

      <h1 style={{ color: "white", fontSize: "clamp(22px,4vw,34px)", fontWeight: 800, lineHeight: 1.3, marginBottom: 28, fontFamily: "Georgia, serif" }}>
        {article.title}
      </h1>

      <div style={{ color: "#bbb", fontSize: 15, lineHeight: 1.95, whiteSpace: "pre-line" }}>
        {article.content}
      </div>

      {/* CTA */}
      <div style={{ marginTop: 40, background: "rgba(201,162,39,0.08)", border: "1px solid rgba(201,162,39,0.25)", borderRadius: 14, padding: 28 }}>
        <h3 style={{ color: "white", fontWeight: 700, fontSize: 18, marginBottom: 10 }}>Butuh Rental Mobil di Medan?</h3>
        <p style={{ color: "#aaa", fontSize: 14, marginBottom: 18 }}>Hubungi 924 Rental Mobil Medan untuk pemesanan dan penawaran terbaik!</p>
        <button onClick={() => window.open(waHref, "_blank")}
          style={{ background: G, color: "#000", border: "none", borderRadius: 9, padding: "12px 26px", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
          <MessageCircle size={16} /> Hubungi via WhatsApp
        </button>
      </div>
    </div>
  );
}

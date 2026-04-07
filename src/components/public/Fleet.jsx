import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { G, D, fmt, SectionHeader } from "../Shared";

function CarCard({ car, settings }) {
  const msg = `Halo 924 Rental Mobil Medan, saya ingin menyewa ${car.name}. Apakah tersedia?`;
  const waHref = `https://wa.me/${settings?.wa}?text=${encodeURIComponent(msg)}`;
  return (
    <div
      style={{ background: "#0d0d1c", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)", transition: "transform 0.22s, box-shadow 0.22s" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 22px 44px rgba(0,0,0,0.5)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
    >
      {/* Thumbnail */}
      <div style={{ background: `linear-gradient(135deg, ${car.grad})`, height: 172, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <span style={{ fontSize: 58 }}>🚗</span>
        <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.55)", color: "white", fontSize: 11, padding: "3px 10px", borderRadius: 100, fontWeight: 700 }}>{car.cat}</div>
        <div style={{ position: "absolute", bottom: 12, left: 12, background: G, color: "#000", fontSize: 12, padding: "5px 12px", borderRadius: 7, fontWeight: 700 }}>{fmt(car.price)}/hari</div>
      </div>

      <div style={{ padding: 20 }}>
        <h3 style={{ color: "white", fontWeight: 800, fontSize: 17, marginBottom: 8 }}>{car.name}</h3>
        <p style={{ color: "#888", fontSize: 13, lineHeight: 1.65, marginBottom: 14 }}>{car.desc}</p>

        <div style={{ display: "flex", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
          <span style={{ color: "#aaa", fontSize: 12 }}>👥 {car.cap} Kursi</span>
          <span style={{ color: "#aaa", fontSize: 12 }}>⚙️ {car.trans}</span>
          <span style={{ color: "#aaa", fontSize: 12 }}>⛽ {car.fuel}</span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 18 }}>
          {(car.feats || []).map(f => (
            <span key={f} style={{ background: "rgba(201,162,39,0.1)", color: G, fontSize: 11, padding: "3px 9px", borderRadius: 100, border: "1px solid rgba(201,162,39,0.2)", fontWeight: 600 }}>{f}</span>
          ))}
        </div>

        <button onClick={() => window.open(waHref, "_blank")}
          style={{ width: "100%", background: G, color: "#000", border: "none", borderRadius: 9, padding: "12px", fontWeight: 700, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
          <MessageCircle size={15} /> Pesan Sekarang
        </button>
      </div>
    </div>
  );
}

export default function Fleet({ cars, settings, mini, setPage }) {
  const [filter, setFilter] = useState("Semua");
  const cats = ["Semua", ...new Set((cars || []).map(c => c.cat))];
  const list = (filter === "Semua" ? cars : cars.filter(c => c.cat === filter)).slice(0, mini ? 3 : 999);

  return (
    <section style={{ padding: "80px 20px", background: D }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <SectionHeader
          label="Armada Kami"
          title="Pilihan Kendaraan Terlengkap"
          sub={mini ? "Armada terawat untuk kenyamanan perjalanan Anda di Medan dan Sumatera Utara" : undefined}
        />

        {!mini && (
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 44 }}>
            {cats.map(c => (
              <button key={c} onClick={() => setFilter(c)}
                style={{ background: filter === c ? G : "rgba(255,255,255,0.05)", color: filter === c ? "#000" : "#aaa", border: filter === c ? "none" : "1px solid rgba(255,255,255,0.1)", borderRadius: 100, padding: "7px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer", transition: "all 0.2s" }}>
                {c}
              </button>
            ))}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))", gap: 22 }}>
          {list.map(car => <CarCard key={car.id} car={car} settings={settings} />)}
        </div>

        {mini && (
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <button onClick={() => { setPage("fleet"); window.scrollTo(0, 0); }}
              style={{ background: "transparent", color: G, border: `2px solid ${G}`, borderRadius: 10, padding: "12px 34px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
              Lihat Semua Armada →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

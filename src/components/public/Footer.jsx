import { Car } from "lucide-react";
import { G } from "../Shared";

const LINKS = [
  ["Beranda",  "home"],
  ["Armada",   "fleet"],
  ["Layanan",  "services"],
  ["Artikel",  "articles"],
  ["Kontak",   "contact"],
];

export default function Footer({ settings, setPage }) {
  const go = (v) => { setPage(v); window.scrollTo(0, 0); };

  return (
    <footer style={{ background: "#040409", borderTop: "1px solid rgba(201,162,39,0.1)", padding: "56px 20px 24px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 40, marginBottom: 48 }} className="footer-grid">

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <img src="/logo.svg" alt="924 Rental Mobil Medan" style={{ width: 44, height: 44, borderRadius: "50%" }} />
              <div>
                <div style={{ color: "white", fontWeight: 800, fontSize: 14 }}>924 RENTAL MOBIL</div>
                <div style={{ color: "#f47920", fontSize: 9, fontWeight: 700, letterSpacing: 2 }}>MEDAN</div>
              </div>
            </div>
            <p style={{ color: "#555", fontSize: 13, lineHeight: 1.85, maxWidth: 300, marginBottom: 20 }}>
              Layanan rental mobil terpercaya di Medan. Armada lengkap, sopir berpengalaman, harga transparan sejak 2015.
            </p>
            <div style={{ display: "flex", gap: 9 }}>
              {[
                ["📸", `https://instagram.com/${settings?.instagram}`],
                ["👍", `https://facebook.com/${settings?.facebook}`],
              ].map(([ic, url]) => (
                <button key={url} onClick={() => window.open(url, "_blank")}
                  style={{ width: 38, height: 38, borderRadius: 9, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {ic}
                </button>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <div style={{ color: "white", fontWeight: 700, fontSize: 14, marginBottom: 18 }}>Navigasi</div>
            {LINKS.map(([l, v]) => (
              <button key={v} onClick={() => go(v)}
                style={{ display: "block", background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 13, padding: "5px 0", textAlign: "left", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = G}
                onMouseLeave={e => e.currentTarget.style.color = "#555"}>
                {l}
              </button>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ color: "white", fontWeight: 700, fontSize: 14, marginBottom: 18 }}>Informasi</div>
            <div style={{ color: "#555", fontSize: 13, lineHeight: 2.2 }}>
              <div>📞 {settings?.phone}</div>
              <div>📧 {settings?.email}</div>
              <div>⏰ {settings?.hours}</div>
              <div style={{ marginTop: 4, lineHeight: 1.6 }}>📍 {settings?.address}</div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 22, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <div style={{ color: "#333", fontSize: 12 }}>© {new Date().getFullYear()} 924 Rental Mobil Medan. All rights reserved.</div>
          <div style={{ color: "#333", fontSize: 12 }}>Medan, Sumatera Utara, Indonesia</div>
        </div>
      </div>
    </footer>
  );
}

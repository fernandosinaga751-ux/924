import { useState } from "react";
import { Car, Menu, X, MessageCircle } from "lucide-react";
import { G } from "../Shared";

const LINKS = [
  ["Beranda",  "home"],
  ["Armada",   "fleet"],
  ["Layanan",  "services"],
  ["Artikel",  "articles"],
  ["Kontak",   "contact"],
];

export default function Nav({ settings, page, setPage }) {
  const [open, setOpen] = useState(false);

  const go = (v) => { setPage(v); setOpen(false); window.scrollTo(0, 0); };
  const waHref = `https://wa.me/${settings?.wa}?text=${encodeURIComponent(settings?.waMsg || "")}`;

  return (
    <nav style={{
      background: "rgba(7,7,15,0.97)",
      backdropFilter: "blur(14px)",
      borderBottom: "1px solid rgba(201,162,39,0.12)",
      position: "sticky", top: 0, zIndex: 100,
    }}>
      <div style={{
        maxWidth: 1180, margin: "0 auto", padding: "0 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: 64,
      }}>
        {/* Logo */}
        <div onClick={() => go("home")}
          style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <img src="/logo.svg" alt="924 Rental Mobil Medan" style={{ width: 42, height: 42, borderRadius: "50%" }} />
          <div>
            <div style={{ color: "white", fontWeight: 800, fontSize: 14, lineHeight: 1.2 }}>924 RENTAL MOBIL</div>
            <div style={{ color: "#f47920", fontSize: 9, fontWeight: 700, letterSpacing: 2 }}>MEDAN</div>
          </div>
        </div>

        {/* Desktop Nav */}
        <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
          {LINKS.map(([label, val]) => (
            <button key={val} onClick={() => go(val)}
              style={{
                color: page === val ? G : "#bbb",
                background: "none", border: "none", cursor: "pointer",
                fontSize: 13, fontWeight: 600, padding: "8px 12px", borderRadius: 6,
              }}
              className="desktop-only"
            >{label}</button>
          ))}
          <button onClick={() => window.open(waHref, "_blank")}
            style={{
              background: G, color: "#000", border: "none", borderRadius: 8,
              padding: "9px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 7, marginLeft: 8,
            }}
            className="desktop-only"
          >
            <MessageCircle size={15} /> WhatsApp
          </button>

          {/* Hamburger */}
          <button onClick={() => setOpen(!open)}
            style={{ background: "none", border: "none", color: "white", cursor: "pointer", padding: 6 }}
            className="mobile-only"
            style2={{ display: "none" }}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div style={{ background: "#0a0a15", padding: "12px 20px 22px" }}>
          {LINKS.map(([label, val]) => (
            <button key={val} onClick={() => go(val)}
              style={{
                display: "block", width: "100%", textAlign: "left",
                color: page === val ? G : "#ccc",
                background: "none", border: "none", cursor: "pointer",
                padding: "13px 0", fontSize: 15, fontWeight: 600,
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >{label}</button>
          ))}
          <button onClick={() => window.open(waHref, "_blank")}
            style={{
              marginTop: 16, width: "100%", background: "#25D366", color: "white",
              border: "none", borderRadius: 9, padding: "14px", fontWeight: 700,
              fontSize: 15, cursor: "pointer",
            }}
          >💬 Chat WhatsApp</button>
        </div>
      )}
    </nav>
  );
}

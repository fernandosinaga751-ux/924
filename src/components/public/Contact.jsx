import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { G, SectionHeader } from "../Shared";

export default function Contact({ settings }) {
  const wa   = settings?.wa      || "";
  const msg  = settings?.waMsg   || "";
  const waHref = `https://wa.me/${wa}?text=${encodeURIComponent(msg)}`;

  return (
    <section style={{ padding: "80px 20px", background: "#080813" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <SectionHeader
          label="Kontak"
          title="Hubungi Kami"
          sub="Siap melayani Anda 7 hari seminggu untuk segala kebutuhan rental mobil di Medan"
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }} className="contact-grid">
          {/* Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { icon: <Phone size={21} color={G} />,      label: "Telepon / WhatsApp", val: settings?.phone    },
              { icon: <MessageCircle size={21} color={G}/>,label: "Email",              val: settings?.email    },
              { icon: <MapPin size={21} color={G} />,      label: "Alamat",             val: settings?.address  },
              { icon: <Clock size={21} color={G} />,       label: "Jam Operasional",    val: settings?.hours    },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: "rgba(201,162,39,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ color: "#666", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{item.label}</div>
                  <div style={{ color: "white", fontSize: 14, fontWeight: 600, lineHeight: 1.5 }}>{item.val}</div>
                </div>
              </div>
            ))}

            <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
              <button onClick={() => window.open(waHref, "_blank")}
                style={{ flex: 1, background: "#25D366", color: "white", border: "none", borderRadius: 9, padding: "13px", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <MessageCircle size={17} /> Chat WhatsApp
              </button>
              <button onClick={() => window.open(`tel:${settings?.phone}`, "_self")}
                style={{ flex: 1, background: G, color: "#000", border: "none", borderRadius: 9, padding: "13px", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <Phone size={17} /> Telepon
              </button>
            </div>
          </div>

          {/* Cara pemesanan */}
          <div style={{ background: "#0d0d1c", borderRadius: 16, padding: 28, border: "1px solid rgba(255,255,255,0.06)" }}>
            <h3 style={{ color: "white", fontWeight: 700, fontSize: 18, marginBottom: 22 }}>📋 Cara Pemesanan</h3>
            {[
              ["1", "Hubungi kami via WhatsApp atau telepon"],
              ["2", "Tentukan jenis mobil, tanggal, dan tujuan perjalanan"],
              ["3", "Konfirmasi harga dan syarat sewa"],
              ["4", "Bayar DP / lunas sesuai kesepakatan"],
              ["5", "Mobil siap dijemput atau diantarkan ke lokasi Anda"],
            ].map(([n, t]) => (
              <div key={n} style={{ display: "flex", gap: 14, marginBottom: 18, alignItems: "flex-start" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: G, display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{n}</div>
                <p style={{ color: "#ccc", fontSize: 14, lineHeight: 1.65, paddingTop: 5 }}>{t}</p>
              </div>
            ))}

            {/* Map embed placeholder */}
            <div style={{ marginTop: 20, background: "rgba(201,162,39,0.05)", border: "1px dashed rgba(201,162,39,0.25)", borderRadius: 10, padding: "20px", textAlign: "center" }}>
              <p style={{ color: "#555", fontSize: 13 }}>📍 {settings?.address}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

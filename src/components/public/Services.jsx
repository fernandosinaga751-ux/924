import { SectionHeader } from "../Shared";

const SERVICES = [
  { e: "✈️", t: "Antar Jemput Bandara",    d: "Layanan antar jemput Bandara Kualanamu (KNO) 24 jam, tepat waktu dan nyaman." },
  { e: "🏔️", t: "Wisata & Tour",           d: "Paket wisata ke Danau Toba, Berastagi, Bukit Lawang, Tangkahan dan destinasi populer Sumatera Utara." },
  { e: "🏢", t: "Perjalanan Bisnis",        d: "Armada premium dengan sopir profesional untuk kebutuhan bisnis dan pertemuan korporat Anda." },
  { e: "📅", t: "Sewa Harian & Bulanan",   d: "Fleksibel sewa harian minimal 12 jam, atau paket bulanan dengan tarif spesial." },
  { e: "💍", t: "Event & Pernikahan",       d: "Kendaraan eksklusif untuk acara pernikahan, ulang tahun, dan event spesial Anda." },
  { e: "🎓", t: "Study Tour & Rombongan",  d: "Armada Hiace dan minibus kapasitas besar untuk study tour sekolah dan perjalanan kelompok." },
];

export default function Services() {
  return (
    <section style={{ padding: "80px 20px", background: "#080813" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <SectionHeader label="Layanan" title="Apa yang Kami Tawarkan" sub="Layanan lengkap rental mobil untuk semua kebutuhan perjalanan Anda di Medan dan Sumatera Utara" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))", gap: 20 }}>
          {SERVICES.map(s => (
            <div key={s.t}
              style={{ background: "#0d0d1c", borderRadius: 14, padding: 26, border: "1px solid rgba(255,255,255,0.06)", transition: "border-color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(201,162,39,0.3)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}
            >
              <div style={{ fontSize: 36, marginBottom: 14 }}>{s.e}</div>
              <h3 style={{ color: "white", fontWeight: 700, fontSize: 16, marginBottom: 10 }}>{s.t}</h3>
              <p style={{ color: "#888", fontSize: 13, lineHeight: 1.75 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Shield, Users, Zap, CheckCircle, Clock, Star } from "lucide-react";
import { G, D, SectionHeader } from "../Shared";

const WHY = [
  { i: <Shield size={26} color={G} />, t: "Terpercaya & Berlisensi",  d: "Beroperasi resmi sejak 2015 dengan izin usaha lengkap dan armada terasuransi penuh." },
  { i: <Users size={26} color={G} />, t: "Sopir Profesional",         d: "Driver berpengalaman, hafal seluruh rute Sumatera Utara, ramah dan selalu tepat waktu." },
  { i: <Zap size={26} color={G} />,   t: "Proses Cepat & Mudah",      d: "Pesan via WhatsApp, konfirmasi cepat. Tidak perlu deposit besar untuk pelanggan tetap." },
  { i: <CheckCircle size={26} color={G} />, t: "Armada Terawat",       d: "Seluruh kendaraan servis rutin, bersih, AC dingin. Siap pakai kapan pun Anda butuhkan." },
  { i: <Clock size={26} color={G} />, t: "Layanan 24 Jam",            d: "Siap melayani pemesanan dan pertanyaan 24 jam sehari, 7 hari seminggu." },
  { i: <Star size={26} color={G} />,  t: "Harga Transparan",          d: "Tidak ada biaya tersembunyi. Harga sudah termasuk BBM untuk paket dengan sopir." },
];

export function WhyUs() {
  return (
    <section style={{ padding: "80px 20px", background: D }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <SectionHeader label="Keunggulan" title="Mengapa Pilih Kami?" sub="Ribuan pelanggan telah mempercayakan perjalanan mereka kepada 924 Rental Mobil Medan" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px,1fr))", gap: 20 }}>
          {WHY.map(p => (
            <div key={p.t} style={{ background: "#0d0d1c", borderRadius: 14, padding: 26, border: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: "rgba(201,162,39,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>{p.i}</div>
              <h3 style={{ color: "white", fontWeight: 700, fontSize: 15, lineHeight: 1.4 }}>{p.t}</h3>
              <p style={{ color: "#888", fontSize: 13, lineHeight: 1.75 }}>{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const REVIEWS = [
  { n: "Budi Santoso",  r: "Pengusaha, Medan",     s: 5, t: "Sudah 3 tahun langganan 924 Rental Mobil Medan. Mobilnya selalu bersih, sopirnya ramah dan on-time. Recommended banget!", av: "BS" },
  { n: "Sari Hutabarat",r: "Wisatawan, Jakarta",   s: 5, t: "Sewa Innova untuk tour ke Danau Toba. Sopirnya hafal semua jalur, sabar, dan mau bantu foto-foto. Luar biasa!", av: "SH" },
  { n: "Reza Lubis",    r: "Manager Perusahaan",   s: 5, t: "Alphard-nya sangat mewah dan bersih. Tamu bisnis kami sangat terkesan. Harga bersaing dan layanan profesional!", av: "RL" },
  { n: "Diana Sibuea",  r: "Guru, Berastagi",      s: 5, t: "Study tour siswa pakai Hiace 924 Rental Mobil Medan. Aman, nyaman, sopir sabar. Harga sangat terjangkau untuk grup.", av: "DS" },
];

export function Testimonials() {
  return (
    <section style={{ padding: "80px 20px", background: "#080813" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <SectionHeader label="Testimoni" title="Kata Pelanggan Kami" sub="Kepuasan pelanggan adalah prioritas utama kami" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(268px,1fr))", gap: 20 }}>
          {REVIEWS.map((r, i) => (
            <div key={i} style={{ background: "#0d0d1c", borderRadius: 14, padding: 24, border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
                {Array(r.s).fill(0).map((_, j) => <Star key={j} size={14} color={G} fill={G} />)}
              </div>
              <p style={{ color: "#ccc", fontSize: 14, lineHeight: 1.78, marginBottom: 18, fontStyle: "italic" }}>"{r.t}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: `linear-gradient(135deg, ${G}, #8B6914)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontWeight: 800, fontSize: 13 }}>{r.av}</div>
                <div>
                  <div style={{ color: "white", fontWeight: 700, fontSize: 14 }}>{r.n}</div>
                  <div style={{ color: "#666", fontSize: 12 }}>{r.r}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

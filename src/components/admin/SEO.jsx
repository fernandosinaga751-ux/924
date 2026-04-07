import { useState } from "react";
import { Save, Globe, Hash, Settings } from "lucide-react";
import { G, FormInput } from "../Shared";

export default function AdminSEO({ seo, saveSeo }) {
  const [form,   setForm]   = useState({ ...seo });
  const [saving, setSaving] = useState(false);
  const [ok,     setOk]     = useState(false);

  const set  = (f, v) => setForm(p => ({ ...p, [f]: v }));
  const save = async () => {
    setSaving(true);
    try { await saveSeo(form); setOk(true); setTimeout(() => setOk(false), 3000); }
    catch (e) { alert("Gagal menyimpan SEO: " + e.message); }
    finally   { setSaving(false); }
  };

  const titleLen = (form.siteTitle || "").length;
  const descLen  = (form.metaDesc  || "").length;

  return (
    <div style={{ maxWidth: 740 }}>
      <h2 style={{ color: "white", fontWeight: 800, fontSize: 22, marginBottom: 6 }}>Pengaturan SEO</h2>
      <p style={{ color: "#555", fontSize: 13, marginBottom: 30 }}>Optimasi agar website tampil lebih baik di hasil pencarian Google</p>

      {/* Meta utama */}
      <div style={{ background: "#0d0d1c", borderRadius: 14, padding: 26, border: "1px solid rgba(255,255,255,0.06)", marginBottom: 18 }}>
        <div style={{ color: G, fontWeight: 700, fontSize: 13, marginBottom: 20, display: "flex", gap: 8, alignItems: "center" }}>
          <Globe size={16} /> Meta Tags Utama
        </div>

        <div>
          <FormInput
            label={`Title Tag (${titleLen}/60 karakter)`}
            value={form.siteTitle || ""}
            onChange={v => set("siteTitle", v)}
            hint="Tampil di tab browser & hasil pencarian Google. Sertakan kata kunci utama di awal."
            placeholder="924 Rental Mobil Medan - Sewa Mobil Terpercaya"
          />
          {titleLen > 60 && <p style={{ color: "#f59e0b", fontSize: 12, marginTop: -10, marginBottom: 14 }}>⚠️ Sebaiknya ≤ 60 karakter agar tidak terpotong di Google.</p>}
        </div>

        <div>
          <FormInput
            label={`Meta Description (${descLen}/160 karakter)`}
            value={form.metaDesc || ""}
            onChange={v => set("metaDesc", v)}
            rows={3}
            hint="Deskripsi singkat yang tampil di bawah judul di Google. Gunakan ajakan bertindak (CTA)."
            placeholder="Sewa mobil terpercaya di Medan. Avanza, Innova, Alphard, sopir profesional 24 jam..."
          />
          {descLen > 160 && <p style={{ color: "#f59e0b", fontSize: 12, marginTop: -10, marginBottom: 14 }}>⚠️ Sebaiknya ≤ 160 karakter.</p>}
        </div>

        <FormInput
          label="Keywords (pisahkan dengan koma)"
          value={form.keywords || ""}
          onChange={v => set("keywords", v)}
          rows={3}
          hint="Kata kunci target. Contoh: rental mobil medan, sewa mobil medan, rental avanza medan"
        />
      </div>

      {/* Open Graph */}
      <div style={{ background: "#0d0d1c", borderRadius: 14, padding: 26, border: "1px solid rgba(255,255,255,0.06)", marginBottom: 18 }}>
        <div style={{ color: G, fontWeight: 700, fontSize: 13, marginBottom: 20, display: "flex", gap: 8, alignItems: "center" }}>
          <Hash size={16} /> Open Graph — Preview di Facebook & WhatsApp
        </div>
        <FormInput label="OG Title" value={form.ogTitle || ""} onChange={v => set("ogTitle", v)} />
        <FormInput label="OG Description" value={form.ogDesc || ""} onChange={v => set("ogDesc", v)} rows={2} />
      </div>

      {/* Teknis */}
      <div style={{ background: "#0d0d1c", borderRadius: 14, padding: 26, border: "1px solid rgba(255,255,255,0.06)", marginBottom: 18 }}>
        <div style={{ color: G, fontWeight: 700, fontSize: 13, marginBottom: 20, display: "flex", gap: 8, alignItems: "center" }}>
          <Settings size={16} /> Pengaturan Teknis
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <FormInput label="Robots"        value={form.robots    || ""} onChange={v => set("robots", v)}    placeholder="index, follow" />
          <FormInput label="Canonical URL" value={form.canonical || ""} onChange={v => set("canonical", v)} placeholder="https://924rentalmobilmedan.com" />
        </div>
        <FormInput
          label="Google Analytics ID (opsional)"
          value={form.ga || ""}
          onChange={v => set("ga", v)}
          hint="Contoh: G-XXXXXXXXXX — Daftarkan dulu di analytics.google.com"
          placeholder="G-XXXXXXXXXX"
        />
      </div>

      {/* Tips */}
      <div style={{ background: "rgba(201,162,39,0.05)", border: "1px solid rgba(201,162,39,0.18)", borderRadius: 12, padding: 18, marginBottom: 24 }}>
        <h4 style={{ color: G, fontWeight: 700, fontSize: 13, marginBottom: 10 }}>💡 Tips SEO untuk Rental Mobil Medan</h4>
        <ul style={{ color: "#888", fontSize: 13, lineHeight: 2, paddingLeft: 18 }}>
          <li>Tulis artikel <strong style={{ color: "#aaa" }}>minimal 2x seminggu</strong> dengan topik perjalanan dari Medan</li>
          <li>Gunakan kata kunci <strong style={{ color: "#aaa" }}>"rental mobil medan"</strong> di judul, deskripsi, dan konten</li>
          <li>Daftarkan bisnis di <strong style={{ color: "#aaa" }}>Google Business Profile</strong> (gratis)</li>
          <li>Minta pelanggan memberikan <strong style={{ color: "#aaa" }}>ulasan di Google Maps</strong></li>
          <li>Pastikan website cepat terbuka di HP — Google prioritaskan mobile-first</li>
        </ul>
      </div>

      <button onClick={save} disabled={saving}
        style={{ background: ok ? "#15803d" : saving ? "#7a5f14" : G, color: "#000", border: "none", borderRadius: 10, padding: "13px 28px", fontWeight: 700, fontSize: 15, cursor: saving ? "not-allowed" : "pointer", display: "flex", gap: 8, alignItems: "center", transition: "background 0.3s" }}>
        <Save size={16} /> {ok ? "✓ Berhasil Disimpan!" : saving ? "Menyimpan..." : "Simpan Pengaturan SEO"}
      </button>
    </div>
  );
}

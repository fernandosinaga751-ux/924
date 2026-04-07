import { useState } from "react";
import { Save } from "lucide-react";
import { G, FormInput } from "../Shared";

export default function AdminSettings({ settings, saveSettings }) {
  const [form,   setForm]   = useState({ ...settings });
  const [saving, setSaving] = useState(false);
  const [ok,     setOk]     = useState(false);

  const set  = (f, v) => setForm(p => ({ ...p, [f]: v }));
  const save = async () => {
    setSaving(true);
    try { await saveSettings(form); setOk(true); setTimeout(() => setOk(false), 3000); }
    catch (e) { alert("Gagal menyimpan: " + e.message); }
    finally   { setSaving(false); }
  };

  const Section = ({ title, children }) => (
    <div style={{ background: "#0d0d1c", borderRadius: 14, padding: 26, border: "1px solid rgba(255,255,255,0.06)", marginBottom: 18 }}>
      <div style={{ color: G, fontWeight: 700, fontSize: 13, marginBottom: 20 }}>{title}</div>
      {children}
    </div>
  );

  return (
    <div style={{ maxWidth: 740 }}>
      <h2 style={{ color: "white", fontWeight: 800, fontSize: 22, marginBottom: 6 }}>Pengaturan Website</h2>
      <p style={{ color: "#555", fontSize: 13, marginBottom: 30 }}>Konfigurasi konten, kontak, dan media sosial</p>

      <Section title="🏠 Konten Halaman Utama">
        <FormInput label="Judul Hero (H1)"  value={form.heroTitle || ""} onChange={v => set("heroTitle", v)} />
        <FormInput label="Subtitle Hero"    value={form.heroSub   || ""} onChange={v => set("heroSub", v)}   rows={2} />
        <FormInput label="Tagline Singkat"  value={form.tagline   || ""} onChange={v => set("tagline", v)}   />
      </Section>

      <Section title="💬 WhatsApp & Kontak">
        <FormInput
          label="Nomor WhatsApp"
          value={form.wa || ""}
          onChange={v => set("wa", v)}
          hint="Format: 628xxxxxxxxxx — tanpa tanda + atau spasi. Contoh: 6281234567890"
          placeholder="6281234567890"
        />
        <FormInput
          label="Pesan Default WhatsApp"
          value={form.waMsg || ""}
          onChange={v => set("waMsg", v)}
          rows={2}
          placeholder="Halo 924 Rental Mobil Medan, saya ingin menyewa mobil..."
        />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <FormInput label="Nomor Telepon (tampilan)" value={form.phone || ""} onChange={v => set("phone", v)} placeholder="+62 821-xxxx-xxxx" />
          <FormInput label="Email"                    value={form.email || ""} onChange={v => set("email", v)} placeholder="info@domain.com" type="email" />
        </div>

        {/* WA preview */}
        {form.wa && (
          <div style={{ background: "rgba(37,211,102,0.06)", border: "1px solid rgba(37,211,102,0.2)", borderRadius: 9, padding: 14, marginTop: 4 }}>
            <p style={{ color: "#888", fontSize: 12 }}>Preview link WA:</p>
            <p style={{ color: "#25D366", fontSize: 13, fontWeight: 600, wordBreak: "break-all" }}>
              https://wa.me/{form.wa}
            </p>
          </div>
        )}
      </Section>

      <Section title="📍 Informasi Bisnis">
        <FormInput label="Alamat Lengkap"   value={form.address  || ""} onChange={v => set("address", v)}  rows={2} />
        <FormInput label="Jam Operasional"  value={form.hours    || ""} onChange={v => set("hours", v)}    placeholder="08.00 – 22.00 WIB (Setiap Hari)" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <FormInput label="Username Instagram" value={form.instagram || ""} onChange={v => set("instagram", v)} placeholder="924rentalmobilmedan" />
          <FormInput label="Username Facebook"  value={form.facebook  || ""} onChange={v => set("facebook", v)}  placeholder="924RentalMobilMedan" />
        </div>
      </Section>

      <Section title="🔐 Admin & Keamanan">
        <FormInput
          label="Email Admin (Firebase Auth)"
          value={form.adminEmail || ""}
          onChange={v => set("adminEmail", v)}
          type="email"
          hint="Email yang digunakan untuk login ke panel admin. Harus sudah dibuat di Firebase Authentication."
          placeholder="admin@924rentalmobilmedan.com"
        />
        <div style={{ background: "rgba(201,162,39,0.05)", border: "1px solid rgba(201,162,39,0.15)", borderRadius: 9, padding: 14 }}>
          <p style={{ color: "#555", fontSize: 12, lineHeight: 1.7 }}>
            🔑 Password admin dikelola di <strong style={{ color: G }}>Firebase Console → Authentication → Users</strong>.
            Untuk reset password, gunakan fitur "Reset Password" di Firebase Console atau kirim email reset via Firebase.
          </p>
        </div>
      </Section>

      <button onClick={save} disabled={saving}
        style={{ background: ok ? "#15803d" : saving ? "#7a5f14" : G, color: "#000", border: "none", borderRadius: 10, padding: "13px 28px", fontWeight: 700, fontSize: 15, cursor: saving ? "not-allowed" : "pointer", display: "flex", gap: 8, alignItems: "center", transition: "background 0.3s" }}>
        <Save size={16} /> {ok ? "✓ Berhasil Disimpan!" : saving ? "Menyimpan..." : "Simpan Pengaturan"}
      </button>
    </div>
  );
}

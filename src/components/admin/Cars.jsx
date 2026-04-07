import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { G, fmt, FormInput } from "../Shared";

const BLANK = { name: "", cat: "MPV", price: "", cap: 7, trans: "Manual/Matic", fuel: "Bensin", desc: "", feats: "", grad: "#1a3a6e,#1d4ed8", order: 99 };

export default function AdminCars({ cars, addCar, updateCar, deleteCar }) {
  const [editing, setEditing] = useState(null); // null = closed, "new" = new, id = edit
  const [form,    setForm]    = useState({});
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState("");

  const open = (car = null) => {
    setError("");
    if (car) {
      setEditing(car.id);
      setForm({ ...car, feats: Array.isArray(car.feats) ? car.feats.join(", ") : "" });
    } else {
      setEditing("new");
      setForm({ ...BLANK, order: (cars?.length || 0) + 1 });
    }
  };
  const close = () => { setEditing(null); setForm({}); setError(""); };

  const set = (field, val) => setForm(p => ({ ...p, [field]: val }));

  const save = async () => {
    if (!form.name || !form.price) { setError("Nama dan harga wajib diisi."); return; }
    setSaving(true); setError("");
    try {
      const data = {
        ...form,
        price: Number(form.price),
        cap:   Number(form.cap),
        feats: String(form.feats).split(",").map(s => s.trim()).filter(Boolean),
        order: Number(form.order) || 99,
      };
      if (editing === "new") await addCar(data);
      else                   await updateCar(editing, data);
      close();
    } catch (e) {
      setError("Gagal menyimpan: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  const del = async (id, name) => {
    if (!confirm(`Hapus "${name}" dari daftar armada?`)) return;
    try { await deleteCar(id); } catch (e) { alert("Gagal menghapus: " + e.message); }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <h2 style={{ color: "white", fontWeight: 800, fontSize: 22 }}>Manajemen Armada</h2>
          <p style={{ color: "#555", fontSize: 13, marginTop: 4 }}>{cars?.length || 0} kendaraan terdaftar</p>
        </div>
        <button onClick={() => open()}
          style={{ background: G, color: "#000", border: "none", borderRadius: 9, padding: "10px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", gap: 8, alignItems: "center" }}>
          <Plus size={16} /> Tambah Mobil
        </button>
      </div>

      {/* List */}
      <div style={{ display: "grid", gap: 12 }}>
        {(cars || []).map(car => (
          <div key={car.id} style={{ background: "#0d0d1c", borderRadius: 12, padding: "18px 22px", border: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{ background: `linear-gradient(135deg, ${car.grad})`, width: 52, height: 52, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>🚗</div>
              <div>
                <div style={{ color: "white", fontWeight: 700, fontSize: 15 }}>{car.name}</div>
                <div style={{ color: "#555", fontSize: 12, marginTop: 3 }}>{car.cat} · {car.cap} kursi · {fmt(car.price)}/hari</div>
                <div style={{ display: "flex", gap: 5, marginTop: 6, flexWrap: "wrap" }}>
                  {(car.feats || []).slice(0, 3).map(f => (
                    <span key={f} style={{ background: "rgba(201,162,39,0.08)", color: G, fontSize: 10, padding: "2px 8px", borderRadius: 100, fontWeight: 600 }}>{f}</span>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => open(car)}
                style={{ background: "rgba(201,162,39,0.1)", color: G, border: "none", borderRadius: 8, padding: "8px 14px", cursor: "pointer", display: "flex", gap: 5, alignItems: "center", fontSize: 13, fontWeight: 600 }}>
                <Edit2 size={14} /> Edit
              </button>
              <button onClick={() => del(car.id, car.name)}
                style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "none", borderRadius: 8, padding: "8px 14px", cursor: "pointer", display: "flex", gap: 5, alignItems: "center", fontSize: 13, fontWeight: 600 }}>
                <Trash2 size={14} /> Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {editing !== null && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
          onClick={e => e.target === e.currentTarget && close()}>
          <div style={{ background: "#0d0d1c", borderRadius: 18, padding: 32, width: "100%", maxWidth: 560, maxHeight: "90vh", overflowY: "auto", border: "1px solid rgba(201,162,39,0.2)" }}>
            <h3 style={{ color: "white", fontWeight: 800, fontSize: 18, marginBottom: 24 }}>
              {editing === "new" ? "➕ Tambah Mobil Baru" : "✏️ Edit Kendaraan"}
            </h3>

            <FormInput label="Nama Kendaraan *"  value={form.name || ""}  onChange={v => set("name", v)} placeholder="contoh: Toyota Avanza" />
            <FormInput label="Kategori"           value={form.cat  || ""}  onChange={v => set("cat", v)}  options={["MPV", "MPV Premium", "MPV Luxury", "Hatchback", "Minibus", "SUV", "Sedan"]} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <FormInput label="Harga/Hari (Rp) *" value={form.price || ""} onChange={v => set("price", v)} type="number" placeholder="350000" />
              <FormInput label="Kapasitas (kursi)"  value={form.cap   || ""} onChange={v => set("cap", v)}   type="number" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <FormInput label="Transmisi" value={form.trans || ""} onChange={v => set("trans", v)} options={["Manual", "Matic", "Manual/Matic"]} />
              <FormInput label="Bahan Bakar" value={form.fuel || ""} onChange={v => set("fuel", v)} options={["Bensin", "Solar", "Hybrid"]} />
            </div>
            <FormInput label="Deskripsi Singkat" value={form.desc || ""} onChange={v => set("desc", v)} rows={3} placeholder="Cocok untuk keluarga..." />
            <FormInput label="Fitur (pisahkan dengan koma)" value={form.feats || ""} onChange={v => set("feats", v)} placeholder="Full AC, GPS, Audio Bluetooth" />
            <FormInput label="Gradient Warna (CSS, opsional)" value={form.grad || ""} onChange={v => set("grad", v)} placeholder="#1a3a6e,#1d4ed8" />
            <FormInput label="Urutan Tampil" value={form.order || ""} onChange={v => set("order", v)} type="number" />

            {error && <div style={{ color: "#ef4444", fontSize: 13, marginBottom: 14, padding: "10px 14px", background: "rgba(239,68,68,0.08)", borderRadius: 8 }}>⚠️ {error}</div>}

            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <button onClick={save} disabled={saving}
                style={{ flex: 1, background: saving ? "#7a5f14" : G, color: "#000", border: "none", borderRadius: 9, padding: "12px", fontWeight: 700, cursor: saving ? "not-allowed" : "pointer" }}>
                {saving ? "Menyimpan..." : "💾 Simpan"}
              </button>
              <button onClick={close}
                style={{ flex: 1, background: "rgba(255,255,255,0.06)", color: "#aaa", border: "none", borderRadius: 9, padding: "12px", fontWeight: 700, cursor: "pointer" }}>
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff } from "lucide-react";
import { G, FormInput } from "../Shared";

const today = () => new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
const BLANK  = { title: "", slug: "", excerpt: "", content: "", cat: "Tips Perjalanan", date: today(), published: true, color: "#1a3a6e", order: 99 };

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").substring(0, 80);
}

export default function AdminArticles({ articles, addArticle, updateArticle, deleteArticle }) {
  const [editing, setEditing] = useState(null);
  const [form,    setForm]    = useState({});
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState("");
  const [tab,     setTab]     = useState("write"); // write | preview

  const open = (a = null) => {
    setError(""); setTab("write");
    if (a) { setEditing(a.id);   setForm({ ...a }); }
    else   { setEditing("new");  setForm({ ...BLANK, order: (articles?.length || 0) + 1 }); }
  };
  const close = () => { setEditing(null); setForm({}); setError(""); };
  const set   = (field, val) => setForm(p => ({ ...p, [field]: val }));

  const save = async () => {
    if (!form.title || !form.content) { setError("Judul dan konten wajib diisi."); return; }
    setSaving(true); setError("");
    try {
      const data = { ...form, slug: form.slug || slugify(form.title), order: Number(form.order) || 99 };
      if (editing === "new") await addArticle(data);
      else                   await updateArticle(editing, data);
      close();
    } catch (e) {
      setError("Gagal menyimpan: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  const toggle = async (a) => {
    try { await updateArticle(a.id, { published: !a.published }); }
    catch (e) { alert("Gagal: " + e.message); }
  };

  const del = async (id, title) => {
    if (!confirm(`Hapus artikel "${title}"?`)) return;
    try { await deleteArticle(id); } catch (e) { alert("Gagal menghapus: " + e.message); }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <h2 style={{ color: "white", fontWeight: 800, fontSize: 22 }}>Manajemen Artikel</h2>
          <p style={{ color: "#555", fontSize: 13, marginTop: 4 }}>
            {articles?.length || 0} artikel · {(articles || []).filter(a => a.published).length} tayang
          </p>
        </div>
        <button onClick={() => open()}
          style={{ background: G, color: "#000", border: "none", borderRadius: 9, padding: "10px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", gap: 8, alignItems: "center" }}>
          <Plus size={16} /> Tulis Artikel
        </button>
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        {(articles || []).map(a => (
          <div key={a.id} style={{ background: "#0d0d1c", borderRadius: 12, padding: "18px 22px", border: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", gap: 14, alignItems: "center", flex: 1, minWidth: 0 }}>
              <div style={{ width: 5, borderRadius: 4, alignSelf: "stretch", background: a.color, flexShrink: 0 }} />
              <div style={{ minWidth: 0 }}>
                <div style={{ color: "white", fontWeight: 700, fontSize: 15, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 420 }}>{a.title}</div>
                <div style={{ color: "#555", fontSize: 12, marginTop: 3 }}>{a.cat} · {a.date} · 👁 {a.views || 0} views</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: a.published ? G : "#ef4444", minWidth: 46 }}>
                {a.published ? "TAYANG" : "DRAFT"}
              </span>
              <button onClick={() => toggle(a)} title={a.published ? "Jadikan Draft" : "Tayangkan"}
                style={{ background: "rgba(255,255,255,0.05)", color: "#888", border: "none", borderRadius: 7, padding: "7px 11px", cursor: "pointer", display: "flex", gap: 4, alignItems: "center", fontSize: 12 }}>
                {a.published ? <EyeOff size={13} /> : <Eye size={13} />}
                {a.published ? "Draft" : "Tayang"}
              </button>
              <button onClick={() => open(a)}
                style={{ background: "rgba(201,162,39,0.1)", color: G, border: "none", borderRadius: 7, padding: "7px 12px", cursor: "pointer", display: "flex", gap: 4, alignItems: "center", fontSize: 13, fontWeight: 600 }}>
                <Edit2 size={13} /> Edit
              </button>
              <button onClick={() => del(a.id, a.title)}
                style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "none", borderRadius: 7, padding: "7px 12px", cursor: "pointer", display: "flex", gap: 4, alignItems: "center", fontSize: 13, fontWeight: 600 }}>
                <Trash2 size={13} /> Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {editing !== null && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
          onClick={e => e.target === e.currentTarget && close()}>
          <div style={{ background: "#0d0d1c", borderRadius: 18, padding: 32, width: "100%", maxWidth: 680, maxHeight: "92vh", overflowY: "auto", border: "1px solid rgba(201,162,39,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h3 style={{ color: "white", fontWeight: 800, fontSize: 18 }}>
                {editing === "new" ? "✍️ Tulis Artikel Baru" : "✏️ Edit Artikel"}
              </h3>
              {/* Tab write/preview */}
              <div style={{ display: "flex", gap: 4, background: "rgba(255,255,255,0.05)", borderRadius: 8, padding: 3 }}>
                {["write","preview"].map(t => (
                  <button key={t} onClick={() => setTab(t)}
                    style={{ background: tab === t ? G : "none", color: tab === t ? "#000" : "#888", border: "none", borderRadius: 6, padding: "5px 14px", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                    {t === "write" ? "✍ Tulis" : "👁 Preview"}
                  </button>
                ))}
              </div>
            </div>

            {tab === "write" ? (
              <>
                <FormInput label="Judul Artikel *" value={form.title || ""} onChange={v => { set("title", v); if (!form.slug) set("slug", slugify(v)); }} placeholder="Tips wisata ke Danau Toba..." />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <FormInput label="Kategori" value={form.cat || ""} onChange={v => set("cat", v)} options={["Tips Perjalanan", "Panduan", "Wisata", "Berita", "Promo"]} />
                  <FormInput label="Tanggal Tampil" value={form.date || ""} onChange={v => set("date", v)} placeholder="10 Jan 2025" />
                </div>
                <FormInput label="Slug URL" value={form.slug || ""} onChange={v => set("slug", v)} placeholder="tips-wisata-danau-toba" hint="URL artikel: /artikel/slug-ini" />
                <FormInput label="Kutipan (Excerpt)" value={form.excerpt || ""} onChange={v => set("excerpt", v)} rows={2} placeholder="Ringkasan singkat artikel..." />
                <FormInput label="Konten Artikel *" value={form.content || ""} onChange={v => set("content", v)} rows={10} placeholder="Tulis konten artikel di sini..." />

                {/* Status */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ color: "#bbb", fontSize: 13, fontWeight: 700, display: "block", marginBottom: 8 }}>Status Publikasi</label>
                  <div style={{ display: "flex", gap: 10 }}>
                    {[true, false].map(v => (
                      <button key={String(v)} onClick={() => set("published", v)}
                        style={{
                          flex: 1, border: `1px solid ${form.published === v ? (v ? "rgba(201,162,39,0.4)" : "rgba(239,68,68,0.4)") : "rgba(255,255,255,0.08)"}`,
                          background: form.published === v ? (v ? "rgba(201,162,39,0.12)" : "rgba(239,68,68,0.1)") : "transparent",
                          color: form.published === v ? (v ? G : "#ef4444") : "#555",
                          borderRadius: 8, padding: "10px", cursor: "pointer", fontWeight: 700, fontSize: 13,
                        }}>
                        {v ? "✅ Tayang" : "📝 Draft"}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* Preview */
              <div style={{ background: "#08080f", borderRadius: 12, padding: 24, minHeight: 300 }}>
                <h2 style={{ color: "white", fontSize: 22, fontWeight: 800, marginBottom: 12, fontFamily: "Georgia, serif" }}>{form.title || "(Judul kosong)"}</h2>
                <div style={{ color: "#888", fontSize: 13, marginBottom: 16 }}>📅 {form.date} · {form.cat}</div>
                <div style={{ color: "#ccc", fontSize: 14, lineHeight: 1.9, whiteSpace: "pre-line" }}>{form.content || "(Konten kosong)"}</div>
              </div>
            )}

            {error && <div style={{ color: "#ef4444", fontSize: 13, margin: "12px 0", padding: "10px 14px", background: "rgba(239,68,68,0.08)", borderRadius: 8 }}>⚠️ {error}</div>}

            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button onClick={save} disabled={saving}
                style={{ flex: 1, background: saving ? "#7a5f14" : G, color: "#000", border: "none", borderRadius: 9, padding: "12px", fontWeight: 700, cursor: saving ? "not-allowed" : "pointer" }}>
                {saving ? "Menyimpan..." : "💾 Simpan Artikel"}
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

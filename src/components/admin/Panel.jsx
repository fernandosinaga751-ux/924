import { Car, BarChart2, FileText, Globe, Settings, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { G } from "../Shared";

import Overview  from "./Overview";
import AdminCars from "./Cars";
import AdminArticles from "./Articles";
import AdminSEO  from "./SEO";
import AdminSettings from "./Settings";

const NAV = [
  { id: "dashboard", label: "Dashboard",    icon: <BarChart2 size={18} /> },
  { id: "cars",      label: "Armada",       icon: <Car size={18} /> },
  { id: "articles",  label: "Artikel",      icon: <FileText size={18} /> },
  { id: "seo",       label: "SEO",          icon: <Globe size={18} /> },
  { id: "settings",  label: "Pengaturan",   icon: <Settings size={18} /> },
];

export default function AdminPanel({
  page, setPage,
  cars, articles, settings, seo,
  addCar, updateCar, deleteCar,
  addArticle, updateArticle, deleteArticle,
  saveSettings, saveSeo,
  onGoPublic,
}) {
  const logout = async () => {
    await signOut(auth);
    onGoPublic();
  };

  return (
    <div style={{ minHeight: "100vh", background: "#08080f", display: "flex", fontFamily: "inherit" }}>

      {/* ── Sidebar ─────────────────────────────────── */}
      <aside className="admin-sidebar" style={{ width: 230, background: "#0a0a18", borderRight: "1px solid rgba(201,162,39,0.1)", padding: "22px 14px", display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh", flexShrink: 0, overflowY: "auto" }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 36, padding: "0 8px" }}>
          <div style={{ background: G, borderRadius: 8, padding: "7px 10px", display: "flex", flexShrink: 0 }}>
            <Car size={18} color="#000" />
          </div>
          <div className="sidebar-label">
            <div style={{ color: "white", fontWeight: 800, fontSize: 13 }}>924</div>
            <div style={{ color: G, fontSize: 8, fontWeight: 700, letterSpacing: 2 }}>CMS ADMIN</div>
          </div>
        </div>

        {/* Nav items */}
        <nav style={{ flex: 1 }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => setPage(n.id)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 11,
                padding: "11px 14px", borderRadius: 9, border: "none", cursor: "pointer",
                fontWeight: 600, fontSize: 14, marginBottom: 4, transition: "all 0.15s",
                background: page === n.id ? "rgba(201,162,39,0.12)" : "transparent",
                color:      page === n.id ? G : "#777",
                borderLeft: page === n.id ? `3px solid ${G}` : "3px solid transparent",
              }}>
              {n.icon}
              <span className="sidebar-label">{n.label}</span>
            </button>
          ))}
        </nav>

        {/* Bottom buttons */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 14, display: "flex", flexDirection: "column", gap: 6 }}>
          <button onClick={onGoPublic}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 9, border: "none", cursor: "pointer", background: "rgba(255,255,255,0.04)", color: "#666", fontWeight: 600, fontSize: 13, width: "100%", textAlign: "left" }}>
            🌐 <span className="sidebar-label">Lihat Website</span>
          </button>
          <button onClick={logout}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 9, border: "none", cursor: "pointer", background: "rgba(239,68,68,0.08)", color: "#ef4444", fontWeight: 600, fontSize: 13, width: "100%", textAlign: "left" }}>
            <LogOut size={17} /> <span className="sidebar-label">Keluar</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content ─────────────────────────────── */}
      <main style={{ flex: 1, padding: "36px 32px", overflowY: "auto", minWidth: 0 }}>
        {page === "dashboard" && (
          <Overview cars={cars} articles={articles} />
        )}
        {page === "cars" && (
          <AdminCars cars={cars} addCar={addCar} updateCar={updateCar} deleteCar={deleteCar} />
        )}
        {page === "articles" && (
          <AdminArticles articles={articles} addArticle={addArticle} updateArticle={updateArticle} deleteArticle={deleteArticle} />
        )}
        {page === "seo" && (
          <AdminSEO seo={seo} saveSeo={saveSeo} />
        )}
        {page === "settings" && (
          <AdminSettings settings={settings} saveSettings={saveSettings} />
        )}
      </main>
    </div>
  );
}

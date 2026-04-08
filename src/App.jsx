// ============================================================
// App.jsx — 924 Rental Mobil Medan CMS
// Stack: React + Vite + Firebase Firestore + Firebase Auth
// ============================================================
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useFirebase } from "./hooks/useFirebase";

// Public components
import Nav         from "./components/public/Nav";
import Hero        from "./components/public/Hero";
import Fleet       from "./components/public/Fleet";
import Services    from "./components/public/Services";
import { WhyUs, Testimonials } from "./components/public/WhyUs";
import { ArticleList, ArticleDetail } from "./components/public/Articles";
import Contact     from "./components/public/Contact";
import Footer      from "./components/public/Footer";
import { WAButton, Spinner } from "./components/Shared";

// Admin components
import AdminLogin  from "./components/admin/Login";
import AdminPanel  from "./components/admin/Panel";

// ── Update document <head> SEO tags dynamically ─────────────
function updateSEO(seo) {
  if (!seo) return;
  document.title = seo.siteTitle || "924 Rental Mobil Medan";
  const set = (sel, attr, val) => {
    let el = document.querySelector(sel);
    if (!el) { el = document.createElement("meta"); document.head.appendChild(el); }
    el.setAttribute(attr, val);
  };
  set('meta[name="description"]',        "content", seo.metaDesc   || "");
  set('meta[name="keywords"]',           "content", seo.keywords   || "");
  set('meta[name="robots"]',             "content", seo.robots     || "index, follow");
  set('meta[property="og:title"]',       "content", seo.ogTitle    || seo.siteTitle || "");
  set('meta[property="og:description"]', "content", seo.ogDesc     || seo.metaDesc  || "");
  set('link[rel="canonical"]',           "href",    seo.canonical  || "");
}

// ── Public Site wrapper ─────────────────────────────────────
function PublicSite({ firebase, setMode }) {
  const { cars, articles, settings, seo, incrementView, loading } = firebase;
  const [page,       setPage]       = useState("home");
  const [selArticle, setSelArticle] = useState(null);

  useEffect(() => { updateSEO(seo); }, [seo]);

  const openArticle = async (article) => {
    setSelArticle(article);
    setPage("article");
    window.scrollTo(0, 0);
    try { await incrementView(article.id); } catch (_) {}
  };

  return (
    <div style={{ background: "#07070f", minHeight: "100vh", fontFamily: "inherit", color: "white" }}>
      <Nav settings={settings} page={page} setPage={v => { setPage(v); window.scrollTo(0, 0); }} />

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
          <Spinner />
        </div>
      ) : (
        <>
          {page === "home" && (
            <>
              <Hero     settings={settings} cars={cars || []} setPage={setPage} />
              <Fleet    cars={cars || []} settings={settings} mini setPage={setPage} />
              <Services />
              <WhyUs />
              <Testimonials />
              <ArticleList articles={articles || []} setPage={setPage} setSelArticle={openArticle} mini />
              <Contact settings={settings} />
            </>
          )}
          {page === "fleet"   && <Fleet cars={cars || []} settings={settings} setPage={setPage} />}
          {page === "services" && <Services />}
          {page === "articles" && <ArticleList articles={articles || []} setPage={setPage} setSelArticle={openArticle} />}
          {page === "article"  && <ArticleDetail article={selArticle} setPage={setPage} settings={settings} />}
          {page === "contact"  && <Contact settings={settings} />}
        </>
      )}

      <Footer settings={settings} setPage={v => { setPage(v); window.scrollTo(0, 0); }} />

      {settings?.wa && (
        <WAButton wa={settings.wa} waMsg={settings.waMsg || ""} />
      )}

      {/* Admin shortcut button — selalu tampil */}
      <button
        onClick={() => setMode("admin")}
        title="Panel Admin"
        style={{
          position: "fixed", bottom: 80, left: 20, zIndex: 9999,
          background: "rgba(10,10,22,0.95)", color: "#aaa",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: 8, padding: "8px 16px",
          fontSize: 12, cursor: "pointer", fontWeight: 700,
          backdropFilter: "blur(8px)",
        }}>
        ⚙ Admin
      </button>
    </div>
  );
}

// ── App Root ────────────────────────────────────────────────
export default function App() {
  const [mode,      setMode]      = useState("public");
  const [authUser,  setAuthUser]  = useState(undefined); // undefined = auth loading
  const [adminPage, setAdminPage] = useState("dashboard");

  const firebase = useFirebase();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setAuthUser(user || null);
      if (!user && mode === "admin") setMode("public");
    });
    // Fallback: jika auth tidak merespons dalam 5 detik
    const timeout = setTimeout(() => setAuthUser(prev => prev === undefined ? null : prev), 5000);
    return () => { unsub(); clearTimeout(timeout); };
  }, [mode]);

  // Hanya spinner saat auth belum diketahui (max 5 detik)
  if (authUser === undefined) return <Spinner />;

  // ── ADMIN MODE ──
  if (mode === "admin" || mode === "login") {
    if (!authUser) {
      return (
        <AdminLogin
          adminEmail={firebase.settings?.adminEmail || ""}
          onBack={() => setMode("public")}
        />
      );
    }
    return (
      <AdminPanel
        page={adminPage}
        setPage={setAdminPage}
        cars={firebase.cars}
        articles={firebase.articles}
        settings={firebase.settings}
        seo={firebase.seo}
        addCar={firebase.addCar}
        updateCar={firebase.updateCar}
        deleteCar={firebase.deleteCar}
        addArticle={firebase.addArticle}
        updateArticle={firebase.updateArticle}
        deleteArticle={firebase.deleteArticle}
        saveSettings={firebase.saveSettings}
        saveSeo={firebase.saveSeo}
        onGoPublic={() => setMode("public")}
      />
    );
  }

  // ── PUBLIC MODE ──
  return <PublicSite firebase={firebase} setMode={setMode} />;
}

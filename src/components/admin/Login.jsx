import { useState } from "react";
import { Car } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { G, D } from "../Shared";

export default function AdminLogin({ onBack, adminEmail }) {
  const [email, setEmail] = useState(adminEmail || "");
  const [pw,    setPw]    = useState("");
  const [show,  setShow]  = useState(false);
  const [err,   setErr]   = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!email || !pw) { setErr("Email dan password wajib diisi."); return; }
    setLoading(true); setErr("");
    try {
      await signInWithEmailAndPassword(auth, email, pw);
      // onAuthStateChanged di App.jsx akan menangkap perubahan ini
    } catch (e) {
      const map = {
        "auth/user-not-found":  "Email tidak terdaftar.",
        "auth/wrong-password":  "Password salah.",
        "auth/invalid-email":   "Format email tidak valid.",
        "auth/too-many-requests": "Terlalu banyak percobaan. Coba lagi nanti.",
        "auth/invalid-credential": "Email atau password salah.",
      };
      setErr(map[e.code] || "Login gagal: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const inp = {
    width: "100%", background: "rgba(255,255,255,0.05)",
    border: `1px solid ${err ? "#ef4444" : "rgba(255,255,255,0.12)"}`,
    borderRadius: 9, padding: "12px 14px", color: "white",
    fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit",
  };

  return (
    <div style={{ minHeight: "100vh", background: D, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit" }}>
      <div style={{ background: "#0d0d1c", borderRadius: 20, padding: "44px 40px", width: "100%", maxWidth: 400, border: "1px solid rgba(201,162,39,0.2)", boxShadow: "0 32px 64px rgba(0,0,0,0.6)" }}>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
          <img src="/logo.svg" alt="924 Rental Mobil Medan" style={{ width: 44, height: 44, borderRadius: "50%" }} />
          <div>
            <div style={{ color: "white", fontWeight: 800, fontSize: 15 }}>924 RENTAL MOBIL</div>
            <div style={{ color: G, fontSize: 9, fontWeight: 700, letterSpacing: 2 }}>ADMIN CMS</div>
          </div>
        </div>

        <h2 style={{ color: "white", fontWeight: 800, fontSize: 22, marginBottom: 6 }}>Masuk ke Panel Admin</h2>
        <p style={{ color: "#555", fontSize: 13, marginBottom: 28 }}>Gunakan akun Firebase Authentication Anda</p>

        <div style={{ marginBottom: 14 }}>
          <label style={{ color: "#aaa", fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Email Admin</label>
          <input
            type="email" value={email} placeholder="admin@domain.com"
            onChange={e => { setEmail(e.target.value); setErr(""); }}
            onKeyDown={e => e.key === "Enter" && submit()}
            style={inp}
          />
        </div>

        <div style={{ marginBottom: 16, position: "relative" }}>
          <label style={{ color: "#aaa", fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Password</label>
          <input
            type={show ? "text" : "password"} value={pw} placeholder="••••••••"
            onChange={e => { setPw(e.target.value); setErr(""); }}
            onKeyDown={e => e.key === "Enter" && submit()}
            style={{ ...inp, paddingRight: 44 }}
          />
          <button onClick={() => setShow(!show)}
            style={{ position: "absolute", right: 12, bottom: 12, background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 17 }}>
            {show ? "🙈" : "👁"}
          </button>
        </div>

        {err && (
          <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, padding: "10px 14px", color: "#ef4444", fontSize: 13, marginBottom: 16 }}>
            ⚠️ {err}
          </div>
        )}

        <button onClick={submit} disabled={loading}
          style={{ width: "100%", background: loading ? "#7a5f14" : G, color: "#000", border: "none", borderRadius: 10, padding: "13px", fontWeight: 800, fontSize: 15, cursor: loading ? "not-allowed" : "pointer", marginBottom: 12, transition: "background 0.2s" }}>
          {loading ? "Memproses..." : "Masuk →"}
        </button>

        <button onClick={onBack}
          style={{ width: "100%", background: "none", border: "1px solid rgba(255,255,255,0.1)", color: "#888", borderRadius: 10, padding: "11px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
          ← Kembali ke Website
        </button>

        <div style={{ marginTop: 24, padding: 16, background: "rgba(201,162,39,0.05)", border: "1px solid rgba(201,162,39,0.15)", borderRadius: 10 }}>
          <p style={{ color: "#555", fontSize: 12, lineHeight: 1.6 }}>
            💡 <strong style={{ color: G }}>Setup Admin:</strong> Buat akun admin di Firebase Console →
            Authentication → Users → Add User. Gunakan email &amp; password yang sama di sini.
          </p>
        </div>
      </div>
    </div>
  );
}

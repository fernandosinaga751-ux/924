# 🚗 924 Rental Mobil Medan — Full CMS

Website rental mobil lengkap dengan CMS berbasis React + Vite + Firebase + Vercel.

---

## 🗂️ Struktur File

```
924-rental-mobil-medan/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── Articles.jsx   ← CRUD artikel
│   │   │   ├── Cars.jsx       ← CRUD armada
│   │   │   ├── Login.jsx      ← Halaman login admin
│   │   │   ├── Overview.jsx   ← Dashboard statistik
│   │   │   ├── Panel.jsx      ← Shell admin + sidebar
│   │   │   ├── SEO.jsx        ← Pengaturan SEO
│   │   │   └── Settings.jsx   ← Pengaturan website
│   │   ├── public/
│   │   │   ├── Articles.jsx   ← Daftar & detail artikel
│   │   │   ├── Contact.jsx    ← Halaman kontak
│   │   │   ├── Fleet.jsx      ← Daftar armada mobil
│   │   │   ├── Footer.jsx     ← Footer website
│   │   │   ├── Hero.jsx       ← Hero section
│   │   │   ├── Nav.jsx        ← Navigasi
│   │   │   ├── Services.jsx   ← Layanan
│   │   │   └── WhyUs.jsx      ← Keunggulan + Testimoni
│   │   └── Shared.jsx         ← Komponen & helper bersama
│   ├── hooks/
│   │   └── useFirebase.js     ← Hook Firebase (CRUD + realtime)
│   ├── App.jsx                ← Root app + routing
│   ├── firebase.js            ← Konfigurasi Firebase
│   ├── main.jsx               ← Entry point React
│   └── seed.js                ← Data awal (otomatis ke Firestore)
├── .env.example               ← Template environment variables
├── .gitignore
├── firestore.rules            ← Security rules Firestore
├── index.html
├── package.json
├── vercel.json
└── vite.config.js
```

---

## 🚀 Cara Setup & Deploy

### 1. Clone / Download & Install

```bash
cd 924-rental-mobil-medan
npm install
```

### 2. Setup Firebase

1. Buka [console.firebase.google.com](https://console.firebase.google.com)
2. **New Project** → nama: `924-rental-mobil-medan`
3. **Firestore Database** → Create → Production mode
4. **Authentication** → Get started → Email/Password → Enable
5. **Authentication → Users → Add User** → masukkan email & password admin
6. **Project Settings → Your Apps → Add App → Web** → copy config

### 3. Isi Environment Variables

```bash
cp .env.example .env
```

Edit `.env` dan isi dengan konfigurasi Firebase kamu.

### 4. Upload Firestore Security Rules

Di Firebase Console → **Firestore → Rules** → paste isi `firestore.rules` → Publish.

### 5. Jalankan Lokal

```bash
npm run dev
```

Buka [http://localhost:5173](http://localhost:5173)

**Login admin:** klik tombol "⚙ Admin" di pojok kiri bawah website, masukkan email & password yang dibuat di Firebase Authentication.

---

### 6. Push ke GitHub

```bash
git init
git add .
git commit -m "init: 924 Rental Mobil Medan mobil cms"
# Buat repo baru di github.com
git remote add origin https://github.com/USERNAME/924-rental-mobil-medan.git
git push -u origin main
```

### 7. Deploy ke Vercel

1. Buka [vercel.com](https://vercel.com) → Login dengan GitHub
2. **Add New Project** → import repo `924-rental-mobil-medan`
3. Framework: **Vite** (auto-detected)
4. **Environment Variables** → tambahkan semua isi `.env` kamu
5. **Deploy** → tunggu ~2 menit → 🎉 online!

---

## ✨ Fitur CMS

| Fitur | Keterangan |
|---|---|
| 🚗 Manajemen Armada | Tambah, edit, hapus kendaraan |
| 📝 Manajemen Artikel | Tulis, edit, tayang/draft artikel |
| 🔍 Pengaturan SEO | Title, meta desc, keywords, OG, GA |
| ⚙️ Pengaturan Website | Hero, kontak, WhatsApp, sosmed |
| 🔐 Auth Firebase | Login aman via Firebase Authentication |
| ⚡ Realtime | Data update otomatis tanpa refresh |
| 📦 Auto Seed | Data awal otomatis masuk ke Firestore |

---

## 💰 Biaya

| Layanan | Biaya |
|---|---|
| GitHub | Gratis |
| Vercel (Hobby) | Gratis |
| Firebase Spark | Gratis (50K read/hari) |
| Domain .com | ~Rp 150.000–200.000/tahun |

---

## 📞 Support

Hubungi via WhatsApp yang sudah dikonfigurasi di Settings admin.

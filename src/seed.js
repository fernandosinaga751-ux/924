// ============================================================
// SEED DATA — dijalankan otomatis saat database masih kosong
// ============================================================

export const SEED_CARS = [
  {
    name: "Toyota Avanza",
    cat: "MPV",
    price: 350000,
    cap: 7,
    trans: "Manual/Matic",
    fuel: "Bensin",
    desc: "Cocok untuk keluarga, irit BBM dan nyaman untuk perjalanan jauh ke seluruh Sumatera Utara.",
    feats: ["Full AC", "Audio Sistem", "Power Window", "GPS Tracker"],
    grad: "#1a3a6e,#1d4ed8",
    order: 1,
  },
  {
    name: "Toyota Kijang Innova",
    cat: "MPV Premium",
    price: 550000,
    cap: 7,
    trans: "Manual/Matic",
    fuel: "Solar/Bensin",
    desc: "Interior mewah, ideal untuk perjalanan bisnis dan keluarga se-Sumatera Utara.",
    feats: ["Full AC", "Audio Premium", "Kursi Kulit", "GPS", "Power Sliding Door"],
    grad: "#1a4a2e,#15803d",
    order: 2,
  },
  {
    name: "Honda Jazz / Brio",
    cat: "Hatchback",
    price: 280000,
    cap: 5,
    trans: "Matic",
    fuel: "Bensin",
    desc: "Kompak dan lincah, sempurna untuk dalam kota Medan yang dinamis dan padat.",
    feats: ["Full AC", "Audio Bluetooth", "Power Window"],
    grad: "#2d1a6e,#7c3aed",
    order: 3,
  },
  {
    name: "Toyota Alphard",
    cat: "MPV Luxury",
    price: 1500000,
    cap: 7,
    trans: "Matic",
    fuel: "Bensin",
    desc: "Kemewahan VIP untuk eksekutif, korporat, dan tamu VVIP di Medan.",
    feats: ["AC Dual Zone", "Entertainment System", "Captain Seat", "GPS", "Kamera 360°", "Sunroof"],
    grad: "#6e1a1a,#b91c1c",
    order: 4,
  },
  {
    name: "Daihatsu Xenia",
    cat: "MPV",
    price: 300000,
    cap: 7,
    trans: "Manual",
    fuel: "Bensin",
    desc: "Pilihan ekonomis dengan kapasitas besar, hemat BBM untuk perjalanan jarak jauh.",
    feats: ["Full AC", "Audio", "Power Window"],
    grad: "#1a4a4a,#0f766e",
    order: 5,
  },
  {
    name: "Toyota Hiace",
    cat: "Minibus",
    price: 800000,
    cap: 15,
    trans: "Manual",
    fuel: "Solar",
    desc: "Ideal untuk rombongan besar, wisata grup, gathering, dan study tour.",
    feats: ["AC Double Blower", "Audio Sistem", "15 Kursi Penumpang"],
    grad: "#4a3a1a,#b45309",
    order: 6,
  },
];

export const SEED_ARTICLES = [
  {
    title: "Tips Wisata ke Danau Toba dengan Rental Mobil dari Medan",
    slug: "tips-wisata-danau-toba",
    excerpt: "Danau Toba adalah destinasi wisata favorit dari Medan. Simak tips agar perjalananmu semakin nyaman menggunakan mobil rental.",
    content: `Danau Toba adalah salah satu destinasi wisata terpopuler di Sumatera Utara dan menjadi kebanggaan masyarakat Batak. Dengan jarak sekitar 176 km dari Medan, perjalanan ke Danau Toba memakan waktu sekitar 4-5 jam menggunakan mobil.

Mengapa memilih rental mobil untuk perjalanan ke Danau Toba? Pertama, fleksibilitas waktu — Anda bisa berangkat dan pulang sesuai jadwal sendiri. Kedua, kenyamanan — dengan armada terawat, perjalanan panjang jadi lebih menyenangkan.

Tips dari kami:
• Pesan mobil H-3 hingga H-7 untuk musim liburan
• Pilih mobil dengan kapasitas sesuai rombongan
• Pastikan sopir berpengalaman di rute Medan-Toba
• Siapkan itinerary yang jelas
• Konfirmasi harga dan fasilitas sebelum berangkat

Hubungi 924 Rental Mobil Medan sekarang untuk pemesanan dan konsultasi gratis!`,
    cat: "Tips Perjalanan",
    date: "10 Mar 2024",
    views: 412,
    published: true,
    color: "#1a3a6e",
    order: 1,
  },
  {
    title: "Sewa Mobil Lepas Kunci vs Dengan Sopir di Medan: Mana Lebih Baik?",
    slug: "lepas-kunci-vs-sopir-medan",
    excerpt: "Panduan lengkap memilih antara sewa mobil self-drive atau dengan driver profesional di Medan.",
    content: `Ketika merencanakan perjalanan di Medan dan sekitarnya, salah satu keputusan penting adalah memilih jenis sewa mobil yang tepat. Ada dua opsi utama: lepas kunci (self-drive) dan dengan sopir.

Sewa Mobil Lepas Kunci:
• Lebih bebas dan fleksibel
• Biaya lebih hemat
• Cocok jika sudah hafal rute Medan
• Harus memiliki SIM yang masih berlaku
• Bertanggung jawab penuh atas kendaraan

Sewa Mobil dengan Sopir:
• Tidak perlu khawatir soal rute
• Sopir berpengalaman di jalanan Medan
• Lebih santai, bisa istirahat di perjalanan
• Tersedia paket 12 jam atau 24 jam
• Aman untuk perjalanan malam hari

Rekomendasi: Untuk tamu yang baru pertama kali ke Medan atau perjalanan jauh ke Berastagi, Danau Toba, atau Langkat, sebaiknya pilih sewa dengan sopir profesional.`,
    cat: "Panduan",
    date: "28 Feb 2024",
    views: 289,
    published: true,
    color: "#1a4a2e",
    order: 2,
  },
  {
    title: "5 Destinasi Wisata Terbaik dari Medan yang Wajib Dikunjungi",
    slug: "destinasi-wisata-terbaik-medan",
    excerpt: "Medan dikelilingi banyak destinasi wisata menakjubkan. Temukan 5 destinasi terbaik untuk liburan keluarga tak terlupakan.",
    content: `Medan sebagai kota terbesar di Sumatera Utara dikelilingi berbagai destinasi wisata alam dan budaya yang menakjubkan. Berikut 5 destinasi terbaik:

1. Danau Toba – Danau vulkanik terbesar di dunia, ikon wisata Sumatera Utara yang wajib dikunjungi.

2. Bukit Lawang – Surga orangutan dan trekking di Taman Nasional Gunung Leuser yang terkenal dunia.

3. Berastagi – Kota sejuk di kaki Gunung Sinabung dengan pasar buah khas, pemandian air panas, dan udara segar.

4. Pantai Cermin – Pantai keluarga dengan wahana air yang menyenangkan, hanya 45 menit dari Medan.

5. Tangkahan – The Hidden Paradise of Sumatera dengan pemandian air panas alami dan gajah sumatera yang jinak.

Semua destinasi ini bisa dijangkau dengan nyaman dari Medan menggunakan armada 924 Rental Mobil Medan.`,
    cat: "Wisata",
    date: "15 Feb 2024",
    views: 538,
    published: true,
    color: "#4a3a1a",
    order: 3,
  },
];

export const SEED_SETTINGS = {
  siteName:  "924 Rental Mobil Medan",
  tagline:   "Perjalanan Nyaman, Harga Terjangkau",
  heroTitle: "Rental Mobil Terbaik di Kota Medan",
  heroSub:   "Armada lengkap & terawat · Pengemudi profesional · Pelayanan 24 jam untuk perjalanan sempurna Anda",
  phone:     "+62 821-6xxx-xxxx",
  wa:        "6281234567890",
  waMsg:     "Halo 924 Rental Mobil Medan, saya ingin menyewa mobil. Bisa bantu?",
  email:     "info@924rentalmobilmedan.com",
  address:   "Jl. Gatot Subroto No. 123, Medan Sunggal, Kota Medan, Sumatera Utara 20122",
  instagram: "924rentalmobilmedan",
  facebook:  "924RentalMobilMedan",
  hours:     "08.00 – 22.00 WIB (Setiap Hari)",
  adminEmail:"admin@924rentalmobilmedan.com",
};

export const SEED_SEO = {
  siteTitle:  "924 Rental Mobil Medan - Sewa Mobil Terpercaya & Profesional",
  metaDesc:   "Sewa mobil terpercaya di Medan. Tersedia Avanza, Innova, Alphard, Hiace & lebih banyak. Sopir berpengalaman, pelayanan 24 jam. Hubungi via WhatsApp sekarang!",
  keywords:   "rental mobil medan, sewa mobil medan, rental mobil murah medan, sewa mobil harian medan, rental avanza medan, sewa innova medan, rental alphard medan, sopir medan",
  ogTitle:    "924 Rental Mobil Medan – Armada Lengkap, Terpercaya",
  ogDesc:     "Layanan rental mobil profesional di Medan. Harga transparan, armada terawat, sopir berpengalaman.",
  robots:     "index, follow",
  canonical:  "https://924rentalmobilmedan.com",
  ga:         "",
};

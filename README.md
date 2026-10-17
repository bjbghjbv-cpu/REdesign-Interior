# REdesign Interior & Build — Crafted for Living

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3-0AE448?logo=greensock&logoColor=white)](https://greensock.com/)
[![Lenis](https://img.shields.io/badge/Lenis-Smooth_Scroll-black)](https://lenis.darkroom.engineering/)

Website resmi dan portofolio interaktif **REdesign Interior & Build** — studio desain interior, custom furniture, dan konstruksi berbasis di Gading Serpong, Tangerang. Dirancang dengan pendekatan editorial arsitektural modern, interaksi spasial mendalam, dan estetika kontemporer yang elegan.

---

## 🌟 Highlight & Fitur Utama

- **Interactive "By Day / By Night" Ambiance Switcher**: Transisi pencahayaan interaktif antara suasana siang hari yang hangat alami dan pencahayaan malam yang temaram (*cove-lit evening ambiance*).
- **Contextual Spatial Hotspots**: Titik inspeksi interaktif untuk melihat detail material, kayu, dan spesifikasi perabotan custom langsung pada kanvas interior.
- **GSAP Pinned Storytelling**: Scroll naratif bertahap (*Three Reasons to Choose REdesign*) dengan animasi pinning halus.
- **Drag-to-Explore Typologies**: Showcase tipologi proyek (Residensial, Komersial, & Ruang Kerja Eksekutif) yang dapat digeser secara interaktif lengkap dengan kartu spesifikasi teknis.
- **Gapless Bento Grid of 8 Services**: Tampilan modular 8 layanan spesialis REdesign:
  1. *Custom Furniture*
  2. *Civil Work*
  3. *Wall Decor*
  4. *Ceiling Solutions*
  5. *Flooring*
  6. *Lighting*
  7. *Fabric & Upholstery*
  8. *Blinds & Window Treatments*
- **Materiality & Hardware Explorer**: Katalog interaktif pemilihan marmer travertine, venir kayu ek (*fluted oak*), pencahayaan linier cove, dan fitting hardware presisi tinggi.
- **Interactive Consultation Booking Modal**: Formulir interaktif pemesanan konsultasi dan survei proyek langsung ke studio.
- **Inertia Smooth Scrolling**: Pengalaman scrolling mulus menggunakan Lenis.

---

## 🛠️ Tech Stack & Library

| Kategori | Teknologi | Deskripsi |
|---|---|---|
| **Core Framework** | [React 19](https://react.dev/) | Library UI modern dan reaktif |
| **Build Tool** | [Vite 7](https://vitejs.dev/) | Bundler super cepat untuk pengembangan dan produksi |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Framework utility-first CSS generasi terbaru |
| **Animation & Scroll** | [GSAP 3](https://greensock.com/) + ScrollTrigger | Animasi timeline, pinning, dan scroll sequence |
| **Micro-Interactions** | [Framer Motion](https://www.framer.com/motion/) | Transisi modal, tabs, dan hover interaktif |
| **Smooth Scroll** | [Lenis](https://lenis.darkroom.engineering/) | Smooth momentum scrolling engine |
| **Icons** | [Phosphor Icons](https://phosphoricons.com/) | Ikonografi arsitektural clean dan konsisten |
| **Typography** | Google Fonts | *Instrument Serif*, *Cormorant Garamond*, *Plus Jakarta Sans*, & *JetBrains Mono* |

---

## 📁 Struktur Direktori

```text
redesign-interior/
├── public/
│   └── images/              # Aset fotografi proyek, material & emblem
├── src/
│   ├── components/          # Komponen modular UI & seksi landing page
│   │   ├── ui/              # Tombol magnetik, badge rotasi, text reveal
│   │   ├── Hero.jsx         # Hero section & By Day/Night ambiance switch
│   │   ├── ThreeReasons.jsx # Pinned GSAP narrative cards
│   │   ├── DragExplore.jsx  # Horizontal draggable typology showcase
│   │   ├── AboutPillars.jsx # 4 Pilar keahlian studio
│   │   ├── ServicesBento.jsx# Gapless bento grid 8 layanan
│   │   ├── Materiality.jsx  # Spesifikasi material & finishing
│   │   ├── BookingSection.jsx # Form konsultasi & kontak studio
│   │   ├── BookCallModal.jsx  # Global slide-in modal konsultasi
│   │   └── ...
│   ├── data/
│   │   └── content.js       # Master data konten teks, spesifikasi, dan klien
│   ├── App.jsx              # Struktur seksi utama
│   ├── index.css            # Token desain, variabel CSS & setup Tailwind
│   └── main.jsx             # Entry point aplikasi
├── Design.md                # Dokumentasi Design System & panduan visual
├── index.html               # Dokumen HTML utama & font preloading
├── package.json             # Manifest dependensi & skrip npm
└── vite.config.js           # Konfigurasi plugin Vite
```

---

## 🚀 Panduan Memulai (Getting Started)

### Prasyarat

- [Node.js](https://nodejs.org/) versi 18.0 atau yang lebih baru
- [npm](https://www.npmjs.com/) atau yarn / pnpm

### 1. Kloning Repositori

```bash
git clone https://github.com/bjbghjbv-cpu/REdesign-Interior.git
cd REdesign-Interior
```

### 2. Instal Dependensi

```bash
npm install
```

### 3. Jalankan Server Pengembangan

```bash
npm run dev
```

Buka peramban di `http://localhost:5173` untuk melihat tampilan website.

### 4. Membangun untuk Produksi

```bash
npm run build
```

Hasil kompilasi file statis siap deploy akan berada di folder `dist/`.

Untuk melihat preview hasil build lokal:

```bash
npm run preview
```

---

## 📍 Profil Studio & Kontak

- **Nama**: REdesign Interior & Build
- **Alamat Workshop & Kantor**: Ruko Maggiore Grande Blok H56, Gading Serpong, Pagedangan, Kab. Tangerang, Banten 15332
- **Telepon / WhatsApp**: [+62 821-3838-356](https://wa.me/628213838356)
- **Email**: [main.redesign@gmail.com](mailto:main.redesign@gmail.com)
- **Klien Ternama**: Duck King Group, Tomoro Coffee, dan berbagai residensial mewah.

---

## 📄 Lisensi

Hak Cipta © 2026 REdesign Interior & Build. Seluruh hak cipta dilindungi undang-undang.

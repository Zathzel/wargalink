\# PROJECT BRIEF: WargaLink — UI/UX Development (Frontend Only)



\## 1. Konteks Project



WargaLink adalah platform digital administrasi RT/RW dan kependudukan di Indonesia. Platform ini menjadi pengganti pencatatan manual (buku tulis, spreadsheet, grup WhatsApp) dengan sistem digital yang rapi, transparan, dan efisien. Ada tiga jenis pengguna: Ketua RT/RW, Warga, dan Pemerintah Daerah (Pemda).



\## 2. Tujuan \& Scope



Tugas ini HANYA mencakup pembuatan UI/UX. Tidak ada backend, database, autentikasi nyata, atau integrasi API. Semua data harus dummy/hardcoded.



Yang harus dihasilkan:

\- Struktur halaman dan navigasi untuk 3 interface (Admin RT, Warga, Pemda)

\- Visual design modern, profesional, dan mobile-first

\- Komponen interaktif (form, tabel, modal, chart) dengan dummy data

\- Micro-interactions dan polish



Yang TIDAK dikerjakan sekarang:

\- Backend / API

\- Database

\- Authentication system nyata (cukup UI login statis kalau diperlukan)

\- Integrasi payment gateway

\- Integrasi WhatsApp / Dukcapil

\- Deployment / DevOps

\- Testing automation



\## 3. Tech Stack (Wajib)



| Layer | Pilihan |

|---|---|

| Framework | Next.js 14+ (App Router) + TypeScript |

| Styling | Tailwind CSS + shadcn/ui |

| Icons | Lucide React |

| Charts | Recharts atau Tremor |

| Maps | Leaflet atau Mapbox GL |

| Animation | Framer Motion (transisi halus) |

| State (UI only) | React state atau Zustand |

| Data | Dummy/mock data hardcoded |



\## 4. Design System (Kerjakan Lebih Dulu Sebelum Halaman)



Sebelum membangun halaman, buat dulu design tokens dan komponen reusable, agar konsisten di seluruh aplikasi.



Visual style:

\- Clean, modern, trustworthy. Bukan gaya startup flashy, terasa reliable tapi tetap friendly karena ini platform pemerintahan dan komunitas.

\- Warna utama: biru tua (trust, kesan pemerintahan) dan hijau sebagai accent (komunitas, growth), background putih atau light gray.

\- Tipografi: sans-serif yang readable di ukuran kecil, gunakan font weight untuk hierarchy, bukan banyak variasi warna.

\- Spacing: whitespace generous, jangan padat. Target pengguna lansia harus bisa membaca tanpa kacamata.

\- Border radius: rounded 8-12px untuk card dan button.

\- Shadow: subtle elevation, hindari flat total dan hindari neumorphism berat.

\- Iconography: outlined icons, satu set konsisten (Lucide, Phosphor, atau Heroicons).



Referensi visual: shadcn/ui (gaya komponen), Linear.app (clean dashboard), Wise/Revolut (kejelasan mobile app), myPertamina dan Livin by Mandiri (mobile native feel di Indonesia).



\## 5. Aturan UX Global (Berlaku di SEMUA Halaman)



\- Tap target minimum 44px untuk semua elemen yang bisa diklik/disentuh.

\- Font size minimum 16px untuk body text.

\- Status selalu visible dengan badge warna: hijau (selesai), kuning (proses), merah (gagal/terlambat).

\- Konfirmasi (modal/dialog) wajib sebelum aksi destruktif seperti hapus data atau tolak surat.

\- Empty state harus ada ilustrasi dan CTA, jangan tampilkan halaman kosong begitu saja.

\- Loading state menggunakan skeleton screen, bukan hanya spinner.

\- Feedback aksi menggunakan toast/snackbar.

\- Semua teks UI dalam Bahasa Indonesia.

\- Gunakan nama dan data dummy yang realistis: nama orang Indonesia, alamat RT/RW yang masuk akal, nominal iuran Rp 20.000 - Rp 50.000/bulan.



\## 6. Urutan Pengerjaan (Build Order)



Kerjakan secara berurutan, jangan loncat fase sebelum fase sebelumnya selesai:



1\. Design system dan komponen reusable (lihat bagian 4)

2\. Web Dashboard Admin RT/RW

3\. Mobile App Warga (PWA style)

4\. Dashboard Pemda



\---



\## FASE 1: Web Dashboard Admin RT/RW



Persona: Ketua RT, usia 40-60 tahun, literasi digital rendah. UI harus sangat sederhana, maksimal 2 klik ke aksi utama.



\### Komponen Global

\- Sidebar navigation (collapsible di mobile)

\- Header: nama RT, ikon notifikasi (bell), profile dropdown

\- Breadcrumb

\- Toast notifications



\### Halaman



\*\*Dashboard Home\*\* (`/admin`)

Ringkasan dalam card-based layout dengan angka besar dan jelas: jumlah warga, tagihan bulan ini, surat pending, pengumuman terbaru.



\*\*Data Warga\*\* (`/admin/warga`)

Tabel daftar warga per Kartu Keluarga (KK), dengan search dan filter (status, RT/RW). Detail warga menampilkan nama, NIK, hubungan keluarga, status domisili.



\*\*Surat Menyurat\*\* (`/admin/surat`)

List surat masuk (pengajuan dari warga) dengan status: Menunggu / Disetujui / Ditolak. Sediakan aksi approve 1-klik dan preview surat dalam format PDF.



\*\*Iuran \& Keuangan\*\* (`/admin/keuangan`)

Tabel tagihan per warga per bulan dengan status Lunas/Belum. Tampilkan ringkasan buku kas (pemasukan, pengeluaran, saldo) dan grafik sederhana.



\*\*Pengumuman \& Agenda\*\* (`/admin/pengumuman`)

Form untuk membuat pengumuman baru, list pengumuman aktif, dan kalender agenda sederhana.



\*\*Laporan\*\* (`/admin/laporan`)

Laporan bulanan auto-generated (dummy), dengan preview dan tombol download.



\---



\## FASE 2: Mobile App Warga (Web Responsive / PWA Style)



Persona: warga umum dari segala usia, akses via smartphone. Interface harus terasa seperti native app, optimal di lebar 375px - 428px.



\### Komponen Global

\- Bottom navigation bar (Home, Surat, Iuran, Pengumuman, Profil)

\- Pull-to-refresh feel

\- Floating action button untuk aksi cepat

\- Status bar dan safe area handling



\### Halaman



\*\*Home / Beranda\*\* (`/warga`)

Greeting personal, kartu ringkasan (iuran bulan ini, surat aktif), dan feed pengumuman terbaru dari RT.



\*\*Pengajuan Surat\*\* (`/warga/surat`)

Pilihan jenis surat dalam card grid, form pengajuan yang sudah pre-filled, dan tracking status dengan stepper/timeline.



\*\*Iuran Saya\*\* (`/warga/iuran`)

Riwayat pembayaran, tagihan aktif, tombol "Bayar Sekarang" (dummy), dan detail nominal, tanggal, serta metode pembayaran.



\*\*Pengumuman\*\* (`/warga/pengumuman`)

Feed/timeline pengumuman dan event dari RT, ditampilkan sebagai card dengan gambar, judul, tanggal, dan halaman detail.



\*\*Profil\*\* (`/warga/profil`)

Data diri warga, anggota keluarga, dokumen, dan pengaturan notifikasi.



\---



\## FASE 3: Dashboard Pemda



Persona: pejabat dinas (Dukcapil, Kelurahan, Dinas Sosial), sudah familiar dengan dashboard data.



\### Komponen Global

\- Top navbar + sidebar (dual navigation)

\- Date range picker

\- Filter panel (collapsible)

\- Data table dengan sorting, pagination, dan search



\### Halaman



\*\*Overview\*\* (`/pemda`)

KPI cards (total warga, total RT aktif, kelurahan terdaftar), grafik tren bulanan, dan peta sebaran RT.



\*\*Data Kependudukan\*\* (`/pemda/kependudukan`)

Tabel agregat per kelurahan/kecamatan dengan drill-down ke detail RT, serta demografi (usia, gender, pekerjaan) dalam bentuk chart.



\*\*Laporan\*\* (`/pemda/laporan`)

Report builder sederhana (pilih periode, wilayah, tipe laporan) dengan preview tabel dan chart, plus tombol export.



\*\*Peta Wilayah\*\* (`/pemda/peta`)

Map view dengan marker per RT aktif, popup info ringkasan, dan filter by kelurahan/kecamatan.



\*\*Audit Log\*\* (`/pemda/audit`)

Tabel aktivitas berisi siapa, aksi apa, dan kapan, dengan filter dan search.



\---



\## 7. Deliverables Checklist



\- \[ ] Design tokens (warna, tipografi, spacing, radius) sebagai file terpisah

\- \[ ] Komponen reusable (button, card, badge, modal, table, dll)

\- \[ ] Semua halaman Fase 1, 2, 3 fully styled dan responsive dengan dummy data

\- \[ ] Interaktivitas: tab switching, modal open/close, validasi form visual, filter/sort tabel, chart hover

\- \[ ] Dashboard Admin responsive sampai tablet

\- \[ ] App Warga optimal di 375px-428px

\- \[ ] Dark mode (opsional, nice-to-have)

\- \[ ] Struktur folder berbasis komponen, rapi, dan konsisten penamaannya



\## 8. Protokol Klarifikasi



Jika ada pertanyaan terkait flow atau konten halaman yang belum jelas dari brief ini, tanyakan terlebih dahulu sebelum membuat asumsi sendiri.



\## 9. Catatan Kualitas



Prioritas utama adalah interface yang terlihat profesional, mudah digunakan oleh pengguna non-teknis, dan siap di-demo ke stakeholder (Pemda dan investor). Kualitas visual dan UX adalah prioritas nomor satu, di atas jumlah fitur.


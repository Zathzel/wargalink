"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { AppLogo } from "@/components/AppLogo";
import { ArrowRight, LogIn, CheckCircle2, ShieldCheck, Users, Activity, ChevronRight, Zap } from "lucide-react";

export default function LandingPage() {
  const { scrollY } = useScroll();
  const yHeroBg = useTransform(scrollY, [0, 500], [0, 150]);

  const features = [
    {
      title: "Portal Warga Modern",
      subtitle: "Akses Cepat, Kapan Saja",
      description: "Nikmati kemudahan mengakses layanan surat menyurat, bayar iuran bulanan, hingga lapor kondisi darurat langsung dari genggaman tangan Anda. Tanpa antri, tanpa ribet.",
      image: "/ui-warga.png",
      reverse: false,
      icon: <Users className="w-6 h-6 text-emerald-500" />,
      badges: ["Surat Pengantar", "Pembayaran Iuran", "Lapor Darurat"]
    },
    {
      title: "Dashboard RT Terpusat",
      subtitle: "Kendali Penuh di Tangan Anda",
      description: "Ketua RT dapat memantau aktivitas warga, mengelola keuangan secara transparan, dan menindaklanjuti laporan dengan cepat melalui satu layar terpusat.",
      image: "/ui-rt-dashboard.png",
      reverse: true,
      icon: <Activity className="w-6 h-6 text-blue-500" />,
      badges: ["Statistik Real-time", "Manajemen Kas", "Pusat Notifikasi"]
    },
    {
      title: "Manajemen Data Penduduk",
      subtitle: "Rapi, Aman, Terintegrasi",
      description: "Kelola data warga, tamu yang menginap, hingga statistik kependudukan dengan antarmuka yang bersih dan mudah digunakan.",
      image: "/ui-rt-data-warga.png",
      reverse: false,
      icon: <ShieldCheck className="w-6 h-6 text-indigo-500" />,
      badges: ["Database Warga", "Log Tamu", "Eksport Laporan"]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-200 overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <AppLogo className="w-6 h-6 text-white" />
            </div>
            <span className="font-extrabold text-xl text-slate-800 tracking-tight">WargaLink</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden sm:block text-slate-600 hover:text-emerald-600 font-bold text-sm transition-colors">
              Pusat Bantuan
            </Link>
            <Link href="/login">
              <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-bold shadow-md transition-all active:scale-95 text-sm">
                Masuk <LogIn className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Animated Background Mesh & Grid */}
        <motion.div style={{ y: yHeroBg }} className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay"></div>
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-emerald-400/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[60%] bg-teal-400/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-[30%] right-[20%] w-[30%] h-[40%] bg-blue-400/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-emerald-700 font-bold text-xs sm:text-sm mb-8 shadow-sm border border-emerald-100"
            >
              <Zap className="w-4 h-4 text-emerald-500 fill-emerald-500" />
              Rilis Terbaru: WargaLink v2.0
            </motion.div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-slate-800 tracking-tight mb-6 leading-[1.1]">
              Kelola RT/RW Lebih <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-700">
                Cerdas & Modern
              </span>
            </h1>
            
            <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              Satu platform terintegrasi untuk pengurus RT, Warga, dan Pemda. Tinggalkan cara lama, sambut transparansi dan kemudahan digital.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login">
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-emerald-600/30 transition-all hover:-translate-y-1 active:scale-95">
                  Mulai Gunakan <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-2xl font-bold text-lg shadow-sm border border-slate-200 transition-all hover:-translate-y-1 active:scale-95">
                Lihat Demo
              </button>
            </div>
          </motion.div>

          {/* Floating Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {[
              { label: "RT Terdaftar", value: "500+" },
              { label: "Warga Aktif", value: "25k+" },
              { label: "Surat Selesai", value: "100k+" },
              { label: "Rating App", value: "4.9/5" }
            ].map((stat, i) => (
              <div key={i} className="bg-white/60 backdrop-blur-md border border-white p-4 rounded-2xl shadow-sm">
                <p className="text-3xl font-black text-slate-800">{stat.value}</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Showcases */}
      <section className="py-24 bg-white relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-40">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`flex flex-col ${feature.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 lg:gap-24`}
            >
              {/* Text Content */}
              <div className="flex-1 space-y-6 text-center lg:text-left relative z-10">
                <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm mb-2">
                  {feature.icon}
                </div>
                <h3 className="text-emerald-600 font-bold tracking-wider uppercase text-sm">{feature.subtitle}</h3>
                <h2 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight leading-tight">
                  {feature.title}
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  {feature.description}
                </p>
                
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-2">
                  {feature.badges.map((badge, i) => (
                    <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      {badge}
                    </span>
                  ))}
                </div>

                <div className="pt-4 hidden lg:block">
                  <Link href="/login" className="inline-flex items-center font-bold text-emerald-600 hover:text-emerald-700 transition-colors group">
                    Pelajari lebih lanjut 
                    <ChevronRight className="w-5 h-5 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Image Showcase */}
              <div className="flex-1 w-full max-w-lg lg:max-w-none relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-teal-50 rounded-[3rem] transform rotate-3 scale-[1.02] shadow-inner transition-transform duration-700 hover:rotate-6"></div>
                <div className="relative rounded-[2.5rem] overflow-hidden border-[6px] border-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] bg-slate-100 group">
                  <Image 
                    src={feature.image}
                    alt={feature.title}
                    width={1000}
                    height={2000}
                    className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-105"
                  />
                  {/* Glass overlay reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none transform -translate-x-full group-hover:translate-x-full" style={{ transition: 'all 1.5s ease' }}></div>
                </div>
                
                {/* Decorative floating element */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }} 
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className={`absolute ${feature.reverse ? '-left-8' : '-right-8'} top-1/4 bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white hidden md:flex items-center gap-3 z-20`}
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase">Status</p>
                    <p className="text-sm font-black text-slate-800">Tersinkronisasi</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-emerald-500/20 blur-[100px] rounded-full"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
            Siap Mengubah RT Anda Menjadi Digital?
          </h2>
          <p className="text-xl text-slate-300 mb-10 font-medium">
            Bergabunglah dengan ribuan pengurus RT lainnya yang telah beralih ke WargaLink.
          </p>
          <Link href="/login">
            <button className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-10 py-5 rounded-2xl font-black text-xl shadow-xl shadow-emerald-500/20 transition-all hover:-translate-y-1 active:scale-95 mx-auto">
              Daftar Sekarang <ArrowRight className="w-6 h-6" />
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 opacity-50 hover:opacity-100 transition-opacity">
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
                <AppLogo className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-slate-200 tracking-tight text-lg">WargaLink</span>
            </div>
            <div className="flex gap-6 text-sm font-semibold">
              <a href="#" className="hover:text-emerald-400 transition-colors">Tentang Kami</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Kebijakan Privasi</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Hubungi Kami</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800/50 text-sm text-center md:text-left flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} WargaLink. Seluruh hak cipta dilindungi.</p>
            <p className="mt-2 md:mt-0">Dibuat dengan ❤️ untuk Indonesia</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

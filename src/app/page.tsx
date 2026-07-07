"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { AppLogo } from "@/components/AppLogo";
import { ArrowRight, LogIn, CheckCircle2 } from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      title: "Portal Warga Modern",
      description: "Akses layanan surat menyurat, bayar iuran bulanan, hingga lapor kondisi darurat langsung dari genggaman tangan Anda.",
      image: "/ui-warga.png",
      reverse: false,
    },
    {
      title: "Dashboard RT Terpusat",
      description: "Ketua RT dapat memantau aktivitas warga, mengelola keuangan, dan menindaklanjuti laporan dengan cepat melalui satu layar terpusat.",
      image: "/ui-rt-dashboard.png",
      reverse: true,
    },
    {
      title: "Manajemen Data Penduduk",
      description: "Kelola data warga, tamu yang menginap, hingga statistik kependudukan dengan antarmuka yang bersih dan mudah digunakan.",
      image: "/ui-rt-data-warga.png",
      reverse: false,
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-200">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AppLogo className="w-8 h-8" />
            <span className="font-extrabold text-xl text-slate-800 tracking-tight">WargaLink</span>
          </div>
          <Link href="/login">
            <button className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-5 py-2 rounded-xl font-bold shadow-md shadow-emerald-500/20 transition-all active:scale-95">
              Masuk <LogIn className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-400/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-teal-400/20 rounded-full blur-[120px]" />
          <div className="absolute top-[40%] right-[10%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 font-bold text-sm mb-6 border border-emerald-200 shadow-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              Digitalisasi RT/RW Masa Kini
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-800 tracking-tight mb-6 leading-tight">
              Platform Digital <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                Administrasi Modern
              </span>
            </h1>
            <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              Satu aplikasi terintegrasi untuk pengurus RT, Warga, dan Pemda. Kelola persuratan, keuangan, dan pelaporan dengan mudah dan transparan.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login">
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-emerald-600/30 transition-all hover:-translate-y-1 active:scale-95">
                  Mulai Gunakan <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Showcases */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col ${feature.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}
            >
              {/* Text Content */}
              <div className="flex-1 space-y-6 text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">
                  {feature.title}
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  {feature.description}
                </p>
                <ul className="space-y-3 text-left max-w-md mx-auto lg:mx-0">
                  {["Akses Cepat & Mudah", "Transparan & Aman", "Terintegrasi 24/7"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700 font-semibold">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image Showcase */}
              <div className="flex-1 w-full max-w-md lg:max-w-none relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-teal-50 rounded-[3rem] transform rotate-3 scale-105 shadow-inner"></div>
                <div className="relative rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl shadow-slate-200/50 bg-slate-100 group">
                  <Image 
                    src={feature.image}
                    alt={feature.title}
                    width={800}
                    height={1600}
                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Glass overlay reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none transform -translate-x-full group-hover:translate-x-full" style={{ transition: 'all 1.5s ease' }}></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
            <AppLogo className="w-6 h-6 grayscale" />
            <span className="font-bold text-slate-200 tracking-tight">WargaLink</span>
          </div>
          <p className="text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} WargaLink. Platform Digital Administrasi RT/RW. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

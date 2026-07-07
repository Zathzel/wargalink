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
    <>
      {/* Hero Section - Unique Asymmetrical Layout */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden bg-slate-50">
        {/* Giant Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full overflow-hidden pointer-events-none select-none flex justify-center opacity-[0.03]">
          <h1 className="text-[25vw] font-black leading-none tracking-tighter text-emerald-950 whitespace-nowrap">
            WARGALINK
          </h1>
        </div>

        {/* Abstract SVG Shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute top-0 right-0 w-1/2 h-full text-emerald-100/40 transform translate-x-1/3 -translate-y-1/4" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.3,-46.3C90.8,-33.5,96.8,-18,97.2,-2.3C97.6,13.4,92.4,29.3,83.1,42.4C73.8,55.5,60.4,65.8,45.8,73.1C31.2,80.4,15.6,84.7,0.3,84.1C-15,83.5,-30.1,78.1,-43.3,69.5C-56.5,60.9,-67.9,49.1,-75.7,35.2C-83.5,21.3,-87.7,5.3,-86.3,-10.1C-84.9,-25.5,-77.9,-40.3,-67.6,-51.7C-57.3,-63.1,-43.7,-71.1,-29.6,-77.8C-15.5,-84.5,-0.9,-89.9,13.5,-88.7C27.9,-87.5,42.5,-79.8,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-400/20 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Left Side: Minimalist Text & CTA */}
          <div className="flex-1 w-full text-left pt-10 lg:pt-0 lg:pr-10 relative z-30">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="w-16 h-1.5 bg-emerald-500 mb-8 rounded-full shadow-lg shadow-emerald-500/40"></div>
              
              <h2 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-black text-slate-800 tracking-tighter leading-[0.9] mb-8">
                RT/RW <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-emerald-500 to-teal-700">
                  Era Baru.
                </span>
              </h2>
              
              <p className="text-lg text-slate-600 font-medium mb-10 max-w-sm leading-relaxed">
                Platform digital tanpa batas untuk mengelola warga, keuangan, dan aduan. Lupakan kertas, mulai langkah cerdas.
              </p>
              
              <Link href="/login">
                <button className="flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-slate-900/30 transition-all hover:scale-105 active:scale-95 group">
                  Eksplorasi <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Right Side: Composition Image Showcase */}
          <div className="flex-[1.4] w-full relative h-[400px] sm:h-[500px] lg:h-[650px] perspective-1000">
            <motion.div
              initial={{ opacity: 0, rotateY: 20, rotateX: 10, z: -100 }}
              animate={{ opacity: 1, rotateY: -5, rotateX: 5, z: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
              className="absolute top-10 right-0 lg:-right-10 w-[85%] lg:w-[90%] rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border border-white/60 bg-white/40 backdrop-blur-md p-2 z-10"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <div className="h-6 bg-slate-100 border-b border-slate-200 flex items-center px-3 gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-400"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                </div>
                <Image 
                  src="/ui-rt-dashboard.png" 
                  alt="Desktop Dashboard" 
                  width={1200} 
                  height={800} 
                  className="w-full h-auto object-cover object-top"
                  priority
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50, x: -20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              className="absolute bottom-5 lg:bottom-10 left-0 lg:-left-10 w-[35%] sm:w-[30%] lg:w-[32%] rounded-[2rem] lg:rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] border-4 border-white/90 bg-white z-20 overflow-hidden transform -rotate-6 hover:rotate-0 transition-transform duration-500"
            >
              <Image 
                src="/ui-warga.png" 
                alt="Mobile Warga App" 
                width={400} 
                height={800} 
                className="w-full h-auto object-cover object-top"
                priority
              />
            </motion.div>
            
            {/* Decorative Floating Status */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-0 left-1/4 bg-white/90 backdrop-blur-xl p-3 sm:p-4 rounded-2xl shadow-xl border border-white flex items-center gap-3 z-30"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase">Sistem Aktif</p>
                <p className="text-sm sm:text-lg font-black text-slate-800">100% Online</p>
              </div>
            </motion.div>
          </div>
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

    </>
  );
}

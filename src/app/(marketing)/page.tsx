"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { AppLogo } from "@/components/AppLogo";
import { ArrowRight, LogIn, CheckCircle2, ShieldCheck, Users, Activity, ChevronRight, Zap } from "lucide-react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function LandingPage() {
  const container = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

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

  useGSAP(() => {
    // 1. Hero Animations
    const heroTl = gsap.timeline();
    
    heroTl.from(".hero-watermark", {
      opacity: 0,
      scale: 1.2,
      duration: 2,
      ease: "power3.out"
    })
    .from(".hero-line", {
      width: 0,
      duration: 0.8,
      ease: "power2.inOut"
    }, "-=1.5")
    .from(".hero-text", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "back.out(1.2)"
    }, "-=1")
    .from(".hero-desc", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.6")
    .from(".hero-btn", {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: "back.out(1.5)"
    }, "-=0.4")
    .from(".hero-images .image-card", {
      x: 100,
      y: 50,
      opacity: 0,
      rotateY: 45,
      rotateX: -20,
      duration: 1.5,
      stagger: 0.3,
      ease: "power4.out"
    }, "-=1.2")
    .from(".hero-badge", {
      scale: 0,
      opacity: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)"
    }, "-=0.5");

    // Continuous floating animation for blob SVG
    gsap.to(".blob-svg", {
      rotation: 360,
      transformOrigin: "center center",
      duration: 40,
      repeat: -1,
      ease: "none"
    });
    
    gsap.to(".blob-svg path", {
      attr: { d: "M45.7,-76.1C58.9,-69.3,70.1,-58.5,79.4,-45.5C88.7,-32.5,96.1,-17.3,95.6,-2.4C95.1,12.5,86.7,27.1,76.5,39.4C66.3,51.7,54.3,61.7,40.9,69.5C27.5,77.3,12.7,82.9,-2.4,86.1C-17.5,89.3,-32.9,90.1,-46.3,83.9C-59.7,77.7,-71.1,64.5,-79.8,50.1C-88.5,35.7,-94.5,20.1,-93.6,5.1C-92.7,-9.9,-84.9,-24.3,-75.2,-36.8C-65.5,-49.3,-53.9,-59.9,-41,-67.2C-28.1,-74.5,-14,-78.5,0.7,-79.7C15.4,-80.9,32.5,-82.9,45.7,-76.1Z" },
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

      // 2. Parallax effect on Mouse Move for Hero Images (Desktop only)
      if (heroRef.current && window.innerWidth > 1024) {
        const handleMouseMove = (e: MouseEvent) => {
          const { clientX, clientY } = e;
          const xPos = (clientX / window.innerWidth - 0.5) * 20;
          const yPos = (clientY / window.innerHeight - 0.5) * 20;

          gsap.to(".hero-desktop", {
            x: xPos,
            y: yPos,
            rotateY: -5 + xPos * 0.1,
            rotateX: 5 - yPos * 0.1,
            duration: 1,
            ease: "power2.out"
          });

          gsap.to(".hero-mobile", {
            x: -xPos * 1.5,
            y: -yPos * 1.5,
            rotateY: xPos * 0.2,
            rotateX: -yPos * 0.2,
            duration: 1,
            ease: "power2.out"
          });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
      }
  }, { scope: container });

  useGSAP(() => {
    // 3. Scroll Animations for Features
    const featureRows = gsap.utils.toArray<HTMLElement>(".feature-row");
    
    featureRows.forEach((row, i) => {
      const textCol = row.querySelector(".feature-text");
      const imgCol = row.querySelector(".feature-image");
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        }
      });

      tl.from(textCol, {
        x: row.classList.contains("reverse-layout") ? 100 : -100,
        opacity: 0,
        ease: "power2.out"
      }, 0)
      .from(imgCol, {
        x: row.classList.contains("reverse-layout") ? -100 : 100,
        opacity: 0,
        scale: 0.9,
        ease: "power2.out"
      }, 0);

      // Parallax effect on decorative background instead of image
      const bgTarget = imgCol?.querySelector(".bg-gradient-to-tr");
      if (bgTarget) {
        gsap.to(bgTarget, {
          yPercent: 10,
          rotation: 6,
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }
    });

    // 4. Draw SVG Line connecting features
    gsap.from(".feature-connector-line", {
      strokeDashoffset: 1000,
      strokeDasharray: 1000,
      ease: "none",
      scrollTrigger: {
        trigger: ".features-container",
        start: "top 60%",
        end: "bottom 80%",
        scrub: 1,
      }
    });

  }, { scope: container });

  return (
    <div ref={container} className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-200 overflow-hidden">
      {/* Hero Section - Unique GSAP Layout */}
      <section ref={heroRef} className="relative min-h-[95vh] flex items-center pt-24 pb-12 overflow-hidden bg-slate-50">
        
        {/* Giant Background Text */}
        <div className="hero-watermark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full overflow-hidden pointer-events-none select-none flex justify-center opacity-[0.03]">
          <h1 className="text-[25vw] font-black leading-none tracking-tighter text-emerald-950 whitespace-nowrap">
            WARGALINK
          </h1>
        </div>

        {/* Abstract SVG Shapes (GSAP Morphed) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="blob-svg absolute top-0 right-0 w-[800px] h-[800px] text-emerald-100/60 transform translate-x-1/4 -translate-y-1/4" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.3,-46.3C90.8,-33.5,96.8,-18,97.2,-2.3C97.6,13.4,92.4,29.3,83.1,42.4C73.8,55.5,60.4,65.8,45.8,73.1C31.2,80.4,15.6,84.7,0.3,84.1C-15,83.5,-30.1,78.1,-43.3,69.5C-56.5,60.9,-67.9,49.1,-75.7,35.2C-83.5,21.3,-87.7,5.3,-86.3,-10.1C-84.9,-25.5,-77.9,-40.3,-67.6,-51.7C-57.3,-63.1,-43.7,-71.1,-29.6,-77.8C-15.5,-84.5,-0.9,-89.9,13.5,-88.7C27.9,-87.5,42.5,-79.8,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-teal-400/20 rounded-full blur-[120px]"></div>
          
          {/* Decorative Floating Geometry */}
          <div className="absolute top-1/4 left-1/4 w-12 h-12 border-4 border-emerald-500/20 rounded-lg transform rotate-45 blob-svg" style={{ animationDuration: '20s' }}></div>
          <div className="absolute bottom-1/4 right-1/4 w-8 h-8 bg-emerald-500/20 rounded-full blob-svg" style={{ animationDuration: '15s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Left Side: Minimalist Text & CTA */}
          <div className="flex-1 w-full text-center lg:text-left pt-10 lg:pt-0 lg:pr-10 relative z-30 flex flex-col items-center lg:items-start">
            <div>
              <div className="hero-line w-16 h-1.5 bg-emerald-500 mb-6 lg:mb-8 rounded-full shadow-lg shadow-emerald-500/40 mx-auto lg:mx-0"></div>
              
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-black text-slate-800 tracking-tighter leading-[1] lg:leading-[0.9] mb-6 lg:mb-8 overflow-hidden">
                <div className="hero-text pb-2">RT/RW</div>
                <div className="hero-text text-transparent bg-clip-text bg-gradient-to-br from-emerald-500 to-teal-700">Era Baru.</div>
              </h2>
              
              <p className="hero-desc text-base sm:text-lg text-slate-600 font-medium mb-8 lg:mb-10 max-w-sm mx-auto lg:mx-0 leading-relaxed px-4 lg:px-0">
                Platform digital tanpa batas untuk mengelola warga, keuangan, dan aduan. Lupakan kertas, mulai langkah cerdas bersama ekosistem cerdas.
              </p>
              
              <div className="hero-btn">
                <Link href="/login">
                  <button className="flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-bold text-base sm:text-lg shadow-2xl shadow-slate-900/30 transition-all hover:scale-105 active:scale-95 group mx-auto lg:mx-0 w-full sm:w-auto">
                    Eksplorasi Sekarang <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side: Composition Image Showcase */}
          <div className="hero-images flex-[1.4] w-full relative perspective-1000 mt-12 lg:mt-0 flex flex-col items-center justify-center lg:block min-h-[400px] lg:h-[700px]">
            
            {/* Desktop Dashboard */}
            <div
              className="hero-desktop image-card relative lg:absolute top-0 lg:top-10 lg:-right-10 w-[90%] sm:w-[80%] lg:w-[90%] rounded-2xl lg:rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border border-white/60 bg-white/40 backdrop-blur-md p-1.5 lg:p-2 z-10 lg:[transform:rotateY(-5deg)_rotateX(5deg)]"
            >
              <div className="rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <div className="h-4 lg:h-6 bg-slate-100 border-b border-slate-200 flex items-center px-2 lg:px-3 gap-1.5">
                  <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-amber-400"></div>
                  <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-emerald-400"></div>
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
            </div>

            {/* Mobile App */}
            <div
              className="hero-mobile image-card absolute lg:absolute bottom-0 lg:bottom-10 -right-2 sm:right-10 lg:auto lg:-left-10 w-[40%] sm:w-[35%] lg:w-[32%] rounded-[1.5rem] lg:rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] border-4 border-white/90 bg-white z-20 overflow-hidden transform lg:-rotate-6 transition-transform duration-500 translate-y-10 lg:translate-y-0"
            >
              <Image 
                src="/ui-warga.png" 
                alt="Mobile Warga App" 
                width={400} 
                height={800} 
                className="w-full h-auto object-cover object-top"
                priority
              />
            </div>
            
            {/* Decorative Floating Status */}
            <div className="hero-badge absolute -left-4 sm:left-0 lg:left-1/4 top-10 lg:top-0 bg-white/90 backdrop-blur-xl p-3 sm:p-4 rounded-2xl shadow-xl border border-white flex items-center gap-2 sm:gap-3 z-30 transform -translate-y-1/2 lg:translate-y-0">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                <Activity className="w-4 h-4 sm:w-6 sm:h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">Sistem Aktif</p>
                <p className="text-sm sm:text-lg font-black text-slate-800">100% Terhubung</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcases with GSAP ScrollTrigger */}
      <section ref={featuresRef} className="py-32 bg-white relative features-container overflow-hidden">
        {/* Background Decorative Lines */}
        <div className="absolute inset-0 pointer-events-none flex justify-center opacity-10">
           <svg width="100%" height="100%" className="min-h-full">
             <path className="feature-connector-line" d="M 50%, 0 C 30%, 500 70%, 1000 50%, 1500 C 30%, 2000 70%, 2500 50%, 3000" stroke="#10b981" strokeWidth="4" fill="none" />
           </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-48">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              className={`feature-row flex flex-col ${feature.reverse ? 'lg:flex-row-reverse reverse-layout' : 'lg:flex-row'} items-center gap-16 lg:gap-24 relative`}
            >
              {/* Text Content */}
              <div className="feature-text flex-1 space-y-8 text-center lg:text-left relative z-10 bg-white/80 backdrop-blur-sm p-6 lg:p-0 rounded-3xl">
                <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-emerald-50 border border-emerald-100 shadow-sm mb-2">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-emerald-600 font-bold tracking-widest uppercase text-sm mb-3">{feature.subtitle}</h3>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight leading-tight">
                    {feature.title}
                  </h2>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  {feature.description}
                </p>
                
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-2">
                  {feature.badges.map((badge, i) => (
                    <span key={i} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold flex items-center gap-2 border border-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      {badge}
                    </span>
                  ))}
                </div>

                <div className="pt-6 hidden lg:block">
                  <Link href="/login" className="inline-flex items-center font-bold text-slate-900 bg-emerald-100 px-6 py-3 rounded-full hover:bg-emerald-200 transition-colors group">
                    Pelajari Modul Ini 
                    <ChevronRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Image Showcase */}
              <div className="feature-image flex-1 w-full max-w-lg lg:max-w-none relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-teal-50 rounded-[3rem] transform rotate-3 scale-[1.05] shadow-inner"></div>
                <div className="relative rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl bg-slate-100">
                  <Image 
                    src={feature.image}
                    alt={feature.title}
                    width={1000}
                    height={2000}
                    className="w-full h-auto object-contain"
                  />
                  {/* Glass overlay reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 pointer-events-none transform -translate-x-full" style={{ transition: 'all 1.5s ease' }}></div>
                </div>
                
                {/* Decorative floating element */}
                <div className={`absolute ${feature.reverse ? '-left-10' : '-right-10'} top-1/4 bg-white/90 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-white/50 hidden md:flex items-center gap-4 z-20`}>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Sinkronisasi</p>
                    <p className="text-base font-black text-slate-800">Real-time Data</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-950"></div>
        
        {/* Dynamic Background Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" className="text-emerald-500/30" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/20 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 text-sm font-bold tracking-widest uppercase mb-8">
            <Zap className="w-4 h-4" /> Gabung Sekarang
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-tight">
            Digitalisasi RT Anda <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Mulai Hari Ini.</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-400 mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
            Tidak perlu menunggu besok. Ratusan rukun tetangga telah merasakan kemudahannya. Jadikan lingkungan Anda lebih maju.
          </p>
          <Link href="/login">
            <button className="flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-12 py-6 rounded-full font-black text-xl shadow-[0_0_40px_rgba(16,185,129,0.3)] transition-all hover:scale-105 active:scale-95 mx-auto group">
              Mulai Gunakan WargaLink 
              <ArrowRight className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" />
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
}

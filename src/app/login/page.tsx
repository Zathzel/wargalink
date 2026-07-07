"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn, Loader2, ArrowLeft, ShieldCheck, Zap, Server } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { AppLogo } from "@/components/AppLogo";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const USERS: Record<string, { password: string; redirect: string; role: string; desc: string }> = {
  adminrt123: { password: "wargalink123", redirect: "/admin", role: "Admin RT/RW", desc: "Ketua RT 01 / RW 05" },
  warga123:   { password: "wargalink123", redirect: "/warga", role: "Warga",       desc: "Budi Santoso, RT 01" },
  pemda123:   { password: "wargalink123", redirect: "/pemda", role: "Pemda",       desc: "Dinas Kependudukan & Catatan Sipil" },
};

const ROLE_COLORS: Record<string, string> = {
  adminrt123: "from-blue-600 to-blue-800",
  warga123:   "from-emerald-500 to-emerald-700",
  pemda123:   "from-slate-700 to-slate-900",
};

export default function LoginPage() {
  const router = useRouter();
  const { loginUser } = useApp();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const detectedUser = USERS[username.toLowerCase().trim()];

  useGSAP(() => {
    // Left panel staggered intro
    const tl = gsap.timeline();
    tl.from(".form-element", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.1
    });

    // Right panel GSAP animations
    gsap.from(".showcase-content", {
      x: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power4.out"
    });

    gsap.from(".glass-card", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "back.out(1.2)",
      delay: 0.5
    });

    // Floating animation for cards
    gsap.to(".glass-card", {
      y: "-=15",
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      stagger: {
        each: 0.5,
        from: "random"
      }
    });

    // Morphing background blob
    gsap.to(".bg-blob", {
      rotation: 360,
      transformOrigin: "50% 50%",
      duration: 30,
      repeat: -1,
      ease: "none"
    });

  }, { scope: containerRef });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = USERS[username.toLowerCase().trim()];

    if (!user || password !== user.password) {
      setShake(true);
      setTimeout(() => setShake(false), 600);
      toast.error("Username atau password salah.", {
        description: "Pastikan username dan password sudah benar.",
      });
      return;
    }

    setLoading(true);
    loginUser(username.toLowerCase().trim(), user.role, user.desc);
    
    // Animate transition out
    gsap.to(".split-right", { x: "100%", duration: 0.8, ease: "power3.inOut" });
    gsap.to(".split-left", { x: "-100%", duration: 0.8, ease: "power3.inOut", onComplete: () => {
      toast.success(`Selamat datang, ${user.role}!`, {
        description: `Mengarahkan ke dashboard ${user.role}...`,
      });
      setTimeout(() => router.push(user.redirect), 300);
    }});
  };

  return (
    <div ref={containerRef} className="min-h-screen w-full flex bg-white overflow-hidden">
      
      {/* LEFT: Login Form */}
      <div className="split-left w-full lg:w-1/2 min-h-screen flex flex-col relative z-20 bg-white">
        {/* Back Button */}
        <div className="absolute top-6 left-6 md:top-10 md:left-10 z-30 form-element">
          <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-semibold transition-colors group">
            <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-emerald-50 group-hover:border-emerald-200 transition-all">
              <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
            </div>
            <span className="hidden sm:block">Kembali</span>
          </Link>
        </div>

        <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 md:px-24 lg:px-20 xl:px-32">
          <div className="w-full max-w-md mx-auto">
            
            {/* Header */}
            <div className="mb-10 form-element">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-xl shadow-emerald-500/20 mb-6">
                <AppLogo className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Selamat Datang</h1>
              <p className="text-slate-500 text-lg">Masuk untuk melanjutkan ke WargaLink.</p>
            </div>

            {/* Role Detector */}
            <div className="h-20 mb-2 form-element">
              <AnimatePresence mode="wait">
                {detectedUser ? (
                  <motion.div
                    key="detected"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={`bg-gradient-to-r ${ROLE_COLORS[username.toLowerCase().trim()]} text-white rounded-2xl px-5 py-4 flex items-center gap-4 shadow-lg`}
                  >
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center font-black text-lg shrink-0">
                      {detectedUser.role.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-sm tracking-wide">{detectedUser.role}</p>
                      <p className="text-xs text-white/80 font-medium">{detectedUser.desc}</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 text-sm font-medium"
                  >
                    Menunggu masukan username...
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className={`space-y-6 form-element ${shake ? "animate-shake" : ""}`} style={shake ? { animation: "shake 0.5s ease-in-out" } : {}}>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Username</label>
                <div className="relative group">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Masukkan username Anda"
                    required
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-emerald-500 transition-all font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-700">Password</label>
                  <a href="#" className="text-xs font-bold text-emerald-600 hover:text-emerald-700">Lupa password?</a>
                </div>
                <div className="relative group">
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-5 py-4 pr-12 bg-slate-50 border-2 border-slate-100 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-emerald-500 transition-all font-semibold"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
                  >
                    {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-xl shadow-slate-900/20 disabled:opacity-70 disabled:cursor-not-allowed group mt-4"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Masuk Sekarang <LogIn className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-10 text-center text-sm font-medium text-slate-500 form-element">
              Butuh akses akun? <a href="#" className="text-emerald-600 font-bold hover:underline">Hubungi Ketua RT Anda</a>
            </p>

          </div>
        </div>
      </div>

      {/* RIGHT: Dynamic Animated Showcase Panel */}
      <div className="split-right hidden lg:flex w-1/2 min-h-screen bg-slate-950 relative overflow-hidden flex-col justify-between p-12">
        {/* Dynamic Abstract Background */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <svg className="bg-blob absolute top-0 left-0 w-[150%] h-[150%] text-emerald-900/40 -translate-x-1/4 -translate-y-1/4" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M42.7,-73.4C55.9,-65.7,67.6,-54.3,76.5,-40.4C85.4,-26.5,91.5,-10.1,91.2,6C90.9,22.1,84.2,37.9,73.4,49.8C62.6,61.7,47.7,69.7,31.7,76.2C15.7,82.7,-1.4,87.7,-17.6,84.1C-33.8,80.5,-49.1,68.3,-61.8,54.1C-74.5,39.9,-84.6,23.7,-87.3,6.3C-90,-11.1,-85.3,-29.7,-74.4,-43.3C-63.5,-56.9,-46.4,-65.5,-31,-72.1C-15.6,-78.7,-1.9,-83.3,13.2,-81.4C28.3,-79.5,43.5,-71.1,42.7,-73.4Z" transform="translate(100 100)" />
          </svg>
          <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-teal-500/20 blur-[100px] rounded-full"></div>
          <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-emerald-400/10 blur-[80px] rounded-full"></div>
        </div>

        {/* Top Text Content */}
        <div className="relative z-10 pt-10">
          <h2 className="showcase-content text-5xl xl:text-6xl font-black text-white leading-tight tracking-tight mb-6">
            Ekosistem <br/> Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Terpadu.</span>
          </h2>
          <p className="showcase-content text-lg text-slate-400 font-medium max-w-md">
            WargaLink membawa transparansi, kecepatan, dan kenyamanan birokrasi langsung ke genggaman Anda.
          </p>
        </div>

        {/* Floating Cards Graphic */}
        <div className="relative z-10 flex-1 flex items-center justify-center mt-12 mb-8 perspective-1000">
          <div className="relative w-full max-w-lg h-80">
            {/* Card 1 */}
            <div className="glass-card absolute top-0 right-10 w-64 h-32 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-2xl flex items-start gap-4 transform rotate-6">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Data Tersinkronisasi</p>
                <p className="text-slate-400 text-xs mt-1">Keamanan tingkat tinggi untuk privasi data warga.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="glass-card absolute top-24 left-4 w-72 h-32 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl flex items-start gap-4 transform -rotate-3 z-10">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                <Server className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Server Stabil & Cepat</p>
                <p className="text-slate-400 text-xs mt-1">Akses dokumen 24/7 tanpa henti dan antri.</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="glass-card absolute bottom-0 right-4 w-60 h-32 bg-gradient-to-br from-emerald-600/90 to-teal-900/90 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-5 shadow-2xl flex items-start gap-4 transform rotate-[-5deg] z-20">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">100% Online</p>
                <p className="text-emerald-100/70 text-xs mt-1">Tinggalkan cara lama yang berbasis kertas.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Metrics */}
        <div className="relative z-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-8 showcase-content">
          <div>
            <p className="text-3xl font-black text-white">100+</p>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">RT Terdaftar</p>
          </div>
          <div>
            <p className="text-3xl font-black text-emerald-400">10k+</p>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Warga Aktif</p>
          </div>
          <div>
            <p className="text-3xl font-black text-white">99%</p>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Uptime Server</p>
          </div>
        </div>

      </div>

    </div>
  );
}

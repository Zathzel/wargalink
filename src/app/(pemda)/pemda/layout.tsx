"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Map, Users, FileBarChart, Shield, LayoutDashboard, LogOut, Loader2, Sun, Moon } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AppLogo } from "@/components/AppLogo";

export default function PemdaLayout({ children }: { children: ReactNode }) {
  const { currentUser, isLoaded, logoutUser } = useApp();
  const router = useRouter();
  const pathname = usePathname();
  const [theme, setTheme] = useState("light");

  const navigation = [
    { name: "Overview", href: "/pemda", icon: LayoutDashboard },
    { name: "Kependudukan", href: "/pemda/kependudukan", icon: Users },
    { name: "Laporan", href: "/pemda/laporan", icon: FileBarChart },
    { name: "Peta Wilayah", href: "/pemda/peta", icon: Map },
    { name: "Audit Log", href: "/pemda/audit", icon: Shield },
  ];

  useEffect(() => {
    const storedTheme = localStorage.getItem("wl_theme") || "light";
    setTheme(storedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("wl_theme", nextTheme);
    toast.success(`Mode ${nextTheme === "dark" ? "Gelap" : "Terang"} diaktifkan.`);
  };

  // Active check — exact for /pemda, startsWith for children
  const isActive = (href: string) => {
    if (href === "/pemda") return pathname === "/pemda";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    if (isLoaded && (!currentUser || currentUser.role !== "Pemda")) {
      toast.error("Akses Ditolak", {
        description: "Silakan login sebagai Pemda terlebih dahulu.",
      });
      router.push("/login");
    }
  }, [currentUser, isLoaded, router]);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logoutUser();
    toast.success("Berhasil keluar.");
    router.push("/login");
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!currentUser || currentUser.role !== "Pemda") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-transparent flex flex-col ${theme === "dark" ? "dark bg-slate-900" : "bg-slate-50 relative"}`}>
      {theme === "dark" && (
        <style dangerouslySetInnerHTML={{ __html: `
          .dark {
            background-color: #0b0f19 !important;
          }
          .dark .bg-white, 
          .dark .bg-white\\/85,
          .dark .bg-white\\/80,
          .dark .bg-white\\/90,
          .dark .bg-white\\/95,
          .dark .bg-white\\/30,
          .dark .bg-white\\/45,
          .dark .bg-white\\/40,
          .dark .bg-white\\/60,
          .dark aside,
          .dark header,
          .dark .bg-slate-50\\/20,
          .dark .bg-slate-50\\/50 {
            background-color: #1e293b !important;
            color: #f8fafc !important;
            border-color: #334155 !important;
          }
          .dark .bg-slate-50,
          .dark .bg-slate-100 {
            background-color: #0f172a !important;
            color: #f8fafc !important;
          }
          .dark .text-slate-900, 
          .dark .text-slate-800, 
          .dark .text-slate-700,
          .dark .text-slate-650,
          .dark .text-slate-600 {
            color: #f1f5f9 !important;
          }
          .dark .text-slate-500, 
          .dark .text-slate-400 {
            color: #94a3b8 !important;
          }
          .dark .border-slate-100, 
          .dark .border-slate-200, 
          .dark .border {
            border-color: #334155 !important;
          }
          .dark input, 
          .dark select, 
          .dark textarea {
            background-color: #0f172a !important;
            color: #f8fafc !important;
            border-color: #334155 !important;
          }
          .dark select option {
            background-color: #1e293b !important;
            color: #f8fafc !important;
          }
          .dark .hover\\:bg-slate-50:hover,
          .dark .hover\\:bg-slate-100:hover,
          .dark .hover\\:bg-white:hover {
            background-color: #334155 !important;
            color: #f8fafc !important;
          }
          .dark .hover\\:bg-red-50:hover {
            background-color: rgba(239, 68, 68, 0.2) !important;
          }
          .dark table, 
          .dark tr,
          .dark th,
          .dark td {
            border-color: #334155 !important;
            color: #f1f5f9 !important;
          }
          .dark table th {
            background-color: #0f172a !important;
            color: #94a3b8 !important;
          }
          .dark .bg-emerald-50 {
            background-color: rgba(16, 185, 129, 0.1) !important;
            color: #6ee7b7 !important;
            border-color: rgba(16, 185, 129, 0.2) !important;
          }
          .dark .text-primary {
            color: #34d399 !important;
          }
          .dark .bg-primary {
            background-color: #10b981 !important;
            color: white !important;
          }
          .dark .text-slate-800 {
            color: #f1f5f9 !important;
          }
        ` }} />
      )}
      {/* Background Mesh (Light Mode Only) */}
      {theme === "light" && (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-300/20 blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-teal-300/20 blur-[100px]" />
        </div>
      )}
      {/* Top Navbar */}
      <header className="h-16 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border-b border-white/50 dark:border-slate-800/50 shadow-sm flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <AppLogo className="h-9 w-10 text-emerald-600" />
          <h1 className="text-xl font-extrabold tracking-tight text-slate-800 dark:text-white">WargaLink <span className="text-emerald-600">Pemda</span></h1>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="hidden md:inline font-bold text-slate-500">{currentUser.desc}</span>
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-500 hover:text-emerald-600 transition-colors bg-white/80 dark:bg-slate-800/80 border border-white/50 dark:border-slate-700/50 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm hover:shadow"
            aria-label="Toggle Tema"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
          <div className="h-9 w-9 bg-white/80 dark:bg-slate-800/80 rounded-full border border-white/50 dark:border-slate-700/50 flex items-center justify-center text-slate-600 dark:text-slate-300 shadow-inner">
            <UserIcon />
          </div>
          <button
            onClick={handleLogout}
            className="text-slate-400 hover:text-red-500 transition-all bg-white/80 dark:bg-slate-800/80 p-2 border border-white/50 dark:border-slate-700/50 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 shadow-sm"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Modern Sidebar Pemda */}
        <aside className="w-64 bg-white/60 dark:bg-[#1e293b]/70 backdrop-blur-2xl border-r border-white/80 dark:border-slate-700/50 hidden lg:flex flex-col shadow-[8px_0_30px_rgb(0,0,0,0.04)] z-10 my-4 ml-4 rounded-[2rem]">
          <div className="p-5 border-b border-white/50 dark:border-slate-700/50 bg-white/40 dark:bg-slate-800/40 rounded-t-[2rem]">
            <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest">Sistem Informasi Wilayah</p>
            <p className="text-sm text-slate-800 dark:text-white font-black mt-1">Pemerintah Kota Admin</p>
          </div>
          <nav className="flex-1 overflow-y-auto py-6">
            <div className="px-5 mb-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Menu Utama
            </div>
            <ul className="space-y-1.5 px-3">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-300 group ${
                        active
                          ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-[0_4px_10px_rgba(16,185,129,0.3)]"
                          : "text-slate-600 dark:text-slate-400 hover:bg-emerald-50/80 dark:hover:bg-emerald-900/20 hover:text-emerald-700 dark:hover:text-emerald-400"
                      }`}
                    >
                      <Icon className={`w-5 h-5 transition-transform duration-300 ${
                        active ? "text-white scale-110" : "text-slate-400 dark:text-slate-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:scale-110"
                      }`} />
                      <span>{item.name}</span>
                      {active && (
                        <span className="ml-auto w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,0.8)]" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-white/50 dark:border-slate-700/50 bg-white/40 dark:bg-slate-800/40 rounded-b-[2rem]">
            <div className="flex items-center gap-3 mb-3 p-2">
              <div className="w-10 h-10 bg-emerald-100/80 dark:bg-emerald-900/40 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-inner">
                <UserIcon />
              </div>
              <div>
                <p className="text-xs text-slate-800 dark:text-white font-black">Admin Pemda</p>
                <p className="text-[10px] text-slate-500 font-bold truncate max-w-[120px]">{currentUser.desc}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full text-slate-500 hover:text-red-600 dark:hover:text-red-400 text-xs font-bold py-2.5 px-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all border border-transparent hover:border-red-100 dark:hover:border-red-900/30"
            >
              <LogOut className="w-4 h-4" />
              Keluar dari Sistem
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 z-10 relative">
          {children}
        </main>
      </div>
    </div>
  );
}

function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  )
}

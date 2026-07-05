"use client";

import { ReactNode, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Map, Users, FileBarChart, Shield, LayoutDashboard, LogOut, Loader2 } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { AppLogo } from "@/components/AppLogo";
import { toast } from "sonner";

export default function PemdaLayout({ children }: { children: ReactNode }) {
  const { currentUser, isLoaded, logoutUser } = useApp();
  const router = useRouter();
  const pathname = usePathname();

  const navigation = [
    { name: "Overview", href: "/pemda", icon: LayoutDashboard },
    { name: "Kependudukan", href: "/pemda/kependudukan", icon: Users },
    { name: "Laporan", href: "/pemda/laporan", icon: FileBarChart },
    { name: "Peta Wilayah", href: "/pemda/peta", icon: Map },
    { name: "Audit Log", href: "/pemda/audit", icon: Shield },
  ];

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
      router.push("/");
    }
  }, [currentUser, isLoaded, router]);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logoutUser();
    toast.success("Berhasil keluar.");
    router.push("/");
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
    <div className="min-h-screen bg-transparent flex flex-col">
      {/* Top Navbar */}
      <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-white/50 shadow-sm flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <AppLogo className="h-9 w-10 rounded-lg shadow-md ring-1 ring-slate-200/70" />
          <h1 className="text-xl font-extrabold tracking-tight text-slate-800">WargaLink <span className="text-blue-600">Pemda</span></h1>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="hidden md:inline font-semibold text-slate-500">{currentUser.desc}</span>
          <div className="h-9 w-9 bg-slate-100 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 shadow-inner">
            <UserIcon />
          </div>
          <button
            onClick={handleLogout}
            className="text-slate-400 hover:text-red-500 transition-colors bg-slate-50 p-2 rounded-full hover:bg-red-50"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Dark Enterprise Sidebar */}
        <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden lg:flex flex-col shadow-2xl z-10">
          <div className="p-4 border-b border-slate-800 bg-slate-950/50">
            <p className="text-xs text-slate-400 font-medium">Sistem Informasi Wilayah</p>
            <p className="text-sm text-white font-bold mt-0.5">Pemerintah Kota Admin</p>
          </div>
          <nav className="flex-1 overflow-y-auto py-6">
            <div className="px-4 mb-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Menu Utama
            </div>
            <ul className="space-y-1 px-3">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all duration-200 group ${
                        active
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                          : "text-slate-400 hover:bg-blue-600/10 hover:text-blue-400"
                      }`}
                    >
                      <Icon className={`w-5 h-5 transition-colors ${
                        active ? "text-white" : "text-slate-500 group-hover:text-blue-400"
                      }`} />
                      <span>{item.name}</span>
                      {active && (
                        <span className="ml-auto w-1.5 h-1.5 bg-white rounded-full" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-800 bg-slate-950/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-400">
                <UserIcon />
              </div>
              <div>
                <p className="text-xs text-slate-300 font-bold">Admin Pemda</p>
                <p className="text-[10px] text-slate-500 truncate max-w-[120px]">{currentUser.desc}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full text-slate-400 hover:text-red-400 text-xs font-medium py-2 px-2 rounded-lg hover:bg-red-500/10 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Keluar dari Sistem
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
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

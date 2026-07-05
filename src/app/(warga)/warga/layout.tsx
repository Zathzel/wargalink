"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Wallet, Bell, User, Loader2 } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AppLogo } from "@/components/AppLogo";

export default function WargaLayout({ children }: { children: ReactNode }) {
  const { currentUser, isLoaded, notifications, markNotifikasiRead, clearAllNotifikasi } = useApp();
  const router = useRouter();
  const pathname = usePathname();
  const [showNotif, setShowNotif] = useState(false);

  const navigation = [
    { name: "Beranda", href: "/warga", icon: Home },
    { name: "Surat", href: "/warga/surat", icon: FileText },
    { name: "Iuran", href: "/warga/iuran", icon: Wallet },
    { name: "Info", href: "/warga/pengumuman", icon: Bell },
    { name: "Profil", href: "/warga/profil", icon: User },
  ];

  // Active check — exact for /warga, startsWith for children
  const isActive = (href: string) => {
    if (href === "/warga") return pathname === "/warga";
    return pathname.startsWith(href);
  };

  const wargaNotifs = notifications.filter(
    (n) => n.targetRole === "Warga" || n.targetRole === "All"
  );
  const unreadCount = wargaNotifs.filter((n) => !n.read).length;

  useEffect(() => {
    if (isLoaded && (!currentUser || currentUser.role !== "Warga")) {
      toast.error("Akses Ditolak", {
        description: "Silakan login sebagai Warga terlebih dahulu.",
      });
      router.push("/");
    }
  }, [currentUser, isLoaded, router]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!currentUser || currentUser.role !== "Warga") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const pemohonNama = currentUser.desc.split(",")[0].trim();

  return (
    <div className="min-h-screen bg-transparent flex flex-col max-w-md mx-auto shadow-2xl shadow-blue-900/10 relative overflow-hidden bg-white/50 backdrop-blur-3xl">
      {/* Notification Panel Overlay */}
      {showNotif && (
        <div
          className="absolute inset-0 z-40 bg-black/10 backdrop-blur-sm"
          onClick={() => setShowNotif(false)}
        />
      )}

      {/* Floating Notification Panel */}
      {showNotif && (
        <div className="absolute top-20 right-4 w-72 bg-white/98 backdrop-blur-xl border border-slate-200/60 shadow-2xl rounded-2xl p-4 z-50 text-left">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <span className="font-bold text-slate-800 text-sm">Notifikasi</span>
            {unreadCount > 0 && (
              <button
                onClick={() => { clearAllNotifikasi("Warga"); toast.success("Semua notifikasi ditandai dibaca."); }}
                className="text-xs text-primary font-bold hover:underline"
              >
                Tandai dibaca
              </button>
            )}
          </div>
          <div className="mt-2 space-y-2 max-h-64 overflow-y-auto">
            {wargaNotifs.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-4">Belum ada notifikasi.</p>
            ) : (
              wargaNotifs.map((n) => (
                <div
                  key={n.id}
                  onClick={() => { markNotifikasiRead(n.id); setShowNotif(false); }}
                  className={`p-2.5 rounded-xl transition-colors cursor-pointer text-xs ${
                    n.read
                      ? "bg-slate-50 text-slate-500"
                      : "bg-blue-50/50 text-slate-800 font-medium hover:bg-blue-50 border-l-2 border-primary"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-bold">{n.title}</span>
                    <span className="text-[9px] text-slate-400 shrink-0">{n.time}</span>
                  </div>
                  <p className="mt-1 leading-relaxed">{n.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Compact Header Bar (only visible on non-home pages for context) */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-lg border-b border-slate-100/80 px-5 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <AppLogo className="h-7 w-8 rounded-md shadow ring-1 ring-slate-200/70" />
          <span className="font-extrabold text-slate-800 text-sm tracking-tight">WargaLink</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowNotif(!showNotif)}
            className="relative p-2 text-slate-500 hover:text-primary rounded-full hover:bg-slate-100 transition-all"
            aria-label="Notifikasi"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 text-[9px] font-bold text-white rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs shadow ring-2 ring-white">
              {pemohonNama.charAt(0)}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-28">
        {children}
      </main>

      {/* Floating Bottom Navigation */}
      <nav className="absolute bottom-6 left-4 right-4 h-16 bg-white/90 backdrop-blur-md border border-white/50 shadow-xl shadow-blue-900/10 rounded-2xl flex items-center justify-around px-1 z-30">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full gap-0.5 p-2 rounded-xl transition-all duration-200 ${
                active
                  ? "text-primary"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {/* Active indicator pill */}
              <div className={`relative flex items-center justify-center w-10 h-7 rounded-full transition-all duration-200 ${
                active ? "bg-blue-50" : ""
              }`}>
                <Icon className={`w-5 h-5 transition-transform duration-200 ${active ? "scale-110" : ""}`} />
                {active && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full" />
                )}
              </div>
              <span className={`text-[10px] font-semibold transition-all ${active ? "text-primary" : ""}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

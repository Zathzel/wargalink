"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, CheckCircle, TrendingUp, Wallet, AlertCircle, Siren, Flame, ShieldAlert, HeartPulse, Tent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StaggerContainer, StaggerItem } from "@/components/ui/animated-container";
import { toast } from "sonner";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

export default function AdminDashboard() {
  const { daftarWarga, transaksiBulanan, suratList, tagihanList, daruratList, selesaikanDarurat, tamuList, peminjamanList } = useApp();

  const activeDarurat = daruratList.filter(d => d.status === "Aktif");
  const pendingPinjamanCount = peminjamanList.filter(p => p.status === "Menunggu").length;
  const tamuHariIni = tamuList.length;

  const handleDownload = () => {
    toast.promise(
      new Promise((res) => setTimeout(res, 2000)),
      {
        loading: "Membuat laporan PDF...",
        success: "Laporan berhasil diunduh!",
        error: "Gagal membuat laporan.",
      }
    );
  };

  // Dynamic calculations
  const totalWargaCount = 138 + daftarWarga.length; // Realistic mapping from dummy data

  const juniPemasukan = transaksiBulanan.find((t) => t.name === "Jun")?.pemasukan || 0;

  const pendingSuratCount = suratList.filter(
    (s) => s.status === "Menunggu" || s.status === "Diproses RT"
  ).length;

  const pendingPaymentsCount = tagihanList.filter(
    (t) => t.status === "Menunggu Verifikasi"
  ).length;

  const stats = [
    { title: "Total Warga", value: totalWargaCount.toString(), trend: "+4 bulan ini", icon: Users, href: "/admin/warga" },
    { title: "Kas Bulan Ini", value: `Rp ${juniPemasukan.toLocaleString("id-ID")}`, trend: "Kas Juni 2026", icon: Wallet, href: "/admin/keuangan" },
    { title: "Surat Pending", value: pendingSuratCount.toString(), trend: "Butuh approval", icon: FileText, href: "/admin/surat" },
    { title: "Verifikasi Iuran", value: pendingPaymentsCount.toString(), trend: "Pembayaran baru", icon: AlertCircle, href: "/admin/keuangan" },
    { title: "Tamu Menginap", value: tamuHariIni.toString(), trend: "Buku tamu aktif", icon: Users, href: "/admin/tamu" },
    { title: "Pinjam Fasilitas", value: pendingPinjamanCount.toString(), trend: "Butuh approval", icon: Tent, href: "/admin/fasilitas" },
  ];

  const suratTerbaru = suratList.slice(0, 3);

  // Dynamic activity stream
  const aktivitas = [
    ...suratList.slice(0, 2).map((s) => ({
      time: "Baru saja",
      desc: `${s.pemohon} mengajukan ${s.jenis} (Status: ${s.status === "Menunggu" ? "Diproses RT" : s.status})`,
    })),
    ...tagihanList
      .filter((t) => t.status === "Menunggu Verifikasi")
      .slice(0, 1)
      .map((t) => ({
        time: "Baru saja",
        desc: `${t.kk} melakukan konfirmasi bayar iuran`,
      })),
    { time: "Kemarin", desc: "Ketua RT memperbarui pengumuman lingkungan" },
  ];

  return (
    <StaggerContainer className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-800">Ringkasan Lingkungan</h2>
          <p className="text-slate-500 font-medium">Pantau aktivitas warga dan keuangan secara real-time.</p>
        </div>
        <Button
          className="bg-primary hover:bg-blue-700 shadow-lg shadow-blue-600/20 rounded-xl px-6 py-2 transition-all active:scale-95"
          onClick={handleDownload}
        >
          Download Laporan PDF
        </Button>
      </div>

      {activeDarurat.length > 0 && (
        <StaggerItem>
          <div className="space-y-4">
            {activeDarurat.map((darurat) => {
              const DaruratIcon = darurat.jenis === "Kebakaran" ? Flame : darurat.jenis === "Medis" ? HeartPulse : ShieldAlert;
              return (
                <Card key={darurat.id} className="border-red-500/50 bg-red-50/80 dark:bg-red-900/20 backdrop-blur-xl shadow-[0_8px_30px_rgba(220,38,38,0.15)] rounded-[2rem] overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 dark:bg-red-500/10 rounded-full blur-3xl -mr-10 -mt-10 animate-pulse"></div>
                  <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
                    <div className="flex items-start sm:items-center gap-4">
                      <div className="bg-gradient-to-br from-red-500 to-rose-600 text-white p-3 sm:p-4 rounded-2xl shadow-lg shadow-red-500/30 animate-bounce shrink-0">
                        <Siren className="w-6 h-6 sm:w-8 sm:h-8" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-white/60 dark:bg-red-900/50 text-red-800 dark:text-red-200 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1.5 shadow-sm border border-red-100 dark:border-red-800/50">
                            <DaruratIcon className="w-3.5 h-3.5" /> {darurat.jenis}
                          </span>
                          <span className="text-xs text-red-600 dark:text-red-400 font-bold bg-white/40 dark:bg-black/20 px-2 py-0.5 rounded-md">• {darurat.waktu}</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-extrabold text-red-900 dark:text-red-100 leading-tight tracking-tight mt-2">DARURAT: {darurat.lokasi}</h3>
                        <p className="text-sm font-semibold text-red-700 dark:text-red-300 mt-1">Pelapor: {darurat.pemohon}</p>
                      </div>
                    </div>
                    <Button 
                      onClick={() => selesaikanDarurat(darurat.id, "Kondisi telah ditangani dan kembali aman")}
                      className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-[0_8px_20px_-10px_rgba(220,38,38,0.6)] font-extrabold rounded-xl h-12 px-6 transition-all hover:scale-105"
                    >
                      Tandai Kondusif
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </StaggerItem>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <StaggerItem key={stat.title}>
              <Link href={stat.href}>
                <Card className="border border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-[#1e293b]/70 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] overflow-hidden hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 cursor-pointer group">
                  <CardHeader className="flex flex-row items-center justify-between pb-2 bg-white/40 dark:bg-slate-800/40 border-b border-white/50 dark:border-slate-700/50">
                    <CardTitle className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{stat.title}</CardTitle>
                    <div className={`p-2.5 rounded-xl shadow-inner group-hover:scale-110 transition-transform ${stat.title.includes('Surat') ? 'bg-amber-100/80 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' : stat.title.includes('Kas') ? 'bg-emerald-100/80 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-blue-100/80 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-5 pb-6">
                    <div className="text-3xl font-black text-slate-800 tracking-tight">{stat.value}</div>
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1.5 bg-emerald-50/50 dark:bg-emerald-900/20 px-2 py-1 rounded-md inline-flex border border-emerald-100/50 dark:border-emerald-800/30">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {stat.trend}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </StaggerItem>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <StaggerItem>
          <Card className="h-full border border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-[#1e293b]/70 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] overflow-hidden">
            <CardHeader className="border-b border-white/50 dark:border-slate-700/50 bg-white/40 dark:bg-slate-800/40 flex flex-row items-center justify-between py-5">
              <CardTitle className="font-extrabold text-slate-800">Pengajuan Surat Terbaru</CardTitle>
              <Link href="/admin/surat" className="text-xs text-primary font-bold hover:underline bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-lg">Lihat Semua →</Link>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {suratTerbaru.length === 0 ? (
                  <p className="text-sm text-slate-400 font-medium text-center py-6">Tidak ada pengajuan surat.</p>
                ) : (
                  suratTerbaru.map((s) => (
                    <div key={s.id} className="flex items-center gap-4 group p-3 rounded-[1.5rem] hover:bg-white/80 dark:hover:bg-slate-800/80 transition-colors border border-transparent hover:border-white/60 dark:hover:border-slate-700/50 hover:shadow-sm">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/40 text-blue-600 dark:text-blue-400 rounded-[1.2rem] flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-extrabold text-slate-800">{s.jenis}</p>
                        <p className="text-[11px] text-slate-500 font-bold bg-slate-100 dark:bg-slate-800/50 px-2 py-0.5 rounded-md inline-block mt-1">{s.pemohon} - RT 01</p>
                      </div>
                      <Link href="/admin/surat">
                        <Button variant="outline" size="sm" className="rounded-xl shadow-sm border-slate-200/60 hover:bg-primary hover:text-white hover:border-primary transition-all font-bold h-9 px-4">
                          Review
                        </Button>
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card className="h-full border border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-[#1e293b]/70 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] overflow-hidden">
            <CardHeader className="border-b border-white/50 dark:border-slate-700/50 bg-white/40 dark:bg-slate-800/40 py-5">
              <CardTitle className="font-extrabold text-slate-800">Aktivitas Terkini</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200/80 dark:before:via-slate-700/80 before:to-transparent">
                {aktivitas.map((act, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white/80 dark:border-[#1e293b] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-primary group-hover:text-white shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-all duration-300 group-hover:scale-110 z-10">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-[1.5rem] border border-white/60 dark:border-slate-700/50 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md shadow-sm group-hover:shadow-[0_8px_20px_rgb(0,0,0,0.04)] transition-all">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-extrabold text-slate-800 text-sm leading-snug">{act.desc}</span>
                      </div>
                      <p className="text-[11px] font-bold text-slate-400 bg-slate-50/50 dark:bg-slate-900/50 px-2 py-0.5 rounded-md inline-block border border-slate-100 dark:border-slate-700/50">{act.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </StaggerItem>
      </div>
    </StaggerContainer>
  );
}


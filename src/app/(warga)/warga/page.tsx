"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, Bell, Clock, FileText, ArrowRight, MessageSquare, Check, Calendar, Siren, Flame, ShieldAlert, HeartPulse, Tent, Users, PieChart, ShoppingBag, Trophy, Medal, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StaggerContainer, StaggerItem } from "@/components/ui/animated-container";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

export default function WargaHome() {
  const router = useRouter();
  const [daruratOpen, setDaruratOpen] = useState(false);
  const { nominalIuran, iuranAktif, tagihanList, suratList, currentUser, pengumumanList, triggerDarurat } = useApp();

  const pemohonNama = currentUser ? currentUser.desc.split(",")[0].trim() : "Budi Santoso";
  const myTagihan = tagihanList.find((t) => t.kk === pemohonNama && t.tagihan === "Iuran Juni 2026") || {
    id: 0,
    kk: pemohonNama,
    tagihan: "Iuran Juni 2026",
    nominal: nominalIuran,
    status: "Belum",
  };

  const mySurat = suratList.filter((s) => s.pemohon === pemohonNama);
  const latestSurat = mySurat[0] || null;
  const latestPengumuman = pengumumanList.slice(0, 2);

  const handleBayar = () => {
    router.push("/warga/iuran");
  };

  const handleDarurat = (jenis: string) => {
    triggerDarurat(jenis, currentUser ? `Rumah ${currentUser.desc.split(",")[1]?.trim() || currentUser.desc}` : "Rumah Warga", pemohonNama);
    setDaruratOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent pb-8">
      {/* Premium Greeting Banner */}
      <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-800 text-white p-8 pb-16 rounded-b-[3rem] shadow-[0_20px_40px_-15px_rgba(16,185,129,0.3)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/15 rounded-full blur-[80px] -mr-20 -mt-20 mix-blend-overlay"></div>
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-sky-300/30 rounded-full blur-[60px] -ml-10 -mb-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold mb-1 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100">Halo, {pemohonNama}!</h2>
          <p className="text-white/90 text-sm font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            RT 01 / RW 05, Blok A2 No 15
          </p>
          <p className="text-white/70 text-xs mt-2">Selamat datang di WargaLink Premium</p>
        </div>
      </div>


      <StaggerContainer className="px-5 -mt-8 space-y-6">

        {/* Gamification WargaPoin Card */}
        <StaggerItem>
          <Link href="/warga/poin" className="block relative bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-500 p-5 rounded-[2rem] shadow-xl shadow-amber-500/20 overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-inner group-hover:scale-110 transition-transform">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-amber-100 text-xs font-bold uppercase tracking-wider mb-0.5">WargaPoin Anda</p>
                  <p className="text-2xl font-black text-white flex items-center gap-1">
                    1,250 <span className="text-sm font-medium text-amber-100/90 ml-1">pts</span>
                  </p>
                </div>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                <ChevronRight className="w-5 h-5 text-white" />
              </div>
            </div>
          </Link>
        </StaggerItem>
        {/* Quick Action Card (Iuran) */}
        <StaggerItem>
          <Card className="border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] bg-white/50 backdrop-blur-xl rounded-[2rem] overflow-hidden">
            <CardContent className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`${!iuranAktif ? "bg-sky-100 text-sky-600" : myTagihan.status === "Lunas" ? "bg-emerald-100 text-emerald-600" : myTagihan.status === "Menunggu Verifikasi" ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"} p-3 rounded-2xl shadow-inner`}>
                  <Wallet className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Tagihan Bulan Ini</p>
                  <p className="text-xl font-extrabold text-slate-800">
                    {iuranAktif ? `Rp ${myTagihan.nominal.toLocaleString("id-ID")}` : "Bebas / Ditiadakan"}
                  </p>
                </div>
              </div>
              {iuranAktif ? (
                <>
                  {myTagihan.status === "Belum" && (
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 rounded-xl transition-transform active:scale-95 font-bold"
                      onClick={handleBayar}
                    >
                      Bayar
                    </Button>
                  )}
                  {myTagihan.status === "Menunggu Verifikasi" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-amber-200 bg-amber-50 text-amber-700 rounded-xl cursor-not-allowed font-bold"
                      disabled
                    >
                      Pending
                    </Button>
                  )}
                  {myTagihan.status === "Lunas" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-emerald-200 bg-emerald-50 text-emerald-700 rounded-xl cursor-not-allowed font-bold"
                      disabled
                    >
                      <span className="flex items-center">Lunas <Check className="w-4 h-4 ml-1" /></span>
                    </Button>
                  )}
                </>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  className="border-sky-200 bg-sky-50 text-sky-700 rounded-xl font-bold"
                  onClick={handleBayar}
                >
                  Detail
                </Button>
              )}
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <div className="flex items-center justify-between pt-2 pb-2">
            <h3 className="font-bold text-slate-800 tracking-tight">Layanan Warga</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Link href="/warga/surat" className="group bg-white/40 backdrop-blur-xl p-4 rounded-[2rem] border border-white/60 shadow-[0_8px_20px_rgb(0,0,0,0.04)] flex flex-col items-center justify-center gap-3 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgb(0,0,0,0.08)] hover:bg-white/80 transition-all duration-300 text-center">
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-3 rounded-2xl text-blue-600 shadow-inner group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-700 leading-tight">Surat</span>
            </Link>
            <Link href="/warga/aduan" className="group bg-white/40 backdrop-blur-xl p-4 rounded-[2rem] border border-white/60 shadow-[0_8px_20px_rgb(0,0,0,0.04)] flex flex-col items-center justify-center gap-3 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgb(0,0,0,0.08)] hover:bg-white/80 transition-all duration-300 text-center">
              <div className="bg-gradient-to-br from-emerald-100 to-emerald-50 p-3 rounded-2xl text-emerald-600 shadow-inner group-hover:scale-110 transition-transform duration-300">
                <MessageSquare className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-700 leading-tight">Aduan</span>
            </Link>
            <Link href="/warga/pengumuman" className="group bg-white/40 backdrop-blur-xl p-4 rounded-[2rem] border border-white/60 shadow-[0_8px_20px_rgb(0,0,0,0.04)] flex flex-col items-center justify-center gap-3 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgb(0,0,0,0.08)] hover:bg-white/80 transition-all duration-300 text-center">
              <div className="bg-gradient-to-br from-amber-100 to-amber-50 p-3 rounded-2xl text-amber-600 shadow-inner group-hover:scale-110 transition-transform duration-300">
                <Bell className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-700 leading-tight">Info RT</span>
            </Link>
            <Link href="/warga/umkm" className="group bg-white/40 backdrop-blur-xl p-4 rounded-[2rem] border border-white/60 shadow-[0_8px_20px_rgb(0,0,0,0.04)] flex flex-col items-center justify-center gap-3 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgb(0,0,0,0.08)] hover:bg-white/80 transition-all duration-300 text-center">
              <div className="bg-gradient-to-br from-orange-100 to-orange-50 p-3 rounded-2xl text-orange-600 shadow-inner group-hover:scale-110 transition-transform duration-300">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-700 leading-tight">Pasar Warga</span>
            </Link>
            <Link href="/warga/fasilitas" className="group bg-white/40 backdrop-blur-xl p-4 rounded-[2rem] border border-white/60 shadow-[0_8px_20px_rgb(0,0,0,0.04)] flex flex-col items-center justify-center gap-3 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgb(0,0,0,0.08)] hover:bg-white/80 transition-all duration-300 text-center">
              <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-3 rounded-2xl text-purple-600 shadow-inner group-hover:scale-110 transition-transform duration-300">
                <Tent className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-700 leading-tight">Fasilitas</span>
            </Link>
            <Link href="/warga/tamu" className="group bg-white/40 backdrop-blur-xl p-4 rounded-[2rem] border border-white/60 shadow-[0_8px_20px_rgb(0,0,0,0.04)] flex flex-col items-center justify-center gap-3 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgb(0,0,0,0.08)] hover:bg-white/80 transition-all duration-300 text-center">
              <div className="bg-gradient-to-br from-teal-100 to-teal-50 p-3 rounded-2xl text-teal-600 shadow-inner group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-700 leading-tight">Tamu</span>
            </Link>
            <Link href="/warga/polling" className="group bg-white/40 backdrop-blur-xl p-4 rounded-[2rem] border border-white/60 shadow-[0_8px_20px_rgb(0,0,0,0.04)] flex flex-col items-center justify-center gap-3 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgb(0,0,0,0.08)] hover:bg-white/80 transition-all duration-300 text-center">
              <div className="bg-gradient-to-br from-rose-100 to-rose-50 p-3 rounded-2xl text-rose-600 shadow-inner group-hover:scale-110 transition-transform duration-300">
                <PieChart className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-700 leading-tight">Polling</span>
            </Link>
          </div>
        </StaggerItem>

        {/* Panic Button Darurat - Moved down and resized */}
        <StaggerItem>
          <Card className="border border-red-300/60 shadow-[0_8px_30px_rgb(225,29,72,0.15)] bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl overflow-hidden relative group">
            <CardContent className="p-4 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-400 rounded-xl animate-ping opacity-30"></div>
                  <div className="bg-red-500 p-2.5 rounded-xl shadow-inner relative z-10">
                    <Siren className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-extrabold text-red-700 tracking-tight">Tombol Darurat</p>
                  <p className="text-[10px] font-bold text-red-500/80 uppercase mt-0.5">Butuh bantuan segera?</p>
                </div>
              </div>
              
              <Dialog open={daruratOpen} onOpenChange={setDaruratOpen}>
                <DialogTrigger render={
                  <Button 
                    size="sm"
                    className="bg-red-600 text-white hover:bg-red-700 font-extrabold shadow-md rounded-xl px-4 active:scale-95 transition-all"
                  />
                }>
                  LAPOR
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-white border-red-100 w-[calc(100%-2rem)] max-w-sm rounded-2xl">
                  <DialogHeader className="text-left">
                    <DialogTitle className="text-red-600 flex items-center gap-2">
                      <Siren className="w-5 h-5" /> Laporkan Keadaan Darurat
                    </DialogTitle>
                    <DialogDescription>
                      Pilih jenis bantuan darurat yang Anda butuhkan. Pesan akan langsung dikirim ke Admin RT dan warga sekitar.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-1 gap-3 py-4">
                    <Button 
                      variant="outline" 
                      className="h-16 justify-start px-4 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-all text-left rounded-xl"
                      onClick={() => handleDarurat("Kebakaran")}
                    >
                      <div className="bg-red-100 p-2 rounded-lg mr-3 text-red-600">
                        <Flame className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold">Kebakaran</div>
                        <div className="text-xs text-slate-500 font-normal">Butuh pemadam atau air</div>
                      </div>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-16 justify-start px-4 border-blue-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-all text-left rounded-xl"
                      onClick={() => handleDarurat("Medis")}
                    >
                      <div className="bg-blue-100 p-2 rounded-lg mr-3 text-blue-600">
                        <HeartPulse className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold">Medis / Ambulans</div>
                        <div className="text-xs text-slate-500 font-normal">Kondisi kritis, butuh medis</div>
                      </div>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-16 justify-start px-4 border-amber-200 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-300 transition-all text-left rounded-xl"
                      onClick={() => handleDarurat("Keamanan")}
                    >
                      <div className="bg-amber-100 p-2 rounded-lg mr-3 text-amber-600">
                        <ShieldAlert className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold">Keamanan / Maling</div>
                        <div className="text-xs text-slate-500 font-normal">Tindak kejahatan, curiga</div>
                      </div>
                    </Button>
                  </div>
                  <DialogFooter className="sm:justify-center">
                    <Button variant="ghost" onClick={() => setDaruratOpen(false)} className="w-full text-slate-500 rounded-xl">
                      Batal
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <div className="flex items-center justify-between pt-2 pb-2">
            <h3 className="font-bold text-slate-800 tracking-tight">Aktivitas Terakhir</h3>
            <Link href="/warga/surat" className="text-xs text-emerald-600 font-bold flex items-center hover:underline">
              Lihat Semua <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </div>
          {latestSurat ? (
            <Card className="border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl bg-white/50 backdrop-blur-xl hover:-translate-y-1 transition-transform duration-300 cursor-pointer" onClick={() => router.push("/warga/surat")}>
              <CardContent className="p-4 flex items-start gap-4">
                <div className={`p-2.5 rounded-xl mt-0.5 ${latestSurat.status === "Disetujui" || latestSurat.status === "Selesai" ? "bg-emerald-100 text-emerald-600" : latestSurat.status === "Ditolak" ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"}`}>
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">{latestSurat.jenis}</p>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    {latestSurat.status === "Menunggu" || latestSurat.status === "Diproses RT"
                      ? "Sedang diproses oleh Ketua RT"
                      : latestSurat.status === "Disetujui" || latestSurat.status === "Selesai"
                      ? "Telah disetujui, siap diunduh"
                      : "Pengajuan ditolak"}
                  </p>
                  <div className="mt-3 bg-slate-100 rounded-full h-2 w-full overflow-hidden shadow-inner">
                    <div className={`h-full rounded-full relative transition-all duration-500 ${
                      latestSurat.status === "Menunggu" || latestSurat.status === "Diproses RT"
                        ? "bg-gradient-to-r from-amber-400 to-amber-500 w-1/2"
                        : latestSurat.status === "Disetujui" || latestSurat.status === "Selesai"
                        ? "bg-gradient-to-r from-emerald-400 to-emerald-500 w-full"
                        : "bg-gradient-to-r from-red-400 to-red-500 w-full"
                    }`}>
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <p className="text-sm text-slate-400 border border-dashed rounded-2xl p-6 text-center bg-white/60">Belum ada aktivitas surat-menyurat.</p>
          )}
        </StaggerItem>

        <StaggerItem>
          <div className="flex items-center justify-between pt-2 pb-2">
            <h3 className="font-bold text-slate-800 tracking-tight">Info Terbaru RT</h3>
            <Link href="/warga/pengumuman" className="text-xs text-emerald-600 font-bold flex items-center hover:underline">
              Lihat Semua <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </div>
          <div className="space-y-3">
            {latestPengumuman.map((p) => {
              const tipeColor = p.tipe === "Penting"
                ? "bg-red-50 text-red-600 border-red-100"
                : p.tipe === "Agenda"
                ? "bg-blue-50 text-blue-600 border-blue-100"
                : "bg-emerald-50 text-emerald-600 border-emerald-100";
              return (
                <Link
                  key={p.id}
                  href="/warga/pengumuman"
                  className="block bg-white/50 backdrop-blur-xl p-4 rounded-[1.5rem] border border-white/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2.5 rounded-xl border ${tipeColor} shrink-0`}>
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${tipeColor} border`}>
                          {p.tipe}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">{p.tanggal}</span>
                      </div>
                      <p className="font-bold text-slate-800 text-sm mt-1.5 leading-tight">{p.judul}</p>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{p.isi}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
            {latestPengumuman.length === 0 && (
              <p className="text-sm text-slate-400 border border-dashed rounded-2xl p-6 text-center bg-white/60">Belum ada pengumuman dari RT.</p>
            )}
          </div>
        </StaggerItem>
      </StaggerContainer>
    </div>
  );
}


"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Info, Inbox, CheckCircle2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useApp } from "@/context/AppContext";

export default function WargaTamu() {
  const { currentUser, tamuList, laporTamu } = useApp();
  
  const [nama, setNama] = useState("");
  const [kendaraan, setKendaraan] = useState("");
  const [platNomor, setPlatNomor] = useState("");
  const [durasi, setDurasi] = useState("1");

  const pemohonNama = currentUser ? currentUser.desc.split(",")[0].trim() : "Budi Santoso";
  const myTujuan = `Rumah ${pemohonNama}`;
  
  const myGuests = tamuList.filter((t) => t.tujuan.includes(pemohonNama));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama) return;
    
    const d = parseInt(durasi, 10);
    if (isNaN(d) || d < 1) {
      toast.error("Durasi menginap minimal 1 hari.");
      return;
    }

    laporTamu(nama, kendaraan || "Tidak bawa", platNomor || "-", myTujuan, d);
    setNama("");
    setKendaraan("");
    setPlatNomor("");
    setDurasi("1");
    toast.success(`Laporan tamu atas nama ${nama} berhasil dikirim ke Keamanan RT.`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent p-5 space-y-6">
      <div className="bg-white/40 backdrop-blur-xl p-6 rounded-[2rem] border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mt-2">
        <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/30 mb-4">
          <Users className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Lapor Tamu</h2>
        <p className="text-sm text-slate-600 mt-1 font-medium">Wajib lapor tamu yang menginap lebih dari 1x24 jam di lingkungan RT.</p>
      </div>

      <Card className="border-white/60 bg-white/50 backdrop-blur-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-[2rem]">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="nama" className="font-bold text-slate-700 ml-1">Nama Lengkap Tamu</Label>
              <Input
                id="nama"
                required
                placeholder="Contoh: Joko Supriyanto"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="bg-white/60 border-slate-200/60 rounded-xl h-12 px-4 shadow-inner focus:bg-white focus:ring-2 focus:ring-teal-500/20 transition-all font-medium"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="kendaraan" className="font-bold text-slate-700 ml-1">Jenis Kendaraan</Label>
                <Input
                  id="kendaraan"
                  placeholder="Mobil, Motor"
                  value={kendaraan}
                  onChange={(e) => setKendaraan(e.target.value)}
                  className="bg-white/60 border-slate-200/60 rounded-xl h-12 px-4 shadow-inner focus:bg-white focus:ring-2 focus:ring-teal-500/20 transition-all font-medium text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="platNomor" className="font-bold text-slate-700 ml-1">Plat Nomor</Label>
                <Input
                  id="platNomor"
                  placeholder="B 1234 XYZ"
                  value={platNomor}
                  onChange={(e) => setPlatNomor(e.target.value)}
                  className="bg-white/60 border-slate-200/60 rounded-xl h-12 px-4 shadow-inner focus:bg-white focus:ring-2 focus:ring-teal-500/20 transition-all font-medium text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="durasi" className="font-bold text-slate-700 ml-1">Rencana Menginap (Hari)</Label>
              <Input
                id="durasi"
                type="number"
                min="1"
                required
                value={durasi}
                onChange={(e) => setDurasi(e.target.value)}
                className="bg-white/60 border-slate-200/60 rounded-xl h-12 px-4 shadow-inner focus:bg-white focus:ring-2 focus:ring-teal-500/20 transition-all font-medium"
              />
            </div>
            
            <div className="pt-2">
              <Button type="submit" className="w-full rounded-xl h-12 font-extrabold text-base bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 shadow-[0_8px_20px_-10px_rgba(20,184,166,0.6)]">
                Lapor Sekarang
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="pt-2">
        <h3 className="font-extrabold text-slate-800 mb-4 tracking-tight">Riwayat Tamu Anda</h3>
        <div className="space-y-3 pb-12">
          {myGuests.length === 0 && (
            <div className="text-center py-10 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] bg-white/40 backdrop-blur-xl">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-teal-50 to-emerald-100 rounded-[1.5rem] flex items-center justify-center mb-4 shadow-inner">
                <Inbox className="w-8 h-8 text-teal-500" />
              </div>
              <p className="text-sm font-extrabold text-slate-800">Belum ada riwayat tamu</p>
              <p className="text-[11px] text-slate-500 mt-1 max-w-[16rem] mx-auto leading-relaxed font-medium">Anda belum pernah melaporkan tamu menginap.</p>
            </div>
          )}
          {myGuests.map((t) => (
            <div 
              key={t.id} 
              className="bg-white/60 backdrop-blur-xl p-5 rounded-[1.5rem] border border-white/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col gap-3 transition-all duration-300"
            >
              <div className="flex justify-between items-start w-full">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-teal-100 to-emerald-50 p-2.5 rounded-xl text-teal-600 shadow-inner mt-0.5">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{t.nama}</p>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">Lapor: {t.waktuLapor}</p>
                    <p className="text-xs text-slate-400 mt-2 flex items-center gap-1.5 font-medium bg-white/50 px-2 py-1.5 rounded-lg border border-white shadow-sm inline-flex">
                      <Info className="w-3 h-3 text-teal-500" /> Menginap {t.durasiMenginap} hari
                    </p>
                    {(t.kendaraan || t.platNomor) && (
                      <p className="text-[11px] font-bold text-slate-600 mt-2 ml-2 bg-slate-100/80 px-2.5 py-1 rounded-md inline-block">
                        {t.kendaraan} • {t.platNomor}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-white shadow-sm px-2.5 py-1.5 rounded-full border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-[10px] font-extrabold text-emerald-700">Dilaporkan</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

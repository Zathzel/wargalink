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
    <div className="flex flex-col min-h-screen bg-transparent p-4 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Lapor Tamu</h2>
        <p className="text-sm text-slate-500">Wajib lapor tamu yang menginap lebih dari 1x24 jam di lingkungan RT.</p>
      </div>

      <Card className="border border-teal-100 shadow-md">
        <CardContent className="p-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nama">Nama Lengkap Tamu</Label>
              <Input
                id="nama"
                required
                placeholder="Contoh: Joko Supriyanto"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="kendaraan">Jenis Kendaraan</Label>
                <Input
                  id="kendaraan"
                  placeholder="Contoh: Mobil, Motor"
                  value={kendaraan}
                  onChange={(e) => setKendaraan(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="platNomor">Plat Nomor</Label>
                <Input
                  id="platNomor"
                  placeholder="B 1234 XYZ"
                  value={platNomor}
                  onChange={(e) => setPlatNomor(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="durasi">Rencana Menginap (Hari)</Label>
              <Input
                id="durasi"
                type="number"
                min="1"
                required
                value={durasi}
                onChange={(e) => setDurasi(e.target.value)}
              />
            </div>
            
            <div className="pt-2">
              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 font-bold">
                Lapor Sekarang
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="pt-4">
        <h3 className="font-semibold text-slate-800 mb-3">Riwayat Tamu Anda</h3>
        <div className="space-y-3 pb-12">
          {myGuests.length === 0 && (
            <div className="text-center py-10 border border-dashed rounded-2xl bg-slate-50/60">
              <div className="w-14 h-14 mx-auto bg-teal-50 rounded-2xl flex items-center justify-center mb-3">
                <Inbox className="w-7 h-7 text-teal-400" />
              </div>
              <p className="text-sm font-bold text-slate-700">Belum ada riwayat tamu</p>
              <p className="text-xs text-slate-400 mt-1 max-w-[16rem] mx-auto leading-relaxed">Anda belum pernah melaporkan tamu menginap.</p>
            </div>
          )}
          {myGuests.map((t) => (
            <div 
              key={t.id} 
              className="bg-white p-4 rounded-xl border shadow-sm flex flex-col gap-3"
            >
              <div className="flex justify-between items-start w-full">
                <div className="flex items-start gap-3">
                  <div className="bg-teal-50 p-2 rounded-xl text-teal-600 shrink-0 mt-1">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{t.nama}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Lapor: {t.waktuLapor}</p>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                      <Info className="w-3 h-3" /> Menginap {t.durasiMenginap} hari
                    </p>
                    {(t.kendaraan || t.platNomor) && (
                      <p className="text-[11px] font-semibold text-slate-500 mt-2 bg-slate-100 px-2 py-1 rounded-md inline-block">
                        {t.kendaraan} • {t.platNomor}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-[10px] font-semibold text-emerald-700">Dilaporkan</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

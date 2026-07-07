"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tent, CheckCircle2, Clock, XCircle, Info, Inbox } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useApp } from "@/context/AppContext";

export default function WargaFasilitas() {
  const router = useRouter();
  const { currentUser, fasilitasList, peminjamanList, ajukanPinjaman } = useApp();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  
  const [jumlah, setJumlah] = useState("");
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [tanggalSelesai, setTanggalSelesai] = useState("");
  const [keperluan, setKeperluan] = useState("");

  const pemohonNama = currentUser ? currentUser.desc.split(",")[0].trim() : "Budi Santoso";
  const myPeminjaman = peminjamanList.filter((p) => p.pemohon === pemohonNama);

  const selectedFasilitas = fasilitasList.find(f => f.id === selected);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || !selectedFasilitas) return;
    
    const qty = parseInt(jumlah, 10);
    if (isNaN(qty) || qty <= 0 || qty > selectedFasilitas.tersedia) {
      toast.error("Jumlah pinjaman tidak valid atau melebihi stok yang tersedia.");
      return;
    }

    ajukanPinjaman(selected, pemohonNama, tanggalMulai, tanggalSelesai, qty, keperluan);
    setOpen(false);
    setJumlah("");
    setTanggalMulai("");
    setTanggalSelesai("");
    setKeperluan("");
    toast.success(`Pengajuan peminjaman ${selectedFasilitas.nama} berhasil dikirim ke RT.`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent p-5 space-y-6">
      <div className="bg-white/40 backdrop-blur-xl p-6 rounded-[2rem] border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mt-2">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 mb-4">
          <Tent className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Peminjaman Fasilitas</h2>
        <p className="text-sm text-slate-600 mt-1 font-medium">Pinjam fasilitas inventaris RT untuk keperluan warga.</p>
      </div>

      <div className="grid gap-3">
        {fasilitasList.map((fasilitas) => (
          <div key={fasilitas.id} className="w-full text-left">
            <Card className="active:scale-95 transition-all duration-300 cursor-pointer border-white/60 bg-white/50 backdrop-blur-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 hover:bg-white/70 rounded-[1.5rem] overflow-hidden" onClick={() => { setSelected(fasilitas.id); setOpen(true); }}>
              <CardContent className="p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-purple-100 to-fuchsia-50 p-3 rounded-xl text-purple-600 shadow-inner">
                      <Tent className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-700">{fasilitas.nama}</span>
                      <p className="text-[11px] font-medium text-slate-500 mt-0.5">{fasilitas.deskripsi}</p>
                    </div>
                  </div>
                  <div className="text-right bg-white/60 px-3 py-2 rounded-xl border border-white">
                    <span className="text-xl font-extrabold text-slate-800">{fasilitas.tersedia}</span>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Tersedia</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md w-[90%] rounded-[2rem] bg-white/95 backdrop-blur-3xl border-white/80 shadow-2xl p-6">
          <DialogHeader className="mb-2">
            <DialogTitle className="text-xl font-extrabold text-slate-800">Pinjam {selectedFasilitas?.nama}</DialogTitle>
            <DialogDescription className="text-sm font-medium text-slate-500 mt-1.5">
              Isi form berikut untuk meminjam inventaris RT. Pastikan tanggal dan jumlah sesuai kebutuhan.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="jumlah" className="font-bold text-slate-700 ml-1">Jumlah Pinjam (Maks: {selectedFasilitas?.tersedia})</Label>
              <Input
                id="jumlah"
                type="number"
                min="1"
                max={selectedFasilitas?.tersedia}
                required
                value={jumlah}
                onChange={(e) => setJumlah(e.target.value)}
                className="bg-slate-50/50 border-slate-200/60 rounded-xl h-12 px-4 shadow-inner focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all font-medium"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="tglMulai" className="font-bold text-slate-700 ml-1">Tanggal Mulai</Label>
                <Input
                  id="tglMulai"
                  type="date"
                  required
                  value={tanggalMulai}
                  onChange={(e) => setTanggalMulai(e.target.value)}
                  className="bg-slate-50/50 border-slate-200/60 rounded-xl h-12 px-4 shadow-inner focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all font-medium text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tglSelesai" className="font-bold text-slate-700 ml-1">Tanggal Selesai</Label>
                <Input
                  id="tglSelesai"
                  type="date"
                  required
                  value={tanggalSelesai}
                  onChange={(e) => setTanggalSelesai(e.target.value)}
                  className="bg-slate-50/50 border-slate-200/60 rounded-xl h-12 px-4 shadow-inner focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all font-medium text-sm"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="keperluan" className="font-bold text-slate-700 ml-1">Keperluan</Label>
              <Input
                id="keperluan"
                placeholder="Contoh: Acara pernikahan"
                required
                value={keperluan}
                onChange={(e) => setKeperluan(e.target.value)}
                className="bg-slate-50/50 border-slate-200/60 rounded-xl h-12 px-4 shadow-inner focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all font-medium"
              />
            </div>
            <DialogFooter className="sm:justify-start pt-2">
              <Button type="submit" className="w-full rounded-xl h-12 font-extrabold text-base bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 shadow-[0_8px_20px_-10px_rgba(147,51,234,0.6)]">Kirim Pengajuan</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="pt-2">
        <h3 className="font-extrabold text-slate-800 mb-4 tracking-tight">Riwayat Peminjaman</h3>
        <div className="space-y-3 pb-12">
          {myPeminjaman.length === 0 && (
            <div className="text-center py-10 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] bg-white/40 backdrop-blur-xl">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-50 to-fuchsia-100 rounded-[1.5rem] flex items-center justify-center mb-4 shadow-inner">
                <Inbox className="w-8 h-8 text-purple-500" />
              </div>
              <p className="text-sm font-extrabold text-slate-800">Belum ada riwayat peminjaman</p>
              <p className="text-[11px] text-slate-500 mt-1 max-w-[16rem] mx-auto leading-relaxed font-medium">Anda belum pernah mengajukan pinjaman fasilitas RT.</p>
            </div>
          )}
          {myPeminjaman.map((p) => {
            const fas = fasilitasList.find(f => f.id === p.fasilitasId);
            const isApproved = p.status === "Disetujui";
            const isFinished = p.status === "Selesai";
            const isRejected = p.status === "Ditolak";
            return (
              <div 
                key={p.id} 
                className="bg-white/60 backdrop-blur-xl p-5 rounded-[1.5rem] border border-white/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col gap-3 transition-all duration-300"
              >
                <div className="flex justify-between items-start w-full">
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{fas?.nama} <span className="text-purple-600 font-extrabold">x{p.jumlah}</span></p>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">{p.tanggalMulai} - {p.tanggalSelesai}</p>
                    <p className="text-xs text-slate-400 mt-2 flex items-center gap-1.5 font-medium bg-white/50 px-2 py-1.5 rounded-lg border border-white shadow-sm inline-flex">
                      <Info className="w-3 h-3 text-purple-500" /> {p.keperluan}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white shadow-sm px-2.5 py-1.5 rounded-full border border-slate-100">
                    {isApproved || isFinished ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : isRejected ? (
                      <XCircle className="w-4 h-4 text-red-500" />
                    ) : (
                      <Clock className="w-4 h-4 text-amber-500" />
                    )}
                    <span className="text-[10px] font-extrabold text-slate-700">
                      {p.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

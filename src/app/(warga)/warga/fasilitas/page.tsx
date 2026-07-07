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
    <div className="flex flex-col min-h-screen bg-transparent p-4 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Peminjaman Fasilitas</h2>
        <p className="text-sm text-slate-500">Pinjam fasilitas inventaris RT untuk keperluan warga.</p>
      </div>

      <div className="grid gap-3">
        {fasilitasList.map((fasilitas) => (
          <div key={fasilitas.id} className="w-full text-left">
            <Card className="active:scale-95 transition-transform cursor-pointer hover:border-purple-200 transition-colors" onClick={() => { setSelected(fasilitas.id); setOpen(true); }}>
              <CardContent className="p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-xl text-purple-600">
                      <Tent className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-700">{fasilitas.nama}</span>
                      <p className="text-xs text-slate-500">{fasilitas.deskripsi}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-extrabold text-slate-800">{fasilitas.tersedia}</span>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Tersedia</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md w-[90%] rounded-xl">
          <DialogHeader>
            <DialogTitle>Pinjam {selectedFasilitas?.nama}</DialogTitle>
            <DialogDescription>
              Isi form berikut untuk meminjam inventaris RT. Pastikan tanggal dan jumlah sesuai kebutuhan.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="jumlah">Jumlah Pinjam (Maks: {selectedFasilitas?.tersedia})</Label>
              <Input
                id="jumlah"
                type="number"
                min="1"
                max={selectedFasilitas?.tersedia}
                required
                value={jumlah}
                onChange={(e) => setJumlah(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="tglMulai">Tanggal Mulai</Label>
                <Input
                  id="tglMulai"
                  type="date"
                  required
                  value={tanggalMulai}
                  onChange={(e) => setTanggalMulai(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tglSelesai">Tanggal Selesai</Label>
                <Input
                  id="tglSelesai"
                  type="date"
                  required
                  value={tanggalSelesai}
                  onChange={(e) => setTanggalSelesai(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="keperluan">Keperluan</Label>
              <Input
                id="keperluan"
                placeholder="Contoh: Acara pernikahan"
                required
                value={keperluan}
                onChange={(e) => setKeperluan(e.target.value)}
              />
            </div>
            <DialogFooter className="sm:justify-start">
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">Kirim Pengajuan</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="pt-4">
        <h3 className="font-semibold text-slate-800 mb-3">Riwayat Peminjaman</h3>
        <div className="space-y-3 pb-12">
          {myPeminjaman.length === 0 && (
            <div className="text-center py-10 border border-dashed rounded-2xl bg-slate-50/60">
              <div className="w-14 h-14 mx-auto bg-purple-50 rounded-2xl flex items-center justify-center mb-3">
                <Inbox className="w-7 h-7 text-purple-400" />
              </div>
              <p className="text-sm font-bold text-slate-700">Belum ada riwayat peminjaman</p>
              <p className="text-xs text-slate-400 mt-1 max-w-[16rem] mx-auto leading-relaxed">Anda belum pernah mengajukan pinjaman fasilitas RT.</p>
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
                className="bg-white p-4 rounded-xl border shadow-sm flex flex-col gap-3"
              >
                <div className="flex justify-between items-start w-full">
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{fas?.nama} <span className="text-purple-600 font-extrabold">x{p.jumlah}</span></p>
                    <p className="text-xs text-slate-500 mt-0.5">{p.tanggalMulai} - {p.tanggalSelesai}</p>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                      <Info className="w-3 h-3" /> {p.keperluan}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-full border">
                    {isApproved || isFinished ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    ) : isRejected ? (
                      <XCircle className="w-3.5 h-3.5 text-red-500" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                    )}
                    <span className="text-[10px] font-semibold text-slate-600">
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

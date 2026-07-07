"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ChevronRight, CheckCircle2, Clock, XCircle, Check, X, Inbox } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useApp } from "@/context/AppContext";

const jenisSurat = [
  "Pengantar KTP",
  "Keterangan Domisili",
  "Keterangan Tidak Mampu",
  "Pengantar SKCK",
  "Surat Keterangan Usaha",
];

export default function WargaSurat() {
  const router = useRouter();
  const { currentUser, suratList, ajukanSurat } = useApp();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [keperluan, setKeperluan] = useState("");
  const [catatan, setCatatan] = useState("");

  const pemohonNama = currentUser ? currentUser.desc.split(",")[0].trim() : "Budi Santoso";
  const mySurat = suratList.filter((s) => s.pemohon === pemohonNama);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;

    ajukanSurat(selected, keperluan, catatan, pemohonNama);
    setOpen(false);
    setKeperluan("");
    setCatatan("");
    toast.success(`Pengajuan ${selected} berhasil dikirim ke RT.`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent p-5 space-y-6">
      <div className="bg-white/40 backdrop-blur-xl p-6 rounded-[2rem] border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mt-2">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 mb-4">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Pengajuan Surat</h2>
        <p className="text-sm text-slate-600 mt-1 font-medium">Pilih jenis surat pengantar yang Anda butuhkan.</p>
      </div>

      <div className="grid gap-3">
        {jenisSurat.map((jenis) => (
          <div key={jenis} className="w-full text-left">
            <Card className="active:scale-95 transition-all duration-300 cursor-pointer border-white/60 bg-white/50 backdrop-blur-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 hover:bg-white/70 rounded-[1.5rem] overflow-hidden" onClick={() => { setSelected(jenis); setOpen(true); }}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-50 p-2.5 rounded-xl text-blue-600 shadow-inner">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-slate-700">{jenis}</span>
                </div>
                <div className="bg-slate-100/50 p-1.5 rounded-full">
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md w-[90%] rounded-[2rem] bg-white/95 backdrop-blur-3xl border-white/80 shadow-2xl p-6">
          <DialogHeader className="mb-2">
            <DialogTitle className="text-xl font-extrabold text-slate-800">Pengajuan {selected}</DialogTitle>
            <DialogDescription className="text-sm font-medium text-slate-500 mt-1.5">
              Mohon lengkapi keperluan pengajuan surat ini. Data diri akan otomatis diisi dari profil Anda.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="keperluan" className="font-bold text-slate-700 ml-1">Keperluan</Label>
              <Input
                id="keperluan"
                required
                placeholder="Contoh: Pembuatan rekening bank"
                value={keperluan}
                onChange={(e) => setKeperluan(e.target.value)}
                className="bg-slate-50/50 border-slate-200/60 rounded-xl h-12 px-4 shadow-inner focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="catatan" className="font-bold text-slate-700 ml-1">Catatan Tambahan (Opsional)</Label>
              <Input
                id="catatan"
                placeholder="Tulis catatan untuk RT..."
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                className="bg-slate-50/50 border-slate-200/60 rounded-xl h-12 px-4 shadow-inner focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              />
            </div>
            <DialogFooter className="sm:justify-start pt-2">
              <Button type="submit" className="w-full rounded-xl h-12 font-extrabold text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-[0_8px_20px_-10px_rgba(37,99,235,0.6)]">Kirim Pengajuan</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="pt-2">
        <h3 className="font-extrabold text-slate-800 mb-4 tracking-tight">Riwayat Pengajuan</h3>
        <div className="space-y-3 pb-12">
          {mySurat.length === 0 && (
            <div className="text-center py-10 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] bg-white/40 backdrop-blur-xl">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 rounded-[1.5rem] flex items-center justify-center mb-4 shadow-inner">
                <Inbox className="w-8 h-8 text-blue-500" />
              </div>
              <p className="text-sm font-extrabold text-slate-800">Belum ada riwayat pengajuan</p>
              <p className="text-[11px] text-slate-500 mt-1 max-w-[16rem] mx-auto leading-relaxed font-medium">Pilih jenis surat di atas untuk mengajukan surat pengantar pertama Anda ke Ketua RT.</p>
            </div>
          )}
          {mySurat.map((surat) => {
            const isApproved = surat.status === "Selesai" || surat.status === "Disetujui";
            const isRejected = surat.status === "Ditolak";
            return (
              <div 
                key={surat.id} 
                className={`bg-white/60 backdrop-blur-xl p-5 rounded-[1.5rem] border border-white/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col gap-3 ${isApproved ? 'cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300' : ''}`}
                onClick={() => isApproved && router.push(`/surat-preview?jenis=${encodeURIComponent(surat.jenis)}&nama=${encodeURIComponent(surat.pemohon)}`)}>

                <div className="flex justify-between items-start w-full">
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{surat.jenis}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{surat.tanggal}</p>
                    {isApproved && (
                      <p className="text-xs text-blue-600 mt-2 font-semibold flex items-center gap-1">
                        <FileText className="w-3 h-3" /> Lihat Surat
                      </p>
                    )}
                    {isRejected && surat.alasanPenolakan && (
                      <p className="text-[11px] text-red-600 mt-2 font-medium bg-red-50/50 border border-red-100 p-2 rounded-lg max-w-[240px] break-words">
                        Alasan: <span className="font-semibold text-red-700">{surat.alasanPenolakan}</span>
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-full border">
                    {isApproved ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    ) : isRejected ? (
                      <XCircle className="w-3.5 h-3.5 text-red-500" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                    )}
                    <span className="text-[10px] font-semibold text-slate-600">
                      {surat.status === "Menunggu" ? "Diproses RT" : surat.status}
                    </span>
                  </div>
                </div>

                {/* Stepper Timeline Status */}
                <div className="mt-1 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] w-full text-slate-400 font-semibold">
                  <div className="flex items-center gap-1">
                    <span className="w-4.5 h-4.5 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[9px] font-bold"><Check className="w-2.5 h-2.5" /></span>
                    <span className="text-slate-800">Diajukan</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-slate-200 mx-2"></div>
                  <div className="flex items-center gap-1">
                    <span className={`w-4.5 h-4.5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                      surat.status !== "Menunggu" ? "bg-emerald-500 text-white" : "bg-blue-600 text-white animate-pulse"
                    }`}>
                      {surat.status !== "Menunggu" ? <Check className="w-2.5 h-2.5" /> : "2"}
                    </span>
                    <span className={surat.status === "Menunggu" ? "text-blue-600 font-bold" : "text-slate-800"}>Proses RT</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-slate-200 mx-2"></div>
                  <div className="flex items-center gap-1">
                    <span className={`w-4.5 h-4.5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                      isApproved ? "bg-emerald-500 text-white" : isRejected ? "bg-red-500 text-white" : "bg-slate-200 text-slate-400"
                    }`}>
                      {isApproved ? <Check className="w-2.5 h-2.5" /> : isRejected ? <X className="w-2.5 h-2.5" /> : "3"}
                    </span>
                    <span className={isApproved ? "text-emerald-600 font-bold" : isRejected ? "text-red-600 font-bold" : "text-slate-400"}>
                      {isRejected ? "Ditolak" : "Selesai"}
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


"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Megaphone, Trash2, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "@/context/AppContext";

export default function AdminPengumuman() {
  const { pengumumanList, tambahPengumuman, hapusPengumuman } = useApp();
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [tipe, setTipe] = useState("Info");

  const handleKirim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul.trim() || !isi.trim()) return;

    tambahPengumuman(judul, isi, tipe);
    setJudul("");
    setIsi("");
    setTipe("Info");
    toast.success("Pengumuman berhasil dipublikasikan!", {
      description: `"${judul}" sudah tampil di aplikasi warga.`,
    });
  };

  const handleHapus = (id: number, judulP: string) => {
    hapusPengumuman(id);
    toast.success(`Pengumuman "${judulP}" telah dihapus.`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Pengumuman & Agenda</h2>
        <p className="text-slate-500">Kelola informasi yang akan ditampilkan di aplikasi warga.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-[#1e293b]/70 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] overflow-hidden">
          <CardHeader className="border-b border-white/50 dark:border-slate-700/50 bg-white/40 dark:bg-slate-800/40">
            <CardTitle className="flex items-center gap-2 font-extrabold text-slate-800 text-lg">
              <Megaphone className="w-5 h-5 text-primary" />
              Buat Pengumuman Baru
            </CardTitle>
          </CardHeader>
          <form onSubmit={handleKirim}>
            <CardContent className="space-y-5 pt-6">
              <div className="space-y-2.5">
                <Label htmlFor="judul" className="font-extrabold text-slate-600 ml-1">Judul Pengumuman</Label>
                <Input
                  id="judul"
                  placeholder="Contoh: Rapat RT Bulanan"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  className="rounded-xl border-white/60 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 shadow-inner h-11 focus-visible:ring-2 focus-visible:ring-primary/50 text-slate-800 font-medium"
                  required
                />
              </div>
              <div className="space-y-2.5">
                <Label htmlFor="tipe" className="font-extrabold text-slate-600 ml-1">Tipe Pengumuman</Label>
                <select
                  id="tipe"
                  value={tipe}
                  onChange={(e) => setTipe(e.target.value)}
                  className="flex h-11 w-full rounded-xl border border-white/60 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 px-3 py-1 text-sm shadow-inner transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 text-slate-800 font-medium"
                >
                  <option value="Info">Info (Warna Hijau)</option>
                  <option value="Agenda">Agenda (Warna Biru)</option>
                  <option value="Penting">Penting (Warna Merah)</option>
                </select>
              </div>
              <div className="space-y-2.5">
                <Label htmlFor="isi" className="font-extrabold text-slate-600 ml-1">Isi Pengumuman</Label>
                <textarea
                  id="isi"
                  className="flex min-h-[140px] w-full rounded-xl border border-white/60 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 px-4 py-3 text-sm shadow-inner placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 text-slate-800 font-medium"
                  placeholder="Tuliskan detail pengumuman..."
                  value={isi}
                  onChange={(e) => setIsi(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="pt-2 pb-6 px-6">
              <Button type="submit" className="w-full gap-2 h-11 rounded-xl bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-blue-700 font-bold shadow-[0_8px_20px_-10px_rgba(59,130,246,0.5)]">
                <CheckCircle className="w-5 h-5" />
                Publikasikan Pengumuman
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="space-y-6">
          {/* Widget Kalender Agenda */}
          {/* Widget Kalender Agenda */}
          <Card className="overflow-hidden border border-white/80 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] bg-white/60 dark:bg-[#1e293b]/70 backdrop-blur-2xl">
            <CardHeader className="pb-2 bg-white/40 dark:bg-slate-800/40 border-b border-white/50 dark:border-slate-700/50">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base text-slate-800 font-extrabold tracking-tight">Kalender Agenda (Juni 2026)</CardTitle>
                <Badge variant="outline" className="bg-blue-50/80 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 border-blue-200/50 text-[10px] uppercase font-black tracking-widest">Agenda Aktif</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4 px-6 pb-6">
              {/* Days Header */}
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-extrabold text-slate-400 mb-2 uppercase tracking-widest">
                <span>Min</span><span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span>
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-semibold">
                <span className="text-slate-300 py-2">31</span>
                {[...Array(30)].map((_, index) => {
                  const day = index + 1;
                  const hasEvent = day === 7 || day === 14;
                  const eventTitle = day === 7
                    ? "Pemadaman Listrik PLN (09:00 - 12:00 WIB)"
                    : day === 14
                      ? "Kerja Bakti Rutin Lingkungan RT (07:00 WIB)"
                      : "";

                  return (
                    <div
                      key={day}
                      className={`py-2 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 ${hasEvent
                          ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-[0_4px_10px_rgba(59,130,246,0.4)] hover:shadow-[0_4px_15px_rgba(59,130,246,0.6)] font-extrabold scale-105"
                          : "hover:bg-white/80 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-300 font-bold"
                        }`}
                      title={eventTitle}
                      onClick={() => {
                        if (hasEvent) {
                          toast.info(`Agenda ${day} Juni 2026:`, { description: eventTitle });
                        } else {
                          toast.message(`Tidak ada agenda pada ${day} Juni 2026.`);
                        }
                      }}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
              <div className="mt-5 flex justify-between items-center text-[10px] font-bold text-slate-500 border-t border-white/60 dark:border-slate-700/50 pt-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded shadow-[0_2px_5px_rgba(59,130,246,0.4)] bg-blue-600 inline-block"></span>
                  <span>Hari H Agenda Lingkungan</span>
                </div>
                <span className="text-slate-400 italic">Klik tanggal biru untuk detail</span>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="text-lg font-extrabold text-slate-800 tracking-tight">Pengumuman & Agenda Aktif ({pengumumanList.length})</h3>
            {pengumumanList.length === 0 && (
              <p className="text-sm text-slate-400 font-bold border border-dashed border-slate-300 rounded-[1.5rem] p-6 text-center bg-white/40">Belum ada pengumuman. Buat pengumuman pertama di sebelah kiri.</p>
            )}
            {pengumumanList.map((p) => (
              <Card key={p.id} className="relative group overflow-hidden border border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-[#1e293b]/70 backdrop-blur-xl shadow-lg rounded-[1.5rem] hover:shadow-xl transition-all duration-300">
                {p.tipe === "Penting" && <div className="h-1.5 bg-gradient-to-r from-red-500 to-rose-500 w-full" />}
                {p.tipe === "Agenda" && <div className="h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 w-full" />}
                {p.tipe === "Info" && <div className="h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 w-full" />}
                <CardHeader className="pb-2 px-5">
                  <div className="flex justify-between items-start pr-6">
                    <CardTitle className="text-base text-slate-800 font-extrabold leading-tight">{p.judul}</CardTitle>
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-md border uppercase tracking-widest shrink-0 ${p.tipe === "Penting" ? "bg-red-50/80 dark:bg-red-900/40 text-red-700 dark:text-red-400 border-red-200/50" :
                        p.tipe === "Agenda" ? "bg-blue-50/80 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 border-blue-200/50" :
                          "bg-emerald-50/80 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 border-emerald-200/50"
                      }`}>
                      {p.tipe || "Info"}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-500 mt-1">{p.tanggal}</p>
                </CardHeader>
                <CardContent className="px-5 pb-5">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed bg-white/40 dark:bg-slate-900/40 p-3 rounded-xl border border-white/60 dark:border-slate-700/50">{p.isi}</p>
                </CardContent>
                <button
                  onClick={() => handleHapus(p.id, p.judul)}
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg"
                  title="Hapus pengumuman"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


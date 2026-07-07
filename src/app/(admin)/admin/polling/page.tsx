"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Clock, Inbox, Plus, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { StaggerContainer, StaggerItem } from "@/components/ui/animated-container";
import { toast } from "sonner";
import { useApp } from "@/context/AppContext";

export default function AdminPolling() {
  const { pollingList, buatPolling } = useApp();
  const [open, setOpen] = useState(false);

  const [pertanyaan, setPertanyaan] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [opsi, setOpsi] = useState<string[]>(["", ""]);
  const [tglBerakhir, setTglBerakhir] = useState("");

  const handleAddOpsi = () => {
    setOpsi([...opsi, ""]);
  };

  const handleRemoveOpsi = (index: number) => {
    if (opsi.length <= 2) return;
    const newOpsi = [...opsi];
    newOpsi.splice(index, 1);
    setOpsi(newOpsi);
  };

  const handleOpsiChange = (index: number, value: string) => {
    const newOpsi = [...opsi];
    newOpsi[index] = value;
    setOpsi(newOpsi);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validOpsi = opsi.filter(o => o.trim() !== "");
    if (validOpsi.length < 2) {
      toast.error("Minimal harus ada 2 opsi yang valid.");
      return;
    }
    
    buatPolling(pertanyaan, deskripsi, validOpsi, tglBerakhir);
    setOpen(false);
    setPertanyaan("");
    setDeskripsi("");
    setOpsi(["", ""]);
    setTglBerakhir("");
    toast.success("Polling baru berhasil dibuat dan diumumkan ke warga.");
  };

  return (
    <StaggerContainer className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-800">Manajemen Polling</h2>
          <p className="text-slate-500 font-medium">Buat e-voting untuk menjaring aspirasi warga.</p>
        </div>
        <Button
          onClick={() => setOpen(true)}
          className="bg-rose-600 hover:bg-rose-700 shadow-lg shadow-rose-600/20 rounded-xl px-6 py-2"
        >
          <Plus className="w-4 h-4 mr-2" /> Buat Polling
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md w-[90%] rounded-xl">
          <DialogHeader>
            <DialogTitle>Buat Polling Baru</DialogTitle>
            <DialogDescription>
              Polling akan langsung muncul di halaman warga.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4 max-h-[60vh] overflow-y-auto px-1">
            <div className="space-y-2">
              <Label htmlFor="pertanyaan">Topik / Pertanyaan</Label>
              <Input
                id="pertanyaan"
                required
                placeholder="Contoh: Pemilihan Ketua RT"
                value={pertanyaan}
                onChange={(e) => setPertanyaan(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deskripsi">Deskripsi</Label>
              <Input
                id="deskripsi"
                required
                placeholder="Tujuan polling ini diadakan..."
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Opsi Jawaban</Label>
              {opsi.map((opt, i) => (
                <div key={i} className="flex gap-2">
                  <Input
                    required
                    placeholder={`Opsi ${i + 1}`}
                    value={opt}
                    onChange={(e) => handleOpsiChange(i, e.target.value)}
                  />
                  {opsi.length > 2 && (
                    <Button type="button" variant="ghost" size="icon" className="text-red-500 shrink-0" onClick={() => handleRemoveOpsi(i)}>
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={handleAddOpsi} className="w-full border-dashed text-slate-500 mt-2">
                <Plus className="w-4 h-4 mr-2" /> Tambah Opsi
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tglBerakhir">Tanggal Berakhir</Label>
              <Input
                id="tglBerakhir"
                type="date"
                required
                value={tglBerakhir}
                onChange={(e) => setTglBerakhir(e.target.value)}
              />
            </div>
            <DialogFooter className="sm:justify-start pt-4">
              <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700">Terbitkan Polling</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="space-y-4">
        {pollingList.length === 0 && (
          <StaggerItem>
            <div className="text-center py-12 border border-dashed rounded-2xl bg-white/50 backdrop-blur-sm">
              <div className="w-16 h-16 mx-auto bg-rose-50 rounded-2xl flex items-center justify-center mb-4 border border-rose-100">
                <Inbox className="w-8 h-8 text-rose-400" />
              </div>
              <p className="text-base font-bold text-slate-700">Belum ada polling</p>
              <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">Klik tombol "Buat Polling" di atas untuk memulai jajak pendapat.</p>
            </div>
          </StaggerItem>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {pollingList.map((polling) => {
            const totalVotes = polling.opsi.reduce((sum, opt) => sum + opt.votes, 0);
            const isClosed = polling.status === "Selesai";

            return (
              <StaggerItem key={polling.id}>
                <Card className="border border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-[#1e293b]/70 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 rounded-[2rem] overflow-hidden h-full flex flex-col group">
                  <CardHeader className="bg-gradient-to-br from-rose-50/80 to-pink-50/80 dark:from-rose-900/30 dark:to-pink-900/30 pb-5 border-b border-rose-100/50 dark:border-rose-900/30">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-extrabold text-slate-800 dark:text-white leading-tight mb-1.5 group-hover:text-rose-700 dark:group-hover:text-rose-400 transition-colors">{polling.pertanyaan}</CardTitle>
                        <p className="text-xs font-medium text-slate-500 line-clamp-2">{polling.deskripsi}</p>
                      </div>
                      <div className="bg-white/80 dark:bg-slate-800/80 p-3 rounded-[1.2rem] shadow-sm text-rose-600 dark:text-rose-400 shrink-0 border border-white dark:border-slate-700 group-hover:scale-110 transition-transform duration-300">
                        <PieChart className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4 bg-white/40 dark:bg-black/20 p-2 rounded-xl">
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest ${isClosed ? 'bg-slate-200/80 dark:bg-slate-700/80 text-slate-600 dark:text-slate-300' : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-sm'}`}>
                          {polling.status}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Berakhir: {polling.tanggalBerakhir}
                        </span>
                      </div>
                      <span className="text-[10px] font-black text-rose-700 dark:text-rose-300 bg-rose-100/80 dark:bg-rose-900/40 px-2.5 py-1 rounded-md border border-rose-200/50">
                        {totalVotes} Suara
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 flex-1 bg-white/30 dark:bg-slate-900/20">
                    <div className="space-y-4">
                      {polling.opsi.map((opt) => {
                        const percentage = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
                        return (
                          <div key={opt.id} className="space-y-2 relative group/opt">
                            <div className="flex justify-between items-center z-10 relative">
                              <span className="font-bold text-sm text-slate-700 dark:text-slate-300">{opt.teks}</span>
                              <span className="text-[11px] font-extrabold text-slate-600 dark:text-slate-400 bg-white/50 dark:bg-slate-800/50 px-2 py-0.5 rounded border border-slate-200/50 dark:border-slate-700/50">{percentage}% ({opt.votes})</span>
                            </div>
                            <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                              <div 
                                className={`h-full rounded-full transition-all duration-1000 ease-out ${percentage >= 50 ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' : percentage > 0 ? 'bg-gradient-to-r from-rose-400 to-rose-500' : 'bg-slate-300 dark:bg-slate-600'}`} 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            );
          })}
        </div>
      </div>
    </StaggerContainer>
  );
}

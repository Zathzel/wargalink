"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Check, X } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function AdminSurat() {
  const router = useRouter();
  const { suratList, updateStatusSurat } = useApp();

  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [selectedSuratId, setSelectedSuratId] = useState<number | null>(null);
  const [alasanInput, setAlasanInput] = useState("");

  const handleApprove = (id: number) => {
    updateStatusSurat(id, "Disetujui");
    toast.success("Surat berhasil disetujui!");
  };

  const triggerReject = (id: number) => {
    setSelectedSuratId(id);
    setAlasanInput("");
    setOpenRejectDialog(true);
  };

  const handleConfirmReject = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSuratId === null || !alasanInput.trim()) return;

    updateStatusSurat(selectedSuratId, "Ditolak", alasanInput);
    setOpenRejectDialog(false);
    setSelectedSuratId(null);
    setAlasanInput("");
    toast.error("Surat ditolak.");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Surat Menyurat</h2>
        <p className="text-slate-500">Daftar pengajuan surat dari warga yang membutuhkan persetujuan.</p>
      </div>

      <Card className="border border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-[#1e293b]/70 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-white/40 dark:bg-slate-800/40 border-b border-white/50 dark:border-slate-700/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[200px] font-extrabold text-slate-700 dark:text-slate-300">Pemohon</TableHead>
                <TableHead className="font-extrabold text-slate-700 dark:text-slate-300">Jenis Surat</TableHead>
                <TableHead className="font-extrabold text-slate-700 dark:text-slate-300">Tanggal Pengajuan</TableHead>
                <TableHead className="font-extrabold text-slate-700 dark:text-slate-300">Status</TableHead>
                <TableHead className="text-right font-extrabold text-slate-700 dark:text-slate-300">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suratList.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-slate-500 font-medium py-8 bg-white/20 dark:bg-slate-900/20">Belum ada pengajuan surat dari warga.</TableCell>
                </TableRow>
              )}
              {suratList.map((surat) => (
                <TableRow key={surat.id} className="border-b border-white/40 dark:border-slate-700/40 hover:bg-white/40 dark:hover:bg-slate-800/40 transition-colors">
                  <TableCell className="font-bold text-slate-800 dark:text-white">{surat.pemohon}</TableCell>
                  <TableCell className="font-medium text-slate-600 dark:text-slate-300">{surat.jenis}</TableCell>
                  <TableCell className="text-slate-500 text-sm font-medium">{surat.tanggal}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md ${
                        surat.status === "Menunggu" || surat.status === "Diproses RT" ? "bg-amber-100/80 dark:bg-amber-900/40 text-amber-800 dark:text-amber-400 border-amber-200/50" :
                          surat.status === "Disetujui" || surat.status === "Selesai" ? "bg-emerald-100/80 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-400 border-emerald-200/50" :
                            "bg-red-100/80 dark:bg-red-900/40 text-red-800 dark:text-red-400 border-red-200/50"
                      }`}
                    >
                      {surat.status === "Menunggu" ? "Diproses RT" : surat.status}
                    </Badge>
                    {surat.status === "Ditolak" && surat.alasanPenolakan && (
                      <p className="text-[10px] text-red-600 dark:text-red-400 mt-1.5 max-w-[200px] break-words bg-red-50/50 dark:bg-red-900/20 p-1.5 rounded-lg border border-red-100 dark:border-red-900/50" title={surat.alasanPenolakan}>
                        Alasan: <strong className="font-extrabold">{surat.alasanPenolakan}</strong>
                      </p>
                    )}
                  </TableCell>
                  <TableCell className="text-right flex justify-end gap-2">
                    <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm transition-all hover:scale-105" title="Preview PDF" onClick={() => router.push(`/surat-preview?jenis=${encodeURIComponent(surat.jenis)}&nama=${encodeURIComponent(surat.pemohon)}`)}>
                      <Eye className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                    </Button>
                    {(surat.status === "Menunggu" || surat.status === "Diproses RT") && (
                      <>
                        <Button variant="default" className="h-9 w-9 bg-emerald-500 hover:bg-emerald-600 shadow-sm shadow-emerald-500/20 rounded-xl transition-all hover:scale-105" size="icon" onClick={() => handleApprove(surat.id)} title="Setujui">
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" className="h-9 w-9 shadow-sm shadow-red-500/20 rounded-xl transition-all hover:scale-105" size="icon" onClick={() => triggerReject(surat.id)} title="Tolak">
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog Rejection Reason */}
      <Dialog open={openRejectDialog} onOpenChange={setOpenRejectDialog}>
        <DialogContent className="sm:max-w-md rounded-2xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-800">Alasan Penolakan Surat</DialogTitle>
            <DialogDescription>
              Silakan tuliskan alasan kenapa pengajuan surat ini ditolak agar warga dapat memahaminya.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleConfirmReject} className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="alasan">Alasan Penolakan</Label>
              <Input
                id="alasan"
                required
                placeholder="Contoh: Lampiran berkas KK kurang jelas / NIK salah"
                value={alasanInput}
                onChange={(e) => setAlasanInput(e.target.value)}
              />
            </div>
            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" className="rounded-xl" onClick={() => setOpenRejectDialog(false)}>Batal</Button>
              <Button type="submit" variant="destructive" className="rounded-xl">Tolak Surat</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

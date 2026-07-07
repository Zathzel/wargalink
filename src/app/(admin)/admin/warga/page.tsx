"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Plus, User, Phone, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useApp, Warga } from "@/context/AppContext";
import { Download, Edit, Trash2 } from "lucide-react";

export default function AdminWarga() {
  const { daftarWarga, tambahWarga, updateWarga, hapusWarga } = useApp();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRT, setFilterRT] = useState("all");
  const [openDetail, setOpenDetail] = useState<{ open: boolean; warga: Warga | null }>({ open: false, warga: null });
  const [openTambah, setOpenTambah] = useState(false);
  const [openEdit, setOpenEdit] = useState<{ open: boolean; warga: Warga | null }>({ open: false, warga: null });

  // Form states
  const [namaKK, setNamaKK] = useState("");
  const [nikKK, setNikKK] = useState("");
  const [alamatKK, setAlamatKK] = useState("");
  const [phoneKK, setPhoneKK] = useState("");
  const [rtKK, setRtKK] = useState("01");
  const [statusKK, setStatusKK] = useState("Tetap");

  // Edit states
  const [editNama, setEditNama] = useState("");
  const [editNIK, setEditNIK] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editRT, setEditRT] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAlamat, setEditAlamat] = useState("");
  const [editKK, setEditKK] = useState("");

  const filtered = daftarWarga.filter(
    (w) =>
      (w.nama.toLowerCase().includes(search.toLowerCase()) || w.nik.includes(search)) &&
      (filterStatus === "all" || w.status === filterStatus) &&
      (filterRT === "all" || w.rt === filterRT)
  );

  const getAnggotaKeluarga = (w: Warga) => {
    return daftarWarga.filter((member) => member.kk === w.kk && member.id !== w.id);
  };

  const handleTambah = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaKK || !nikKK || !alamatKK || !phoneKK) return;

    tambahWarga({
      kk: nikKK.substring(0, 16),
      nama: namaKK,
      nik: nikKK,
      status: statusKK,
      rt: rtKK,
      phone: phoneKK,
      alamat: alamatKK,
    });

    setOpenTambah(false);
    setNamaKK("");
    setNikKK("");
    setAlamatKK("");
    setPhoneKK("");
    setRtKK("01");
    setStatusKK("Tetap");
    toast.success("Data warga baru berhasil ditambahkan ke sistem.");
  };

  const startEdit = (warga: Warga) => {
    setEditNama(warga.nama);
    setEditNIK(warga.nik);
    setEditStatus(warga.status);
    setEditRT(warga.rt);
    setEditPhone(warga.phone);
    setEditAlamat(warga.alamat);
    setEditKK(warga.kk);
    setOpenEdit({ open: true, warga });
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!openEdit.warga) return;
    updateWarga(openEdit.warga.id, {
      nama: editNama,
      nik: editNIK,
      status: editStatus,
      rt: editRT,
      phone: editPhone,
      alamat: editAlamat,
      kk: editKK,
    });
    setOpenEdit({ open: false, warga: null });
    toast.success("Data warga berhasil diperbarui.");
  };

  const handleDeleteWarga = (id: number, nama: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus data warga ${nama}?`)) {
      hapusWarga(id);
      toast.success(`Data warga ${nama} berhasil dihapus.`);
    }
  };

  const handleExportCSV = () => {
    if (filtered.length === 0) {
      toast.warning("Tidak ada data untuk diekspor.");
      return;
    }
    const headers = ["Nama Lengkap", "No. KK", "NIK", "RT", "Status Domisili", "No. Telepon", "Alamat"];
    const rows = filtered.map((w) => [
      w.nama,
      w.kk,
      w.nik,
      w.rt,
      w.status,
      w.phone,
      w.alamat
    ]);
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF"
      + [headers.join(","), ...rows.map((row) => row.map((val) => `"${val}"`).join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Data_Warga_RT_${filterRT}_Status_${filterStatus}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Data warga berhasil diekspor ke CSV!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Data Warga</h2>
          <p className="text-slate-500">Kelola daftar warga berdasarkan Kartu Keluarga (KK).</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2 rounded-xl border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm transition-all h-10" onClick={handleExportCSV}>
            <Download className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            <span className="font-bold text-slate-700 dark:text-slate-300">Ekspor CSV</span>
          </Button>
          <Button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-blue-700 font-bold shadow-[0_8px_20px_-10px_rgba(59,130,246,0.5)] h-10" onClick={() => setOpenTambah(true)}>
            <Plus className="w-5 h-5" />
            Tambah Warga Baru
          </Button>
        </div>
      </div>

      <Card className="border border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-[#1e293b]/70 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] overflow-hidden">
        <CardHeader className="py-5 border-b border-white/50 dark:border-slate-700/50 bg-white/40 dark:bg-slate-800/40">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center w-full">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Cari nama atau NIK..."
                className="pl-10 h-10 rounded-xl border-white/60 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 shadow-inner focus-visible:ring-2 focus-visible:ring-primary/50 text-slate-800 dark:text-white font-medium"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-4 w-full md:w-auto items-center">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-slate-500 uppercase tracking-widest whitespace-nowrap">Status:</span>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="flex h-10 rounded-xl border border-white/60 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 px-3 py-1 text-sm shadow-inner focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 text-slate-800 font-bold"
                >
                  <option value="all">Semua Status</option>
                  <option value="Tetap">Tetap</option>
                  <option value="Kontrak">Kontrak</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-slate-500 uppercase tracking-widest whitespace-nowrap">RT:</span>
                <select
                  value={filterRT}
                  onChange={(e) => setFilterRT(e.target.value)}
                  className="flex h-10 rounded-xl border border-white/60 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 px-3 py-1 text-sm shadow-inner focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 text-slate-800 font-bold"
                >
                  <option value="all">Semua RT</option>
                  <option value="01">RT 01</option>
                  <option value="02">RT 02</option>
                </select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-white/40 dark:bg-slate-800/40 border-b border-white/50 dark:border-slate-700/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-extrabold text-slate-700 dark:text-slate-300">Nama Lengkap</TableHead>
                <TableHead className="font-extrabold text-slate-700 dark:text-slate-300">No. KK</TableHead>
                <TableHead className="font-extrabold text-slate-700 dark:text-slate-300">NIK</TableHead>
                <TableHead className="font-extrabold text-slate-700 dark:text-slate-300">RT</TableHead>
                <TableHead className="font-extrabold text-slate-700 dark:text-slate-300">Status Domisili</TableHead>
                <TableHead className="text-right font-extrabold text-slate-700 dark:text-slate-300">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((warga) => (
                <TableRow key={warga.id} className="border-b border-white/40 dark:border-slate-700/40 hover:bg-white/40 dark:hover:bg-slate-800/40 transition-colors">
                  <TableCell className="font-black text-slate-800 dark:text-white">{warga.nama}</TableCell>
                  <TableCell className="text-slate-500 dark:text-slate-400 font-mono text-xs font-semibold">{warga.kk}</TableCell>
                  <TableCell className="text-slate-500 dark:text-slate-400 font-mono text-xs font-semibold">{warga.nik}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-slate-100/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border-slate-200/50 dark:border-slate-700/50 font-bold">
                      RT {warga.rt}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={warga.status === "Tetap" ? "bg-emerald-100/80 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-400 hover:bg-emerald-100/80 dark:hover:bg-emerald-900/40 border-0" : "bg-blue-100/80 dark:bg-blue-900/40 text-blue-800 dark:text-blue-400 hover:bg-blue-100/80 dark:hover:bg-blue-900/40 border-0"}>
                      {warga.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary hover:bg-blue-50 dark:hover:bg-blue-900/30 h-9 font-bold rounded-xl transition-all hover:scale-105"
                      onClick={() => setOpenDetail({ open: true, warga })}
                    >
                      Detail
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-amber-600 hover:text-amber-700 h-9 w-9 hover:bg-amber-50 dark:hover:bg-amber-900/30 rounded-xl transition-all hover:scale-105"
                      onClick={() => startEdit(warga)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-600 hover:text-red-700 h-9 w-9 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all hover:scale-105"
                      onClick={() => handleDeleteWarga(warga.id, warga.nama)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-slate-500 font-medium py-8 bg-white/20 dark:bg-slate-900/20">Tidak ada data yang ditemukan.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal Detail Warga */}
      <Dialog open={openDetail.open} onOpenChange={(open) => setOpenDetail({ ...openDetail, open })}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-800">Detail Warga</DialogTitle>
            <DialogDescription>Informasi lengkap data kependudukan.</DialogDescription>
          </DialogHeader>
          {openDetail.warga && (
            <div className="space-y-4 py-2">
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md">
                  {openDetail.warga.nama.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-lg text-slate-800">{openDetail.warga.nama}</p>
                  <Badge variant={openDetail.warga.status === "Tetap" ? "default" : "secondary"} className="mt-1">{openDetail.warga.status}</Badge>
                </div>
              </div>
              <div className="space-y-3 px-1">
                <div className="flex items-start gap-3 text-sm">
                  <User className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500 font-medium">NIK</p>
                    <p className="font-semibold text-slate-800 font-mono">{openDetail.warga.nik}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Alamat</p>
                    <p className="font-semibold text-slate-800">{openDetail.warga.alamat}, RT {openDetail.warga.rt} / RW 05</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <Phone className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500 font-medium">No. Telepon</p>
                    <p className="font-semibold text-slate-800">{openDetail.warga.phone}</p>
                  </div>
                </div>
              </div>

              {/* Anggota Keluarga (1 KK) */}
              <div className="border-t pt-4 mt-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Anggota Keluarga (1 KK)</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <p className="text-sm font-bold text-slate-800">{openDetail.warga.nama}</p>
                      <p className="text-[10px] text-slate-500 font-mono">{openDetail.warga.nik}</p>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                      Kepala Keluarga
                    </Badge>
                  </div>
                  {getAnggotaKeluarga(openDetail.warga).map((m) => {
                    const isIstri = m.nama.includes("Siti") || m.nama.includes("Dewi") || m.nama.includes("Aminah");
                    const hubungan = isIstri ? "Istri" : "Anak / Anggota";
                    return (
                      <div key={m.id} className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                        <div>
                          <p className="text-sm font-bold text-slate-800">{m.nama}</p>
                          <p className="text-[10px] text-slate-500 font-mono">{m.nik}</p>
                        </div>
                        <Badge variant="outline" className="bg-slate-100 text-slate-700 text-xs">
                          {hubungan}
                        </Badge>
                      </div>
                    );
                  })}
                  {getAnggotaKeluarga(openDetail.warga).length === 0 && (
                    <p className="text-xs text-slate-400 italic">Tidak ada anggota keluarga lain yang terdaftar dalam KK ini.</p>
                  )}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" className="rounded-xl" onClick={() => setOpenDetail({ open: false, warga: null })}>Tutup</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Tambah KK */}
      <Dialog open={openTambah} onOpenChange={setOpenTambah}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-800">Tambah KK Baru</DialogTitle>
            <DialogDescription>Isi data kepala keluarga untuk mendaftarkan warga baru.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleTambah} className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="nama-kk">Nama Kepala Keluarga</Label>
              <Input
                id="nama-kk"
                required
                placeholder="Contoh: Joko Widodo"
                value={namaKK}
                onChange={(e) => setNamaKK(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nik-kk">NIK Kepala Keluarga</Label>
              <Input
                id="nik-kk"
                required
                placeholder="16 digit NIK"
                maxLength={16}
                className="font-mono"
                value={nikKK}
                onChange={(e) => setNikKK(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="alamat-kk">Alamat Rumah</Label>
              <Input
                id="alamat-kk"
                required
                placeholder="Contoh: Jl. Merdeka No. 99"
                value={alamatKK}
                onChange={(e) => setAlamatKK(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone-kk">Nomor HP</Label>
              <Input
                id="phone-kk"
                required
                placeholder="08xxxxxxxxxx"
                value={phoneKK}
                onChange={(e) => setPhoneKK(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rt-kk">Rukun Tetangga (RT)</Label>
                <select
                  id="rt-kk"
                  value={rtKK}
                  onChange={(e) => setRtKK(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-slate-800"
                >
                  <option value="01">RT 01</option>
                  <option value="02">RT 02</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status-kk">Status Domisili</Label>
                <select
                  id="status-kk"
                  value={statusKK}
                  onChange={(e) => setStatusKK(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-slate-800"
                >
                  <option value="Tetap">Tetap</option>
                  <option value="Kontrak">Kontrak</option>
                </select>
              </div>
            </div>
            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" className="rounded-xl" onClick={() => setOpenTambah(false)}>Batal</Button>
              <Button type="submit" className="rounded-xl">Simpan Data</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal Edit Warga */}
      <Dialog open={openEdit.open} onOpenChange={(open) => setOpenEdit({ ...openEdit, open })}>
        <DialogContent className="sm:max-w-md rounded-2xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-800">Ubah Data Warga</DialogTitle>
            <DialogDescription>Perbarui informasi kependudukan warga.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveEdit} className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="edit-nama">Nama Warga</Label>
              <Input
                id="edit-nama"
                required
                value={editNama}
                onChange={(e) => setEditNama(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-nik">NIK</Label>
              <Input
                id="edit-nik"
                required
                maxLength={16}
                className="font-mono"
                value={editNIK}
                onChange={(e) => setEditNIK(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-kk">Nomor KK</Label>
              <Input
                id="edit-kk"
                required
                maxLength={16}
                className="font-mono"
                value={editKK}
                onChange={(e) => setEditKK(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-alamat">Alamat Rumah</Label>
              <Input
                id="edit-alamat"
                required
                value={editAlamat}
                onChange={(e) => setEditAlamat(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-phone">Nomor HP</Label>
              <Input
                id="edit-phone"
                required
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-rt">RT</Label>
                <select
                  id="edit-rt"
                  value={editRT}
                  onChange={(e) => setEditRT(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-slate-800"
                >
                  <option value="01">RT 01</option>
                  <option value="02">RT 02</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status Domisili</Label>
                <select
                  id="edit-status"
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-slate-800"
                >
                  <option value="Tetap">Tetap</option>
                  <option value="Kontrak">Kontrak</option>
                </select>
              </div>
            </div>
            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" className="rounded-xl" onClick={() => setOpenEdit({ open: false, warga: null })}>Batal</Button>
              <Button type="submit" className="rounded-xl">Simpan Perubahan</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}


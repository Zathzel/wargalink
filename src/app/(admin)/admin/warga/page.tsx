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

export default function AdminWarga() {
  const { daftarWarga, tambahWarga } = useApp();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRT, setFilterRT] = useState("all");
  const [openDetail, setOpenDetail] = useState<{ open: boolean; warga: Warga | null }>({ open: false, warga: null });
  const [openTambah, setOpenTambah] = useState(false);

  // Form states
  const [namaKK, setNamaKK] = useState("");
  const [nikKK, setNikKK] = useState("");
  const [alamatKK, setAlamatKK] = useState("");
  const [phoneKK, setPhoneKK] = useState("");

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
      status: "Tetap",
      rt: "01",
      phone: phoneKK,
      alamat: alamatKK,
    });

    setOpenTambah(false);
    setNamaKK("");
    setNikKK("");
    setAlamatKK("");
    setPhoneKK("");
    toast.success("Data KK baru berhasil ditambahkan ke sistem.");
  };

  const handleFilter = () => {
    toast.info("Fitur filter lanjutan akan segera tersedia.", { description: "Saat ini Anda dapat menggunakan kolom pencarian di atas." });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Data Warga</h2>
          <p className="text-slate-500">Kelola daftar warga berdasarkan Kartu Keluarga (KK).</p>
        </div>
        <Button className="flex items-center gap-2" onClick={() => setOpenTambah(true)}>
          <Plus className="w-4 h-4" />
          Tambah KK Baru
        </Button>
      </div>

      <Card>
        <CardHeader className="py-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center w-full">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Cari nama atau NIK..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-3 w-full md:w-auto items-center">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Status:</span>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="flex h-9 rounded-md border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-slate-800"
                >
                  <option value="all">Semua Status</option>
                  <option value="Tetap">Tetap</option>
                  <option value="Kontrak">Kontrak</option>
                </select>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">RT:</span>
                <select
                  value={filterRT}
                  onChange={(e) => setFilterRT(e.target.value)}
                  className="flex h-9 rounded-md border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-slate-800"
                >
                  <option value="all">Semua RT</option>
                  <option value="01">RT 01</option>
                  <option value="02">RT 02</option>
                </select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Lengkap</TableHead>
                <TableHead>No. KK</TableHead>
                <TableHead>NIK</TableHead>
                <TableHead>RT</TableHead>
                <TableHead>Status Domisili</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((warga) => (
                <TableRow key={warga.id}>
                  <TableCell className="font-medium">{warga.nama}</TableCell>
                  <TableCell className="text-slate-500">{warga.kk}</TableCell>
                  <TableCell className="text-slate-500">{warga.nik}</TableCell>
                  <TableCell>RT {warga.rt}</TableCell>
                  <TableCell>
                    <Badge variant={warga.status === "Tetap" ? "default" : "secondary"}>
                      {warga.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary/80"
                      onClick={() => setOpenDetail({ open: true, warga })}
                    >
                      Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-slate-500 py-8">Tidak ada data yang ditemukan.</TableCell>
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
            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" className="rounded-xl" onClick={() => setOpenTambah(false)}>Batal</Button>
              <Button type="submit" className="rounded-xl">Simpan Data</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}


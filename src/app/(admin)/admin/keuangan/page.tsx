"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { toast } from "sonner";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Check, X, Wallet, ArrowUpRight, ArrowDownRight, Settings, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function AdminKeuangan() {
  const {
    nominalIuran,
    iuranAktif,
    setIuranAktif,
    setNominalIuran,
    tagihanList,
    verifikasiIuran,
    transaksiBulanan,
    transaksiList,
    pemasukanManual,
    pengeluaranManual
  } = useApp();

  // Settings & manual transaction state
  const [tarifInput, setTarifInput] = useState(nominalIuran.toString());
  const [selectedBukti, setSelectedBukti] = useState<{ open: boolean; tagihan: any | null }>({ open: false, tagihan: null });
  
  const [txTipe, setTxTipe] = useState("pemasukan");
  const [txNominal, setTxNominal] = useState("");
  const [txKeterangan, setTxKeterangan] = useState("");

  // Calculate dynamic totals
  const baseSaldo = 12000000;
  const totalPemasukan = transaksiBulanan.reduce((sum, t) => sum + t.pemasukan, 0);
  const totalPengeluaran = transaksiBulanan.reduce((sum, t) => sum + t.pengeluaran, 0);
  const saldoKas = baseSaldo + totalPemasukan - totalPengeluaran;

  const juniPemasukan = transaksiBulanan.find((t) => t.name === "Jun")?.pemasukan || 0;
  const juniPengeluaran = transaksiBulanan.find((t) => t.name === "Jun")?.pengeluaran || 0;

  // Filter bills
  const tagihanMenunggu = tagihanList.filter((t) => t.status === "Menunggu Verifikasi");
  const tagihanLain = tagihanList.filter((t) => t.status !== "Menunggu Verifikasi");

  const handleUpdateTarif = (e: React.FormEvent) => {
    e.preventDefault();
    const nominal = parseInt(tarifInput);
    if (isNaN(nominal) || nominal <= 0) {
      toast.error("Tarif iuran harus berupa angka positif.");
      return;
    }
    setNominalIuran(nominal);
    toast.success(`Tarif iuran bulanan berhasil diubah menjadi Rp ${nominal.toLocaleString("id-ID")}`);
  };

  const handleVerifikasi = (id: number, status: "Lunas" | "Belum", nama: string) => {
    verifikasiIuran(id, status);
    if (status === "Lunas") {
      toast.success(`Pembayaran iuran dari ${nama} telah disetujui! Pemasukan kas bertambah.`);
    } else {
      toast.error(`Pembayaran dari ${nama} ditolak.`);
    }
  };

  const handleCatatTransaksi = (e: React.FormEvent) => {
    e.preventDefault();
    const nominal = parseInt(txNominal);
    if (isNaN(nominal) || nominal <= 0) {
      toast.error("Nominal transaksi harus berupa angka positif.");
      return;
    }
    if (!txKeterangan.trim()) {
      toast.error("Keterangan transaksi wajib diisi.");
      return;
    }

    if (txTipe === "pemasukan") {
      pemasukanManual(nominal, txKeterangan);
      toast.success(`Berhasil mencatat pemasukan baru: Rp ${nominal.toLocaleString("id-ID")}`);
    } else {
      pengeluaranManual(nominal, txKeterangan);
      toast.success(`Berhasil mencatat pengeluaran baru: Rp ${nominal.toLocaleString("id-ID")}`);
    }

    setTxNominal("");
    setTxKeterangan("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Iuran & Keuangan</h2>
        <p className="text-slate-500">Ringkasan buku kas, verifikasi iuran warga, dan pengaturan anggaran.</p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-emerald-50 border-emerald-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-emerald-800">Total Pemasukan (Bulan Ini)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900">Rp {juniPemasukan.toLocaleString("id-ID")}</div>
          </CardContent>
        </Card>
        <Card className="bg-red-50 border-red-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-800">Total Pengeluaran (Bulan Ini)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">Rp {juniPengeluaran.toLocaleString("id-ID")}</div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Saldo Kas RT</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">Rp {saldoKas.toLocaleString("id-ID")}</div>
          </CardContent>
        </Card>
      </div>

      {/* Control Panel: Set Tarif & Catat Manual */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Panel Pengaturan Tarif */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-slate-600" />
              Atur Tarif Iuran Bulanan
            </CardTitle>
          </CardHeader>
          <form onSubmit={handleUpdateTarif}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tarif">Besaran Iuran Bulanan (Rp)</Label>
                <div className="flex gap-2">
                  <Input
                    id="tarif"
                    type="number"
                    placeholder="Contoh: 50000"
                    value={tarifInput}
                    onChange={(e) => setTarifInput(e.target.value)}
                    required
                  />
                  <Button type="submit" disabled={!iuranAktif}>Simpan</Button>
                </div>
                <p className="text-xs text-slate-400">Tarif iuran yang berlaku saat ini: <strong className="text-slate-700">Rp {nominalIuran.toLocaleString("id-ID")}</strong></p>
              </div>
              <div className="pt-4 border-t mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-semibold text-slate-800">Status Sistem Iuran Bulanan</Label>
                    <p className="text-xs text-slate-400">Aktifkan atau tiadakan kewajiban iuran bulanan warga.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIuranAktif(!iuranAktif)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
                      iuranAktif ? "bg-blue-600" : "bg-slate-200"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        iuranAktif ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
                {!iuranAktif && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 font-medium leading-relaxed flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                    <div>
                      Sistem iuran saat ini <strong>dinonaktifkan oleh RT</strong>. Warga dibebaskan dari kewajiban tagihan bulanan.
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </form>
        </Card>

        {/* Panel Pencatatan Transaksi Manual */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-slate-600" />
              Catat Pengeluaran & Pemasukan Manual
            </CardTitle>
          </CardHeader>
          <form onSubmit={handleCatatTransaksi}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipe">Tipe</Label>
                  <select
                    id="tipe"
                    value={txTipe}
                    onChange={(e) => setTxTipe(e.target.value)}
                    className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-slate-800"
                  >
                    <option value="pemasukan">Kas Masuk</option>
                    <option value="pengeluaran">Kas Keluar</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nominal">Nominal (Rp)</Label>
                  <Input
                    id="nominal"
                    type="number"
                    placeholder="Nominal"
                    value={txNominal}
                    onChange={(e) => setTxNominal(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="keterangan">Keterangan / Keperluan</Label>
                <div className="flex gap-2">
                  <Input
                    id="keterangan"
                    placeholder="Contoh: Pembelian sapu lidi, Iuran sumbangan warga"
                    value={txKeterangan}
                    onChange={(e) => setTxKeterangan(e.target.value)}
                    required
                  />
                  <Button type="submit" variant="outline" className="border-slate-300">Catat</Button>
                </div>
              </div>
            </CardContent>
          </form>
        </Card>
      </div>

      {/* Verification Queue (Bukti Transfer) */}
      <Card className="border-amber-200 shadow-amber-900/5 shadow-md">
        <CardHeader className="bg-amber-50/50 py-4 flex flex-row justify-between items-center">
          <div>
            <CardTitle className="text-amber-800 font-bold">Verifikasi Pembayaran Iuran</CardTitle>
            <p className="text-xs text-amber-600 font-medium">Pembayaran baru dari warga yang membutuhkan konfirmasi manual RT.</p>
          </div>
          <Badge className="bg-amber-100 text-amber-800 border-amber-200" variant="outline">
            {tagihanMenunggu.length} Pending
          </Badge>
        </CardHeader>
        <CardContent className="p-0">
          {iuranAktif ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama (KK)</TableHead>
                  <TableHead>Periode</TableHead>
                  <TableHead>Nominal</TableHead>
                  <TableHead>Bukti Bayar</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tagihanMenunggu.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-slate-400 py-8 text-sm font-medium">
                      Tidak ada pembayaran iuran yang menunggu verifikasi.
                    </TableCell>
                  </TableRow>
                ) : (
                  tagihanMenunggu.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell className="font-semibold text-slate-800">{t.kk}</TableCell>
                      <TableCell className="text-slate-500">{t.tagihan}</TableCell>
                      <TableCell className="font-bold">Rp {t.nominal.toLocaleString("id-ID")}</TableCell>
                      <TableCell>
                        <span 
                          className="text-xs text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100 font-medium cursor-pointer hover:bg-blue-100 transition-colors" 
                          onClick={() => setSelectedBukti({ open: true, tagihan: t })}
                        >
                          {t.buktiBayar}
                        </span>
                      </TableCell>
                      <TableCell className="text-right flex justify-end gap-2">
                        <Button
                          size="icon"
                          className="bg-emerald-600 hover:bg-emerald-700 h-8 w-8"
                          onClick={() => handleVerifikasi(t.id, "Lunas", t.kk)}
                          title="Setujui Pembayaran"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="destructive"
                          className="h-8 w-8"
                          onClick={() => handleVerifikasi(t.id, "Belum", t.kk)}
                          title="Tolak Pembayaran"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center text-slate-400 py-10 px-4 bg-slate-50/50">
              <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="font-bold text-slate-600">Persetujuan Iuran Ditangguhkan</p>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Sistem iuran saat ini sedang dinonaktifkan oleh RT. Warga dibebaskan dari pembayaran iuran bulan ini.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Arus Kas Chart & Warga Bills List */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Arus Kas (6 Bulan Terakhir)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={transaksiBulanan}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `Rp${value / 1000}k`} />
                <Tooltip cursor={{ fill: "#f1f5f9" }} formatter={(value: any) => `Rp ${Number(value).toLocaleString("id-ID")}`} />
                <Bar dataKey="pemasukan" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pengeluaran" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status Tagihan Iuran Warga (Juni 2026)</CardTitle>
          </CardHeader>
          <CardContent className="p-0 max-h-[300px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama (KK)</TableHead>
                  <TableHead>Nominal</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {iuranAktif ? (
                  tagihanLain.map((tagihan) => (
                    <TableRow key={tagihan.id}>
                      <TableCell className="font-medium">{tagihan.kk}</TableCell>
                      <TableCell>Rp {tagihan.nominal.toLocaleString("id-ID")}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            tagihan.status === "Lunas"
                              ? "bg-emerald-100 text-emerald-800 border-transparent font-bold"
                              : "bg-red-100 text-red-800 border-transparent font-bold"
                          }
                        >
                          {tagihan.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  tagihanLain.map((tagihan) => (
                    <TableRow key={tagihan.id} className="bg-slate-50/20">
                      <TableCell className="font-semibold text-slate-500">{tagihan.kk}</TableCell>
                      <TableCell className="text-slate-400">Rp {tagihan.nominal.toLocaleString("id-ID")}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-slate-100 text-slate-500 border-transparent font-extrabold uppercase tracking-wide text-[10px]"
                        >
                          DITIADAKAN
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Riwayat Transaksi Buku Kas RT */}
      <Card className="border border-slate-200/80 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-800">Riwayat Transaksi Buku Kas RT</CardTitle>
          <p className="text-xs text-slate-500 font-medium">Log historis pencatatan kas masuk dan kas keluar lingkungan RT.</p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-[350px] overflow-y-auto">
            <Table>
              <TableHeader className="bg-slate-50/50 sticky top-0 backdrop-blur-sm z-10">
                <TableRow>
                  <TableHead className="w-[180px]">Tanggal & Waktu</TableHead>
                  <TableHead>Keterangan Transaksi</TableHead>
                  <TableHead className="w-[120px]">Tipe</TableHead>
                  <TableHead className="text-right w-[150px]">Nominal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transaksiList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-slate-400 py-8 text-sm font-medium">
                      Belum ada riwayat transaksi kas.
                    </TableCell>
                  </TableRow>
                ) : (
                  transaksiList.map((tx) => (
                    <TableRow key={tx.id} className="hover:bg-slate-50/50">
                      <TableCell className="text-xs font-medium text-slate-500">{tx.tanggal}</TableCell>
                      <TableCell className="text-sm font-semibold text-slate-800">{tx.keterangan}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            tx.tipe === "pemasukan"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200 font-bold"
                              : "bg-red-50 text-red-700 border-red-200 font-bold"
                          }
                        >
                          {tx.tipe === "pemasukan" ? "Masuk" : "Keluar"}
                        </Badge>
                      </TableCell>
                      <TableCell className={`text-right font-extrabold ${tx.tipe === "pemasukan" ? "text-emerald-600" : "text-red-600"}`}>
                        {tx.tipe === "pemasukan" ? "+" : "-"} Rp {tx.nominal.toLocaleString("id-ID")}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Dialog Preview Bukti Transfer */}
      <Dialog open={selectedBukti.open} onOpenChange={(open) => setSelectedBukti({ ...selectedBukti, open })}>
        <DialogContent className="sm:max-w-md rounded-2xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-800">Bukti Pembayaran Iuran</DialogTitle>
            <DialogDescription>
              Detail transaksi transfer bank yang dikirimkan warga.
            </DialogDescription>
          </DialogHeader>
          
          {selectedBukti.tagihan && (
            <div className="py-2">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 font-sans relative overflow-hidden text-slate-800 shadow-inner">
                {/* Header Struk */}
                <div className="text-center pb-4 border-b border-dashed border-slate-200">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full font-bold text-lg mb-2 shadow">
                    WL
                  </div>
                  <h4 className="font-extrabold text-base tracking-tight">WargaLink Pay</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Bukti Transfer Sukses</p>
                </div>
                
                {/* Details */}
                <div className="py-4 space-y-3.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-semibold">Pengirim (Warga)</span>
                    <span className="font-bold text-slate-800">{selectedBukti.tagihan.kk}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-semibold">Periode Tagihan</span>
                    <span className="font-bold text-slate-800">{selectedBukti.tagihan.tagihan}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-semibold">Bank Tujuan</span>
                    <span className="font-bold text-slate-800">Bank Mandiri (RT 01 Kas)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-semibold">Nomor Referensi</span>
                    <span className="font-mono font-bold text-slate-700">WL-TX-92847104</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-semibold">Metode Pembayaran</span>
                    <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 uppercase tracking-wider text-[9px]">QRIS Mobile-Banking</span>
                  </div>
                  <div className="border-t border-dashed border-slate-200 pt-3 flex justify-between items-center">
                    <span className="text-slate-600 font-extrabold text-sm">Total Transfer</span>
                    <span className="font-black text-slate-900 text-lg">Rp {selectedBukti.tagihan.nominal.toLocaleString("id-ID")}</span>
                  </div>
                </div>

                {/* Stempel Bulat Berhasil */}
                <div className="absolute bottom-2 right-4 w-20 h-20 border-4 border-emerald-500/30 rounded-full flex items-center justify-center font-bold text-emerald-500/40 text-[9px] uppercase tracking-widest transform rotate-12 select-none pointer-events-none">
                  Lunas RT
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-end gap-2 pt-2">
            <Button 
              variant="outline" 
              className="rounded-xl w-full" 
              onClick={() => setSelectedBukti({ open: false, tagihan: null })}
            >
              Tutup
            </Button>
            {selectedBukti.tagihan && selectedBukti.tagihan.status === "Menunggu Verifikasi" && (
              <Button 
                className="bg-emerald-600 hover:bg-emerald-700 rounded-xl w-full"
                onClick={() => {
                  handleVerifikasi(selectedBukti.tagihan.id, "Lunas", selectedBukti.tagihan.kk);
                  setSelectedBukti({ open: false, tagihan: null });
                }}
              >
                Setujui & Verifikasi
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

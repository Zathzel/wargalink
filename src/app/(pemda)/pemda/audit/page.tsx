"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

const auditLogs = [
  { id: 1, user: "Budi Santoso (RT 01)", aksi: "Approve Surat Pengantar", waktu: "15 Jun 2026, 08:30 WIB", level: "Info", ip: "114.122.12.34" },
  { id: 2, user: "Sistem", aksi: "Auto-generate Laporan Bulanan", waktu: "15 Jun 2026, 00:00 WIB", level: "System", ip: "localhost" },
  { id: 3, user: "Admin Pemda", aksi: "Ubah Konfigurasi Wilayah", waktu: "14 Jun 2026, 14:20 WIB", level: "Warning", ip: "192.168.1.5" },
  { id: 4, user: "Ahmad Wijaya (Warga)", aksi: "Login Gagal 3x", waktu: "14 Jun 2026, 10:15 WIB", level: "Danger", ip: "114.122.45.67" },
];

export default function PemdaAuditLog() {
  const [search, setSearch] = useState("");
  const [exportLoading, setExportLoading] = useState(false);

  const filtered = auditLogs.filter(
    (l) =>
      l.user.toLowerCase().includes(search.toLowerCase()) ||
      l.aksi.toLowerCase().includes(search.toLowerCase()) ||
      l.ip.includes(search)
  );

  const handleFilter = () => {
    toast.info("Filter aktif", { description: "Gunakan kotak pencarian untuk menyaring berdasarkan user, aksi, atau IP." });
  };

  const handleExportCSV = () => {
    setExportLoading(true);
    toast.promise(
      new Promise((res) => setTimeout(res, 2000)),
      { loading: "Mengekspor audit log ke CSV...", success: `${filtered.length} entri berhasil diekspor!`, error: "Ekspor gagal." }
    );
    setTimeout(() => setExportLoading(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Audit Log</h2>
          <p className="text-slate-500 dark:text-slate-400 font-bold">Rekam jejak aktivitas sistem dan pengguna (Security & Compliance).</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2 rounded-xl border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm transition-all h-10 font-bold text-slate-700 dark:text-slate-300" onClick={handleFilter}>
            <Filter className="w-4 h-4 text-slate-600 dark:text-slate-400" /> Filter Log
          </Button>
          <Button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 font-bold shadow-[0_8px_20px_-10px_rgba(16,185,129,0.5)] h-10 text-white transition-all hover:scale-105" onClick={handleExportCSV} disabled={exportLoading}>
            {exportLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            Export CSV
          </Button>
        </div>
      </div>

      <Card className="border border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-[#1e293b]/70 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] overflow-hidden relative z-10">
        <CardHeader className="py-5 border-b border-white/50 dark:border-slate-700/50 bg-white/40 dark:bg-slate-800/40">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Cari user, IP, atau aksi..."
              className="pl-10 h-10 rounded-xl border-white/60 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 shadow-inner focus-visible:ring-2 focus-visible:ring-emerald-500/50 text-slate-800 dark:text-white font-medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-white/40 dark:bg-slate-800/40 border-b border-white/50 dark:border-slate-700/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[200px] font-extrabold text-slate-700 dark:text-slate-300">User</TableHead>
                <TableHead className="font-extrabold text-slate-700 dark:text-slate-300">Aktivitas</TableHead>
                <TableHead className="font-extrabold text-slate-700 dark:text-slate-300">Level</TableHead>
                <TableHead className="font-extrabold text-slate-700 dark:text-slate-300">Waktu</TableHead>
                <TableHead className="text-right font-extrabold text-slate-700 dark:text-slate-300">IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((log) => (
                <TableRow key={log.id} className="border-b border-white/40 dark:border-slate-700/40 hover:bg-white/40 dark:hover:bg-slate-800/40 transition-colors">
                  <TableCell className="font-black text-slate-800 dark:text-white">{log.user}</TableCell>
                  <TableCell className="font-bold text-slate-600 dark:text-slate-300">{log.aksi}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`font-black uppercase tracking-widest px-2.5 py-1 rounded-md text-[10px] ${
                        log.level === "System" ? "bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200/50 dark:border-slate-700/50" :
                        log.level === "Info" ? "bg-blue-100/80 dark:bg-blue-900/40 text-blue-800 dark:text-blue-400 border-blue-200/50" :
                        log.level === "Warning" ? "bg-amber-100/80 dark:bg-amber-900/40 text-amber-800 dark:text-amber-400 border-amber-200/50" :
                        "bg-red-100/80 dark:bg-red-900/40 text-red-800 dark:text-red-400 border-red-200/50"
                      }`}
                    >
                      {log.level}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-500 dark:text-slate-400 text-xs font-bold">{log.waktu}</TableCell>
                  <TableCell className="text-right font-mono text-xs font-semibold text-slate-500 dark:text-slate-400">{log.ip}</TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-slate-500 font-medium py-8 bg-white/20 dark:bg-slate-900/20">Tidak ada log yang ditemukan.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

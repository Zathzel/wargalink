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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Audit Log</h2>
          <p className="text-slate-500">Rekam jejak aktivitas sistem dan pengguna (Security & Compliance).</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2" onClick={handleFilter}>
            <Filter className="w-4 h-4" /> Filter Log
          </Button>
          <Button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700" onClick={handleExportCSV} disabled={exportLoading}>
            {exportLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            Export CSV
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="py-4 border-b">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Cari user, IP, atau aksi..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">User</TableHead>
                <TableHead>Aktivitas</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Waktu</TableHead>
                <TableHead className="text-right">IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.user}</TableCell>
                  <TableCell>{log.aksi}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        log.level === "System" ? "bg-slate-100 text-slate-800 border-transparent" :
                        log.level === "Info" ? "bg-blue-100 text-blue-800 border-transparent" :
                        log.level === "Warning" ? "bg-amber-100 text-amber-800 border-transparent" :
                        "bg-red-100 text-red-800 border-transparent"
                      }
                    >
                      {log.level}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm">{log.waktu}</TableCell>
                  <TableCell className="text-right font-mono text-xs text-slate-500">{log.ip}</TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-slate-500 py-8">Tidak ada log yang ditemukan.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

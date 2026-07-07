"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Download, FileText, Loader2, TrendingUp, TrendingDown,
  Users, Wallet, CheckCircle, XCircle, BarChart3, Calendar,
  FileDown, Eye
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { StaggerContainer, StaggerItem } from "@/components/ui/animated-container";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend
} from "recharts";
import { useApp } from "@/context/AppContext";

const MONTH_OPTIONS = [
  { label: "Juni 2026", value: "Jun" },
  { label: "Mei 2026", value: "Mei" },
  { label: "April 2026", value: "Apr" },
];

// Static summary data per month
const MONTHLY_SUMMARY: Record<string, {
  pemasukan: number; pengeluaran: number;
  suratKeluar: number; wargaBaru: number;
  lunas: number; belum: number;
  pengumuman: number;
}> = {
  Jun: { pemasukan: 4500000, pengeluaran: 1200000, suratKeluar: 15, wargaBaru: 4, lunas: 2, belum: 2, pengumuman: 3 },
  Mei: { pemasukan: 4890000, pengeluaran: 2800000, suratKeluar: 20, wargaBaru: 2, lunas: 3, belum: 1, pengumuman: 2 },
  Apr: { pemasukan: 5100000, pengeluaran: 3200000, suratKeluar: 18, wargaBaru: 1, lunas: 4, belum: 0, pengumuman: 4 },
};

const PIE_COLORS = ["#10b981", "#ef4444", "#f59e0b"];

export default function AdminLaporan() {
  const { transaksiBulanan, suratList, tagihanList } = useApp();
  const [loadingIdx, setLoadingIdx] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState("Jun");
  const [activeTab, setActiveTab] = useState("ringkasan");

  const summary = MONTHLY_SUMMARY[selectedMonth];
  const saldo = summary.pemasukan - summary.pengeluaran;
  const selectedLabel = MONTH_OPTIONS.find(m => m.value === selectedMonth)?.label || "";

  // Live data from context (Juni only)
  const liveLunas = tagihanList.filter(t => t.status === "Lunas").length;
  const liveBelum = tagihanList.filter(t => t.status === "Belum" || t.status === "Menunggu Verifikasi").length;
  const liveSuratDisetujui = suratList.filter(s => s.status === "Disetujui" || s.status === "Selesai").length;
  const liveSuratDitolak = suratList.filter(s => s.status === "Ditolak").length;
  const liveSuratPending = suratList.filter(s => s.status === "Menunggu" || s.status === "Diproses RT").length;

  const suratPieData = [
    { name: "Disetujui", value: liveSuratDisetujui || summary.suratKeluar - 3 },
    { name: "Ditolak", value: liveSuratDitolak || 2 },
    { name: "Pending", value: liveSuratPending || 1 },
  ];

  const iuranPieData = [
    { name: "Lunas", value: liveLunas || summary.lunas },
    { name: "Belum Bayar", value: liveBelum || summary.belum },
  ];

  const handleUnduh = (bulan: string, idx: number) => {
    setLoadingIdx(idx);
    toast.promise(
      new Promise((res) => setTimeout(res, 2000)),
      {
        loading: `Membuat laporan ${bulan}...`,
        success: `Laporan ${bulan} berhasil diunduh!`,
        error: "Gagal mengunduh laporan.",
      }
    );
    setTimeout(() => setLoadingIdx(null), 2000);
  };

  const handleGeneratePDF = () => {
    toast.promise(
      new Promise((res) => setTimeout(res, 2500)),
      {
        loading: "Memproses laporan bulanan...",
        success: "Laporan PDF berhasil dibuat!",
        error: "Gagal membuat laporan.",
      }
    );
  };

  return (
    <StaggerContainer className="space-y-6">
      {/* Header */}
      <StaggerItem>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Laporan Bulanan</h2>
            <p className="text-slate-500 text-sm mt-1">Ringkasan aktivitas, keuangan, dan kependudukan RT secara periodik.</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Month Selector */}
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="h-10 px-3 py-2 border border-slate-200 bg-white rounded-xl text-sm font-medium text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {MONTH_OPTIONS.map(m => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
            <Button
              className="bg-primary hover:bg-blue-700 shadow-lg shadow-blue-600/20 rounded-xl gap-2"
              onClick={handleGeneratePDF}
            >
              <FileDown className="w-4 h-4" />
              Unduh PDF
            </Button>
          </div>
        </div>
      </StaggerItem>

      {/* KPI Summary Cards */}
      <StaggerItem>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Total Pemasukan",
              value: `Rp ${summary.pemasukan.toLocaleString("id-ID")}`,
              icon: TrendingUp, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50/80 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-300", icon_bg: "bg-gradient-to-br from-emerald-100 to-teal-50 dark:from-emerald-900/50 dark:to-teal-900/50", border: "border-emerald-200/50 dark:border-emerald-800/30", shadow: "shadow-[0_8px_30px_rgb(16,185,129,0.08)]"
            },
            {
              label: "Total Pengeluaran",
              value: `Rp ${summary.pengeluaran.toLocaleString("id-ID")}`,
              icon: TrendingDown, color: "text-red-600 dark:text-red-400", bg: "bg-red-50/80 dark:bg-red-900/30", text: "text-red-700 dark:text-red-300", icon_bg: "bg-gradient-to-br from-red-100 to-rose-50 dark:from-red-900/50 dark:to-rose-900/50", border: "border-red-200/50 dark:border-red-800/30", shadow: "shadow-[0_8px_30px_rgb(239,68,68,0.08)]"
            },
            {
              label: "Surat Diterbitkan",
              value: `${summary.suratKeluar} Dokumen`,
              icon: FileText, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50/80 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-300", icon_bg: "bg-gradient-to-br from-blue-100 to-indigo-50 dark:from-blue-900/50 dark:to-indigo-900/50", border: "border-blue-200/50 dark:border-blue-800/30", shadow: "shadow-[0_8px_30px_rgb(59,130,246,0.08)]"
            },
            {
              label: "Warga Baru",
              value: `${summary.wargaBaru} Orang`,
              icon: Users, color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50/80 dark:bg-violet-900/30", text: "text-violet-700 dark:text-violet-300", icon_bg: "bg-gradient-to-br from-violet-100 to-purple-50 dark:from-violet-900/50 dark:to-purple-900/50", border: "border-violet-200/50 dark:border-violet-800/30", shadow: "shadow-[0_8px_30px_rgb(139,92,246,0.08)]"
            },
          ].map((kpi) => {
            const Icon = kpi.icon;
            return (
              <Card key={kpi.label} className={`border ${kpi.border} ${kpi.bg} backdrop-blur-2xl ${kpi.shadow} rounded-[2rem]`}>
                <CardContent className="pt-5 pb-4 px-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className={`text-[10px] font-extrabold ${kpi.text} uppercase tracking-widest`}>{kpi.label}</p>
                      <p className="text-xl font-black text-slate-800 dark:text-white mt-1 leading-tight">{kpi.value}</p>
                    </div>
                    <div className={`${kpi.icon_bg} p-3 rounded-[1.2rem] shadow-inner`}>
                      <Icon className={`w-5 h-5 ${kpi.color}`} />
                    </div>
                  </div>
                  <p className={`text-xs ${kpi.text} mt-3 font-bold bg-white/40 dark:bg-black/20 inline-block px-2 py-0.5 rounded-md`}>{selectedLabel}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </StaggerItem>

      {/* Tabs */}
      <StaggerItem>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-slate-100/80 rounded-xl p-1">
            <TabsTrigger value="ringkasan" className="rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <BarChart3 className="w-4 h-4 mr-2" />Ringkasan
            </TabsTrigger>
            <TabsTrigger value="keuangan" className="rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Wallet className="w-4 h-4 mr-2" />Keuangan
            </TabsTrigger>
            <TabsTrigger value="surat" className="rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <FileText className="w-4 h-4 mr-2" />Surat & Iuran
            </TabsTrigger>
          </TabsList>

          {/* Tab: Ringkasan */}
          <TabsContent value="ringkasan" className="mt-6 space-y-6">
            {/* Arus Kas Chart */}
            <Card className="border border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-[#1e293b]/70 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] overflow-hidden">
              <CardHeader className="border-b border-white/50 dark:border-slate-700/50 bg-white/40 dark:bg-slate-800/40">
                <CardTitle className="font-extrabold text-slate-800 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Arus Kas 6 Bulan Terakhir
                </CardTitle>
                <CardDescription className="font-medium">Perbandingan pemasukan dan pengeluaran kas RT per bulan</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={transaksiBulanan} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                    <Tooltip
                      cursor={{ fill: "#f8fafc" }}
                      contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "12px" }}
                      formatter={(value: any) => [`Rp ${Number(value).toLocaleString("id-ID")}`, ""]}
                    />
                    <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
                    <Bar dataKey="pemasukan" name="Pemasukan" fill="#10b981" radius={[5, 5, 0, 0]} />
                    <Bar dataKey="pengeluaran" name="Pengeluaran" fill="#ef4444" radius={[5, 5, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Tren Pemasukan Line Chart */}
            <Card className="border border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-[#1e293b]/70 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] overflow-hidden">
              <CardHeader className="border-b border-white/50 dark:border-slate-700/50 bg-white/40 dark:bg-slate-800/40">
                <CardTitle className="font-extrabold text-slate-800 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  Tren Pemasukan Bulanan
                </CardTitle>
                <CardDescription className="font-medium">Perkembangan kas masuk selama 6 bulan terakhir</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={transaksiBulanan}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                    <Tooltip
                      contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "12px" }}
                      formatter={(value: any) => [`Rp ${Number(value).toLocaleString("id-ID")}`, "Pemasukan"]}
                    />
                    <Line
                      type="monotone" dataKey="pemasukan" stroke="#10b981"
                      strokeWidth={2.5} dot={{ r: 4, fill: "#10b981" }}
                      activeDot={{ r: 6, fill: "#059669" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Keuangan */}
          <TabsContent value="keuangan" className="mt-6 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Saldo Summary */}
              <Card className={`border border-${saldo >= 0 ? 'emerald' : 'red'}-200/50 dark:border-${saldo >= 0 ? 'emerald' : 'red'}-800/50 ${saldo >= 0 ? 'bg-emerald-50/80 dark:bg-emerald-900/30' : 'bg-red-50/80 dark:bg-red-900/30'} backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[2rem]`}>
                <CardContent className="pt-8 pb-8 px-8">
                  <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-2">Saldo Bersih {selectedLabel}</p>
                  <p className={`text-4xl font-black ${saldo >= 0 ? "text-emerald-700 dark:text-emerald-400" : "text-red-700 dark:text-red-400"}`}>
                    {saldo >= 0 ? "+" : "-"}Rp {Math.abs(saldo).toLocaleString("id-ID")}
                  </p>
                  <p className="text-xs font-bold text-slate-500 mt-2 bg-white/40 dark:bg-black/20 inline-block px-3 py-1 rounded-md">
                    Pemasukan − Pengeluaran = Saldo bulan {selectedLabel}
                  </p>
                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between text-sm bg-white/40 dark:bg-slate-900/40 px-4 py-2 rounded-xl">
                      <span className="text-slate-600 font-bold">Pemasukan</span>
                      <span className="font-black text-emerald-700 dark:text-emerald-400">+Rp {summary.pemasukan.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between text-sm bg-white/40 dark:bg-slate-900/40 px-4 py-2 rounded-xl">
                      <span className="text-slate-600 font-bold">Pengeluaran</span>
                      <span className="font-black text-red-700 dark:text-red-400">−Rp {summary.pengeluaran.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="border-t border-slate-200/60 dark:border-slate-700/50 pt-4 flex justify-between text-sm font-bold px-2">
                      <span className="text-slate-700 dark:text-slate-300">Selisih</span>
                      <span className={`font-black ${saldo >= 0 ? "text-emerald-700 dark:text-emerald-400" : "text-red-700 dark:text-red-400"}`}>
                        Rp {Math.abs(saldo).toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Status Iuran Pie Chart */}
              <Card className="border border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-[#1e293b]/70 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] overflow-hidden">
                <CardHeader className="pb-2 border-b border-white/50 dark:border-slate-700/50 bg-white/40 dark:bg-slate-800/40">
                  <CardTitle className="text-base font-extrabold text-slate-800">Status Iuran Warga</CardTitle>
                  <CardDescription className="text-xs font-medium">Komposisi warga yang telah/belum membayar iuran</CardDescription>
                </CardHeader>
                <CardContent className="h-[200px] pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={iuranPieData} cx="50%" cy="50%"
                        innerRadius={50} outerRadius={80}
                        paddingAngle={4} dataKey="value"
                      >
                        {iuranPieData.map((_, idx) => (
                          <Cell key={idx} fill={idx === 0 ? "#10b981" : "#ef4444"} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                      <Legend wrapperStyle={{ fontSize: "12px" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Rekap Keuangan Tabel */}
            <Card className="border border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-[#1e293b]/70 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] overflow-hidden">
              <CardHeader className="border-b border-white/50 dark:border-slate-700/50 bg-white/40 dark:bg-slate-800/40">
                <CardTitle className="font-extrabold text-slate-800">Rekap Keuangan {selectedLabel}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {[
                    { label: "Iuran Bulanan Terkumpul", value: `Rp ${(summary.lunas * 50000).toLocaleString("id-ID")}`, badge: "Lunas", badgeColor: "bg-emerald-100/80 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-400 border border-emerald-200/50" },
                    { label: "Donasi & Pemasukan Lain", value: `Rp ${(summary.pemasukan - summary.lunas * 50000).toLocaleString("id-ID")}`, badge: "Non-Iuran", badgeColor: "bg-blue-100/80 dark:bg-blue-900/40 text-blue-800 dark:text-blue-400 border border-blue-200/50" },
                    { label: "Pemeliharaan & Kebersihan", value: `Rp ${Math.round(summary.pengeluaran * 0.6).toLocaleString("id-ID")}`, badge: "Keluar", badgeColor: "bg-red-100/80 dark:bg-red-900/40 text-red-800 dark:text-red-400 border border-red-200/50" },
                    { label: "Kegiatan Sosial RT", value: `Rp ${Math.round(summary.pengeluaran * 0.4).toLocaleString("id-ID")}`, badge: "Keluar", badgeColor: "bg-amber-100/80 dark:bg-amber-900/40 text-amber-800 dark:text-amber-400 border border-amber-200/50" },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between py-3 border-b border-slate-100/50 dark:border-slate-700/50 last:border-0 hover:bg-white/40 dark:hover:bg-slate-800/40 px-4 rounded-xl transition-colors">
                      <span className="text-sm text-slate-600 dark:text-slate-300 font-bold">{row.label}</span>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className={`${row.badgeColor} text-[10px] font-black uppercase tracking-widest`}>{row.badge}</Badge>
                        <span className="text-sm font-black text-slate-800 dark:text-white w-28 text-right">{row.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Surat & Iuran */}
          <TabsContent value="surat" className="mt-6 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Surat Pie Chart */}
              <Card className="border border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-[#1e293b]/70 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] overflow-hidden">
                <CardHeader className="pb-2 border-b border-white/50 dark:border-slate-700/50 bg-white/40 dark:bg-slate-800/40">
                  <CardTitle className="text-base font-extrabold text-slate-800">Status Pengajuan Surat</CardTitle>
                  <CardDescription className="text-xs font-medium">Distribusi pengajuan surat {selectedLabel}</CardDescription>
                </CardHeader>
                <CardContent className="h-[220px] pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={suratPieData} cx="50%" cy="50%"
                        innerRadius={55} outerRadius={85}
                        paddingAngle={4} dataKey="value"
                      >
                        {suratPieData.map((_, idx) => (
                          <Cell key={idx} fill={PIE_COLORS[idx]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                      <Legend wrapperStyle={{ fontSize: "12px" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="space-y-4">
                {[
                  { label: "Surat Disetujui", value: liveSuratDisetujui || summary.suratKeluar - 3, icon: CheckCircle, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50/80 dark:bg-emerald-900/30 border border-emerald-200/50" },
                  { label: "Surat Ditolak", value: liveSuratDitolak || 2, icon: XCircle, color: "text-red-600 dark:text-red-400", bg: "bg-red-50/80 dark:bg-red-900/30 border border-red-200/50" },
                  { label: "Masih Diproses", value: liveSuratPending || 1, icon: Calendar, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50/80 dark:bg-amber-900/30 border border-amber-200/50" },
                  { label: "Warga Lunas Iuran", value: `${liveLunas || summary.lunas} KK`, icon: CheckCircle, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50/80 dark:bg-blue-900/30 border border-blue-200/50" },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className={`flex items-center gap-4 p-4 rounded-[1.5rem] backdrop-blur-xl ${stat.bg}`}>
                      <div className={`p-3 rounded-xl bg-white/80 dark:bg-slate-800/80 shadow-sm`}>
                        <Icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                        <p className="text-2xl font-black text-slate-800 dark:text-white leading-tight">{stat.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </StaggerItem>

      {/* Archive Section */}
      <StaggerItem>
        <Card className="border border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-[#1e293b]/70 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] overflow-hidden">
          <CardHeader className="border-b border-white/50 dark:border-slate-700/50 bg-white/40 dark:bg-slate-800/40">
            <CardTitle className="font-extrabold text-slate-800">Arsip Laporan</CardTitle>
            <CardDescription className="font-medium">Unduh laporan bulanan yang sudah tersimpan dalam sistem</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-3">
              {MONTH_OPTIONS.map((m, idx) => {
                const s = MONTHLY_SUMMARY[m.value];
                return (
                  <div key={m.value} className="border border-white/80 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 rounded-2xl p-5 hover:border-primary/40 hover:shadow-lg transition-all duration-300 group shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-50 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-[1.2rem] group-hover:scale-105 transition-transform duration-300 shadow-inner">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-base font-extrabold text-slate-800 dark:text-white leading-tight">Laporan {m.label}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1 bg-white/50 dark:bg-black/20 inline-block px-2 py-0.5 rounded-md">{idx === 0 ? "Bulan berjalan" : idx === 1 ? "Bulan lalu" : `${idx + 1} bulan lalu`}</p>
                      </div>
                    </div>
                    <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-400 mb-5 bg-white/40 dark:bg-slate-900/40 p-3 rounded-xl border border-white/60 dark:border-slate-700/50">
                      <li className="flex justify-between items-center"><span className="font-semibold text-slate-500">Pemasukan</span> <span className="font-black text-slate-800 dark:text-white">Rp {s.pemasukan.toLocaleString("id-ID")}</span></li>
                      <li className="flex justify-between items-center"><span className="font-semibold text-slate-500">Pengeluaran</span> <span className="font-black text-slate-800 dark:text-white">Rp {s.pengeluaran.toLocaleString("id-ID")}</span></li>
                      <li className="flex justify-between items-center"><span className="font-semibold text-slate-500">Surat</span> <span className="font-black text-slate-800 dark:text-white bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">{s.suratKeluar} dok</span></li>
                    </ul>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 gap-1.5 text-xs font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary border-slate-200/80 dark:border-slate-700/80 h-10"
                        onClick={() => toast.info(`Preview laporan ${m.label}`)}
                      >
                        <Eye className="w-4 h-4" />
                        Lihat
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 gap-1.5 text-xs font-bold bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl shadow-[0_8px_20px_-10px_rgba(59,130,246,0.5)] h-10"
                        onClick={() => handleUnduh(m.label, idx)}
                        disabled={loadingIdx === idx}
                      >
                        {loadingIdx === idx ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Download className="w-4 h-4" />
                        )}
                        {loadingIdx === idx ? "..." : "Unduh"}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </StaggerItem>
    </StaggerContainer>
  );
}

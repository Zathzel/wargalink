"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Building2, Map, Loader2 } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import dynamic from "next/dynamic";
import { StaggerContainer, StaggerItem } from "@/components/ui/animated-container";
import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "@/context/AppContext";

const MapWithNoSSR = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center bg-slate-100 animate-pulse text-sm text-slate-500">Loading Map...</div>,
});

const data = [
  { name: "Jan", aktif: 400, pending: 240 },
  { name: "Feb", aktif: 300, pending: 139 },
  { name: "Mar", aktif: 200, pending: 980 },
  { name: "Apr", aktif: 278, pending: 390 },
  { name: "Mei", aktif: 189, pending: 480 },
  { name: "Jun", aktif: 239, pending: 380 },
];

export default function PemdaDashboard() {
  const { daftarWarga } = useApp();
  const [exportLoading, setExportLoading] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);

  const totalPenduduk = 1234560 + daftarWarga.length;

  const handleExport = () => {
    setExportLoading(true);
    toast.promise(
      new Promise((res) => setTimeout(res, 2000)),
      {
        loading: "Mengekspor data kependudukan...",
        success: "Data berhasil diekspor ke file Excel.",
        error: "Ekspor gagal.",
      }
    );
    setTimeout(() => setExportLoading(false), 2000);
  };

  const handleGenerateLaporan = () => {
    setReportLoading(true);
    toast.promise(
      new Promise((res) => setTimeout(res, 2500)),
      {
        loading: "Membuat laporan kependudukan komprehensif...",
        success: "Laporan berhasil digenerate dan siap diunduh!",
        error: "Gagal membuat laporan.",
      }
    );
    setTimeout(() => setReportLoading(false), 2500);
  };

  return (
    <StaggerContainer className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/50 dark:border-slate-700/50 pb-6 relative">
        <div className="relative z-10">
          <h2 className="text-3xl font-black tracking-tight text-slate-800 dark:text-white">Executive Overview</h2>
          <p className="text-slate-500 dark:text-slate-400 font-bold mt-1">
            Ringkasan data kependudukan dan keaktifan RT/RW seluruh kota.
          </p>
        </div>
        <div className="flex gap-3 relative z-10">
          <button
            onClick={handleExport}
            disabled={exportLoading}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-50/80 dark:hover:bg-slate-700/80 shadow-sm transition-all disabled:opacity-60 hover:scale-105"
          >
            {exportLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            Export Data
          </button>
          <button
            onClick={handleGenerateLaporan}
            disabled={reportLoading}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-teal-600 shadow-[0_8px_20px_-10px_rgba(16,185,129,0.5)] transition-all disabled:opacity-60 hover:scale-105"
          >
            {reportLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            Generate Laporan
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 relative z-10">
        <StaggerItem>
          <Card className="border border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-[#1e293b]/70 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] relative overflow-hidden group hover:-translate-y-2 transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 dark:opacity-5 group-hover:opacity-20 dark:group-hover:opacity-10 transition-opacity group-hover:scale-110 duration-500">
              <Users className="w-24 h-24 text-teal-600 dark:text-teal-400" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Penduduk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-black text-slate-800 dark:text-white tracking-tight">{totalPenduduk.toLocaleString("id-ID")}</div>
              <p className="text-xs font-extrabold text-teal-700 dark:text-teal-400 mt-3 bg-teal-100/50 dark:bg-teal-900/50 inline-block px-3 py-1.5 rounded-lg border border-teal-200/50 dark:border-teal-800/50">
                +0.2% dari bulan lalu
              </p>
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card className="border border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-[#1e293b]/70 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] relative overflow-hidden group hover:-translate-y-2 transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 dark:opacity-5 group-hover:opacity-20 dark:group-hover:opacity-10 transition-opacity group-hover:scale-110 duration-500">
              <Building2 className="w-24 h-24 text-emerald-600 dark:text-emerald-400" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-widest">RT/RW Aktif</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-black text-slate-800 dark:text-white tracking-tight">2.450</div>
              <p className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 mt-3 bg-emerald-100/50 dark:bg-emerald-900/50 inline-block px-3 py-1.5 rounded-lg border border-emerald-200/50 dark:border-emerald-800/50">
                98% terdigitalisasi
              </p>
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card className="border border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-[#1e293b]/70 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] relative overflow-hidden group hover:-translate-y-2 transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 dark:opacity-5 group-hover:opacity-20 dark:group-hover:opacity-10 transition-opacity group-hover:scale-110 duration-500">
              <Map className="w-24 h-24 text-amber-600 dark:text-amber-400" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-widest">Kelurahan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-black text-slate-800 dark:text-white tracking-tight">45</div>
              <p className="text-xs font-extrabold text-amber-700 dark:text-amber-400 mt-3 bg-amber-100/50 dark:bg-amber-900/50 inline-block px-3 py-1.5 rounded-lg border border-amber-200/50 dark:border-amber-800/50">
                Tersebar di 12 Kecamatan
              </p>
            </CardContent>
          </Card>
        </StaggerItem>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 relative z-10">
        <StaggerItem className="col-span-4">
          <Card className="h-full border border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-[#1e293b]/70 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem]">
            <CardHeader className="pb-4">
              <CardTitle className="font-black text-slate-800 dark:text-white">Tren Penggunaan Aplikasi Warga</CardTitle>
              <CardDescription className="font-bold text-slate-500">Aktivitas bulanan warga menggunakan layanan kependudukan & surat pengantar.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tick={{ fontWeight: 'bold' }} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} tick={{ fontWeight: 'bold' }} />
                  <Tooltip cursor={{fill: 'rgba(148,163,184,0.1)'}} contentStyle={{borderRadius: '16px', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)', backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', fontWeight: 'bold'}} />
                  <Bar dataKey="aktif" fill="#10b981" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="pending" fill="#94a3b8" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </StaggerItem>
        
        <StaggerItem className="col-span-3">
          <Card className="h-full flex flex-col border border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-[#1e293b]/70 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] overflow-hidden">
            <CardHeader className="bg-white/40 dark:bg-slate-800/40 border-b border-white/50 dark:border-slate-700/50 pb-4">
              <CardTitle className="font-black text-slate-800 dark:text-white">Peta Sebaran RT Aktif</CardTitle>
              <CardDescription className="font-bold text-slate-500">Visualisasi lokasi RT yang menggunakan WargaLink.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 min-h-[300px] p-0 relative bg-slate-100/50 dark:bg-slate-900/50">
              <MapWithNoSSR />
            </CardContent>
          </Card>
        </StaggerItem>
      </div>
    </StaggerContainer>
  );
}

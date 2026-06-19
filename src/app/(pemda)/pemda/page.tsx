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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-200 pb-6">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-800">Executive Overview</h2>
          <p className="text-slate-500 font-medium mt-1">
            Ringkasan data kependudukan dan keaktifan RT/RW seluruh kota.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleExport}
            disabled={exportLoading}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg font-medium hover:bg-slate-50 shadow-sm transition-colors disabled:opacity-60"
          >
            {exportLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            Export Data
          </button>
          <button
            onClick={handleGenerateLaporan}
            disabled={reportLoading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-colors disabled:opacity-60"
          >
            {reportLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            Generate Laporan
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <StaggerItem>
          <Card className="border-none shadow-xl shadow-blue-900/5 bg-gradient-to-br from-white to-blue-50/50 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity group-hover:scale-110 duration-500">
              <Users className="w-24 h-24 text-blue-600" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Penduduk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-slate-800 tracking-tight">{totalPenduduk.toLocaleString("id-ID")}</div>

              <p className="text-xs font-bold text-emerald-600 mt-2 bg-emerald-50 inline-block px-2 py-1 rounded-md">
                +0.2% dari bulan lalu
              </p>
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card className="border-none shadow-xl shadow-blue-900/5 bg-gradient-to-br from-white to-emerald-50/50 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity group-hover:scale-110 duration-500">
              <Building2 className="w-24 h-24 text-emerald-600" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">RT/RW Aktif</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-slate-800 tracking-tight">2.450</div>
              <p className="text-xs font-bold text-emerald-600 mt-2 bg-emerald-50 inline-block px-2 py-1 rounded-md">
                98% terdigitalisasi
              </p>
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card className="border-none shadow-xl shadow-blue-900/5 bg-gradient-to-br from-white to-amber-50/50 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity group-hover:scale-110 duration-500">
              <Map className="w-24 h-24 text-amber-600" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Kelurahan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-slate-800 tracking-tight">45</div>
              <p className="text-xs font-bold text-amber-600 mt-2 bg-amber-50 inline-block px-2 py-1 rounded-md">
                Tersebar di 12 Kecamatan
              </p>
            </CardContent>
          </Card>
        </StaggerItem>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <StaggerItem className="col-span-4">
          <Card className="h-full border-none shadow-xl shadow-slate-200/50">
            <CardHeader>
              <CardTitle className="font-bold text-slate-800">Tren Penggunaan Aplikasi Warga</CardTitle>
              <CardDescription>Aktivitas bulanan warga menggunakan layanan kependudukan & surat pengantar.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                  <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'}} />
                  <Bar dataKey="aktif" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="pending" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </StaggerItem>
        
        <StaggerItem className="col-span-3">
          <Card className="h-full flex flex-col border-none shadow-xl shadow-slate-200/50 overflow-hidden">
            <CardHeader className="bg-slate-50 border-b">
              <CardTitle className="font-bold text-slate-800">Peta Sebaran RT Aktif</CardTitle>
              <CardDescription>Visualisasi lokasi RT yang menggunakan WargaLink.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 min-h-[300px] p-0 relative">
              <MapWithNoSSR />
            </CardContent>
          </Card>
        </StaggerItem>
      </div>
    </StaggerContainer>
  );
}

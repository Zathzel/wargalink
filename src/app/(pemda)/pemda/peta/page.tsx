"use client";

import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Users, CheckCircle, AlertCircle, Filter, FileText, Wallet } from "lucide-react";
import { useState } from "react";

const MapWithNoSSR = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 rounded-lg">
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3 animate-pulse">
        <MapPin className="w-6 h-6 text-blue-500" />
      </div>
      <p className="text-sm text-slate-400 font-medium animate-pulse">Memuat peta wilayah...</p>
    </div>
  ),
});

// RT data untuk sidebar dan statistik
const RT_DATA = [
  {
    id: 1, name: "RT 01 / RW 05", kelurahan: "Simulasi", kecamatan: "Contoh",
    status: "Aktif", warga: 139, suratBulanIni: 15, iuranTerkumpul: 4500000,
    koordinator: "Budi Setiawan", lat: -6.200, lng: 106.816,
  },
  {
    id: 2, name: "RT 02 / RW 05", kelurahan: "Simulasi", kecamatan: "Contoh",
    status: "Aktif", warga: 88, suratBulanIni: 8, iuranTerkumpul: 3200000,
    koordinator: "Siti Rahayu", lat: -6.210, lng: 106.820,
  },
  {
    id: 3, name: "RT 01 / RW 01", kelurahan: "Gambir", kecamatan: "Gambir",
    status: "Baru", warga: 45, suratBulanIni: 3, iuranTerkumpul: 1800000,
    koordinator: "Ahmad Fauzi", lat: -6.195, lng: 106.810,
  },
];

const KELURAHAN = ["Semua", "Simulasi", "Gambir"];

export default function PemdaPeta() {
  const [search, setSearch] = useState("");
  const [selectedKelurahan, setSelectedKelurahan] = useState("Semua");
  const [selectedRt, setSelectedRt] = useState<number | null>(null);

  const filteredRts = RT_DATA.filter((rt) => {
    const matchSearch =
      rt.name.toLowerCase().includes(search.toLowerCase()) ||
      rt.kelurahan.toLowerCase().includes(search.toLowerCase()) ||
      rt.kecamatan.toLowerCase().includes(search.toLowerCase());
    const matchKelurahan =
      selectedKelurahan === "Semua" || rt.kelurahan === selectedKelurahan;
    return matchSearch && matchKelurahan;
  });

  const totalWarga = filteredRts.reduce((sum, rt) => sum + rt.warga, 0);
  const totalSurat = filteredRts.reduce((sum, rt) => sum + rt.suratBulanIni, 0);
  const totalIuran = filteredRts.reduce((sum, rt) => sum + rt.iuranTerkumpul, 0);
  const activeCount = filteredRts.filter(rt => rt.status === "Aktif").length;

  const selected = selectedRt ? RT_DATA.find(rt => rt.id === selectedRt) : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Peta Sebaran RT</h2>
          <p className="text-slate-500 dark:text-slate-400 font-bold mt-1">Visualisasi geospasial RT yang menggunakan WargaLink.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-56">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Cari RT atau kelurahan..."
              className="pl-10 h-10 rounded-xl border-white/60 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 shadow-inner focus-visible:ring-2 focus-visible:ring-emerald-500/50 text-slate-800 dark:text-white font-medium text-xs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* Kelurahan Filter */}
          <select
            value={selectedKelurahan}
            onChange={(e) => setSelectedKelurahan(e.target.value)}
            className="h-10 px-3 border border-white/60 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          >
            {KELURAHAN.map(k => <option key={k} className="bg-white dark:bg-slate-800 text-slate-800 dark:text-white font-medium">{k}</option>)}
          </select>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
        {[
          { label: "Total Warga", value: totalWarga.toLocaleString("id-ID"), icon: Users, bg: "border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-[#1e293b]/70", text: "text-emerald-700 dark:text-emerald-400", iconBg: "bg-emerald-100/80 dark:bg-emerald-900/40 border border-emerald-200/50" },
          { label: "RT Aktif", value: `${activeCount} RT`, icon: CheckCircle, bg: "border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-[#1e293b]/70", text: "text-teal-700 dark:text-teal-400", iconBg: "bg-teal-100/80 dark:bg-teal-900/40 border border-teal-200/50" },
          { label: "Surat Bulan Ini", value: `${totalSurat} Dok`, icon: AlertCircle, bg: "border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-[#1e293b]/70", text: "text-amber-700 dark:text-amber-400", iconBg: "bg-amber-100/80 dark:bg-amber-900/40 border border-amber-200/50" },
          { label: "Iuran Terkumpul", value: `Rp ${(totalIuran / 1000000).toFixed(1)}jt`, icon: MapPin, bg: "border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-[#1e293b]/70", text: "text-blue-700 dark:text-blue-400", iconBg: "bg-blue-100/80 dark:bg-blue-900/40 border border-blue-200/50" },
        ].map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label} className={`border ${kpi.bg} shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] backdrop-blur-2xl hover:-translate-y-1 transition-all duration-300`}>
              <CardContent className="pt-4 pb-4 px-4">
                <div className="flex items-center gap-3">
                  <div className={`${kpi.iconBg} p-2 rounded-xl shrink-0`}>
                    <Icon className={`w-5 h-5 ${kpi.text}`} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{kpi.label}</p>
                    <p className="text-lg font-black text-slate-800 dark:text-white leading-tight">{kpi.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Layout: Map + Sidebar */}
      <div className="grid lg:grid-cols-3 gap-6 h-[500px] lg:h-[520px] relative z-10">
        {/* Map (takes 2/3 on desktop) */}
        <div className="lg:col-span-2">
          <Card className="h-full border border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-[#1e293b]/70 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] overflow-hidden">
            <CardContent className="p-0 h-full bg-slate-100/50 dark:bg-slate-900/50 relative">
              <MapWithNoSSR
                searchQuery={search}
                kelurahanFilter={selectedKelurahan}
                onSelectRt={(id) => setSelectedRt(id)}
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar: RT List + Detail */}
        <div className="flex flex-col gap-4 overflow-hidden">
          {/* Detail panel when RT is selected */}
          {selected ? (
            <Card className="border border-white/80 dark:border-slate-700/50 bg-emerald-50/80 dark:bg-emerald-900/20 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] shrink-0">
              <CardHeader className="pb-2 pt-5 px-5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-black text-slate-800 dark:text-white">{selected.name}</CardTitle>
                  <Badge
                    className={`font-black text-[10px] uppercase tracking-widest px-2.5 py-1 ${selected.status === "Aktif"
                      ? "bg-emerald-100/80 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-400 border border-emerald-200/50"
                      : "bg-amber-100/80 text-amber-800 dark:bg-amber-900/40 dark:text-amber-400 border border-amber-200/50"}`}
                  >
                    {selected.status}
                  </Badge>
                </div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{selected.kelurahan}, {selected.kecamatan}</p>
              </CardHeader>
              <CardContent className="px-5 pb-5 space-y-3 pt-2">
                {[
                  { label: "Jumlah Warga", value: `${selected.warga} jiwa` },
                  { label: "Surat Bulan Ini", value: `${selected.suratBulanIni} dokumen` },
                  { label: "Iuran Terkumpul", value: `Rp ${selected.iuranTerkumpul.toLocaleString("id-ID")}` },
                  { label: "Koordinator", value: selected.koordinator },
                ].map(row => (
                  <div key={row.label} className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-bold">{row.label}</span>
                    <span className="font-black text-slate-800 dark:text-white">{row.value}</span>
                  </div>
                ))}
                <button
                  onClick={() => setSelectedRt(null)}
                  className="w-full mt-3 text-xs font-bold text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors uppercase tracking-widest"
                >
                  Tutup detail ×
                </button>
              </CardContent>
            </Card>
          ) : null}

          {/* RT List */}
          <Card className="border border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-[#1e293b]/70 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] flex-1 overflow-hidden flex flex-col">
            <CardHeader className="pb-3 pt-5 px-5 border-b border-white/50 dark:border-slate-700/50 bg-white/40 dark:bg-slate-800/40 shrink-0">
              <CardTitle className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-2 uppercase tracking-widest">
                <Filter className="w-4 h-4 text-emerald-500" />
                Daftar RT ({filteredRts.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-y-auto flex-1">
              {filteredRts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                  <MapPin className="w-10 h-10 mb-3 opacity-30 text-emerald-500" />
                  <p className="text-xs font-bold uppercase tracking-widest">Tidak ada RT ditemukan</p>
                </div>
              ) : (
                <ul className="divide-y divide-white/40 dark:divide-slate-700/40">
                  {filteredRts.map((rt) => (
                    <li
                      key={rt.id}
                      onClick={() => setSelectedRt(rt.id === selectedRt ? null : rt.id)}
                      className={`px-5 py-4 cursor-pointer transition-colors hover:bg-white/60 dark:hover:bg-slate-800/60 ${
                        selectedRt === rt.id ? "bg-emerald-50/80 dark:bg-emerald-900/20" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-black text-slate-800 dark:text-white">{rt.name}</span>
                        <Badge
                          className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${
                            rt.status === "Aktif"
                              ? "bg-emerald-100/80 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-400 border-emerald-200/50"
                              : "bg-amber-100/80 text-amber-800 dark:bg-amber-900/40 dark:text-amber-400 border-amber-200/50"
                          }`}
                        >
                          {rt.status}
                        </Badge>
                      </div>
                      <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{rt.kelurahan} · {rt.warga} Warga</p>
                      <div className="mt-2.5 flex items-center gap-4 text-[10px] text-slate-500 dark:text-slate-400 font-bold">
                        <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-slate-400" /> {rt.suratBulanIni} surat</span>
                        <span className="flex items-center gap-1.5"><Wallet className="w-3.5 h-3.5 text-slate-400" /> Rp {(rt.iuranTerkumpul / 1000000).toFixed(1)}jt</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Legend */}
          <Card className="border border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-[#1e293b]/70 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] shrink-0">
            <CardContent className="py-4 px-5">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Legenda Peta</p>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm" />
                  <span className="text-xs text-slate-600 dark:text-slate-300 font-bold">RT Aktif</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500 shadow-sm" />
                  <span className="text-xs text-slate-600 dark:text-slate-300 font-bold">RT Baru</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-400 shadow-sm" />
                  <span className="text-xs text-slate-600 dark:text-slate-300 font-bold">Non-Aktif</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

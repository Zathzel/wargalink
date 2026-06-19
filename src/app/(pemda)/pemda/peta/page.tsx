"use client";

import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Users, CheckCircle, AlertCircle, Filter } from "lucide-react";
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Peta Sebaran RT</h2>
          <p className="text-slate-500 text-sm mt-0.5">Visualisasi geospasial RT yang menggunakan WargaLink.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-56">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Cari RT atau kelurahan..."
              className="pl-9 text-xs rounded-xl border-slate-200"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* Kelurahan Filter */}
          <select
            value={selectedKelurahan}
            onChange={(e) => setSelectedKelurahan(e.target.value)}
            className="h-9 px-3 border border-slate-200 bg-white rounded-xl text-xs font-medium text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            {KELURAHAN.map(k => <option key={k}>{k}</option>)}
          </select>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Warga", value: totalWarga.toLocaleString("id-ID"), icon: Users, bg: "bg-blue-50", text: "text-blue-700", iconBg: "bg-blue-100" },
          { label: "RT Aktif", value: `${activeCount} RT`, icon: CheckCircle, bg: "bg-emerald-50", text: "text-emerald-700", iconBg: "bg-emerald-100" },
          { label: "Surat Bulan Ini", value: `${totalSurat} Dok`, icon: AlertCircle, bg: "bg-amber-50", text: "text-amber-700", iconBg: "bg-amber-100" },
          { label: "Iuran Terkumpul", value: `Rp ${(totalIuran / 1000000).toFixed(1)}jt`, icon: MapPin, bg: "bg-violet-50", text: "text-violet-700", iconBg: "bg-violet-100" },
        ].map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label} className={`border-0 ${kpi.bg} shadow-sm`}>
              <CardContent className="pt-4 pb-4 px-4">
                <div className="flex items-center gap-3">
                  <div className={`${kpi.iconBg} p-2 rounded-xl shrink-0`}>
                    <Icon className={`w-4 h-4 ${kpi.text}`} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500">{kpi.label}</p>
                    <p className="text-lg font-extrabold text-slate-800 leading-tight">{kpi.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Layout: Map + Sidebar */}
      <div className="grid lg:grid-cols-3 gap-6 h-[500px] lg:h-[520px]">
        {/* Map (takes 2/3 on desktop) */}
        <div className="lg:col-span-2">
          <Card className="h-full border border-white/60 bg-white/80 backdrop-blur-sm shadow-xl shadow-slate-200/40 rounded-2xl overflow-hidden">
            <CardContent className="p-0 h-full">
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
            <Card className="border border-primary/20 bg-blue-50/50 rounded-2xl shrink-0">
              <CardHeader className="pb-2 pt-4 px-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-bold text-slate-800">{selected.name}</CardTitle>
                  <Badge
                    className={selected.status === "Aktif"
                      ? "bg-emerald-100 text-emerald-800 border-0"
                      : "bg-amber-100 text-amber-800 border-0"}
                  >
                    {selected.status}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500">{selected.kelurahan}, {selected.kecamatan}</p>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-2">
                {[
                  { label: "Jumlah Warga", value: `${selected.warga} jiwa` },
                  { label: "Surat Bulan Ini", value: `${selected.suratBulanIni} dokumen` },
                  { label: "Iuran Terkumpul", value: `Rp ${selected.iuranTerkumpul.toLocaleString("id-ID")}` },
                  { label: "Koordinator", value: selected.koordinator },
                ].map(row => (
                  <div key={row.label} className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">{row.label}</span>
                    <span className="font-bold text-slate-800">{row.value}</span>
                  </div>
                ))}
                <button
                  onClick={() => setSelectedRt(null)}
                  className="w-full mt-2 text-xs text-slate-400 hover:text-slate-600 transition-colors"
                >
                  Tutup detail ×
                </button>
              </CardContent>
            </Card>
          ) : null}

          {/* RT List */}
          <Card className="border border-white/60 bg-white/80 backdrop-blur-sm shadow-xl shadow-slate-200/40 rounded-2xl flex-1 overflow-hidden">
            <CardHeader className="pb-2 pt-4 px-4 border-b border-slate-100">
              <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-500" />
                Daftar RT ({filteredRts.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-y-auto h-full max-h-[360px]">
              {filteredRts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                  <MapPin className="w-8 h-8 mb-2 opacity-30" />
                  <p className="text-xs">Tidak ada RT ditemukan</p>
                </div>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {filteredRts.map((rt) => (
                    <li
                      key={rt.id}
                      onClick={() => setSelectedRt(rt.id === selectedRt ? null : rt.id)}
                      className={`px-4 py-3.5 cursor-pointer transition-colors hover:bg-slate-50 ${
                        selectedRt === rt.id ? "bg-blue-50/80" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-slate-800">{rt.name}</span>
                        <Badge
                          className={`text-[10px] font-bold border-0 ${
                            rt.status === "Aktif"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {rt.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500">{rt.kelurahan} · {rt.warga} Warga</p>
                      <div className="mt-2 flex gap-3 text-[10px] text-slate-400 font-medium">
                        <span>📄 {rt.suratBulanIni} surat</span>
                        <span>💰 Rp {(rt.iuranTerkumpul / 1000000).toFixed(1)}jt</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Legend */}
          <Card className="border border-white/60 bg-white/80 rounded-xl shadow-sm shrink-0">
            <CardContent className="py-3 px-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Legenda Peta</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-[11px] text-slate-600 font-medium">RT Aktif</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="text-[11px] text-slate-600 font-medium">RT Baru</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-slate-400" />
                  <span className="text-[11px] text-slate-600 font-medium">Non-Aktif</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

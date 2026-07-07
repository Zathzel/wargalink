"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Users, Info, Inbox } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ui/animated-container";
import { useApp } from "@/context/AppContext";

export default function AdminTamu() {
  const { tamuList } = useApp();

  return (
    <StaggerContainer className="space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-800">Buku Tamu (1x24 Jam)</h2>
        <p className="text-slate-500 font-medium">Log laporan tamu menginap warga RT 01.</p>
      </div>

      <div className="space-y-4">
        {tamuList.length === 0 && (
          <StaggerItem>
            <div className="text-center py-12 border border-dashed rounded-2xl bg-white/50 backdrop-blur-sm">
              <div className="w-16 h-16 mx-auto bg-teal-50 rounded-2xl flex items-center justify-center mb-4 border border-teal-100">
                <Inbox className="w-8 h-8 text-teal-400" />
              </div>
              <p className="text-base font-bold text-slate-700">Tidak ada tamu terdaftar</p>
              <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">Saat ini belum ada laporan tamu menginap dari warga.</p>
            </div>
          </StaggerItem>
        )}

        {tamuList.map((tamu) => (
          <StaggerItem key={tamu.id}>
            <Card className="border border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-[#1e293b]/70 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 rounded-[2rem] overflow-hidden group">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row border-l-4 border-teal-500">
                  {/* Left part */}
                  <div className="p-6 md:w-1/3 border-b md:border-b-0 md:border-r border-white/40 dark:border-slate-700/40 bg-teal-50/50 dark:bg-teal-900/20 group-hover:bg-teal-50/80 dark:group-hover:bg-teal-900/40 transition-colors">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="bg-gradient-to-br from-teal-400 to-emerald-500 text-white p-3 rounded-[1.2rem] shadow-lg shadow-teal-500/30 group-hover:scale-110 transition-transform duration-300">
                        <Users className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-black text-slate-800 dark:text-white text-xl leading-tight group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">{tamu.nama}</h3>
                        <p className="text-xs font-bold text-slate-500 mt-1">Durasi: <span className="font-extrabold text-teal-700 dark:text-teal-400 bg-teal-100/50 dark:bg-teal-900/50 px-2 py-0.5 rounded border border-teal-200/50 dark:border-teal-800/50">{tamu.durasiMenginap} Hari</span></p>
                      </div>
                    </div>
                  </div>
                  {/* Right part */}
                  <div className="p-6 flex-1 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white/30 dark:bg-slate-900/30">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tujuan / Lokasi Menginap</p>
                      <p className="text-base font-extrabold text-slate-700 dark:text-slate-300">{tamu.tujuan}</p>
                      <div className="flex flex-wrap items-center gap-2 mt-4">
                        <span className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/60 text-slate-600 dark:text-slate-300 text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm">
                          Kendaraan: {tamu.kendaraan}
                        </span>
                        <span className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/60 text-slate-600 dark:text-slate-300 text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm">
                          Plat: {tamu.platNomor}
                        </span>
                      </div>
                    </div>
                    <div className="text-left md:text-right mt-2 md:mt-0 bg-white/50 dark:bg-slate-800/50 p-3 rounded-xl border border-white/60 dark:border-slate-700/50">
                      <p className="text-[9px] text-slate-400 font-black uppercase mb-1 tracking-widest">Waktu Lapor</p>
                      <p className="text-sm font-black text-slate-700 dark:text-slate-300">{tamu.waktuLapor}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </div>
    </StaggerContainer>
  );
}

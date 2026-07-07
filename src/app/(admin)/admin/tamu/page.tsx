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
            <Card className="border border-white/60 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row border-l-4 border-teal-500">
                  {/* Left part */}
                  <div className="p-5 md:w-1/3 border-b md:border-b-0 md:border-r border-slate-100 bg-teal-50/30">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-teal-100 text-teal-600 p-2 rounded-xl">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg leading-tight">{tamu.nama}</h3>
                        <p className="text-xs text-slate-500">Durasi: <span className="font-semibold text-teal-700">{tamu.durasiMenginap} Hari</span></p>
                      </div>
                    </div>
                  </div>
                  {/* Right part */}
                  <div className="p-5 flex-1 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Tujuan / Lokasi Menginap</p>
                      <p className="text-sm font-semibold text-slate-700">{tamu.tujuan}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="bg-slate-100 border border-slate-200 text-slate-600 text-[11px] font-semibold px-2.5 py-1 rounded-md">
                          Kendaraan: {tamu.kendaraan}
                        </span>
                        <span className="bg-slate-100 border border-slate-200 text-slate-600 text-[11px] font-semibold px-2.5 py-1 rounded-md">
                          Plat: {tamu.platNomor}
                        </span>
                      </div>
                    </div>
                    <div className="text-left md:text-right mt-2 md:mt-0">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Waktu Lapor</p>
                      <p className="text-sm font-bold text-slate-700">{tamu.waktuLapor}</p>
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

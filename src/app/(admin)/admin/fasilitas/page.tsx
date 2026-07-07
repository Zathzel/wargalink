"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tent, CheckCircle2, Clock, XCircle, Inbox, Info } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ui/animated-container";
import { useApp } from "@/context/AppContext";

export default function AdminFasilitas() {
  const { peminjamanList, fasilitasList, updateStatusPinjaman } = useApp();

  return (
    <StaggerContainer className="space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-800">Manajemen Fasilitas</h2>
        <p className="text-slate-500 font-medium">Setujui atau tolak peminjaman inventaris RT.</p>
      </div>

      <div className="space-y-4">
        {peminjamanList.length === 0 && (
          <StaggerItem>
            <div className="text-center py-12 border border-dashed rounded-2xl bg-white/50 backdrop-blur-sm">
              <div className="w-16 h-16 mx-auto bg-purple-50 rounded-2xl flex items-center justify-center mb-4 border border-purple-100">
                <Inbox className="w-8 h-8 text-purple-400" />
              </div>
              <p className="text-base font-bold text-slate-700">Tidak ada pengajuan pinjaman</p>
              <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">Saat ini belum ada warga yang mengajukan peminjaman fasilitas.</p>
            </div>
          </StaggerItem>
        )}

        {peminjamanList.map((p) => {
          const fas = fasilitasList.find(f => f.id === p.fasilitasId);
          const isPending = p.status === "Menunggu";
          const isApproved = p.status === "Disetujui";
          
          return (
            <StaggerItem key={p.id}>
              <Card className="border border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-[#1e293b]/70 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
                <CardContent className="p-0">
                  <div className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                    <div className="flex items-start gap-4">
                      <div className={`p-4 rounded-[1.2rem] mt-1 shadow-inner ${isPending ? 'bg-gradient-to-br from-amber-100 to-orange-50 text-amber-600 dark:from-amber-900/40 dark:to-orange-900/40 dark:text-amber-400' : isApproved ? 'bg-gradient-to-br from-blue-100 to-indigo-50 text-blue-600 dark:from-blue-900/40 dark:to-indigo-900/40 dark:text-blue-400' : p.status === 'Selesai' ? 'bg-gradient-to-br from-emerald-100 to-teal-50 text-emerald-600 dark:from-emerald-900/40 dark:to-teal-900/40 dark:text-emerald-400' : 'bg-gradient-to-br from-red-100 to-rose-50 text-red-600 dark:from-red-900/40 dark:to-rose-900/40 dark:text-red-400'}`}>
                        <Tent className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <h3 className="font-extrabold text-slate-800 tracking-tight text-lg leading-none">{fas?.nama}</h3>
                          <span className="bg-purple-100/80 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-black px-2.5 py-0.5 rounded-md border border-purple-200/50 dark:border-purple-800/30">
                            x{p.jumlah}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-slate-600 mb-1">Pemohon: <span className="font-extrabold text-slate-700">{p.pemohon}</span></p>
                        <p className="text-[11px] font-bold text-slate-400 bg-white/50 dark:bg-black/20 px-2 py-0.5 rounded-md inline-block border border-slate-100 dark:border-slate-700/50 mb-2">{p.tanggalMulai} - {p.tanggalSelesai}</p>
                        <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5 bg-slate-50/50 dark:bg-slate-900/30 px-3 py-2 rounded-xl border border-slate-100/80 dark:border-slate-700/50 shadow-inner">
                          <Info className="w-4 h-4 text-slate-400" /> Keperluan: {p.keperluan}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:items-end w-full md:w-auto gap-3 shrink-0">
                      <div className="flex items-center gap-1.5 bg-white/80 dark:bg-slate-800/80 px-4 py-2 rounded-xl border border-white/60 dark:border-slate-700/50 shadow-sm">
                        {isApproved ? (
                          <CheckCircle2 className="w-4 h-4 text-blue-500" />
                        ) : p.status === "Selesai" ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : p.status === "Ditolak" ? (
                          <XCircle className="w-4 h-4 text-red-500" />
                        ) : (
                          <Clock className="w-4 h-4 text-amber-500" />
                        )}
                        <span className="text-[10px] font-extrabold text-slate-600 uppercase tracking-widest">{p.status}</span>
                      </div>

                      {isPending && (
                        <div className="flex gap-2 w-full md:w-auto">
                          <Button 
                            variant="outline" 
                            className="flex-1 md:flex-none h-10 border-red-200/60 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl font-bold shadow-sm"
                            onClick={() => updateStatusPinjaman(p.id, "Ditolak")}
                          >
                            Tolak
                          </Button>
                          <Button 
                            className="flex-1 md:flex-none h-10 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl shadow-[0_8px_20px_-10px_rgba(147,51,234,0.5)] font-bold px-6"
                            onClick={() => updateStatusPinjaman(p.id, "Disetujui")}
                          >
                            Setujui
                          </Button>
                        </div>
                      )}

                      {isApproved && (
                        <Button 
                          className="w-full md:w-auto h-10 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl shadow-[0_8px_20px_-10px_rgba(16,185,129,0.5)] font-bold px-6"
                          onClick={() => updateStatusPinjaman(p.id, "Selesai")}
                        >
                          Tandai Dikembalikan
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          );
        })}
      </div>
    </StaggerContainer>
  );
}

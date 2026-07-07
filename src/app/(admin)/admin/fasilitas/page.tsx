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
              <Card className="border border-white/60 bg-white/80 backdrop-blur-sm shadow-lg shadow-slate-200/40 rounded-2xl overflow-hidden hover:shadow-xl transition-all">
                <CardContent className="p-0">
                  <div className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl mt-1 ${isPending ? 'bg-amber-100 text-amber-600' : isApproved ? 'bg-blue-100 text-blue-600' : p.status === 'Selesai' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                        <Tent className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-slate-800 text-lg">{fas?.nama}</h3>
                          <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-0.5 rounded-full">
                            x{p.jumlah}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-slate-600 mb-1">Pemohon: {p.pemohon}</p>
                        <p className="text-xs text-slate-500">{p.tanggalMulai} - {p.tanggalSelesai}</p>
                        <p className="text-xs text-slate-400 mt-2 flex items-center gap-1 bg-slate-50 p-2 rounded-lg border">
                          <Info className="w-3.5 h-3.5" /> Keperluan: {p.keperluan}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:items-end w-full md:w-auto gap-3">
                      <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border">
                        {isApproved ? (
                          <CheckCircle2 className="w-4 h-4 text-blue-500" />
                        ) : p.status === "Selesai" ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : p.status === "Ditolak" ? (
                          <XCircle className="w-4 h-4 text-red-500" />
                        ) : (
                          <Clock className="w-4 h-4 text-amber-500" />
                        )}
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">{p.status}</span>
                      </div>

                      {isPending && (
                        <div className="flex gap-2 w-full md:w-auto">
                          <Button 
                            variant="outline" 
                            className="flex-1 md:flex-none border-red-200 text-red-600 hover:bg-red-50 rounded-xl"
                            onClick={() => updateStatusPinjaman(p.id, "Ditolak")}
                          >
                            Tolak
                          </Button>
                          <Button 
                            className="flex-1 md:flex-none bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg shadow-purple-600/20"
                            onClick={() => updateStatusPinjaman(p.id, "Disetujui")}
                          >
                            Setujui
                          </Button>
                        </div>
                      )}

                      {isApproved && (
                        <Button 
                          className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-600/20"
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

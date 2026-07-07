"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, CheckCircle2, Clock } from "lucide-react";
import { toast } from "sonner";
import { useApp } from "@/context/AppContext";

export default function WargaPolling() {
  const { currentUser, pollingList, votePolling } = useApp();

  const pemohonNama = currentUser ? currentUser.desc.split(",")[0].trim() : "Budi Santoso";

  const handleVote = (pollingId: number, opsiId: number) => {
    votePolling(pollingId, opsiId, pemohonNama);
    toast.success("Terima kasih, suara Anda telah berhasil disimpan.");
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent p-5 space-y-6 pb-20">
      <div className="bg-white/40 backdrop-blur-xl p-6 rounded-[2rem] border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mt-2">
        <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-500/30 mb-4">
          <PieChart className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">E-Voting / Polling</h2>
        <p className="text-sm text-slate-600 mt-1 font-medium">Berpartisipasi dalam pengambilan keputusan lingkungan RT.</p>
      </div>

      <div className="space-y-4">
        {pollingList.length === 0 && (
          <div className="text-center py-10 border border-dashed rounded-2xl bg-slate-50/60">
            <div className="w-14 h-14 mx-auto bg-rose-50 rounded-2xl flex items-center justify-center mb-3">
              <PieChart className="w-7 h-7 text-rose-400" />
            </div>
            <p className="text-sm font-bold text-slate-700">Belum ada polling aktif</p>
            <p className="text-xs text-slate-400 mt-1 max-w-[16rem] mx-auto leading-relaxed">Saat ini tidak ada pemilihan atau polling yang sedang berlangsung.</p>
          </div>
        )}

        {pollingList.map((polling) => {
          const totalVotes = polling.opsi.reduce((sum, opt) => sum + opt.votes, 0);
          const hasVoted = polling.pemilih.includes(pemohonNama);
          const isClosed = polling.status === "Selesai";
          const canVote = !hasVoted && !isClosed;

          return (
            <Card key={polling.id} className="border-white/60 bg-white/50 backdrop-blur-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-[2rem] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)]">
              <CardHeader className="bg-white/40 pb-5 border-b border-white/60">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-extrabold text-slate-800 leading-tight mb-2 tracking-tight">{polling.pertanyaan}</CardTitle>
                    <p className="text-xs text-slate-600 font-medium line-clamp-2 leading-relaxed">{polling.deskripsi}</p>
                  </div>
                  <div className="bg-gradient-to-br from-rose-100 to-pink-50 p-3 rounded-xl shadow-inner text-rose-600 shrink-0 ml-4">
                    <PieChart className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest ${isClosed ? 'bg-slate-200/80 text-slate-600' : 'bg-rose-100 text-rose-700'}`}>
                    {polling.status}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5 bg-white/50 px-3 py-1 rounded-full border border-white">
                    <Clock className="w-3.5 h-3.5 text-rose-400" /> Berakhir: {polling.tanggalBerakhir}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-5">
                  {polling.opsi.map((opt) => {
                    const percentage = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
                    return (
                      <div key={opt.id} className="space-y-2.5 relative">
                        <div className="flex justify-between items-center z-10 relative">
                          <span className="font-extrabold text-sm text-slate-700">{opt.teks}</span>
                          {hasVoted || isClosed ? (
                            <span className="text-xs font-black text-slate-600">{percentage}% <span className="font-semibold text-slate-400">({opt.votes})</span></span>
                          ) : (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 px-4 text-xs font-bold border-rose-200 bg-white/50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 rounded-xl shadow-sm transition-all"
                              onClick={() => handleVote(polling.id, opt.id)}
                            >
                              Pilih
                            </Button>
                          )}
                        </div>
                        {(hasVoted || isClosed) && (
                          <div className="h-3 w-full bg-slate-200/60 rounded-full overflow-hidden shadow-inner border border-slate-200/50">
                            <div 
                              className="h-full bg-gradient-to-r from-rose-400 to-rose-500 rounded-full transition-all duration-1000 ease-out shadow-sm" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                {hasVoted && (
                  <div className="mt-6 pt-4 border-t border-white/60 flex items-center gap-2 text-emerald-600 bg-white/40 p-3 rounded-xl border border-white">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-xs font-extrabold tracking-wide">Suara Anda telah tersimpan.</span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

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
    <div className="flex flex-col min-h-screen bg-transparent p-4 space-y-6 pb-20">
      <div>
        <h2 className="text-xl font-bold text-slate-900">E-Voting / Polling</h2>
        <p className="text-sm text-slate-500">Berpartisipasi dalam pengambilan keputusan lingkungan RT.</p>
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
            <Card key={polling.id} className="border border-rose-100 shadow-md rounded-2xl overflow-hidden">
              <CardHeader className="bg-rose-50/50 pb-4 border-b border-rose-100/50">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-bold text-slate-800 leading-tight mb-1">{polling.pertanyaan}</CardTitle>
                    <p className="text-xs text-slate-500 line-clamp-2">{polling.deskripsi}</p>
                  </div>
                  <div className="bg-white p-2 rounded-xl shadow-sm text-rose-600 shrink-0 border border-rose-50">
                    <PieChart className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${isClosed ? 'bg-slate-200 text-slate-600' : 'bg-rose-100 text-rose-700'}`}>
                    {polling.status}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Berakhir: {polling.tanggalBerakhir}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-5">
                <div className="space-y-4">
                  {polling.opsi.map((opt) => {
                    const percentage = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
                    return (
                      <div key={opt.id} className="space-y-1.5 relative">
                        <div className="flex justify-between items-center z-10 relative">
                          <span className="font-semibold text-sm text-slate-700">{opt.teks}</span>
                          {hasVoted || isClosed ? (
                            <span className="text-xs font-bold text-slate-600">{percentage}% ({opt.votes})</span>
                          ) : (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-7 text-xs border-rose-200 text-rose-600 hover:bg-rose-50 rounded-lg"
                              onClick={() => handleVote(polling.id, opt.id)}
                            >
                              Pilih
                            </Button>
                          )}
                        </div>
                        {(hasVoted || isClosed) && (
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-rose-500 rounded-full transition-all duration-1000 ease-out" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                {hasVoted && (
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2 text-emerald-600">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-xs font-bold">Anda sudah memberikan suara.</span>
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

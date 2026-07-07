"use client";


import { Trophy, Medal, Star, Gift, ChevronRight, CheckCircle2, TrendingUp, Sparkles, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StaggerContainer, StaggerItem } from "@/components/ui/animated-container";
import { toast } from "sonner";
import { motion } from "framer-motion";

const LEADERBOARD = [
  { rank: 1, name: "Bapak Budi", points: 2450, avatar: "bg-blue-100 text-blue-600" },
  { rank: 2, name: "Ibu Siti", points: 2100, avatar: "bg-rose-100 text-rose-600" },
  { rank: 3, name: "Pak Andi", points: 1950, avatar: "bg-emerald-100 text-emerald-600" },
  { rank: 4, name: "Mas Reza", points: 1800, avatar: "bg-purple-100 text-purple-600" },
  { rank: 5, name: "Bapak Joko", points: 1750, avatar: "bg-orange-100 text-orange-600" },
];

const MISSIONS = [
  { title: "Bayar Iuran Tepat Waktu", points: 50, done: false, icon: CheckCircle2, color: "text-emerald-500" },
  { title: "Hadir Kerja Bakti", points: 100, done: true, icon: TrendingUp, color: "text-blue-500" },
  { title: "Lapor Infrastruktur Rusak", points: 20, done: false, icon: Star, color: "text-amber-500" },
];

const REWARDS = [
  { title: "Bebas Iuran 1 Bulan", cost: 5000, icon: Gift, color: "bg-purple-50 text-purple-600" },
  { title: "Voucher Pasar Rp20rb", cost: 1000, icon: Store, color: "bg-orange-50 text-orange-600" },
];

// Placeholder for Store icon since it might not be imported correctly in this scope
function Store(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 10.82 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 5.59 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 2 10V7"/></svg>
}

export default function WargaPoinPage() {
  const handleTukar = (item: string) => {
    toast.error("Poin tidak cukup", {
      description: `Anda butuh lebih banyak poin untuk menukar ${item}`
    });
  };

  return (
    <div className="pb-24 max-w-md mx-auto min-h-screen bg-slate-50">
      {/* Header Inline */}
      <div className="bg-white/40 backdrop-blur-xl p-6 rounded-b-[2rem] border-b border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-6 relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-amber-400/20 rounded-full blur-[40px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-300/20 rounded-full blur-[30px]"></div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">WargaPoin</h2>
            <p className="text-slate-500 text-sm font-medium">Papan peringkat & misi</p>
          </div>
        </div>
      </div>

      <StaggerContainer className="px-5 space-y-6">
        
        {/* User Current Points */}
        <StaggerItem>
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-[2rem] p-6 text-white relative overflow-hidden shadow-2xl shadow-slate-900/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Saldo Poin</p>
                <div className="flex items-end gap-2">
                  <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500">1,250</h3>
                  <span className="text-amber-200/80 font-medium mb-1">pts</span>
                </div>
              </div>
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20">
                <Medal className="w-7 h-7 text-amber-400" />
              </div>
            </div>
          </div>
        </StaggerItem>

        {/* Podium Leaderboard */}
        <StaggerItem>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 tracking-tight text-lg">Peringkat RT 01</h3>
            <span className="text-xs font-semibold text-amber-600 bg-amber-100 px-2 py-1 rounded-md flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Top 5
            </span>
          </div>

          {/* Top 3 Podium */}
          <div className="flex items-end justify-center gap-3 h-48 mb-6 pt-4">
            {/* Rank 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
              className="flex flex-col items-center flex-1"
            >
              <div className="w-12 h-12 rounded-full bg-slate-200 border-2 border-slate-300 flex items-center justify-center mb-2 z-10 relative">
                <span className="font-bold text-slate-500">Ibu</span>
                <div className="absolute -bottom-2 bg-slate-400 text-white text-[10px] font-bold px-1.5 rounded-sm">#2</div>
              </div>
              <div className="w-full bg-gradient-to-t from-slate-200 to-slate-100 rounded-t-xl h-24 border-t-2 border-slate-300 flex flex-col items-center justify-end pb-2">
                <span className="text-xs font-bold text-slate-600">2,100</span>
              </div>
            </motion.div>

            {/* Rank 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
              className="flex flex-col items-center flex-1"
            >
              <div className="w-16 h-16 rounded-full bg-amber-100 border-4 border-amber-400 flex items-center justify-center mb-2 z-10 relative shadow-lg shadow-amber-400/40">
                <Award className="w-8 h-8 text-amber-500" />
                <div className="absolute -top-3 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center animate-bounce">
                  <span className="text-[10px] font-black text-white">1</span>
                </div>
              </div>
              <div className="w-full bg-gradient-to-t from-amber-200 to-amber-100 rounded-t-xl h-32 border-t-2 border-amber-400 flex flex-col items-center justify-end pb-2 shadow-inner">
                <span className="text-sm font-black text-amber-700">2,450</span>
              </div>
            </motion.div>

            {/* Rank 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5, type: "spring" }}
              className="flex flex-col items-center flex-1"
            >
              <div className="w-12 h-12 rounded-full bg-orange-100 border-2 border-orange-300 flex items-center justify-center mb-2 z-10 relative">
                <span className="font-bold text-orange-600">And</span>
                <div className="absolute -bottom-2 bg-orange-400 text-white text-[10px] font-bold px-1.5 rounded-sm">#3</div>
              </div>
              <div className="w-full bg-gradient-to-t from-orange-200 to-orange-100 rounded-t-xl h-20 border-t-2 border-orange-300 flex flex-col items-center justify-end pb-2">
                <span className="text-xs font-bold text-orange-700">1,950</span>
              </div>
            </motion.div>
          </div>

          {/* Rank 4 & 5 list */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-3">
            {LEADERBOARD.slice(3).map((u) => (
              <div key={u.rank} className="flex items-center justify-between pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="w-6 text-center font-bold text-slate-400 text-sm">#{u.rank}</div>
                  <div className={`w-8 h-8 rounded-full ${u.avatar} flex items-center justify-center text-xs font-bold`}>
                    {u.name.substring(0, 2)}
                  </div>
                  <span className="font-bold text-slate-700 text-sm">{u.name}</span>
                </div>
                <div className="font-bold text-slate-600 text-sm">{u.points} <span className="text-[10px] text-slate-400 font-normal">pts</span></div>
              </div>
            ))}
          </div>
        </StaggerItem>

        {/* Missions */}
        <StaggerItem>
          <h3 className="font-bold text-slate-800 tracking-tight text-lg mb-3">Misi Harian</h3>
          <div className="space-y-3">
            {MISSIONS.map((m, i) => (
              <div key={i} className={`bg-white rounded-2xl p-4 shadow-sm border flex items-center justify-between ${m.done ? 'border-slate-100 opacity-60' : 'border-slate-200'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${m.done ? 'bg-slate-100 text-slate-400' : 'bg-slate-50 ' + m.color}`}>
                    <m.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className={`font-bold text-sm ${m.done ? 'text-slate-500 line-through' : 'text-slate-700'}`}>{m.title}</h4>
                    <p className="text-xs font-semibold text-amber-500 flex items-center gap-1">
                      +{m.points} Poin
                    </p>
                  </div>
                </div>
                {m.done ? (
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                ) : (
                  <Button size="sm" variant="outline" className="h-8 rounded-lg text-xs font-bold">Kerjakan</Button>
                )}
              </div>
            ))}
          </div>
        </StaggerItem>

        {/* Rewards */}
        <StaggerItem>
          <h3 className="font-bold text-slate-800 tracking-tight text-lg mb-3 mt-4">Tukar Poin</h3>
          <div className="grid grid-cols-2 gap-3">
            {REWARDS.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-col items-center text-center group cursor-pointer hover:border-amber-300 transition-colors" onClick={() => handleTukar(r.title)}>
                <div className={`w-12 h-12 rounded-2xl ${r.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <r.icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-700 text-sm mb-1 leading-tight">{r.title}</h4>
                <div className="mt-auto pt-2">
                  <span className="text-xs font-black text-amber-600 bg-amber-50 px-2 py-1 rounded-md">{r.cost} Poin</span>
                </div>
              </div>
            ))}
          </div>
        </StaggerItem>
      </StaggerContainer>
    </div>
  );
}

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function HargaPage() {
  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-6">Harga Transparan untuk Semua</h1>
        <p className="text-lg text-slate-600">Pilih paket yang paling sesuai dengan kebutuhan jumlah warga di lingkungan RT/RW Anda.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {[
          { name: "Starter", desc: "Cocok untuk RT berkembang", price: "Gratis", features: ["Hingga 50 KK", "Surat Pengantar", "Pengumuman RT", "Support via Email"] },
          { name: "Pro", desc: "Fitur lengkap untuk RT aktif", price: "Rp 50.000", period: "/bulan", features: ["Hingga 200 KK", "Manajemen Kas & Iuran", "Laporan Keuangan", "Support Prioritas", "Aduan Warga"], highlight: true },
          { name: "Kawasan / RW", desc: "Untuk pengelolaan level RW / Komplek", price: "Hubungi Kami", features: ["Tidak terbatas", "Konsolidasi Laporan RT", "Akses Dasbor Pemda", "Pelatihan Pengurus", "Custom Fitur"] },
        ].map((plan, i) => (
          <div key={i} className={`relative p-8 rounded-[2rem] border ${plan.highlight ? 'border-emerald-500 shadow-xl shadow-emerald-500/10' : 'border-slate-200 shadow-sm bg-white'}`}>
            {plan.highlight && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-bold">Rekomendasi</div>}
            <h3 className="text-2xl font-bold text-slate-800 mb-2">{plan.name}</h3>
            <p className="text-sm text-slate-500 mb-6">{plan.desc}</p>
            <div className="mb-8">
              <span className="text-4xl font-black text-slate-800">{plan.price}</span>
              {plan.period && <span className="text-slate-500">{plan.period}</span>}
            </div>
            <ul className="space-y-4 mb-8">
              {plan.features.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span className="text-slate-600 font-medium">{feat}</span>
                </li>
              ))}
            </ul>
            <Link href="/login">
              <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.highlight ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'}`}>
                Pilih Paket
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

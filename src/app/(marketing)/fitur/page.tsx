export default function FiturPage() {
  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-6">Fitur Unggulan</h1>
        <p className="text-lg text-slate-600">Jelajahi semua fitur yang membuat WargaLink menjadi platform manajemen RT/RW terbaik di Indonesia.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: "Surat Pengantar Online", desc: "Warga dapat mengajukan surat RT secara mandiri, langsung masuk ke notifikasi Ketua RT untuk disetujui dan dicetak." },
          { title: "Manajemen Keuangan", desc: "Catat dan laporkan iuran warga secara transparan. Warga bisa melihat laporan kas RT setiap bulannya." },
          { title: "Aduan & Laporan", desc: "Saluran langsung untuk melaporkan fasilitas rusak, keamanan, atau masalah lainnya dengan pelacakan status laporan." },
          { title: "Buku Tamu Digital", desc: "Lapor tamu menginap 1x24 jam langsung dari aplikasi, tanpa perlu datang ke rumah RT." },
          { title: "Pengumuman RT", desc: "Sebarkan informasi rapat, kerja bakti, atau berita penting langsung ke ponsel seluruh warga melalui push notification." },
          { title: "Polling & Voting", desc: "Ambil keputusan bersama secara demokratis dengan fitur polling terintegrasi untuk berbagai kebijakan RT." },
        ].map((item, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
            <p className="text-slate-600 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

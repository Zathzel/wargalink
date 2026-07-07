import { Mail, MapPin, Phone } from "lucide-react";

export default function KontakPage() {
  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-6">Hubungi Kami</h1>
        <p className="text-lg text-slate-600">Tim kami siap membantu Anda mendigitalisasi lingkungan Anda. Jangan ragu untuk menghubungi kami.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Informasi Kontak */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Kantor Pusat</h3>
              <p className="text-slate-600 leading-relaxed">
                Gedung WargaLink Lantai 4<br />
                Jl. Jenderal Sudirman No. 123<br />
                Senayan, Jakarta Selatan 12190
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Telepon & WhatsApp</h3>
              <p className="text-slate-600">Customer Service: +62 811-2233-4455</p>
              <p className="text-slate-600">Sales & Kemitraan: +62 811-2233-4466</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Email</h3>
              <p className="text-slate-600">Umum: halo@wargalink.id</p>
              <p className="text-slate-600">Bantuan: support@wargalink.id</p>
            </div>
          </div>
        </div>

        {/* Formulir */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">Kirim Pesan</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors" placeholder="Masukkan nama Anda" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors" placeholder="email@contoh.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Pesan</label>
              <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors" placeholder="Tuliskan pertanyaan atau kebutuhan Anda..."></textarea>
            </div>
            <button type="button" className="w-full py-4 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20 transition-all">
              Kirim Pesan Sekarang
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

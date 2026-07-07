export default function TentangPage() {
  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-6">Tentang WargaLink</h1>
        <p className="text-xl text-slate-600">Digitalisasi Administrasi Mulai dari Lingkungan Terkecil.</p>
      </div>

      <div className="prose prose-lg prose-slate mx-auto bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-emerald-600 mb-4">Visi Kami</h2>
        <p className="text-slate-600 leading-relaxed mb-8">
          Kami bermimpi tentang sebuah tatanan masyarakat di mana birokrasi tidak lagi menjadi hal yang rumit dan melelahkan. Kami percaya bahwa transparansi dan kemudahan akses adalah kunci untuk membangun kerukunan bertetangga yang sehat di era digital.
        </p>

        <h2 className="text-2xl font-bold text-emerald-600 mb-4">Misi Kami</h2>
        <ul className="space-y-4 text-slate-600 mb-8 list-disc pl-5">
          <li>Menyediakan platform teknologi yang mudah digunakan oleh segala kalangan usia.</li>
          <li>Mengurangi penggunaan kertas (paperless) untuk pelestarian lingkungan.</li>
          <li>Menciptakan ekosistem keuangan RT yang 100% transparan bagi seluruh warga.</li>
          <li>Menjembatani komunikasi yang lebih cepat dan tanggap antara pengurus warga dan pemerintah daerah (Pemda).</li>
        </ul>

        <h2 className="text-2xl font-bold text-emerald-600 mb-4">Kisah Kami</h2>
        <p className="text-slate-600 leading-relaxed">
          Berawal dari keresahan sulitnya mengurus surat pengantar dan tidak teraturnya catatan kas RT, WargaLink dibangun sebagai solusi nyata atas masalah sehari-hari. Kini WargaLink telah berkembang menjadi platform yang dipercaya oleh ratusan RT dan membantu puluhan ribu warga di Indonesia.
        </p>
      </div>
    </div>
  );
}

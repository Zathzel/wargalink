"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { SuratTemplate } from "@/components/SuratTemplate";
import { ArrowLeft, FileDown, Loader2, Printer } from "lucide-react";
import { Suspense, useState } from "react";
import { generateAndOpenPDF } from "@/lib/generatePDF";
import { toast } from "sonner";

function PreviewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const jenis = searchParams.get("jenis") || "Surat Keterangan";
  const nama = searchParams.get("nama") || "Budi Santoso";
  const [loading, setLoading] = useState(false);

  const handleBukaPDF = async () => {
    setLoading(true);
    try {
      toast.loading("Membuat file PDF...", { id: "pdf-gen" });
      await generateAndOpenPDF(`${jenis.replace(/\s+/g, "_")}_WargaLink.pdf`);
      toast.success("PDF berhasil dibuat! Cek tab baru.", { id: "pdf-gen" });
    } catch {
      toast.error("Gagal membuat PDF. Coba lagi.", { id: "pdf-gen" });
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    toast.info("Membuka dialog cetak...", { duration: 1500 });
    setTimeout(() => window.print(), 500);
  };

  return (
    <>
      {/* Print CSS — hanya aktif saat @media print */}
      <style>{`
        @media print {
          /* Sembunyikan toolbar saat print */
          .no-print {
            display: none !important;
          }

          /* Hapus background abu-abu */
          body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          /* Konten surat mengisi halaman penuh */
          .print-area {
            padding: 0 !important;
            display: block !important;
          }

          /* Pastikan surat tidak terpotong */
          #surat-cetak {
            box-shadow: none !important;
            page-break-inside: avoid;
          }

          /* Page settings */
          @page {
            size: A4 portrait;
            margin: 0;
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); }
          20%, 40%, 60%, 80% { transform: translateX(6px); }
        }
      `}</style>

      <div className="min-h-screen bg-slate-300">
        {/* Toolbar — hidden on print */}
        <div className="no-print sticky top-0 z-50 bg-white border-b border-slate-200 shadow flex items-center justify-between px-4 sm:px-6 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Kembali</span>
          </button>

          <div className="text-center hidden sm:block">
            <p className="text-sm font-bold text-slate-800">{jenis.toUpperCase()}</p>
            <p className="text-xs text-slate-400">No. 145/RT01/VI/2026 · WargaLink</p>
          </div>

          <div className="flex items-center gap-2">
            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-200 transition-all active:scale-95 border border-slate-200"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Cetak</span>
            </button>

            {/* PDF Button */}
            <button
              onClick={handleBukaPDF}
              disabled={loading}
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /><span>Memproses...</span></>
              ) : (
                <><FileDown className="w-4 h-4" /><span className="hidden sm:inline">Buka / Unduh PDF</span><span className="sm:hidden">PDF</span></>
              )}
            </button>
          </div>
        </div>

        {/* Surat Preview Area */}
        <div className="print-area flex justify-center items-start py-10 px-4 overflow-x-auto">
          <div
            className="shadow-2xl"
            style={{ background: "white", display: "inline-block" }}
          >
            <SuratTemplate
              jenisSurat={jenis.toUpperCase()}
              nama={nama}
              nik="3174001234567890"
              tempatTanggalLahir="Jakarta, 17 Agustus 1980"
              alamat="Jl. Warga Mufakat No. 45, RT 01 / RW 05, Kel. Simulasi"
              keperluan="Persyaratan Administratif"
              tanggalSurat="15 Juni 2026"
              nomorSurat="145/RT01/VI/2026"
            />
          </div>
        </div>

        {/* Helper text — hidden on print */}
        <div className="no-print">
          <div className="text-center pb-8 space-y-2">
            <p className="text-sm text-slate-500">
              Klik <strong className="text-blue-600">Buka / Unduh PDF</strong> untuk membuka file PDF di tab baru,
              atau <strong className="text-slate-700">Cetak</strong> untuk langsung mencetak.
            </p>
            <p className="text-xs text-slate-400">
              Pastikan printer dalam status online. Surat akan otomatis diformat ukuran A4.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default function SuratPreviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <p className="text-sm font-medium">Memuat surat...</p>
        </div>
      </div>
    }>
      <PreviewContent />
    </Suspense>
  );
}

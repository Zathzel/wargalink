"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Shield, MapPin, Bell, LogOut, ChevronRight, Check, FileText } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

export default function WargaProfil() {
  const { currentUser, logoutUser } = useApp();
  const router = useRouter();

  // Modal states
  const [openKeluarga, setOpenKeluarga] = useState(false);
  const [openAlamat, setOpenAlamat] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const [openKeamanan, setOpenKeamanan] = useState(false);
  const [openDokumen, setOpenDokumen] = useState(false);
  const [activeDocTab, setActiveDocTab] = useState<"ktp" | "kk">("ktp");

  // Forms states
  const [pinLama, setPinLama] = useState("");
  const [pinBaru, setPinBaru] = useState("");
  const [notifIuran, setNotifIuran] = useState(true);
  const [notifPengumuman, setNotifPengumuman] = useState(true);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logoutUser();
    toast.success("Berhasil keluar dari akun Warga.");
    router.push("/");
  };

  const handleSaveKeamanan = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenKeamanan(false);
    setPinLama("");
    setPinBaru("");
    toast.success("PIN Keamanan berhasil diperbarui!");
  };

  const handleSaveNotif = () => {
    setOpenNotif(false);
    toast.success("Pengaturan notifikasi berhasil disimpan.");
  };

  const wargaNama = currentUser ? currentUser.desc.split(",")[0].trim() : "Budi Santoso";

  return (
    <div className="flex flex-col min-h-screen bg-transparent pb-8">
      {/* Profil Header */}
      <div className="bg-primary text-white p-6 pb-20 rounded-b-[2rem] shadow-md flex items-center gap-4">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/40 shadow-inner">
          <User className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold">{wargaNama}</h2>
          <p className="text-primary-foreground/80 text-sm">NIK: 3171230101800001</p>
        </div>
      </div>

      {/* Profil Menus */}
      <div className="px-4 -mt-12 space-y-4">
        <Card className="shadow-md">
          <CardContent className="p-0">
            <div className="flex flex-col divide-y">
              <div 
                className="p-4 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer"
                onClick={() => setOpenKeluarga(true)}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-slate-100 p-2 rounded-lg text-slate-600">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-slate-800">Data Keluarga</p>
                    <p className="text-xs text-slate-500">Anggota KK & Dokumen</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>
              <div 
                className="p-4 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer"
                onClick={() => setOpenAlamat(true)}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-slate-100 p-2 rounded-lg text-slate-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-slate-800">Alamat & Kontak</p>
                    <p className="text-xs text-slate-500">Domisili saat ini</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>
              <div 
                className="p-4 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer"
                onClick={() => setOpenDokumen(true)}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-slate-100 p-2 rounded-lg text-slate-600">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-slate-800">Dokumen Saya</p>
                    <p className="text-xs text-slate-500">KTP & Kartu Keluarga Digital</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <h3 className="font-semibold text-slate-800 pt-2 px-1 text-sm uppercase tracking-wider">Pengaturan</h3>
        <Card className="shadow-md">
          <CardContent className="p-0">
            <div className="flex flex-col divide-y">
              <div 
                className="p-4 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer"
                onClick={() => setOpenNotif(true)}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-slate-100 p-2 rounded-lg text-slate-600">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-slate-800">Notifikasi</p>
                    <p className="text-xs text-slate-500">Pengaturan notif iuran & surat</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>
              <div 
                className="p-4 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer"
                onClick={() => setOpenKeamanan(true)}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-slate-100 p-2 rounded-lg text-slate-600">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-slate-800">Keamanan</p>
                    <p className="text-xs text-slate-500">Ubah PIN / Password</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="pt-6">
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center justify-center py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 transition-all font-semibold"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Keluar Akun
          </button>
          <p className="text-center text-xs text-slate-400 mt-4">WargaLink v1.0.0</p>
        </div>
      </div>

      {/* Modal Data Keluarga */}
      <Dialog open={openKeluarga} onOpenChange={setOpenKeluarga}>
        <DialogContent className="sm:max-w-md w-[90%] rounded-xl">
          <DialogHeader>
            <DialogTitle>Data Anggota Keluarga</DialogTitle>
            <DialogDescription>Daftar anggota keluarga yang terdaftar dalam KK.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <div className="bg-slate-50 p-3 rounded-lg border flex justify-between items-center">
              <div>
                <p className="font-semibold text-slate-800 text-sm">{wargaNama}</p>
                <p className="text-xs text-slate-500">Kepala Keluarga</p>
              </div>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Tetap</Badge>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border flex justify-between items-center">
              <div>
                <p className="font-semibold text-slate-800 text-sm">Siti Aminah</p>
                <p className="text-xs text-slate-500">Istri</p>
              </div>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Tetap</Badge>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border flex justify-between items-center text-slate-400 border-dashed">
              <span className="text-xs font-medium">+ Tambah Anggota Keluarga (Hubungi RT)</span>
            </div>
          </div>
          <DialogFooter>
            <Button className="w-full" onClick={() => setOpenKeluarga(false)}>Tutup</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Alamat & Kontak */}
      <Dialog open={openAlamat} onOpenChange={setOpenAlamat}>
        <DialogContent className="sm:max-w-md w-[90%] rounded-xl">
          <DialogHeader>
            <DialogTitle>Alamat & Kontak</DialogTitle>
            <DialogDescription>Detail informasi domisili dan kontak Anda.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-1">
              <p className="text-xs text-slate-400 font-bold uppercase">Alamat Domisili</p>
              <p className="text-sm font-semibold text-slate-800">Jl. Merdeka No. 45, RT 01 / RW 05, Blok A2 No 15</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-400 font-bold uppercase">Nomor HP</p>
              <p className="text-sm font-semibold text-slate-800">081234567890</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-400 font-bold uppercase">Status Hunian</p>
              <p className="text-sm font-semibold text-slate-800">Milik Sendiri</p>
            </div>
          </div>
          <DialogFooter>
            <Button className="w-full" onClick={() => setOpenAlamat(false)}>Tutup</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Notifikasi */}
      <Dialog open={openNotif} onOpenChange={setOpenNotif}>
        <DialogContent className="sm:max-w-md w-[90%] rounded-xl">
          <DialogHeader>
            <DialogTitle>Pengaturan Notifikasi</DialogTitle>
            <DialogDescription>Pilih notifikasi yang ingin Anda terima.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800">Tagihan Iuran</p>
                <p className="text-xs text-slate-500">Ingatkan saya setiap awal bulan</p>
              </div>
              <input 
                type="checkbox" 
                checked={notifIuran}
                onChange={(e) => setNotifIuran(e.target.checked)}
                className="w-5 h-5 text-primary rounded border-slate-300 focus:ring-primary"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800">Pengumuman & Info RT</p>
                <p className="text-xs text-slate-500">Notifikasi pengumuman mendesak</p>
              </div>
              <input 
                type="checkbox" 
                checked={notifPengumuman}
                onChange={(e) => setNotifPengumuman(e.target.checked)}
                className="w-5 h-5 text-primary rounded border-slate-300 focus:ring-primary"
              />
            </div>
          </div>
          <DialogFooter>
            <Button className="w-full" onClick={handleSaveNotif}>Simpan Pengaturan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Keamanan */}
      <Dialog open={openKeamanan} onOpenChange={setOpenKeamanan}>
        <DialogContent className="sm:max-w-md w-[90%] rounded-xl">
          <DialogHeader>
            <DialogTitle>Keamanan Akun</DialogTitle>
            <DialogDescription>Ganti PIN keamanan warga Anda untuk masuk.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveKeamanan} className="space-y-4 py-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">PIN Lama</label>
              <input 
                type="password" 
                maxLength={6}
                value={pinLama}
                onChange={(e) => setPinLama(e.target.value)}
                placeholder="******"
                className="w-full px-3 py-2 border rounded-lg text-slate-800 text-center tracking-widest font-mono text-lg focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">PIN Baru</label>
              <input 
                type="password" 
                maxLength={6}
                value={pinBaru}
                onChange={(e) => setPinBaru(e.target.value)}
                placeholder="******"
                className="w-full px-3 py-2 border rounded-lg text-slate-800 text-center tracking-widest font-mono text-lg focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
            <DialogFooter className="pt-2">
              <Button type="submit" className="w-full">Simpan PIN</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal Dokumen Saya */}
      <Dialog open={openDokumen} onOpenChange={setOpenDokumen}>
        <DialogContent className="sm:max-w-md w-[95%] max-h-[90vh] overflow-y-auto rounded-2xl bg-white">
          <DialogHeader className="pb-2">
            <DialogTitle className="text-xl font-bold text-slate-800">Dokumen Saya</DialogTitle>
            <DialogDescription>
              Akses cepat KTP dan Kartu Keluarga versi digital Anda.
            </DialogDescription>
          </DialogHeader>

          {/* Custom Tabs Toggle */}
          <div className="flex bg-slate-100 p-1 rounded-xl w-full mb-4 font-semibold text-xs border">
            <button
              onClick={() => setActiveDocTab("ktp")}
              className={`flex-1 py-2 rounded-lg transition-all ${
                activeDocTab === "ktp" ? "bg-white text-primary shadow" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              KTP Digital
            </button>
            <button
              onClick={() => setActiveDocTab("kk")}
              className={`flex-1 py-2 rounded-lg transition-all ${
                activeDocTab === "kk" ? "bg-white text-primary shadow" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Kartu Keluarga (KK)
            </button>
          </div>

          {activeDocTab === "ktp" && (
            <div className="py-2 flex justify-center">
              {/* KTP Card Mockup */}
              <div className="w-full max-w-[340px] aspect-[1.58/1] bg-gradient-to-br from-blue-700 via-sky-600 to-blue-900 rounded-xl p-4 shadow-xl text-white font-sans relative overflow-hidden border border-white/20 select-none">
                {/* Hologram/Watermark */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-10 right-4 w-12 h-12 bg-yellow-400/20 rounded-full blur-xl animate-pulse" />

                {/* Header */}
                <div className="text-center border-b border-white/25 pb-1 mb-2">
                  <p className="text-[7px] font-black tracking-widest uppercase text-sky-200">Republik Indonesia</p>
                  <p className="text-[8px] font-black uppercase text-white">Provinsi DKI Jakarta</p>
                </div>

                <div className="flex gap-2">
                  {/* Photo & Signature */}
                  <div className="w-[80px] shrink-0 flex flex-col items-center gap-1">
                    <div className="w-full aspect-[3/4] bg-sky-200/20 rounded border border-white/10 flex items-center justify-center overflow-hidden">
                      <User className="w-10 h-10 text-sky-100/65" />
                    </div>
                    <span className="text-[5px] text-white/50 tracking-wider font-mono">Ttd. Pemegang</span>
                    <span className="font-serif italic text-white/80 text-[10px] transform rotate-[-5deg]">BudiS</span>
                  </div>

                  {/* Fields */}
                  <div className="flex-1 text-[7px] space-y-0.5 leading-snug">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-[8px] font-black tracking-wider text-sky-150">NIK :</span>
                      <span className="text-[8.5px] font-black tracking-wider font-mono">3171230101800001</span>
                    </div>
                    {[
                      ["Nama", wargaNama],
                      ["Tempat/Tgl Lahir", "JAKARTA, 01-01-1980"],
                      ["Jenis Kelamin", "LAKI-LAKI"],
                      ["Alamat", "JL. MERDEKA NO. 45"],
                      ["     RT/RW", "001/005"],
                      ["     Kel/Desa", "SIMULASI"],
                      ["     Kecamatan", "CONTOH"],
                      ["Agama", "ISLAM"],
                      ["Status Perkawinan", "KAWIN"],
                      ["Pekerjaan", "KARYAWAN SWASTA"],
                      ["Kewarganegaraan", "WNI"],
                      ["Berlaku Hingga", "SEUMUR HIDUP"],
                    ].map(([lbl, val]) => (
                      <div key={lbl} className="flex">
                        <span className="w-24 shrink-0 uppercase tracking-tight text-sky-200 font-bold">{lbl}</span>
                        <span className="w-1 shrink-0">:</span>
                        <span className="flex-1 font-semibold truncate">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeDocTab === "kk" && (
            <div className="py-1">
              {/* KK Sheet Mockup */}
              <div className="w-full bg-amber-50/20 border-2 border-slate-300 rounded-xl p-4 shadow-md font-sans text-slate-800 text-[8px] leading-relaxed">
                <div className="text-center mb-3 border-b-2 border-double border-slate-300 pb-2">
                  <h4 className="font-extrabold text-sm tracking-wider uppercase text-slate-800">Kartu Keluarga</h4>
                  <p className="font-semibold text-slate-500">No. 3171234567890001</p>
                </div>

                <div className="space-y-1 mb-3">
                  <div className="flex">
                    <span className="w-24 font-bold text-slate-500 uppercase">Nama Kepala Keluarga</span>
                    <span className="w-2">:</span>
                    <span className="font-extrabold text-slate-800">{wargaNama}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 font-bold text-slate-500 uppercase">Alamat Lengkap</span>
                    <span className="w-2">:</span>
                    <span className="font-extrabold text-slate-800">Jl. Merdeka No. 45, RT 01 / RW 05</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 font-bold text-slate-500 uppercase">Kecamatan / Kelurahan</span>
                    <span className="w-2">:</span>
                    <span className="font-extrabold text-slate-800">Contoh / Simulasi</span>
                  </div>
                </div>

                {/* Table */}
                <div className="border border-slate-300 rounded overflow-hidden">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-300 text-left font-bold text-slate-600">
                        <th className="p-1 border-r border-slate-300">Nama Lengkap</th>
                        <th className="p-1 border-r border-slate-300">NIK</th>
                        <th className="p-1 border-r border-slate-300">Jenis Kelamin</th>
                        <th className="p-1">Hubungan</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-200">
                        <td className="p-1 border-r border-slate-200 font-extrabold">{wargaNama}</td>
                        <td className="p-1 border-r border-slate-200 font-mono">3171230101800001</td>
                        <td className="p-1 border-r border-slate-200">Laki-laki</td>
                        <td className="p-1 font-semibold">Kepala Keluarga</td>
                      </tr>
                      <tr>
                        <td className="p-1 border-r border-slate-200 font-extrabold">Siti Aminah</td>
                        <td className="p-1 border-r border-slate-200 font-mono">3171230202850001</td>
                        <td className="p-1 border-r border-slate-200">Perempuan</td>
                        <td className="p-1 font-semibold">Istri</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-3 text-right text-[6px] font-bold text-slate-400 uppercase tracking-widest">
                  Dokumen Resmi Kependudukan · WargaLink
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="pt-2">
            <Button className="w-full" onClick={() => setOpenDokumen(false)}>Tutup</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

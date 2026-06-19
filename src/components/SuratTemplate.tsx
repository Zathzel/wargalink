import React from 'react';

interface SuratTemplateProps {
  jenisSurat: string;
  nama: string;
  nik: string;
  tempatTanggalLahir: string;
  alamat: string;
  keperluan: string;
  tanggalSurat: string;
  nomorSurat: string;
}

export function SuratTemplate({
  jenisSurat,
  nama,
  nik,
  tempatTanggalLahir,
  alamat,
  keperluan,
  tanggalSurat,
  nomorSurat
}: SuratTemplateProps) {
  return (
    <div
      id="surat-cetak"
      className="bg-white text-black font-serif"
      style={{
        width: '210mm',
        minHeight: '297mm',
        padding: '20mm 25mm',
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      {/* Kop Surat */}
      <div style={{ display: 'flex', alignItems: 'center', borderBottom: '4px solid black', paddingBottom: '12px', marginBottom: '2px' }}>
        <div style={{ width: '80px', height: '88px', border: '2px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontSize: '10px', fontWeight: 'bold', flexShrink: 0, lineHeight: 1.2 }}>
          LOGO<br/>DAERAH
        </div>
        <div style={{ flex: 1, textAlign: 'center', paddingLeft: '16px', paddingRight: '16px' }}>
          <div style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', lineHeight: 1.3 }}>Pemerintah Kota Admin</div>
          <div style={{ fontSize: '15px', fontWeight: 'bold', textTransform: 'uppercase', lineHeight: 1.3 }}>Kecamatan Contoh</div>
          <div style={{ fontSize: '15px', fontWeight: 'bold', textTransform: 'uppercase', lineHeight: 1.3 }}>Kelurahan Simulasi</div>
          <div style={{ fontSize: '16px', fontWeight: '900', textTransform: 'uppercase', marginTop: '4px', lineHeight: 1.3 }}>Rukun Warga 05 / Rukun Tetangga 01</div>
          <div style={{ fontSize: '12px', marginTop: '4px' }}>Sekretariat: Jl. Warga Mufakat No. 123, Telp. 08123456789</div>
        </div>
      </div>
      <div style={{ borderBottom: '1px solid black', marginBottom: '24px' }} />

      {/* Judul Surat */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
          {jenisSurat}
        </div>
        <div style={{ fontSize: '13px', marginTop: '4px' }}>Nomor: {nomorSurat}</div>
      </div>

      {/* Isi Surat */}
      <div style={{ fontSize: '13px', lineHeight: 1.8, textAlign: 'justify' }}>
        <p style={{ marginBottom: '16px' }}>
          Yang bertanda tangan di bawah ini, Ketua RT 01 / RW 05 Kelurahan Simulasi, Kecamatan Contoh, Kota Admin, dengan ini menerangkan bahwa:
        </p>

        <div style={{ marginLeft: '32px', marginBottom: '16px' }}>
          {[
            ['Nama Lengkap', nama, true],
            ['Nomor Induk Kependudukan (NIK)', nik, false],
            ['Tempat, Tanggal Lahir', tempatTanggalLahir, false],
            ['Alamat Lengkap', alamat, false],
            ['Maksud / Keperluan', keperluan, true],
          ].map(([label, value, bold]) => (
            <div key={String(label)} style={{ display: 'flex', marginBottom: '6px' }}>
              <span style={{ width: '200px', flexShrink: 0 }}>{label}</span>
              <span style={{ width: '16px', flexShrink: 0 }}>:</span>
              <span style={{ flex: 1, fontWeight: bold ? 'bold' : 'normal' }}>{value}</span>
            </div>
          ))}
        </div>

        <p style={{ marginBottom: '12px' }}>
          Orang tersebut di atas adalah benar-benar warga dan penduduk yang berdomisili di RT 01 / RW 05 Kelurahan Simulasi. Surat pengantar ini diberikan untuk keperluan kelengkapan administrasi yang bersangkutan.
        </p>
        <p>
          Demikian surat keterangan ini dibuat dengan sebenar-benarnya untuk dapat dipergunakan sebagaimana mestinya.
        </p>
      </div>

      {/* Tanda Tangan */}
      <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ textAlign: 'center', width: '220px', position: 'relative', fontSize: '13px' }}>
          <div>Kota Admin, {tanggalSurat}</div>
          <div style={{ fontWeight: 'bold', marginTop: '4px' }}>Ketua RT 01 / RW 05</div>

          <div style={{ height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            {/* Stempel bulat */}
            <div style={{
              position: 'absolute',
              width: '100px',
              height: '100px',
              border: '4px solid #1e40af',
              borderRadius: '50%',
              opacity: 0.25,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'rotate(-15deg)',
              fontWeight: 'bold',
              fontSize: '16px',
              color: '#1e40af',
              top: '50%',
              left: '50%',
              marginLeft: '-50px',
              marginTop: '-50px',
            }}>
              CAP RT
            </div>
            <span style={{
              fontFamily: '"Brush Script MT", cursive',
              fontSize: '36px',
              color: '#1e3a8a',
              transform: 'rotate(-5deg)',
              display: 'inline-block',
              position: 'relative',
              zIndex: 1,
            }}>
              Bapak RT
            </span>
          </div>

          <div style={{ fontWeight: 'bold', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
            Budi Setiawan
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import L from 'leaflet';
import { useApp } from '@/context/AppContext';

interface MapComponentProps {
  searchQuery?: string;
  kelurahanFilter?: string;
  onSelectRt?: (id: number) => void;
}

// Custom colored marker factory
function createColoredMarker(color: string): L.DivIcon {
  return L.divIcon({
    className: '',
    html: `
      <div style="
        width: 34px; height: 34px;
        background: ${color};
        border: 3px solid white;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 4px 12px rgba(0,0,0,0.25);
        display: flex; align-items: center; justify-content: center;
      ">
        <div style="
          transform: rotate(45deg);
          color: white;
          font-size: 11px;
          font-weight: 800;
          font-family: sans-serif;
          line-height: 1;
          margin-top: 2px;
        ">RT</div>
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -38],
  });
}

const MARKER_COLORS: Record<string, string> = {
  Aktif: '#2563eb',   // blue-600
  Baru: '#f59e0b',    // amber-500
  'Non-Aktif': '#94a3b8', // slate-400
};

export default function MapComponent({ searchQuery = "", kelurahanFilter = "Semua", onSelectRt }: MapComponentProps) {
  const { daftarWarga } = useApp();

  // Fix for default marker icons in Leaflet with Next.js
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  const position: [number, number] = [-6.200000, 106.816666];

  const rt01Count = daftarWarga.filter(w => w.rt === "01").length;
  const rt02Count = daftarWarga.filter(w => w.rt === "02").length;

  const rts = [
    {
      id: 1, lat: -6.200, lng: 106.816, name: "RT 01 / RW 05", kelurahan: "Simulasi",
      status: "Aktif", warga: 139 + rt01Count, suratBulanIni: 15,
      iuranTerkumpul: 4500000, koordinator: "Budi Setiawan"
    },
    {
      id: 2, lat: -6.210, lng: 106.820, name: "RT 02 / RW 05", kelurahan: "Simulasi",
      status: "Aktif", warga: 88 + rt02Count, suratBulanIni: 8,
      iuranTerkumpul: 3200000, koordinator: "Siti Rahayu"
    },
    {
      id: 3, lat: -6.195, lng: 106.810, name: "RT 01 / RW 01", kelurahan: "Gambir",
      status: "Baru", warga: 45, suratBulanIni: 3,
      iuranTerkumpul: 1800000, koordinator: "Ahmad Fauzi"
    },
  ];

  const filteredRts = rts.filter((rt) => {
    const matchSearch =
      rt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rt.kelurahan.toLowerCase().includes(searchQuery.toLowerCase());
    const matchKelurahan =
      kelurahanFilter === "Semua" || rt.kelurahan === kelurahanFilter;
    return matchSearch && matchKelurahan;
  });

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {filteredRts.map(rt => {
        const markerColor = MARKER_COLORS[rt.status] || MARKER_COLORS['Non-Aktif'];
        const icon = createColoredMarker(markerColor);
        return (
          <Marker
            key={rt.id}
            position={[rt.lat, rt.lng]}
            icon={icon}
            eventHandlers={{
              click: () => onSelectRt?.(rt.id),
            }}
          >
            <Popup minWidth={200}>
              <div style={{ fontFamily: 'sans-serif', padding: '4px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <strong style={{ fontSize: '14px', color: '#1e293b' }}>{rt.name}</strong>
                  <span style={{
                    fontSize: '10px', fontWeight: '700',
                    background: rt.status === 'Aktif' ? '#d1fae5' : '#fef3c7',
                    color: rt.status === 'Aktif' ? '#065f46' : '#92400e',
                    padding: '2px 8px', borderRadius: '99px'
                  }}>
                    {rt.status}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>
                  📍 Kel. {rt.kelurahan}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '8px' }}>
                  {[
                    { label: '👥 Warga', value: `${rt.warga} jiwa` },
                    { label: '📄 Surat', value: `${rt.suratBulanIni} dok` },
                    { label: '💰 Iuran', value: `Rp ${(rt.iuranTerkumpul / 1000000).toFixed(1)}jt` },
                    { label: '👤 Koordinator', value: rt.koordinator },
                  ].map(item => (
                    <div key={item.label} style={{ background: '#f8fafc', borderRadius: '6px', padding: '6px' }}>
                      <div style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '2px' }}>{item.label}</div>
                      <div style={{ fontSize: '11px', fontWeight: '700', color: '#334155' }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

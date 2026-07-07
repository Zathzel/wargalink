"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Store, MoreHorizontal, Check, X, Eye, Activity, ShieldAlert, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { StaggerContainer, StaggerItem } from "@/components/ui/animated-container";

interface Product {
  id: string;
  name: string;
  seller: string;
  price: number;
  category: "Makanan" | "Jasa" | "Barang";
  status: "Aktif" | "Pending" | "Dibekukan";
  sold: number;
  location: string;
  dateAdded: string;
}

const INITIAL_PRODUCTS: Product[] = [
  { id: "p1", name: "Nasi Bakar Ayam Suwir Spesial", seller: "Dapur Bu Sisca", price: 15000, category: "Makanan", status: "Aktif", sold: 124, location: "Blok A2 No 5", dateAdded: "2023-10-12" },
  { id: "p2", name: "Jasa Service AC & Cuci", seller: "Pak Budi Teknik", price: 75000, category: "Jasa", status: "Aktif", sold: 45, location: "Blok B1 No 12", dateAdded: "2023-10-14" },
  { id: "p3", name: "Risoles Mayo Isi Daging Asap", seller: "Snack Nyonya", price: 35000, category: "Makanan", status: "Aktif", sold: 300, location: "Blok C No 8", dateAdded: "2023-10-15" },
  { id: "p4", name: "Kemeja Flanel Preloved Brand", seller: "Thrift Warga", price: 45000, category: "Barang", status: "Aktif", sold: 12, location: "Blok A1 No 2", dateAdded: "2023-10-20" },
  { id: "p5", name: "Kue Kering Nastar (PO)", seller: "Oma Bakery", price: 85000, category: "Makanan", status: "Pending", sold: 0, location: "Blok D No 4", dateAdded: "2023-10-25" },
];

export default function AdminUMKMPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.seller.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpdateStatus = (id: string, newStatus: Product["status"]) => {
    setProducts(products.map(p => p.id === id ? { ...p, status: newStatus } : p));
    toast.success(`Status produk berhasil diubah menjadi ${newStatus}`);
  };

  const stats = [
    { label: "Total UMKM Aktif", value: products.filter(p => p.status === "Aktif").length.toString(), icon: Store, color: "text-blue-500", bg: "bg-blue-100" },
    { label: "Menunggu Verifikasi", value: products.filter(p => p.status === "Pending").length.toString(), icon: ShieldAlert, color: "text-amber-500", bg: "bg-amber-100" },
    { label: "Total Penjualan", value: products.reduce((acc, p) => acc + p.sold, 0).toString(), icon: Activity, color: "text-emerald-500", bg: "bg-emerald-100" },
  ];

  return (
    <div className="pb-24">
      {/* Admin Header */}
      <div className="bg-white/50 backdrop-blur-xl p-6 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Store className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Kelola Pasar Warga</h1>
            <p className="text-slate-500 text-sm font-medium">Verifikasi dan kelola daftar UMKM warga</p>
          </div>
        </div>
      </div>

      <StaggerContainer className="p-6 max-w-7xl mx-auto space-y-6">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <StaggerItem key={i}>
              <Card className="border-0 shadow-sm bg-white overflow-hidden group hover:shadow-md transition-all">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
                    <p className="text-3xl font-black text-slate-800">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center transform group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </div>

        <StaggerItem>
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-lg font-bold">Katalog Produk UMKM</CardTitle>
                <p className="text-sm text-slate-500">Monitor dan verifikasi jualan warga di lingkungan Anda.</p>
              </div>
              <div className="relative w-full md:w-72">
                <input 
                  type="text"
                  placeholder="Cari produk atau penjual..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 uppercase bg-slate-50 rounded-t-xl">
                    <tr>
                      <th className="px-6 py-4 font-bold rounded-tl-xl">Produk & Penjual</th>
                      <th className="px-6 py-4 font-bold">Kategori</th>
                      <th className="px-6 py-4 font-bold">Harga</th>
                      <th className="px-6 py-4 font-bold">Terjual</th>
                      <th className="px-6 py-4 font-bold">Status</th>
                      <th className="px-6 py-4 font-bold text-right rounded-tr-xl">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-800">{p.name}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{p.seller} • {p.location}</div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className="bg-slate-50">{p.category}</Badge>
                        </td>
                        <td className="px-6 py-4 font-medium">Rp {(p.price).toLocaleString('id-ID')}</td>
                        <td className="px-6 py-4 font-medium text-slate-600">{p.sold}</td>
                        <td className="px-6 py-4">
                          <Badge 
                            variant="secondary" 
                            className={
                              p.status === "Aktif" ? "bg-emerald-100 text-emerald-700" :
                              p.status === "Pending" ? "bg-amber-100 text-amber-700" :
                              "bg-red-100 text-red-700"
                            }
                          >
                            {p.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            {p.status !== "Aktif" && (
                              <Button variant="outline" size="sm" className="h-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border-emerald-200" onClick={() => handleUpdateStatus(p.id, "Aktif")}>
                                <BadgeCheck className="w-4 h-4 mr-1" /> Verifikasi
                              </Button>
                            )}
                            {p.status !== "Dibekukan" && (
                              <Button variant="outline" size="sm" className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200" onClick={() => handleUpdateStatus(p.id, "Dibekukan")}>
                                <ShieldAlert className="w-4 h-4 mr-1" /> Bekukan
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredProducts.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                          Tidak ada data UMKM yang ditemukan.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </StaggerItem>

      </StaggerContainer>
    </div>
  );
}

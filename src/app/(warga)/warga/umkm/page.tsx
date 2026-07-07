"use client";

import { useState } from "react";

import { Search, ShoppingBag, MapPin, Phone, Star, Tag, Store } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { StaggerContainer, StaggerItem } from "@/components/ui/animated-container";

interface Product {
  id: string;
  name: string;
  seller: string;
  price: number;
  category: "Makanan" | "Jasa" | "Barang";
  rating: number;
  sold: number;
  location: string;
  desc: string;
  image: string;
}

const DUMMY_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Nasi Bakar Ayam Suwir Spesial",
    seller: "Dapur Bu Sisca",
    price: 15000,
    category: "Makanan",
    rating: 4.8,
    sold: 124,
    location: "Blok A2 No 5",
    desc: "Nasi bakar wangi kemangi dengan isian ayam suwir pedas manis. Fresh setiap hari.",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80"
  },
  {
    id: "p2",
    name: "Jasa Service AC & Cuci",
    seller: "Pak Budi Teknik",
    price: 75000,
    category: "Jasa",
    rating: 5.0,
    sold: 45,
    location: "Blok B1 No 12",
    desc: "Melayani cuci AC, tambah freon, dan perbaikan. Jujur dan bergaransi 1 bulan.",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80"
  },
  {
    id: "p3",
    name: "Risoles Mayo Isi Daging Asap",
    seller: "Snack Nyonya",
    price: 35000,
    category: "Makanan",
    rating: 4.9,
    sold: 300,
    location: "Blok C No 8",
    desc: "1 box isi 10 pcs. Renyah di luar, lumer di dalam. Cocok untuk arisan.",
    image: "https://images.unsplash.com/photo-1541529086526-db283c563270?w=800&q=80"
  },
  {
    id: "p4",
    name: "Kemeja Flanel Preloved Brand",
    seller: "Thrift Warga",
    price: 45000,
    category: "Barang",
    rating: 4.5,
    sold: 12,
    location: "Blok A1 No 2",
    desc: "Kondisi 95% masih sangat bagus. Ukuran L. Sudah dilaundry wangi.",
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80"
  }
];

export default function PasarWargaPage() {
  const [filter, setFilter] = useState<"Semua" | "Makanan" | "Jasa" | "Barang">("Semua");
  const [search, setSearch] = useState("");

  const filteredProducts = DUMMY_PRODUCTS.filter(p => {
    const matchCategory = filter === "Semua" || p.category === filter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.seller.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handlePesan = (p: Product) => {
    toast.success("Dialihkan ke WhatsApp", {
      description: `Menghubungi ${p.seller} untuk memesan ${p.name}...`
    });
  };

  return (
    <div className="pb-24 max-w-md mx-auto min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white/40 backdrop-blur-xl p-6 rounded-b-[2rem] border-b border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-2 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-400/20 rounded-full blur-[40px]"></div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
            <Store className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Pasar Warga</h2>
            <p className="text-slate-500 text-sm font-medium">Dukung UMKM tetangga kita</p>
          </div>
        </div>
      </div>

      {/* Search & Filter Sticky Header */}
      <div className="sticky top-[72px] z-20 bg-slate-50/80 backdrop-blur-xl px-5 py-4 border-b border-slate-200">
        <div className="relative mb-4">
          <input 
            type="text" 
            placeholder="Cari jajanan atau jasa tetangga..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-11 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-sm"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {["Semua", "Makanan", "Jasa", "Barang"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === cat 
                  ? "bg-orange-500 text-white shadow-md shadow-orange-500/30" 
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pt-6 space-y-6">
        
        {/* Banner Jual */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-[2rem] p-6 text-white flex items-center justify-between shadow-xl shadow-orange-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
          <div className="relative z-10 w-2/3">
            <h3 className="font-black text-lg mb-1 leading-tight">Punya Usaha di Rumah?</h3>
            <p className="text-orange-100 text-xs font-medium mb-3 opacity-90">Gratis promosi ke ratusan warga RT kita.</p>
            <Button size="sm" className="bg-white text-orange-600 hover:bg-orange-50 rounded-xl font-bold shadow-sm">
              Buka Lapak <Store className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="relative z-10 bg-white/20 p-4 rounded-3xl backdrop-blur-sm border border-white/30">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="font-bold text-slate-800 text-lg tracking-tight">Katalog Tetangga</h2>
          <span className="text-xs font-semibold text-slate-500">{filteredProducts.length} Produk</span>
        </div>

        <StaggerContainer className="grid grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <StaggerItem>
                  <Card className="border border-slate-200 shadow-sm bg-white rounded-3xl overflow-hidden group hover:shadow-md hover:border-orange-200 transition-all cursor-pointer flex flex-col h-full" onClick={() => handlePesan(p)}>
                    <div className="relative aspect-square overflow-hidden bg-slate-100">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span className="text-[10px] font-bold text-slate-700">{p.rating}</span>
                      </div>
                      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm text-white">
                        <span className="text-[10px] font-bold">{p.category}</span>
                      </div>
                    </div>
                    <CardContent className="p-3.5 flex-1 flex flex-col">
                      <p className="text-xs font-semibold text-slate-500 mb-1 flex items-center gap-1 line-clamp-1">
                        <Store className="w-3 h-3" /> {p.seller}
                      </p>
                      <h3 className="font-bold text-slate-800 text-sm leading-tight mb-2 line-clamp-2 flex-1">{p.name}</h3>
                      <div className="flex items-end justify-between mt-auto">
                        <div className="text-orange-600 font-black text-sm tracking-tight">
                          Rp {(p.price/1000).toFixed(0)}k
                        </div>
                        <div className="w-7 h-7 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
                          <ShoppingBag className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              </motion.div>
            ))}
          </AnimatePresence>
        </StaggerContainer>

        {filteredProducts.length === 0 && (
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 text-slate-300" />
            </div>
            <p className="font-bold text-slate-600">Belum ada produk</p>
            <p className="text-sm text-slate-400 mt-1">Coba gunakan kata kunci pencarian lain.</p>
          </div>
        )}

      </div>
    </div>
  );
}

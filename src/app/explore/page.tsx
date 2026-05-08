import { Search, MapPin, Star } from "lucide-react";
import Image from "next/image";

const CATEGORIES = [
  { id: 1, name: "Electrician", icon: "⚡", count: 120 },
  { id: 2, name: "Plumbing", icon: "🔧", count: 85 },
  { id: 3, name: "Cleaning", icon: "🧹", count: 210 },
  { id: 4, name: "Carpentry", icon: "🔨", count: 64 },
  { id: 5, name: "Painting", icon: "🎨", count: 92 },
  { id: 6, name: "Assembly", icon: "📦", count: 156 },
];

const TOP_WORKERS = [
  {
    id: 1,
    name: "Alex Johnson",
    title: "Master Electrician",
    rating: 4.9,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=150&h=150",
  },
  {
    id: 2,
    name: "Sarah Miller",
    title: "Professional Cleaner",
    rating: 4.8,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150",
  }
];

export default function ExplorePage() {
  return (
    <div className="flex flex-col h-full bg-gray-50/50">
      <header className="px-4 py-4 bg-white sticky top-0 z-10 border-b border-gray-100 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Explore</h1>
      </header>

      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-6 space-y-8">
        
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-2xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] transition-all"
            placeholder="Search services or workers..."
          />
        </div>

        {/* Categories Grid */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900">Categories</h2>
            <button className="text-sm font-semibold text-primary">See All</button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {CATEGORIES.map(category => (
              <div key={category.id} className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:border-primary/30">
                <div className="text-2xl">{category.icon}</div>
                <span className="text-xs font-semibold text-gray-800 text-center">{category.name}</span>
                <span className="text-[10px] text-gray-400">{category.count} jobs</span>
              </div>
            ))}
          </div>
        </section>

        {/* Top Rated Workers */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900">Top Rated Professionals</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
            {TOP_WORKERS.map(worker => (
              <div key={worker.id} className="min-w-[160px] bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center text-center shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-12 bg-primary/10"></div>
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm relative z-10 mt-2 mb-3">
                  <Image src={worker.image} alt={worker.name} fill className="object-cover" />
                </div>
                <h3 className="text-sm font-bold text-gray-900">{worker.name}</h3>
                <p className="text-[11px] text-gray-500 mb-2">{worker.title}</p>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-gray-700 bg-gray-50 px-2 py-1 rounded-md">
                  <Star size={12} className="text-[#F8AD9D] fill-[#F8AD9D]" />
                  {worker.rating} <span className="text-gray-400 font-normal">({worker.reviews})</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}

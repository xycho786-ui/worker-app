import { Menu, SlidersHorizontal, Search, MapPin, Star, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MOCK_WORKERS = [
  {
    id: 1,
    name: "Alex Johnson",
    title: "Master Electrician",
    rate: "$45/hr",
    location: "Downtown, Metropolis • 2.5 miles away",
    description: "Looking for a skilled residential electrician for high-end home renovations...",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=300&h=200",
    verified: true,
    type: "Full-time"
  },
  {
    id: 2,
    name: "Michael Brown",
    title: "Industrial Maintenance Tech",
    rate: "$1,200 Fixed",
    location: "Industrial District • 5.8 miles away",
    description: "Short-term contract for emergency troubleshooting and repair of...",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=300&h=200",
    verified: true,
    type: "Contract"
  },
  {
    id: 3,
    name: "Daniel Wilson",
    title: "Commercial Service Tech",
    rate: "$52/hr",
    location: "City Center • 1.2 miles away",
    description: "Lead electrician position for a new office complex project...",
    image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b6?auto=format&fit=crop&q=80&w=300&h=200",
    verified: false,
    type: "Full-time"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col h-full bg-gray-50/50">
      {/* Top App Bar */}
      <header className="flex justify-between items-center px-4 py-4 bg-white sticky top-0 z-10 border-b border-gray-100">
        <button className="p-2 -ml-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Find Work</h1>
        <button className="p-2 -mr-2 text-primary hover:bg-primary/10 rounded-full transition-colors">
          <SlidersHorizontal size={22} />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-6 space-y-6">
        
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-10 py-3.5 border border-gray-200 rounded-2xl leading-5 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] transition-all"
            placeholder="Search e.g. Electrician"
            defaultValue="Electrician"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button className="p-1.5 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none transition-colors">
              <span className="sr-only">Clear search</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2.5 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
          <button className="whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium bg-primary text-white shadow-sm shadow-primary/30 transition-transform active:scale-95">
            Nearby
          </button>
          <button className="whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors">
            Newest
          </button>
          <button className="whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors">
            $40/hr+
          </button>
          <button className="whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors">
            Residential
          </button>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">32 Jobs found</h2>
          
          {/* Worker Cards List */}
          <div className="space-y-5">
            {MOCK_WORKERS.map((worker) => (
              <div key={worker.id} className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden flex flex-col transition-all hover:shadow-md">
                <div className="h-44 w-full relative">
                  <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-md text-highlight text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md border border-white/10">
                    Urgently Hiring
                  </div>
                  <Image 
                    src={worker.image} 
                    alt={worker.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                
                <div className="p-5 flex flex-col gap-3">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-[19px] font-bold text-gray-900 leading-tight">{worker.title}</h3>
                    <span className="text-dark font-bold whitespace-nowrap text-lg">{worker.rate}</span>
                  </div>
                  
                  <div className="flex items-center text-[13px] text-gray-500 gap-1.5">
                    <MapPin size={14} className="text-gray-400 flex-shrink-0" />
                    <span className="truncate">{worker.location}</span>
                  </div>
                  
                  <p className="text-[14px] text-gray-600 line-clamp-2 leading-relaxed">
                    {worker.description}
                  </p>
                  
                  <div className="flex gap-2 mt-1">
                    {worker.verified && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-50 text-gray-600 text-xs font-medium border border-gray-100">
                        <ShieldCheck size={12} className="text-gray-400" /> Verified Client
                      </span>
                    )}
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-50 text-gray-600 text-xs font-medium border border-gray-100">
                      {worker.type}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <button className="w-full bg-primary-light hover:bg-primary text-white font-semibold py-2.5 rounded-xl transition-colors text-sm shadow-sm shadow-primary-light/20 active:scale-[0.98]">
                      Quick Apply
                    </button>
                    <Link href={`/jobs/${worker.id}`} className="w-full bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 font-semibold py-2.5 rounded-xl transition-colors text-sm text-center flex items-center justify-center active:scale-[0.98]">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </main>
    </div>
  );
}

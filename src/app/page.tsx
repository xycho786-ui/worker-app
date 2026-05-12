import { Menu, SlidersHorizontal, Search, MapPin, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getWorkers } from "@/lib/data";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=300&h=200";

export default async function Home() {
  const workers = await getWorkers();

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
          />
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
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">
            {workers.length > 0 ? `${workers.length} Workers found` : "Available Workers"}
          </h2>
          
          {/* Worker Cards List */}
          <div className="space-y-5">
            {workers.length > 0 ? (
              workers.map((worker) => (
                <div key={worker.id} className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden flex flex-col transition-all hover:shadow-md">
                  <div className="h-44 w-full relative">
                    <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-md text-highlight text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md border border-white/10">
                      Available
                    </div>
                    <Image 
                      src={FALLBACK_IMAGE} 
                      alt={worker.user.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  
                  <div className="p-5 flex flex-col gap-3">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-[19px] font-bold text-gray-900 leading-tight">
                        {worker.skills[0] || "General Worker"}
                      </h3>
                      <span className="text-dark font-bold whitespace-nowrap text-lg">
                        ${worker.hourlyRate || "30"}/hr
                      </span>
                    </div>
                    
                    <div className="flex items-center text-[13px] text-gray-500 gap-1.5">
                      <MapPin size={14} className="text-gray-400 flex-shrink-0" />
                      <span className="truncate">{worker.location?.address || "Metropolis"}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {worker.skills.map((skill) => (
                        <span key={skill} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[11px] rounded-md uppercase tracking-wider font-semibold">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <p className="text-[14px] text-gray-600 line-clamp-2 leading-relaxed">
                      {worker.experience} years of experience in {worker.skills.join(", ")}. 
                      Professional service guaranteed.
                    </p>
                    
                    <div className="flex gap-2 mt-1">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-50 text-gray-600 text-xs font-medium border border-gray-100">
                        <ShieldCheck size={12} className="text-gray-400" /> Verified Worker
                      </span>
                      {worker.isOnline && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-green-50 text-green-700 text-xs font-medium border border-green-100">
                          Online
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <button className="w-full bg-primary-light hover:bg-primary text-white font-semibold py-2.5 rounded-xl transition-colors text-sm shadow-sm shadow-primary-light/20 active:scale-[0.98]">
                        Quick Book
                      </button>
                      <Link href={`/jobs/${worker.id}`} className="w-full bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 font-semibold py-2.5 rounded-xl transition-colors text-sm text-center flex items-center justify-center active:scale-[0.98]">
                        View Profile
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-[20px] border border-dashed border-gray-200">
                <p className="text-gray-400">No workers found in the database.</p>
                <p className="text-sm text-gray-400 mt-2">Run the seed script to add some!</p>
              </div>
            )}
          </div>
        </div>
        
      </main>
    </div>
  );
}


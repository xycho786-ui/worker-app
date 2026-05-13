import { MapPin, Star, UserIcon, Search } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import HomeInteractions from "@/components/HomeInteractions";
import { createClient } from "@/utils/supabase/server";

export default async function Home({
  searchParams,
}: {
  searchParams: { search?: string; filter?: string };
}) {
  // Fetch session for sidebar
  const supabase = await createClient();
  const { data: { user: authUser } } = await supabase.auth.getUser();
  
  let dbUser = null;
  if (authUser?.email) {
    dbUser = await prisma.user.findUnique({ where: { email: authUser.email } });
  }

  const search = searchParams.search || "";
  const filter = searchParams.filter || "newest";

  // Build the Prisma where clause based on search
  const whereClause = search
    ? {
        OR: [
          { skills: { hasSome: [search] } },
          { user: { name: { contains: search, mode: "insensitive" as const } } },
          { category: { name: { contains: search, mode: "insensitive" as const } } },
        ],
      }
    : {};

  // Determine sort order
  let orderBy: any = { createdAt: 'desc' };
  if (filter === "top_rated") {
    orderBy = { rating: 'desc' };
  } else if (filter === "nearby") {
    // Assuming we'd sort by location proximty, for now fallback to newest
    orderBy = { createdAt: 'desc' };
  }

  // Fetch real workers from the database
  const workers = await prisma.workerProfile.findMany({
    where: whereClause,
    include: {
      user: true,
      category: true,
    },
    take: 10,
    orderBy,
  });

  return (
    <div className="flex flex-col h-full bg-gray-50/50">
      <HomeInteractions userName={dbUser?.name} userEmail={dbUser?.email} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto px-4 pb-6 space-y-6">
        
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">{workers.length} Jobs found</h2>
          
          {/* Worker Cards List */}
          <div className="space-y-5">
            {workers.length > 0 ? (
              workers.map((worker) => (
                <div key={worker.id} className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden flex flex-col transition-all hover:shadow-md">
                  <div className="h-44 w-full relative bg-gray-200 flex items-center justify-center">
                    <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-md text-highlight text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md border border-white/10">
                      {worker.isOnline ? 'Available Now' : 'Available'}
                    </div>
                    {/* Placeholder image since we don't store one yet */}
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <UserIcon size={48} className="text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col gap-3">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-[19px] font-bold text-gray-900 leading-tight">
                        {worker.skills.length > 0 ? worker.skills[0] : (worker.category?.name || "Skilled Worker")}
                      </h3>
                      <span className="text-dark font-bold whitespace-nowrap text-lg">
                        ${worker.hourlyRate || 0}/hr
                      </span>
                    </div>
                    
                    <div className="flex items-center text-[13px] text-gray-500 gap-1.5">
                      <MapPin size={14} className="text-gray-400 flex-shrink-0" />
                      <span className="truncate">{worker.locationAddress || 'Location not specified'}</span>
                    </div>
                    
                    <p className="text-[14px] text-gray-600 line-clamp-2 leading-relaxed">
                      Experienced {worker.skills.join(", ")} professional with {worker.experience} years of experience.
                      Ready to help with your project!
                    </p>
                    
                    <div className="flex gap-2 mt-1">
                      {worker.rating > 0 && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-50 text-gray-600 text-xs font-medium border border-gray-100">
                          <Star size={12} className="text-orange-400 fill-orange-400" /> {worker.rating}
                        </span>
                      )}
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-50 text-gray-600 text-xs font-medium border border-gray-100">
                        {worker.user.name}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <Link href={`/jobs/${worker.id}`} className="w-full bg-primary-light hover:bg-primary text-white font-semibold py-2.5 rounded-xl transition-colors text-sm text-center flex items-center justify-center shadow-sm shadow-primary-light/20 active:scale-[0.98]">
                        Quick Apply
                      </Link>
                      <Link href={`/jobs/${worker.id}`} className="w-full bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 font-semibold py-2.5 rounded-xl transition-colors text-sm text-center flex items-center justify-center active:scale-[0.98]">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm mt-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="text-primary" size={28} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">No workers found</h3>
                <p className="text-sm text-gray-500 max-w-[250px] mx-auto leading-relaxed">
                  There are no professionals available in your area at the moment. Check back soon!
                </p>
              </div>
            )}
          </div>
        </div>
        
      </main>
    </div>
  );
}

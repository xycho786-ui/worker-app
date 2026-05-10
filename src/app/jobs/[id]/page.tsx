import { ArrowLeft, Share2, Heart, MapPin, CheckCircle2, Star, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function JobDetails() {
  return (
    <div className="flex flex-col h-full bg-gray-50/50 pb-24">
      {/* Top App Bar */}
      <header className="flex justify-between items-center px-4 py-4 bg-white sticky top-0 z-20 border-b border-gray-100">
        <Link href="/" className="p-2 -ml-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-lg font-bold text-gray-900 tracking-tight">Job Details</h1>
        <div className="flex gap-1 -mr-2">
          <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
            <Share2 size={20} />
          </button>
          <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
            <Heart size={20} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        
        {/* Header Image section */}
        <div className="relative h-64 w-full">
          <Image 
            src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=600&h=400"
            alt="Master Electrician"
            fill
            className="object-cover"
            preload
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />
          
          <div className="absolute bottom-0 left-0 p-5 w-full">
            <div className="flex gap-2 mb-3">
              <span className="bg-[#F08080] text-white text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md">
                Urgent Hiring
              </span>
              <span className="bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md">
                Residential
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white leading-tight">Master Electrician Needed</h1>
          </div>
        </div>

        {/* Job Info Grid */}
        <div className="bg-white px-5 py-6 grid grid-cols-2 gap-y-6 gap-x-4 border-b border-gray-100">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Rate</p>
            <p className="text-xl font-bold text-[#D45E5E]">$45/hr</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Location</p>
            <p className="text-sm font-semibold text-gray-900 mt-1">Metropolis</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Duration</p>
            <p className="text-sm font-semibold text-gray-900 mt-1">2-3 Weeks</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Start Date</p>
            <p className="text-sm font-semibold text-gray-900 mt-1">Immediate</p>
          </div>
        </div>

        <div className="p-5 space-y-8">
          
          {/* Description */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Job Description</h2>
            <p className="text-[15px] text-gray-600 leading-relaxed">
              We need a skilled electrician for a residential renovation project. Tasks include wiring, circuit installation, and safety checks. The project involves upgrading a 1950s era home to modern standards, including smart home integration and heavy-duty appliance circuits.
            </p>
          </section>

          {/* Requirements */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Requirements</h2>
            <ul className="space-y-3.5">
              {[
                "Minimum 5+ years of experience in residential electrical work.",
                "Must possess own professional-grade tools and reliable transportation.",
                "Valid State Electrical Master License or Journeyman Certification.",
                "Ability to read and interpret complex architectural blueprints."
              ].map((req, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <CheckCircle2 size={18} className="text-[#F08080] flex-shrink-0 mt-0.5" />
                  <span className="text-[15px] text-gray-600 leading-snug">{req}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Location Map Placeholder */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={18} className="text-[#D45E5E]" />
              <h2 className="text-sm font-bold text-gray-900">Downtown, Metropolis</h2>
            </div>
            <div className="w-full h-40 bg-gray-200 rounded-2xl relative overflow-hidden flex items-center justify-center">
              <Image 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600&h=300"
                alt="Map area"
                fill
                className="object-cover opacity-50"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <MapPin size={36} className="text-[#D45E5E] fill-[#D45E5E]" />
              </div>
            </div>
          </section>

          {/* Client Profile */}
          <section className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col items-center text-center">
            <div className="relative mb-3">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                <Image 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100"
                  alt="Client"
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1 border-2 border-white">
                <ShieldCheck size={12} className="text-white" />
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900">Alex Johnson</h3>
            <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-500">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="font-semibold text-gray-900">4.9</span>
              <span>(124 reviews)</span>
            </div>
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mt-2">Joined March 2021</p>
            
            <div className="flex w-full justify-around mt-5 pt-5 border-t border-gray-50">
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">12</p>
                <p className="text-xs text-gray-500 font-medium">Active Jobs</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">98%</p>
                <p className="text-xs text-gray-500 font-medium">Hiring Rate</p>
              </div>
            </div>
            
            <button className="w-full mt-5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold py-2.5 rounded-xl transition-colors text-sm border border-gray-200">
              View Profile
            </button>
          </section>

        </div>
      </main>

      {/* Sticky Bottom Apply Bar */}
      <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 p-4 flex gap-3 z-30 pb-safe shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
        <button className="w-14 h-14 flex items-center justify-center border border-gray-200 rounded-2xl text-gray-600 hover:bg-gray-50 transition-colors flex-shrink-0">
          <Heart size={24} />
        </button>
        <button className="flex-1 bg-[#D45E5E] hover:bg-[#C25353] text-white font-bold rounded-2xl shadow-sm shadow-[#D45E5E]/30 transition-transform active:scale-[0.98] text-lg">
          Quick Apply
        </button>
      </div>
    </div>
  );
}

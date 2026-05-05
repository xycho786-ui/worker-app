import { Briefcase, MapPin, Clock } from "lucide-react";

export default function JobsPage() {
  return (
    <div className="flex flex-col h-full bg-gray-50/50">
      <header className="px-4 py-4 bg-white sticky top-0 z-10 border-b border-gray-100">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">My Jobs</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        {/* Toggle between Active and Past */}
        <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
          <button className="flex-1 py-2 text-sm font-bold bg-white text-gray-900 rounded-lg shadow-sm">
            Active
          </button>
          <button className="flex-1 py-2 text-sm font-semibold text-gray-500 rounded-lg">
            Past
          </button>
        </div>

        <div className="space-y-4">
          {/* Mock Active Job */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-600 text-[11px] font-bold uppercase tracking-wider">
                <Clock size={12} /> Scheduled
              </span>
              <span className="text-lg font-bold text-dark">$120</span>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-1">Residential Plumbing Repair</h3>
            <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
              <MapPin size={14} className="text-gray-400" />
              123 Main St, Apartment 4B
            </div>

            <div className="bg-gray-50 rounded-xl p-3 flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  JS
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">John Smith</p>
                  <p className="text-[11px] text-gray-500">Customer</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="py-2.5 bg-gray-50 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors">
                Cancel
              </button>
              <button className="py-2.5 bg-primary text-white rounded-xl font-semibold text-sm shadow-sm shadow-primary/20 hover:bg-primary-light transition-colors">
                Message
              </button>
            </div>
          </div>
          
          <div className="text-center py-10">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Briefcase className="text-gray-400" size={24} />
            </div>
            <h3 className="text-gray-900 font-bold mb-1">No other active jobs</h3>
            <p className="text-sm text-gray-500">When you book or accept jobs, they will appear here.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

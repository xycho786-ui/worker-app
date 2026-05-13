import Link from "next/link";
import { UserCircle, Calendar, MessageSquare, Briefcase } from "lucide-react";

export default function WorkerDashboard() {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="px-6 py-8 bg-gray-900 text-white pb-16">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Worker Portal</h1>
            <p className="opacity-80 mt-1">Manage your jobs and profile</p>
          </div>
          <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/30 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Online
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 -mt-8 space-y-6 pb-20">
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col items-center">
            <span className="text-2xl font-bold text-gray-900">0</span>
            <span className="text-xs text-gray-500 font-medium">Active Jobs</span>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col items-center">
            <span className="text-2xl font-bold text-primary">$0.00</span>
            <span className="text-xs text-gray-500 font-medium">Earnings</span>
          </div>
        </div>

        {/* Dashboard Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/profile" className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-3 hover:border-primary/30 transition-colors">
            <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center">
              <UserCircle size={20} />
            </div>
            <span className="font-semibold text-gray-800">Edit Profile</span>
          </Link>
          
          <Link href="/worker/schedule" className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-3 hover:border-primary/30 transition-colors">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <Calendar size={20} />
            </div>
            <span className="font-semibold text-gray-800">Schedule</span>
          </Link>

          <Link href="/jobs/requests" className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-3 hover:border-primary/30 transition-colors">
            <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center relative">
              <Briefcase size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            </div>
            <span className="font-semibold text-gray-800">Requests</span>
          </Link>

          <Link href="/chat" className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-3 hover:border-primary/30 transition-colors">
            <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center">
              <MessageSquare size={20} />
            </div>
            <span className="font-semibold text-gray-800">Messages</span>
          </Link>
        </div>

      </main>
    </div>
  );
}

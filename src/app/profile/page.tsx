"use client";

import { UserCircle, Shield, Settings, HelpCircle, Info, LogOut } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Profile() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="flex flex-col h-full bg-white pb-24">
      {/* Top App Bar */}
      <header className="flex justify-between items-center px-6 py-5 bg-white">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Profile</h1>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto px-6">
        
        {/* User Info */}
        <div className="flex items-center gap-4 mb-8 pt-2">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 border-2 border-white shadow-sm">
              <Image 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100"
                alt="User"
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 leading-tight">Current User</h2>
            <p className="text-sm text-gray-500">user@example.com</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-2 mb-8">
          <button className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-gray-50 transition-colors text-gray-700 font-medium">
            <UserCircle size={22} className="text-primary" />
            <span className="flex-1 text-left">Account</span>
          </button>
          
          <button className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl bg-primary/5 hover:bg-primary/10 transition-colors text-gray-900 font-medium border border-primary/20">
            <Shield size={22} className="text-primary" />
            <span className="flex-1 text-left text-primary font-semibold">Verified</span>
            <span className="bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
              Active
            </span>
          </button>
          
          <button className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-gray-50 transition-colors text-gray-700 font-medium">
            <Settings size={22} className="text-primary" />
            <span className="flex-1 text-left">Settings</span>
          </button>
          
          <button className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-gray-50 transition-colors text-gray-700 font-medium">
            <HelpCircle size={22} className="text-primary" />
            <span className="flex-1 text-left">Help Desk</span>
          </button>
          
          <button className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-gray-50 transition-colors text-gray-700 font-medium">
            <Info size={22} className="text-primary" />
            <span className="flex-1 text-left">About Us</span>
          </button>
        </div>

        {/* Premium Upgrade Card */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-[20px] p-5 mb-8 border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-1">Upgrade Profile</h3>
          <p className="text-sm text-gray-600 mb-4">Get verified to receive more job requests.</p>
          <button className="bg-primary hover:bg-primary-light text-white font-semibold py-2 px-5 rounded-full text-sm transition-colors shadow-sm shadow-primary/20">
            Verify Now
          </button>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center px-2 py-4 border-t border-gray-50">
          <span className="text-xs font-semibold text-gray-400 tracking-wider">VERSION 0.1.0</span>
          <button onClick={handleLogout} className="text-sm font-bold text-primary hover:text-primary-light transition-colors flex items-center gap-1.5 uppercase tracking-wide">
            <LogOut size={16} /> LOG OUT
          </button>
        </div>

      </main>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="flex flex-col h-full bg-[#F7F7F8] font-sans pb-24">
      <div className="px-4 pt-6 pb-2 flex justify-between items-center bg-[#F7F7F8]">
        <span className="font-extrabold text-[18px] text-[#1A2340]">Notifications</span>
        <span className="cursor-pointer text-[20px]">⚙️</span>
      </div>
      
      <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide">
        {["All", "Jobs", "Payments", "System"].map(t => (
          <button 
            key={t} 
            onClick={() => setActiveTab(t)}
            className={`px-3.5 py-1.5 rounded-full border-none cursor-pointer font-bold text-xs whitespace-nowrap transition-colors ${
              activeTab === t ? "bg-[#1A2340] text-white" : "bg-[#F0F0F0] text-[#888BA0]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center pt-32 px-6 text-center">
        <div className="text-5xl mb-4 text-[#888BA0] opacity-50">🔔</div>
        <div className="text-[16px] font-bold text-[#1A2340] mb-2">No notifications yet</div>
        <div className="text-[14px] text-[#888BA0] leading-relaxed">
          We'll notify you when you receive new job requests, messages, or payments.
        </div>
      </div>
    </div>
  );
}

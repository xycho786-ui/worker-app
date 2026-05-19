"use client";

import Link from "next/link";
import { useState } from "react";

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState("Opportunity Details");

  return (
    <div className="flex flex-col h-full bg-[#F7F7F8] font-sans pb-24">
      <div className="flex border-b-2 border-[#F0F0F0] bg-white">
        <span className="px-4 py-3.5 cursor-pointer text-[#E8514A] font-bold">←</span>
        {["Opportunity Details", "PRO-CONNECT"].map((t, i) => (
          <div 
            key={i} 
            onClick={() => setActiveTab(t)}
            className={`flex-1 py-3.5 text-center font-bold text-[13px] cursor-pointer -mb-0.5 ${
              activeTab === t 
                ? "text-[#E8514A] border-b-2 border-[#E8514A]" 
                : "text-[#888BA0] border-b-2 border-transparent"
            }`}
          >
            {t}
          </div>
        ))}
      </div>

      {activeTab === "Opportunity Details" && (
        <div className="flex flex-col items-center justify-center pt-32 px-6 text-center">
          <div className="text-5xl mb-4 text-[#888BA0] opacity-50">📋</div>
          <div className="text-[16px] font-bold text-[#1A2340] mb-2">No jobs available yet</div>
          <div className="text-[14px] text-[#888BA0] leading-relaxed">
            When you accept a new opportunity, all the details, location, and client information will appear here.
          </div>
        </div>
      )}
      {activeTab === "PRO-CONNECT" && (
        <div className="p-8 text-center text-[#888BA0] text-sm">
          Connect directly with the client for initial negotiation.
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";

export default function ChatPage() {
  const [activeTab, setActiveTab] = useState("All Chats");

  return (
    <div className="flex flex-col h-full bg-[#F7F7F8] font-sans pb-24 relative">
      <div className="px-4 pt-6 pb-2 flex justify-between items-center bg-[#F7F7F8]">
        <span className="font-extrabold text-[18px] text-[#1A2340]">Messages</span>
        <span className="cursor-pointer text-[20px]">🔍</span>
      </div>
      
      <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide">
        {["All Chats", "Unread", "Archived"].map(t => (
          <button 
            key={t} 
            onClick={() => setActiveTab(t)}
            className={`px-4 py-1.5 rounded-full border-none cursor-pointer font-bold text-[13px] whitespace-nowrap transition-colors ${
              activeTab === t ? "bg-[#1A2340] text-white" : "bg-[#F0F0F0] text-[#888BA0]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex-1 bg-white mt-2 flex flex-col items-center justify-center text-center px-6 pt-24">
        <div className="text-5xl mb-4 text-[#888BA0] opacity-50">💬</div>
        <div className="text-[16px] font-bold text-[#1A2340] mb-2">No messages yet</div>
        <div className="text-[14px] text-[#888BA0] leading-relaxed">
          When you connect with a customer or client, your conversations will appear here.
        </div>
      </div>

      <button className="absolute bottom-[100px] right-5 w-[52px] h-[52px] rounded-full bg-[#1A2340] text-white text-xl flex items-center justify-center shadow-[0_4px_12px_rgba(26,35,64,0.3)] border-none cursor-pointer">
        ✏️
      </button>
    </div>
  );
}

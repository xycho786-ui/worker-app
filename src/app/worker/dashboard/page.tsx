import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";

export default async function WorkerDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let dbUser = null;
  if (user && user.email) {
    dbUser = await prisma.user.findUnique({
      where: { email: user.email },
      include: { workerProfile: true }
    });
  }

  const name = dbUser?.name?.split(' ')[0] || 'Worker';
  const isOnline = dbUser?.workerProfile?.isOnline ?? true;

  return (
    <div className="flex flex-col h-full bg-[#F7F7F8] font-sans pb-24">
      {/* Top Header */}
      <div className="bg-white px-4 pt-6 pb-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#E8514A22] to-[#E8514A44] flex items-center justify-center text-[#E8514A] font-bold text-sm">
            {name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="font-bold text-base text-[#1A2340]">Hi, {name} 👋</div>
            <div className="text-xs text-[#888BA0]">Verified Pro</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/worker/notifications" className="bg-[#F7F7F8] rounded-full px-3 py-1.5 flex items-center gap-1.5 cursor-pointer">
            <span className="text-base">🔔</span>
          </Link>
          <div className="flex items-center gap-1.5 bg-[#E6FBF5] rounded-full px-3 py-1.5 cursor-pointer">
            <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-[#00C896]' : 'bg-gray-400'} inline-block`}></span>
            <span className="text-xs font-bold text-[#00A87A]">{isOnline ? 'Online' : 'Offline'}</span>
          </div>
        </div>
      </div>

      {/* Dark Earnings Card */}
      <div className="bg-[#1A2340] rounded-2xl p-5 mx-4 mt-4 text-white shadow-md">
        <div className="text-xs text-[#8A9BBF] mb-1 uppercase tracking-wider">Today's Earnings</div>
        <div className="text-3xl font-extrabold tracking-tight">
          ₹0<span className="text-lg font-medium">.00</span>
        </div>
        
        <div className="flex justify-between mt-5">
          <div className="text-center">
            <div className="text-[22px] font-extrabold">-</div>
            <div className="text-[11px] text-[#8A9BBF] mt-0.5">⭐ Rating</div>
          </div>
          <div className="w-px bg-[#2D3F6A]"></div>
          <div className="text-center">
            <div className="text-[22px] font-extrabold">-</div>
            <div className="text-[11px] text-[#8A9BBF] mt-0.5">✅ Completion</div>
          </div>
          <div className="w-px bg-[#2D3F6A]"></div>
          <div className="text-center">
            <div className="text-[22px] font-extrabold">0</div>
            <div className="text-[11px] text-[#8A9BBF] mt-0.5">Jobs Today</div>
          </div>
        </div>
      </div>

      {/* Current Task */}
      <div className="px-4 mt-5">
        <div className="font-bold text-[15px] text-[#1A2340] mb-2.5">Current Task</div>
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-center">
          <div className="text-3xl mb-2">📋</div>
          <div className="text-[14px] font-bold text-[#1A2340]">No active tasks</div>
          <div className="text-[13px] text-[#888BA0] mt-1">You don't have any ongoing jobs right now.</div>
        </div>
      </div>

      {/* New Opportunities */}
      <div className="px-4 mt-5 flex items-center justify-between mb-2">
        <div className="font-bold text-[15px] text-[#1A2340]">New Opportunities</div>
      </div>

      <div className="px-4 space-y-3">
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-center">
          <div className="text-3xl mb-2">🔍</div>
          <div className="text-[14px] font-bold text-[#1A2340]">No jobs available yet</div>
          <div className="text-[13px] text-[#888BA0] mt-1">We'll notify you when new opportunities appear in your area.</div>
        </div>
      </div>
    </div>
  );
}

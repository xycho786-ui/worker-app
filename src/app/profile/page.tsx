import { UserCircle, Shield, Settings, HelpCircle, Info, LogOut, User as UserIcon } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Profile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let dbUser = null;
  let workerProfile = null;

  if (user && user.email) {
    dbUser = await prisma.user.findUnique({
      where: { email: user.email },
      include: { workerProfile: true }
    });
    workerProfile = dbUser?.workerProfile;
  }

  const handleLogout = async () => {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
  };

  if (!user || !dbUser) {
    return (
      <div className="flex flex-col h-full bg-white pb-24 items-center justify-center p-6 text-center">
        <UserIcon className="mx-auto text-primary mb-3" size={48} />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Not Signed In</h3>
        <p className="text-gray-500 mb-6">Create an account or log in to manage your profile.</p>
        <Link href="/login" className="w-full bg-primary text-white py-3.5 rounded-2xl font-bold shadow-sm block">
          Log In or Sign Up
        </Link>
      </div>
    );
  }

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
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 border-2 border-white shadow-sm flex items-center justify-center">
              <UserIcon className="text-gray-400" size={32} />
            </div>
            {workerProfile?.isOnline && (
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 leading-tight">{dbUser.name}</h2>
            <p className="text-sm text-gray-500">{dbUser.email}</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-2 mb-8">
          <Link href="/profile/account" className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-gray-50 transition-colors text-gray-700 font-medium">
            <UserCircle size={22} className="text-primary" />
            <span className="flex-1 text-left">Account</span>
          </Link>
          
          {workerProfile && (
            <div className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl bg-primary/5 border border-primary/20">
              <Shield size={22} className="text-primary" />
              <span className="flex-1 text-left text-primary font-semibold">Verified Professional</span>
              <span className="bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                Active
              </span>
            </div>
          )}
          
          <Link href="/profile/settings" className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-gray-50 transition-colors text-gray-700 font-medium">
            <Settings size={22} className="text-primary" />
            <span className="flex-1 text-left">Settings</span>
          </Link>
          
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
        {!workerProfile && (
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-[20px] p-5 mb-8 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-1">Become a Worker</h3>
            <p className="text-sm text-gray-600 mb-4">Set up your professional profile to start receiving job requests.</p>
            <Link href="/profile/upgrade" className="bg-primary hover:bg-primary-light text-white font-semibold py-2 px-5 rounded-full text-sm transition-colors shadow-sm shadow-primary/20 inline-block">
              Upgrade Now
            </Link>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center px-2 py-4 border-t border-gray-50">
          <span className="text-xs font-semibold text-gray-400 tracking-wider">VERSION 0.1.0</span>
          <form action={handleLogout}>
            <button type="submit" className="text-sm font-bold text-primary hover:text-primary-light transition-colors flex items-center gap-1.5 uppercase tracking-wide">
              <LogOut size={16} /> LOG OUT
            </button>
          </form>
        </div>

      </main>
    </div>
  );
}

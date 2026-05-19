import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function CustomerProfilePage() {
  const handleLogout = async () => {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
  };

  return (
    <div className="flex flex-col h-full bg-[#F7F7F8] p-6 items-center justify-center text-center pb-24">
      <div className="text-4xl mb-4">👤</div>
      <h2 className="text-xl font-bold text-[#1A2340] mb-2">Customer Profile</h2>
      <p className="text-[#888BA0] mb-6">Manage your account and settings.</p>

      <form action={handleLogout}>
        <button type="submit" className="bg-[#E8514A] text-white px-8 py-3 rounded-xl font-bold shadow-md">
          Log Out
        </button>
      </form>
    </div>
  );
}

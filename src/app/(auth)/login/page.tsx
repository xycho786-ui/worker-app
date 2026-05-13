"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // CRITICAL CHECK: Ensure env vars are loaded
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      setError("Server needs to be restarted! Press Ctrl+C in your terminal and run 'npm run dev' again to load the new .env.local file.");
      setLoading(false);
      return;
    }

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      // Ensure user is synced with Prisma on login
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        const userRole = authUser.user_metadata?.role || 'CUSTOMER';
        
        await fetch("/api/auth/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: authUser.id, 
            email: authUser.email,
            name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'User',
            role: userRole,
          }),
        }).catch(err => console.error("Sync error during login:", err));

        if (userRole === 'WORKER') {
          router.push("/worker/dashboard");
        } else {
          router.push("/customer/dashboard");
        }
      } else {
        router.push("/");
      }
      
    } catch (err: any) {
      const errorMessage = err.message || "Invalid login credentials.";
      
      // Auto-recovery mechanism: If login fails, check if the account just doesn't exist
      // by attempting to sign them up right away.
      if (errorMessage.includes("Invalid login credentials")) {
        try {
          console.log("Login failed, attempting auto-signup fallback...");
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
              data: { full_name: formData.email.split('@')[0], role: 'CUSTOMER' }
            }
          });

          if (!signUpError && signUpData.user) {
            // Auto-sync after auto-signup
            await fetch("/api/auth/sync", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: signUpData.user.id, 
                email: signUpData.user.email,
                name: formData.email.split('@')[0],
                role: 'CUSTOMER',
              }),
            }).catch(e => console.error("Sync error:", e));

            setError("Account didn't exist, so we automatically created it for you! Please click Login again to enter.");
            setLoading(false);
            return;
          } else if (signUpError && signUpError.message.includes("already registered")) {
             setError("Your password is wrong! Please try again or create a new account with a different email.");
             setLoading(false);
             return;
          }
        } catch (autoErr) {
          console.error("Auto signup failed", autoErr);
        }
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-8 mt-12">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
        <p className="text-sm text-gray-500 mt-2">Log in to your account to continue.</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm">
            {error}
          </div>
        )}

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email" 
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <a href="#" className="text-xs text-primary font-medium hover:underline">Forgot?</a>
          </div>
          <input 
            type="password" 
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
            placeholder="••••••••"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full mt-6 bg-primary hover:bg-primary-light text-white font-semibold py-3.5 rounded-xl transition-colors text-sm shadow-sm shadow-primary/20 disabled:opacity-70"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      <div className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link href="/signup" className="text-primary font-semibold hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}

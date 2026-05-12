"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "CUSTOMER", // Default role
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
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
      // 1. Sign up with Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
          }
        }
      });

      if (authError) throw authError;

      // 2. Sync to MongoDB via our API route
      if (authData.user) {
        const res = await fetch("/api/auth/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: authData.user.id, 
            email: formData.email,
            name: formData.name,
            phone: formData.phone,
            role: formData.role,
          }),
        });

        if (!res.ok) {
          const apiError = await res.json();
          throw new Error(apiError.message || "Failed to create user profile");
        }
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 2000);
      
    } catch (err: any) {
      setError(err.message || "Something went wrong during signup.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center text-center space-y-4 pt-12">
        <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center text-2xl mb-4">✓</div>
        <h2 className="text-2xl font-bold text-gray-900">Account Created!</h2>
        <p className="text-gray-600">You are being redirected to the home page...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Create an Account</h1>
        <p className="text-sm text-gray-500 mt-2">Join the WBSP community today.</p>
      </div>

      <form onSubmit={handleSignup} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm">
            {error}
          </div>
        )}

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">I want to...</label>
          <div className="grid grid-cols-2 gap-3 mt-1">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: "CUSTOMER" })}
              className={`py-2 text-sm font-semibold rounded-xl border transition-colors ${
                formData.role === "CUSTOMER" 
                ? "bg-primary text-white border-primary shadow-sm shadow-primary/20" 
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              Hire Workers
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: "WORKER" })}
              className={`py-2 text-sm font-semibold rounded-xl border transition-colors ${
                formData.role === "WORKER" 
                ? "bg-primary text-white border-primary shadow-sm shadow-primary/20" 
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              Find Work
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <input 
            type="text" 
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
            placeholder="John Doe"
          />
        </div>

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
          <label className="text-sm font-medium text-gray-700">Phone (Optional)</label>
          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
            placeholder="+1 234 567 890"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Password</label>
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
          className="w-full mt-4 bg-primary hover:bg-primary-light text-white font-semibold py-3.5 rounded-xl transition-colors text-sm shadow-sm shadow-primary/20 disabled:opacity-70"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      <div className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-primary font-semibold hover:underline">
          Log in
        </Link>
      </div>
    </div>
  );
}

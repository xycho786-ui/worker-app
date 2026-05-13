"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldCheck, Briefcase } from "lucide-react";
import Link from "next/link";

export default function UpgradePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    skills: "",
    experience: "",
    locationAddress: "",
    hourlyRate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/profile/upgrade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to upgrade profile");
      }

      router.push("/profile");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white pb-24">
      <header className="flex items-center px-4 py-4 bg-white sticky top-0 z-10 border-b border-gray-100">
        <Link href="/profile" className="p-2 -ml-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight ml-2">Become a Worker</h1>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pt-6 pb-6 max-w-lg mx-auto w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="text-primary" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Upgrade Your Account</h2>
          <p className="text-gray-500 text-sm">
            Set up your professional profile to start receiving job requests and earning money.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Primary Skills (Comma separated)</label>
            <input 
              type="text" 
              name="skills"
              required
              value={formData.skills}
              onChange={handleChange}
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm shadow-sm"
              placeholder="e.g. Plumbing, Carpentry, Cleaning"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Years of Experience</label>
            <input 
              type="number" 
              name="experience"
              required
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm shadow-sm"
              placeholder="e.g. 5"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Service Location</label>
            <input 
              type="text" 
              name="locationAddress"
              required
              value={formData.locationAddress}
              onChange={handleChange}
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm shadow-sm"
              placeholder="e.g. New York City, NY"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Hourly Rate ($)</label>
            <input 
              type="number" 
              name="hourlyRate"
              required
              value={formData.hourlyRate}
              onChange={handleChange}
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm shadow-sm"
              placeholder="e.g. 25"
            />
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex gap-3 mt-2">
            <ShieldCheck className="text-primary shrink-0 mt-0.5" size={20} />
            <p className="text-xs text-primary/90 font-medium leading-relaxed">
              By upgrading, you agree to our Terms of Service. Your profile will be publicly visible to customers looking for services.
            </p>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-6 bg-primary hover:bg-primary-light text-white font-bold py-4 rounded-xl transition-all shadow-md shadow-primary/30 disabled:opacity-70 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {loading ? "Upgrading..." : "Confirm & Upgrade"}
          </button>
        </form>
      </main>
    </div>
  );
}

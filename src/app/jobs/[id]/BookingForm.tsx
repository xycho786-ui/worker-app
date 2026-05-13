"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

export default function BookingForm({ workerId, hourlyRate }: { workerId: string, hourlyRate: number | null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [jobDetails, setJobDetails] = useState("");

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDetails.trim()) {
      setError("Please describe the job details.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/bookings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workerId, jobDetails }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to book worker");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/jobs");
        router.refresh();
      }, 2000);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 rounded-2xl p-6 text-center border border-green-100 mt-6 shadow-sm">
        <CheckCircle className="text-green-500 mx-auto mb-3" size={40} />
        <h3 className="text-lg font-bold text-gray-900 mb-1">Booking Requested!</h3>
        <p className="text-sm text-gray-600">
          We've sent your request to the professional. You will be redirected to your jobs list...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleBook} className="bg-white rounded-2xl p-5 mt-6 shadow-sm border border-gray-100">
      <h3 className="text-[17px] font-bold text-gray-900 mb-4">Request Service</h3>
      
      {error && (
        <div className="p-3 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm mb-4">
          {error}
        </div>
      )}

      <div className="space-y-3">
        <label className="text-sm font-semibold text-gray-700">What do you need help with?</label>
        <textarea 
          required
          rows={3}
          value={jobDetails}
          onChange={(e) => setJobDetails(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm resize-none shadow-inner"
          placeholder="Describe the problem or task in detail..."
        />
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500 font-medium">Estimated Rate</span>
          <span className="font-bold text-gray-900">${hourlyRate || 0}/hr</span>
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full mt-2 bg-primary hover:bg-primary-light text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-primary/30 disabled:opacity-70 active:scale-[0.98]"
        >
          {loading ? "Sending Request..." : "Book Now"}
        </button>
      </div>
    </form>
  );
}

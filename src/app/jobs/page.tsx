import { Briefcase, MapPin, Clock, User as UserIcon } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function JobsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  let jobs: any[] = [];
  let dbUser = null;

  if (user && user.email) {
    dbUser = await prisma.user.findUnique({
      where: { email: user.email }
    });

    if (dbUser) {
      // Find jobs where the user is either the customer or the worker
      jobs = await prisma.booking.findMany({
        where: {
          OR: [
            { customerId: dbUser.id },
            { worker: { userId: dbUser.id } }
          ],
          status: {
            in: ['PENDING', 'ACCEPTED', 'IN_PROGRESS']
          }
        },
        include: {
          worker: { include: { user: true, category: true } },
          customer: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-50/50">
      <header className="px-4 py-4 bg-white sticky top-0 z-10 border-b border-gray-100 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">My Jobs</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        {/* Toggle between Active and Past */}
        <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
          <button className="flex-1 py-2 text-sm font-bold bg-white text-gray-900 rounded-lg shadow-sm">
            Active
          </button>
          <button className="flex-1 py-2 text-sm font-semibold text-gray-500 rounded-lg">
            Past
          </button>
        </div>

        <div className="space-y-4">
          {!user && (
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm text-center">
              <UserIcon className="mx-auto text-primary mb-3" size={32} />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Sign in to view jobs</h3>
              <p className="text-sm text-gray-500 mb-4">Please log in or create an account to view your bookings.</p>
              <Link href="/login" className="inline-block px-6 py-2 bg-primary text-white rounded-xl font-semibold shadow-sm">
                Log In
              </Link>
            </div>
          )}

          {user && jobs.length > 0 ? (
            jobs.map((job) => {
              // Determine if current user is customer or worker for this job
              const isCustomer = dbUser?.id === job.customerId;
              const otherParty = isCustomer ? job.worker.user : job.customer;
              const otherRole = isCustomer ? "Worker" : "Customer";
              const initials = otherParty.name.substring(0, 2).toUpperCase();

              return (
                <div key={job.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm transition-all hover:shadow-md">
                  <div className="flex justify-between items-start mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-600 text-[11px] font-bold uppercase tracking-wider">
                      <Clock size={12} /> {job.status}
                    </span>
                    <span className="text-lg font-bold text-dark">${job.price || 'TBD'}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{job.jobDetails}</h3>
                  <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
                    <MapPin size={14} className="text-gray-400" />
                    {isCustomer ? "At your location" : "Client location"}
                  </div>

                  <div className="bg-gray-50 rounded-xl p-3 flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        {initials}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{otherParty.name}</p>
                        <p className="text-[11px] text-gray-500">{otherRole}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button className="py-2.5 bg-gray-50 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors">
                      Cancel
                    </button>
                    <Link href={`/chat?user=${otherParty.id}`} className="py-2.5 bg-primary text-white rounded-xl font-semibold text-sm shadow-sm shadow-primary/20 hover:bg-primary-light transition-colors flex items-center justify-center">
                      Message
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            user && (
              <div className="text-center py-10 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Briefcase className="text-gray-400" size={24} />
                </div>
                <h3 className="text-gray-900 font-bold mb-1">No other active jobs</h3>
                <p className="text-sm text-gray-500 px-4">When you book or accept jobs, they will appear here.</p>
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
}

import { Bell, CheckCircle2, AlertCircle, User as UserIcon } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function NotificationsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  let notifications: any[] = [];

  if (user && user.email) {
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email }
    });

    if (dbUser) {
      notifications = await prisma.notification.findMany({
        where: { userId: dbUser.id },
        orderBy: { createdAt: 'desc' }
      });
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'SUCCESS': return <CheckCircle2 className="text-green-500" size={20} />;
      case 'WARNING': return <AlertCircle className="text-orange-500" size={20} />;
      case 'ERROR': return <AlertCircle className="text-red-500" size={20} />;
      case 'INFO': default: return <Bell className="text-primary" size={20} />;
    }
  };

  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <div className="flex flex-col h-full bg-gray-50/50">
      <header className="px-4 py-4 sticky top-0 z-10 border-b border-gray-100 bg-white/80 backdrop-blur-md flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Notifications</h1>
        {user && notifications.length > 0 && (
          <button className="text-sm font-semibold text-primary">Mark all read</button>
        )}
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-3">
        {!user && (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm text-center mt-4">
            <UserIcon className="mx-auto text-primary mb-3" size={32} />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Sign in to view alerts</h3>
            <p className="text-sm text-gray-500 mb-4">Please log in to receive updates about your jobs.</p>
            <Link href="/login" className="inline-block px-6 py-2 bg-primary text-white rounded-xl font-semibold shadow-sm">
              Log In
            </Link>
          </div>
        )}

        {user && notifications.length > 0 ? (
          notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`p-4 rounded-2xl border transition-all ${
                notification.isRead 
                  ? 'bg-white border-gray-100 shadow-sm' 
                  : 'bg-primary/5 border-primary/20 shadow-sm shadow-primary/5'
              }`}
            >
              <div className="flex gap-3">
                <div className={`p-2 rounded-full h-fit ${notification.isRead ? 'bg-gray-50' : 'bg-white shadow-sm'}`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`text-[14px] ${notification.isRead ? 'font-semibold text-gray-800' : 'font-bold text-gray-900'}`}>
                      {notification.title}
                    </h3>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">
                      {getRelativeTime(notification.createdAt)}
                    </span>
                  </div>
                  <p className={`text-[13px] leading-relaxed ${notification.isRead ? 'text-gray-500' : 'text-gray-700'}`}>
                    {notification.message}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          user && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="text-primary" size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">All caught up</h3>
              <p className="text-sm text-gray-500 max-w-[250px] mx-auto leading-relaxed">
                You don't have any new notifications right now.
              </p>
            </div>
          )
        )}
      </main>
    </div>
  );
}

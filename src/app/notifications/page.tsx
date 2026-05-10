import { Bell, CheckCircle2, AlertCircle, Calendar } from "lucide-react";

const NOTIFICATIONS = [
  {
    id: 1,
    title: "Booking Confirmed",
    message: "Alex Johnson has accepted your booking for tomorrow at 9:00 AM.",
    time: "2 hours ago",
    type: "success",
    read: false,
  },
  {
    id: 2,
    title: "New Message",
    message: "You have a new message from Sarah Miller regarding the cleaning service.",
    time: "5 hours ago",
    type: "info",
    read: false,
  },
  {
    id: 3,
    title: "Payment Successful",
    message: "Your payment of $120.00 for the plumbing service was successful.",
    time: "1 day ago",
    type: "success",
    read: true,
  },
  {
    id: 4,
    title: "Reminder: Upcoming Service",
    message: "Your appointment with Daniel Wilson is in 2 hours.",
    time: "2 days ago",
    type: "warning",
    read: true,
  }
];

export default function NotificationsPage() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="text-green-500" size={20} />;
      case 'warning': return <AlertCircle className="text-orange-500" size={20} />;
      case 'info': default: return <Bell className="text-primary" size={20} />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50/50">
      <header className="px-4 py-4 sticky top-0 z-10 border-b border-gray-100 bg-white/80 backdrop-blur-md flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Notifications</h1>
        <button className="text-sm font-semibold text-primary">Mark all read</button>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-3">
        {NOTIFICATIONS.map(notification => (
          <div 
            key={notification.id} 
            className={`p-4 rounded-2xl border transition-all ${
              notification.read 
                ? 'bg-white border-gray-100 shadow-sm' 
                : 'bg-primary/5 border-primary/20 shadow-sm shadow-primary/5'
            }`}
          >
            <div className="flex gap-3">
              <div className={`p-2 rounded-full h-fit ${notification.read ? 'bg-gray-50' : 'bg-white shadow-sm'}`}>
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`text-[14px] ${notification.read ? 'font-semibold text-gray-800' : 'font-bold text-gray-900'}`}>
                    {notification.title}
                  </h3>
                  <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">
                    {notification.time}
                  </span>
                </div>
                <p className={`text-[13px] leading-relaxed ${notification.read ? 'text-gray-500' : 'text-gray-700'}`}>
                  {notification.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

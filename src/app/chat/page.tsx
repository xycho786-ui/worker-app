import { Search } from "lucide-react";
import Image from "next/image";

const CHATS = [
  {
    id: 1,
    name: "Alex Johnson",
    message: "I'll be there tomorrow at 9 AM.",
    time: "10:30 AM",
    unread: 2,
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=150&h=150",
  },
  {
    id: 2,
    name: "Sarah Miller",
    message: "Thanks for the great work!",
    time: "Yesterday",
    unread: 0,
    image: "https://images.unsplash.com/photo-1581579438747-104c54099518?auto=format&fit=crop&q=80&w=150&h=150",
  },
  {
    id: 3,
    name: "Daniel Wilson",
    message: "Can we reschedule the appointment?",
    time: "Mon",
    unread: 0,
    image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b6?auto=format&fit=crop&q=80&w=150&h=150",
  }
];

export default function ChatPage() {
  return (
    <div className="flex flex-col h-full bg-white">
      <header className="px-4 py-4 sticky top-0 z-10 border-b border-gray-100 bg-white/80 backdrop-blur-md flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Messages</h1>
        <button className="text-sm font-semibold text-primary">New</button>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
              placeholder="Search conversations..."
            />
          </div>

          <div className="space-y-1">
            {CHATS.map(chat => (
              <div key={chat.id} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer active:scale-[0.98]">
                <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={chat.image} alt={chat.name} fill className="object-cover" />
                  {chat.unread > 0 && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className={`text-[15px] truncate ${chat.unread > 0 ? 'font-bold text-gray-900' : 'font-semibold text-gray-800'}`}>
                      {chat.name}
                    </h3>
                    <span className={`text-[11px] whitespace-nowrap ${chat.unread > 0 ? 'text-primary font-bold' : 'text-gray-400'}`}>
                      {chat.time}
                    </span>
                  </div>
                  <p className={`text-[13px] truncate ${chat.unread > 0 ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                    {chat.message}
                  </p>
                </div>
                {chat.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold">
                    {chat.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

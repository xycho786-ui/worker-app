import { Search, MessageSquare, User as UserIcon } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export default async function ChatPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  let conversations: any[] = [];
  let dbUser = null;

  if (user && user.email) {
    dbUser = await prisma.user.findUnique({
      where: { email: user.email }
    });

    if (dbUser) {
      conversations = await prisma.conversation.findMany({
        where: {
          OR: [
            { customerId: dbUser.id },
            { worker: { userId: dbUser.id } }
          ]
        },
        include: {
          customer: true,
          worker: { include: { user: true } },
          messages: {
            orderBy: { createdAt: 'desc' },
            take: 1
          }
        },
        orderBy: {
          updatedAt: 'desc'
        }
      });
    }
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <header className="px-4 py-4 sticky top-0 z-10 border-b border-gray-100 bg-white/80 backdrop-blur-md flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Messages</h1>
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
            {!user && (
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm text-center mt-8">
                <UserIcon className="mx-auto text-primary mb-3" size={32} />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Sign in to view messages</h3>
                <p className="text-sm text-gray-500 mb-4">Please log in or create an account to view your chats.</p>
                <Link href="/login" className="inline-block px-6 py-2 bg-primary text-white rounded-xl font-semibold shadow-sm">
                  Log In
                </Link>
              </div>
            )}

            {user && conversations.length > 0 ? (
              conversations.map(chat => {
                const isCustomer = dbUser?.id === chat.customerId;
                const otherParty = isCustomer ? chat.worker.user : chat.customer;
                const latestMessage = chat.messages[0];
                const unreadCount = 0; // Implement actual unread count logic if needed
                
                return (
                  <Link href={`/chat/${chat.id}`} key={chat.id} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer active:scale-[0.98]">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200 flex items-center justify-center">
                      <UserIcon className="text-gray-400" size={24} />
                      {unreadCount > 0 && (
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className={`text-[15px] truncate ${unreadCount > 0 ? 'font-bold text-gray-900' : 'font-semibold text-gray-800'}`}>
                          {otherParty.name}
                        </h3>
                        <span className={`text-[11px] whitespace-nowrap ${unreadCount > 0 ? 'text-primary font-bold' : 'text-gray-400'}`}>
                          {latestMessage ? new Date(latestMessage.createdAt).toLocaleDateString() : 'New'}
                        </span>
                      </div>
                      <p className={`text-[13px] truncate ${unreadCount > 0 ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                        {latestMessage ? latestMessage.content : 'Start a conversation'}
                      </p>
                    </div>
                    {unreadCount > 0 && (
                      <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold">
                        {unreadCount}
                      </div>
                    )}
                  </Link>
                );
              })
            ) : (
              user && (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="text-primary" size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">No messages yet</h3>
                  <p className="text-sm text-gray-500 max-w-[250px] mx-auto leading-relaxed">
                    When you connect with a worker or customer, your chat will appear here.
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

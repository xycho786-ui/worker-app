"use client";

import { Home, Briefcase, DollarSign, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Jobs", href: "/jobs", icon: Briefcase },
  { name: "Earnings", href: "/earnings", icon: DollarSign },
  { name: "Profile", href: "/profile", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50 rounded-t-2xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.name}
            href={item.href}
            className={clsx(
              "flex flex-col items-center gap-1 transition-colors duration-200",
              isActive ? "text-primary" : "text-gray-400 hover:text-gray-600"
            )}
          >
            <div className={clsx("p-1.5 rounded-full transition-all duration-300", isActive ? "bg-primary/10" : "bg-transparent")}>
              <Icon size={22} className={isActive ? "fill-primary/20" : ""} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className="text-[10px] font-medium">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}

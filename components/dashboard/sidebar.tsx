"use client"

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Gift, HelpCircle, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { User } from "@supabase/auth-helpers-nextjs";

interface SidebarProps {
  user: User;
  isMobile: boolean;
}

const navigation = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Invite", href: "/dashboard/invite", icon: Gift },
  { name: "Support", href: "/dashboard/help", icon: HelpCircle },
];

export function Sidebar({ user, isMobile }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarContent = (
    <>
      <div className="p-4">
        <Logo />
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => isMobile && setIsOpen(false)}
              className={cn(
                "flex items-center px-4 py-2 text-sm font-medium rounded-md",
                isActive
                  ? "bg-[#2C4B46] text-white"
                  : "text-gray-300 hover:bg-[#2C4B46] hover:text-white"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="flex-shrink-0 flex border-t border-[#2C4B46] p-4">
        <Link
          href="/dashboard/settings"
          className="flex-shrink-0 w-full group block"
        >
          <div className="flex items-center">
            <div>
              <p className="text-sm font-medium text-white truncate">{user.email}</p>
              <p className="text-xs text-gray-300">View settings</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <>
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-[#1B3B36] text-white"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <div
          className={cn(
            "fixed inset-y-0 left-0 w-64 bg-[#1B3B36] text-white transform transition-transform duration-300 ease-in-out z-50 flex flex-col",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {sidebarContent}
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col fixed inset-y-0 w-64 bg-[#1B3B36] text-white">
      {sidebarContent}
    </div>
  );
} 
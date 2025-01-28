"use client"

import { User } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { Plus, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopBarProps {
  user: User;
}

export function TopBar({ user }: TopBarProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <div className="bg-white border-b px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left side - visible only on mobile */}
        <div className="lg:hidden w-8">
          {/* Empty div to maintain spacing with menu button in sidebar */}
        </div>

        {/* Center */}
        <div className="flex-1 flex justify-center lg:justify-start">
          <h1 className="text-lg font-semibold text-gray-900 truncate">
            Dashboard
          </h1>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/deposit">
            <Button className="bg-emerald-700 hover:bg-emerald-800">
              <Plus className="h-5 w-5 mr-2" />
              Deposit
            </Button>
          </Link>
          <div className="hidden md:block">
            <span className="text-sm text-gray-600">{user.email}</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href="/dashboard/settings">
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </Link>
              <Link href="/dashboard/help">
                <DropdownMenuItem>Help</DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
} 
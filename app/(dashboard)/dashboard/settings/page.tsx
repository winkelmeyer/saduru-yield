'use client'

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileForm } from "@/components/dashboard/profile-form";
import { SecuritySettings } from "@/components/dashboard/security-settings";
import { useSearchParams } from 'next/navigation'
import type { User } from '@supabase/supabase-js';

const ALLOWED_TABS = ["profile", "security"];

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const supabase = createClientComponentClient();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') ?? "profile";
  const defaultTab = ALLOWED_TABS.includes(tab) ? tab : "profile";

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/auth/login");
      } else {
        setUser(session.user);
      }
    };

    checkSession();
  }, [router, supabase.auth]);

  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>

      <Tabs defaultValue={defaultTab} className="space-y-6">
        <TabsList>
          {ALLOWED_TABS.map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <ProfileForm user={user} />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <SecuritySettings user={user} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
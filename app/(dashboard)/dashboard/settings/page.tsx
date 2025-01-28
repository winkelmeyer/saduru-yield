import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileForm } from "@/components/dashboard/profile-form";
import { SecuritySettings } from "@/components/dashboard/security-settings";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  const supabase = createServerComponentClient({ cookies });
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/auth/login');
  }

  const defaultTab = searchParams.tab || "profile";

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <Tabs defaultValue={defaultTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <ProfileForm user={session.user} />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <SecuritySettings user={session.user} />
        </TabsContent>
      </Tabs>
    </div>
  );
} 
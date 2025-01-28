import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Card } from "@/components/ui/card";
import { InviteForm } from "@/components/dashboard/invite-form";
import { ReferralStats } from "@/components/dashboard/referral-stats";
import { CopyLink } from "@/components/dashboard/copy-link";

export default async function InvitePage() {
  const supabase = createServerComponentClient({ cookies });
  
  const { data: referrals } = await supabase
    .from('referrals')
    .select('*')
    .order('created_at', { ascending: false });

  const referralInfo = {
    successfulReferrals: referrals?.filter(r => r.status === 'completed').length || 0,
    apyBoost: (referrals?.filter(r => r.status === 'completed').length || 0) * 4,
    invitedFriends: referrals?.map(r => ({
      email: r.email,
      dateInvited: new Date(r.created_at),
      status: r.status,
      remaining: 60 - Math.floor((Date.now() - new Date(r.created_at).getTime()) / (1000 * 60 * 60 * 24))
    })) || []
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <div className="text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Invite your friends and boost your APY by up to 20%
        </h1>
        <p className="mt-2 text-gray-500 text-sm sm:text-base">
          For each successful referral, you&apos;ll receive a 4% APY boost for 60 days, and your friend will too.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="p-4 sm:p-6">
          <h2 className="text-lg font-semibold mb-4">Invite via email</h2>
          <InviteForm />
        </Card>

        <Card className="p-4 sm:p-6">
          <h2 className="text-lg font-semibold mb-4">Or share your unique link</h2>
          <CopyLink />
        </Card>
      </div>

      <div className="overflow-x-auto">
        <ReferralStats referralInfo={referralInfo} />
      </div>
    </div>
  );
} 
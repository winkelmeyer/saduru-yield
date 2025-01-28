"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";

export function CopyLink() {
  const [referralCode, setReferralCode] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getReferralCode = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Get the user's most recent referral code
        const { data: referrals } = await supabase
          .from('referrals')
          .select('referral_code')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1);

        if (referrals && referrals.length > 0) {
          setReferralCode(referrals[0].referral_code);
        } else {
          // Generate a new referral code if none exists
          const newCode = `${user.id.slice(0, 6)}-${Math.random().toString(36).slice(2, 8)}`;
          const { error } = await supabase
            .from('referrals')
            .insert([
              {
                user_id: user.id,
                email: user.email,
                status: 'pending',
                referral_code: newCode,
              }
            ]);

          if (!error) {
            setReferralCode(newCode);
          }
        }
      }
    };

    getReferralCode();
  }, [supabase]);

  const handleCopy = async () => {
    const url = `holdsensible.com/?ref=${referralCode}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex-1 bg-gray-50 p-2 rounded text-sm text-gray-600">
        holdsensible.com/?ref={referralCode}
      </div>
      <Button
        variant="ghost"
        onClick={handleCopy}
        className="text-sm font-medium text-[#1B3B36] hover:text-[#2C4B46]"
      >
        {copied ? "Copied!" : "Copy"}
      </Button>
    </div>
  );
} 
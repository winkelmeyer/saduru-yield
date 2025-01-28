"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export function InviteForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Generate a unique referral code
      const referralCode = `${user.id.slice(0, 6)}-${Math.random().toString(36).slice(2, 8)}`;

      const { error } = await supabase
        .from('referrals')
        .insert([
          {
            user_id: user.id,
            email,
            status: 'pending',
            referral_code: referralCode,
          }
        ]);

      if (error) throw error;

      // Send email invitation (you'll need to implement this)
      // await sendInviteEmail(email, referralCode);

      setEmail("");
      router.refresh();
    } catch (error) {
      console.error('Error sending invite:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <Input
        type="email"
        placeholder="Enter friend's email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1"
      />
      <Button 
        type="submit" 
        disabled={isLoading}
        className="bg-[#1B3B36] hover:bg-[#2C4B46] text-white"
      >
        Send
      </Button>
    </form>
  );
} 
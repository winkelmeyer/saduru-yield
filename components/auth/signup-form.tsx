"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { createClient } from "@/lib/supabase/client";
import { AuthError } from '@/types/auth';
import { db } from '@/db';
import { profiles } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import Link from "next/link";

type SignupStep = 'email' | 'verify' | 'referral' | 'profile' | 'loading';

export function SignupForm() {
  const [step, setStep] = useState<SignupStep>('email');
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const { error: signUpError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true
        }
      });

      if (signUpError) throw signUpError;
      
      console.log('Verification code sent to:', email);
      setStep('verify');
    } catch (error: unknown) {
      const authError = error as AuthError;
      console.error('Email verification error:', authError);
      setError(authError.message || 'Failed to send verification code');
    }
  };

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: 'email'
      });

      if (verifyError) throw verifyError;

      console.log('Email verified successfully');
      setStep('referral');
    } catch (error: unknown) {
      const authError = error as AuthError;
      console.error('Code verification error:', authError);
      setError(authError.message || 'Invalid verification code');
    }
  };

  const handleReferralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (referralCode) {
      try {
        const existingReferral = await db.query.profiles.findFirst({
          where: eq(profiles.referralCode, referralCode)
        });

        if (!existingReferral) {
          throw new Error('Invalid referral code');
        }
      } catch (error: unknown) {
        console.error('Referral verification error:', error);
        setError(error instanceof Error ? error.message : 'Invalid referral code');
        return;
      }
    }
    setStep('profile');
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      setStep('loading');

      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error('No user found');

      // Using Drizzle to upsert the profile
      await db
        .insert(profiles)
        .values({
          id: user.id,
          email,
          firstName,
          lastName,
          referralCode: referralCode || null,
          updatedAt: new Date()
        })
        .onConflictDoUpdate({
          target: profiles.id,
          set: {
            firstName,
            lastName,
            referralCode: referralCode || null,
            updatedAt: new Date()
          }
        });

      console.log('Profile created successfully');
      router.push('/dashboard');
    } catch (error: unknown) {
      console.error('Profile creation error:', error);
      setError(error instanceof Error ? error.message : 'Failed to create profile');
      setStep('profile');
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signInError) throw signInError;
    } catch (error: unknown) {
      const authError = error as AuthError;
      console.error('Google signup error:', authError);
      setError(authError.message || 'Failed to sign up with Google');
    }
  };

  return (
    <div className="space-y-4">
      {step === 'email' && (
        <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div className="space-y-2 py-4">
                      <h1 className="text-3xl font-bold text-gray-900">Create an account</h1>
                      <p className="text-gray-600">Sign up to get started with Saduru</p>
                  </div>
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-emerald-800 hover:bg-emerald-900"
          >
            Continue with email
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-50 px-2 text-gray-500">or</span>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignup}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
              />
            </svg>
            Continue with Google
          </Button>
        </form>
      )}

      {step === 'verify' && (
        <form onSubmit={handleVerifySubmit} className="space-y-4">
          <p className="text-center text-sm text-gray-600">
            We&apos;ve sent a verification code to {email}
          </p>
          <div className="flex justify-center">
            <InputOTP 
              value={code}
              onChange={setCode}
              maxLength={6}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button
            type="submit"
            className="w-full bg-emerald-800 hover:bg-emerald-900"
          >
            Verify Email
          </Button>
          <Button
            type="button"
            variant="link"
            className="w-full"
            onClick={handleEmailSubmit}
          >
            Resend code
          </Button>
        </form>
      )}

      {step === 'referral' && (
        <form onSubmit={handleReferralSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold text-center">Have a referral code?</h2>
          <Input
            type="text"
            placeholder="Enter referral code"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
          />
          <Button
            type="submit"
            className="w-full bg-emerald-800 hover:bg-emerald-900"
          >
            Complete signup
          </Button>
          <p className="text-center text-sm text-gray-500">
            Don&apos;t have a referral code? Your email has been added to the waitlist.
          </p>
          <div className="grid grid-cols-1 md:grid.cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.open('https://calendly.com')}
            >
              Book a call to skip the line
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => window.open('https://twitter.com')}
            >
              Ask for a code on X
            </Button>
          </div>
        </form>
      )}

      {step === 'profile' && (
        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold text-center">Let&apos;s get you set up</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-emerald-800 hover:bg-emerald-900"
          >
            Complete signup
          </Button>
        </form>
      )}

      {step === 'loading' && (
        <div className="text-center space-y-4">
          <p className="text-lg">Setting up your account...</p>
          <LoadingSpinner />
        </div>
      )}
          <div className="text-sm text-center">
              You have an account?{" "}
              <Link
                  href="/auth/login"
                  className="text-emerald-800 hover:text-emerald-900 font-medium"
              >
                 Log in
              </Link>
          </div>

      {error && (
        <Alert variant="destructive">
          {error}
        </Alert>
      )}
    </div>
  );
} 
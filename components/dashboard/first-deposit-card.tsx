import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function FirstDepositCard() {
  return (
    <Card className="p-8 text-center">
      <div className="relative h-48 w-full mb-6">
        <Image
          src="/images/relax.svg"
          alt="Relaxing illustration"
          fill
          className="object-contain"
        />
      </div>
      <h2 className="text-2xl font-semibold mb-4">
        You're three clicks away from putting your crypto to work
      </h2>
      <p className="text-gray-500 mb-4">
        Connect with your existing Coinbase or bank account, no personal info needed.
      </p>
      <p className="text-gray-500 mb-6">
        Saduru will match your deposit up to $15 USD after 24 hours.
      </p>
      <Link href="/dashboard/deposit">
      <Button size="lg" className="bg-[#1B3B36] hover:bg-[#2C4B46] text-white">
        Make your first deposit
      </Button>
          </Link>
    </Card>
  );
} 
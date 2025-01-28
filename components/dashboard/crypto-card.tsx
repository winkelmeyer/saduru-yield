import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { CryptoAsset } from "@/types/dashboard";

interface CryptoCardProps {
  asset: CryptoAsset;
}

export function CryptoCard({ asset }: CryptoCardProps) {
  if (asset.isComingSoon) {
    return (
      <Card className="p-6">
        <div className="flex items-center space-x-3">
          <div className="relative h-8 w-8">
            <Image
              src={asset.icon}
              alt={asset.name}
              fill
              className="object-contain"
            />
          </div>
          <h3 className="text-lg font-medium">{asset.name}</h3>
        </div>
        <div className="mt-4 text-gray-500">Coming soon</div>
      </Card>
    );
  }

  return (
    <Link href={`/dashboard/${asset.symbol}`}>
      <Card className="p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-3">
          <div className="relative h-8 w-8">
            <Image
              src={asset.icon}
              alt={asset.name}
              fill
              className="object-contain"
            />
          </div>
          <h3 className="text-lg font-medium">{asset.name}</h3>
        </div>
        <div className="mt-4 space-y-2">
          <div>
            <div className="text-sm text-gray-500">Balance</div>
            <div className="flex items-baseline">
              <div className="text-2xl font-semibold">
                ${asset.balance.balanceUsd.toFixed(2)}
              </div>
              <div className="ml-2 text-sm text-gray-500">
                {asset.balance.balance.toFixed(8)} {asset.symbol}
              </div>
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Earnings</div>
            <div className="flex items-baseline">
              <div className="text-green-500">
                +${asset.balance.earningsUsd.toFixed(2)}
              </div>
              <div className="ml-2 text-sm text-gray-500">
                +{asset.balance.earnings.toFixed(8)} {asset.symbol}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
} 
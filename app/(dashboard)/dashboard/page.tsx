import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { CryptoCard } from "@/components/dashboard/crypto-card";
import { EducationalSection } from "@/components/dashboard/educational-section";
import { FirstDepositCard } from "@/components/dashboard/first-deposit-card";
import type { CryptoAsset } from "@/types/dashboard";

const cryptoAssets: CryptoAsset[] = [
    {
        name: "Ethereum",
        symbol: "ETH",
        icon: "/icons/ethereum.svg",
        balance: {
            symbol: "ETH",
            balance: 0,
            balanceUsd: 0,
            earnings: 0,
            earningsUsd: 0,
        },
    },
    {
        name: "Bitcoin",
        symbol: "BTC",
        icon: "/icons/bitcoin.svg",
        balance: {
            symbol: "BTC",
            balance: 0,
            balanceUsd: 0,
            earnings: 0,
            earningsUsd: 0,
        },
    },
    {
        name: "Solana",
        symbol: "SOL",
        icon: "/icons/solana.svg",
        balance: {
            symbol: "SOL",
            balance: 0,
            balanceUsd: 0,
            earnings: 0,
            earningsUsd: 0,
        },
        isComingSoon: true,
    },
];

const educationalCards = [
    {
        title: "Security on Saduru",
        description: "Saduru takes a multi-layered approach to protect your assets.",
        image: "/images/security.svg",
        link: "/learn/security",
    },
    {
        title: "How crypto earns yield",
        description: "Learn about how your crypto is put to work to generate compound interest.",
        image: "/images/yield.svg",
        link: "/learn/yield",
    },
    {
        title: "Understanding risk",
        description: "Understanding risk is key to confidently using any financial product.",
        image: "/images/risk.svg",
        link: "/learn/risk",
    },
];

export default async function DashboardPage() {
    const supabase = createServerComponentClient({ cookies });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        redirect('/auth/login');
    }

    const { data: transactions } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('type', 'deposit')
        .eq('status', 'completed')
        .order('created_at', { ascending: false });

    const hasDeposits = transactions && transactions.length > 0;

    return (
        <div className="space-y-8">
            {!hasDeposits ? (
                <FirstDepositCard />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cryptoAssets.map((asset) => (
                        <CryptoCard key={asset.symbol} asset={asset} />
                    ))}
                </div>
            )}

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Learn more about Saduru</h2>
                <EducationalSection cards={educationalCards} />
            </div>
        </div>
    );
} 
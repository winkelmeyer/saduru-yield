import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { DepositForm } from "@/components/dashboard/deposit-form";
import { Card } from "@/components/ui/card";

export default async function DepositPage() {
  const supabase = createServerComponentClient({ cookies });
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/auth/login');
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Deposit Funds</h1>
        <p className="text-gray-500 mt-2">
          Add funds to your account using your preferred payment method.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <DepositForm user={session.user} />
        </div>

        <div>
          <Card className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">Deposit Information</h2>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">
                • Minimum deposit: $100
              </p>
              <p className="text-gray-600">
                • Funds are typically available within 1-2 business days
              </p>
              <p className="text-gray-600">
                • No deposit fees
              </p>
              <p className="text-gray-600">
                • Supported payment methods: Bank Transfer, Credit/Debit Card
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 
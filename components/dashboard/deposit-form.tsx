"use client";

import { useState } from "react";
import { User } from "@supabase/auth-helpers-nextjs";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DepositFormProps {
  user: User;
}

export function DepositForm({ user }: DepositFormProps) {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  const supabase = createClientComponentClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount) || depositAmount < 100) {
      setMessage({ type: 'error', text: 'Minimum deposit amount is $100.' });
      setIsLoading(false);
      return;
    }

    if (!paymentMethod) {
      setMessage({ type: 'error', text: 'Please select a payment method.' });
      setIsLoading(false);
      return;
    }

    try {
      // Here you would integrate with your payment processor
      // For now, we'll just simulate a successful deposit
      const { error } = await supabase
        .from('transactions')
        .insert([
          {
            user_id: user.id,
            amount: depositAmount,
            type: 'deposit',
            status: 'pending',
            payment_method: paymentMethod,
          }
        ]);

      if (error) throw error;

      setMessage({ type: 'success', text: 'Deposit initiated successfully! You will be notified once the funds are available.' });
      setAmount("");
      setPaymentMethod("");
    } catch (error) {
      console.error('Error processing deposit:', error);
      setMessage({ type: 'error', text: 'Failed to process deposit. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Make a Deposit</h2>
          {message && (
            <Alert className={message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}>
              {message.text}
            </Alert>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="amount">Amount (USD)</Label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <Input
                id="amount"
                type="number"
                min="100"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-7"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger id="paymentMethod" className="mt-1">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank_transfer">Bank Transfer (ACH)</SelectItem>
                <SelectItem value="credit_card">Credit/Debit Card</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-[#1B3B36] hover:bg-[#2C4B46] text-white w-full"
          >
            {isLoading ? 'Processing...' : 'Deposit Funds'}
          </Button>
        </div>
      </Card>
    </form>
  );
} 
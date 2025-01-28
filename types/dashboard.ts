export type CryptoBalance = {
  symbol: string;
  balance: number;
  balanceUsd: number;
  earnings: number;
  earningsUsd: number;
};

export type CryptoAsset = {
  name: string;
  symbol: string;
  icon: string;
  balance: CryptoBalance;
  isComingSoon?: boolean;
};

export type EducationalCard = {
  title: string;
  description: string;
  image: string;
  link: string;
};

export type Transaction = {
  id: string;
  type: 'deposit' | 'withdraw';
  amount: number;
  symbol: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: Date;
};

export type ReferralInfo = {
  successfulReferrals: number;
  apyBoost: number;
  invitedFriends: {
    email: string;
    dateInvited: Date;
    status: 'pending' | 'completed';
    remaining: number;
  }[];
}; 
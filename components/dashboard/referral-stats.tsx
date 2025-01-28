"use client";

import { Card } from "@/components/ui/card";
import type { ReferralInfo } from "@/types/dashboard";

interface ReferralStatsProps {
  referralInfo: ReferralInfo;
}

export function ReferralStats({ referralInfo }: ReferralStatsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-4 sm:p-6">
          <h3 className="text-sm font-medium text-gray-500">Successful Referrals</h3>
          <p className="mt-2 text-3xl font-semibold">{referralInfo.successfulReferrals}</p>
        </Card>

        <Card className="p-4 sm:p-6">
          <h3 className="text-sm font-medium text-gray-500">Current APY Boost</h3>
          <p className="mt-2 text-3xl font-semibold text-emerald-600">+{referralInfo.apyBoost}%</p>
        </Card>

        <Card className="p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
          <h3 className="text-sm font-medium text-gray-500">Total Invites</h3>
          <p className="mt-2 text-3xl font-semibold">{referralInfo.invitedFriends.length}</p>
        </Card>
      </div>

      {referralInfo.invitedFriends.length > 0 ? (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Invited
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Days Remaining
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {referralInfo.invitedFriends.map((friend, index) => (
                  <tr key={index}>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
                      {friend.email}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {friend.dateInvited.toLocaleDateString()}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          friend.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {friend.status === "completed" ? "Completed" : "Pending"}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {friend.status === "completed"
                        ? friend.remaining > 0
                          ? `${friend.remaining} days`
                          : "Expired"
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <Card className="p-4 sm:p-6 text-center">
          <p className="text-gray-500">No invites sent yet. Start inviting friends to earn APY boosts!</p>
        </Card>
      )}
    </div>
  );
} 
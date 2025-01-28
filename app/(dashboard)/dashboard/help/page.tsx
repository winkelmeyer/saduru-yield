import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { HelpSection } from "@/components/dashboard/help-section";

export default async function HelpPage() {
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
        <h1 className="text-3xl font-bold">Help & Support</h1>
        <p className="text-gray-500 mt-2">
          Find answers to common questions or get in touch with our support team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <HelpSection />
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Contact Support</h2>
            <div className="space-y-4 text-sm">
              <p className="text-gray-600">
                Email us at:{" "}
                <a
                  href="mailto:support@holdsensible.com"
                  className="text-[#1B3B36] hover:underline"
                >
                  support@holdsensible.com
                </a>
              </p>
              <p className="text-gray-600">
                Support hours:<br />
                Monday - Friday<br />
                9:00 AM - 5:00 PM EST
              </p>
              <p className="text-gray-600">
                Response time: Within 24 hours
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Emergency Contact</h2>
            <div className="space-y-4 text-sm">
              <p className="text-gray-600">
                For urgent matters related to your account security:
              </p>
              <p className="text-gray-600">
                Call: <span className="font-medium">1-800-Saduru</span>
              </p>
              <p className="text-gray-600">
                Available 24/7 for security-related emergencies only
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 
import { SignupForm } from "@/components/auth/signup-form";
import { SavingsIllustration } from "@/components/ui/savings-illustration";

export default function SignupPage() {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div>
        <SignupForm />
      </div>
      <div className="hidden md:block">
        <SavingsIllustration />
      </div>
    </div>
  );
} 
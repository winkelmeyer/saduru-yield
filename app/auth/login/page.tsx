import { LoginForm } from "@/components/auth/login-form";
import { SavingsIllustration } from "@/components/ui/savings-illustration";

export default function LoginPage() {
    return (
        <div className="grid md:grid-cols-2 gap-8 items-start">

            <div>
                <div className="space-y-2 py-4">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
                    <p className="text-gray-600">Sign in to your account to continue</p>
                </div>
                <LoginForm />
            </div>
            <div className="hidden md:block">
                <SavingsIllustration />
            </div>
        </div>
    );
} 
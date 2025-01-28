import { Logo } from "@/components/ui/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md md:max-w-4xl space-y-8">
        <div className="flex justify-center">
          <Logo />
        </div>
        {children}
        <p className="text-center text-sm text-gray-500">
          By continuing, you agree to the Saduru{" "}
          <a href="#" className="underline hover:text-gray-700">Terms of Service</a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-gray-700">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
} 
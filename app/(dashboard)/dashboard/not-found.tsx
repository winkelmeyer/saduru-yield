import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DashboardNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
      <h1 className="text-3xl font-bold">Page Not Found</h1>
      <p className="text-gray-600">The page you're looking for doesn't exist.</p>
      <Button asChild>
        <Link href="/dashboard">
          Return to Dashboard
        </Link>
      </Button>
    </div>
  );
} 
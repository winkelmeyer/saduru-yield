import { Card } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function DashboardLoading() {
  return (
    <div className="space-y-8">
      <div className="h-9 bg-gray-200 rounded w-64 animate-pulse" />
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="h-7 bg-gray-200 rounded w-32 animate-pulse" />
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded w-full animate-pulse" />
              <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-4">
            <div className="h-7 bg-gray-200 rounded w-32 animate-pulse" />
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 
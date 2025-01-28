'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="space-y-4">
      <Alert variant="destructive">
        Something went wrong loading the dashboard.
      </Alert>
      <Button
        onClick={reset}
        variant="outline"
      >
        Try again
      </Button>
    </div>
  );
} 
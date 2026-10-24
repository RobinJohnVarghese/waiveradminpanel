"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function BookingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Bookings route error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-red-50 text-red-600 p-4 rounded-full mb-4">
        <AlertCircle className="w-10 h-10" />
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Unable to load bookings
      </h2>
      <p className="text-sm text-gray-600 max-w-md mb-6">
        The server took too long to respond or an error occurred while fetching the data.
      </p>
      <div className="flex space-x-3">
        <Button onClick={() => reset()} variant="default">
          Try Again
        </Button>
        <Button onClick={() => window.location.reload()} variant="outline">
          Refresh Page
        </Button>
      </div>
    </div>
  );
}

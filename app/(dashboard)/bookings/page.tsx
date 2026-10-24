import { getAllBookings, getBookingsAnalytics } from "@/actions/ride-cost";
import { Client } from "./_components/client";

export default async function BookingsPage() {
  const [bookings, analytics] = await Promise.all([
    getAllBookings(),
    getBookingsAnalytics(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-white p-4 pb-8 md:pb-16">
      <div className="border-b pb-4 mb-4 w-full">
        <h2 className="text-xl">All Bookings</h2>
      </div>
      <Client
        fetchType="ALL"
        showAnalytics={true}
        initialData={bookings || []}
        initialAnalytics={analytics}
      />
    </div>
  );
}

import { Client } from "./_components/client"

export default function BookingsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white p-4 pb-8 md:pb-16">
      <div className="border-b pb-4 mb-4 w-full">
        <h2 className="text-xl">All Bookings</h2>
      </div>
      <Client fetchType="ALL" showAnalytics={true} />
    </div>
  )
}


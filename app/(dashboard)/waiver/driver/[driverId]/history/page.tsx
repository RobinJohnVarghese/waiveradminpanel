import {
  getDriverRideAnalytics,
  getDriverRideHistory,
} from "@/actions/ride-cost";
import { Client } from "./_components/client";

interface Props {
  params: { driverId: string };
}

export default async function HistoryPage({ params }: Props) {
  const history = await getDriverRideHistory(params.driverId, "DVR");
  const analytics = await getDriverRideAnalytics(params.driverId, "DVR");
  return (
    <div className="min-h-screen flex flex-col bg-white p-4 pb-8 md:pb-16">
      <div className="border-b pb-4 mb-4 w-full">
        <h2 className="text-xl">Ride History</h2>
      </div>
      <Client data={history} analytics={analytics} />
    </div>
  );
}

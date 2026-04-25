import {
  getDriverRideAnalytics,
  getDriverRideHistory,
  getVehicles,
} from "@/actions/ride-cost";
import { Client } from "./_components/client";

interface Props {
  params: { fleetId: string };
}

export default async function HistoryPage({ params }: Props) {
  const vehicles = await getVehicles(params.fleetId);
  console.log(vehicles)
  return (
    <div className="min-h-screen flex flex-col bg-white p-4 pb-8 md:pb-16">
      <div className="border-b pb-4 mb-4 w-full">
        <h2 className="text-xl">Vehicles</h2>
      </div>
      <Client data={vehicles} fleetId={params.fleetId} />
    </div>
  );
}

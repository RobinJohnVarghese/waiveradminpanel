import {
    getDriverRideAnalytics,
    getDriverRideHistory,
    getVehicles,
  } from "@/actions/ride-cost";
import { CreateVehicleDriver } from "../_components/create-vehicle-driver";
  
  interface Props {
    params: { fleetId: string; vehicleId: string };
  }
  
  export default async function HistoryPage({ params }: Props) {
    return (
      <div className="min-h-screen flex flex-col bg-white p-4 pb-8 md:pb-16">
        <div className="border-b pb-4 mb-4 w-full">
          <h2 className="text-xl">Add New Driver</h2>
        </div>
        <CreateVehicleDriver userId={params.fleetId} vehicleId={params.vehicleId} />
      </div>
    );
  }
  
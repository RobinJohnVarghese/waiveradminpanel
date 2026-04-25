import { getUserDetails } from "@/actions/get-users";
import {
  getCabRideCostDetails,
  getLocations,
  getVehicleTypes,
} from "@/actions/ride-cost";
import { Location, UserDetails, VehicleType } from "@/lib/types";
import { CostForm } from "./_components/cost-form";

interface Props {
  params: { costId: string };
}

export default async function CabRideCostPage({ params }: Props) {
  const edit = params.costId !== "new";
  let cabRideCost;
  if (edit) {
    cabRideCost = await getCabRideCostDetails(params.costId);
  }

  const vehicleTypes: VehicleType[] = await getVehicleTypes();
  const locations: Location[] = await getLocations();

  const heading = edit ? "Edit" : "Add New";
  return (
    <div className="min-h-screen flex flex-col bg-white p-4">
      <div className="border-b pb-4 mb-4 w-full">
        <h2 className="text-2xl mb-4">{heading}</h2>
      </div>
        {edit ? (
          <CostForm
            initialData={cabRideCost}
            vehicleTypes={vehicleTypes}
            locations={locations}
          />
        ) : (
          <CostForm vehicleTypes={vehicleTypes} locations={locations} />
        )}
    </div>
  );
}

import { getUserDetails } from "@/actions/get-users";
import { Location, VehicleType } from "@/lib/types";
import { CostForm } from "./_components/cost-form";
import { getChauffeurRideCostDetails, getLocations, getVehicleTypes } from "@/actions/ride-cost";

interface Props {
  params: { costId: string };
}

export default async function CabRideCostPage({ params }: Props) {
  const edit = params.costId !== "new"
  let chauffeurRideCost;
  if (edit) {
    chauffeurRideCost = await getChauffeurRideCostDetails(params.costId);
    console.log(chauffeurRideCost)
  }

  const vehicleTypes: VehicleType[] = await getVehicleTypes();

  const heading = edit ? "Edit " : "Add " + "Ride Chauffeur"
  return (
    <div className="min-h-screeen flex flex-col bg-white p-4 mb-28">
      <div className="border-b pb-4 mb-4 w-full">
        <h2 className="text-2xl mb-4">{heading}</h2>
      </div>
      {edit ? (
        <CostForm
          initialData={chauffeurRideCost}
          vehicleTypes={vehicleTypes}
        />
      ) : (
        <CostForm vehicleTypes={vehicleTypes} />
      )}
    </div>
  );
}

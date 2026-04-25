import { getUserDetails } from "@/actions/get-users";
import { EditDetails } from "./_components/edit-form";
import {
  DistrictType,
  StateType,
  TransmissionType,
  VehicleType,
} from "@/lib/types";
import {
  getDistricts,
  getLocations,
  getStates,
  getTransmissionTypes,
  getVehicleDetails,
  getVehicleTypes,
} from "@/actions/ride-cost";
import { Location as LocationType } from "@/lib/types";

interface Props {
  params: { fleetId: string; vehicleId: string };
}

export default async function DetailsPage({ params }: Props) {
  const edit = params.vehicleId !== "new";
  let vehicleDetails;
  if (edit) {
    vehicleDetails = await getVehicleDetails(params.vehicleId);
    // console.log(vehicleDetails);
  }
  const heading = edit ? `Details of ${vehicleDetails.name}` : "Add New Vehicle";

  const vehicleTypes: VehicleType[] = await getVehicleTypes();
  const transmissionTypes: TransmissionType[] = await getTransmissionTypes();

  return (
    <div className="min-h-screen flex flex-col bg-white p-4 pb-8 md:pb-16">
      <div className="border-b pb-4 mb-4 w-full">
        <h2 className="text-xl">{heading}</h2>
      </div>
      {edit ? (
        <EditDetails
          vehicleTypes={vehicleTypes}
          transmissionTypes={transmissionTypes}
          initialData={vehicleDetails}
          userId={params.fleetId}
        />
      ) : (
        <EditDetails
          vehicleTypes={vehicleTypes}
          transmissionTypes={transmissionTypes}
          userId={params.fleetId}
        />
      )}
    </div>
  );
}

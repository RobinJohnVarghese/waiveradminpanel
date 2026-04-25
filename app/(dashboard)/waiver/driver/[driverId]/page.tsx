import { getUserDetails } from "@/actions/get-users";
import { EditDetails } from "./_components/edit-form";
import { BankType, DistrictType, StateType, TransmissionType, UserDetails, VehicleType } from "@/lib/types";
import { getBanks, getDistricts, getLocations, getStates, getTransmissionTypes, getVehicleTypes } from "@/actions/ride-cost";
import { Location as LocationType } from "@/lib/types";

interface Props {
  params: { driverId: string };
}

export default async function DetailsPage({ params }: Props) {
  const edit = params.driverId !== "new";
  let user;
  if (edit) {
    user = await getUserDetails(params.driverId, "DVR");
    // console.log(user);
  }
  const heading = edit ? `Details of ${user.fullname}` : "Add New Driver";

  const locations: LocationType[] = await getLocations();
  const states: StateType[] = await getStates();
  const districts: DistrictType[] = await getDistricts();
  const banks: BankType[] = await getBanks();
  const vehicleTypes: VehicleType[] = await getVehicleTypes();
  const transmissionTypes: TransmissionType[] = await getTransmissionTypes();
  // console.log(user)

  return (
    <div className="min-h-screen flex flex-col bg-white p-4 pb-8 md:pb-16">
      <div className="border-b pb-4 mb-4 w-full">
        <h2 className="text-xl">{heading}</h2>
      </div>
      {edit ? (
        <EditDetails
          locations={locations}
          states={states}
          districts={districts}
          initialData={user}
          banks={banks}
          vehicleTypes={vehicleTypes}
          transmissionTypes={transmissionTypes}
        />
      ) : (
        <EditDetails
          locations={locations}
          states={states}
          districts={districts}
          banks={banks}
          vehicleTypes={vehicleTypes}
          transmissionTypes={transmissionTypes}
        />
      )}
    </div>
  );
}

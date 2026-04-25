import { getUserDetails } from "@/actions/get-users";
import { EditDetails } from "./_components/edit-form";
import { DistrictType, StateType } from "@/lib/types";
import { getDistricts, getLocations, getStates } from "@/actions/ride-cost";
import { Location as LocationType } from "@/lib/types";


interface Props {
  params: { fleetId: string };
}

export default async function DetailsPage({ params }: Props) {
  const edit = params.fleetId !== "new";
  let user;
  if (edit) {
    user = await getUserDetails(params.fleetId, "FTR");
    // console.log(user);
  }
  const heading = edit ? `Details of ${user.fullname}` : "Add New Fleet";

  const states: StateType[] = await getStates();
  const locations: LocationType[] = await getLocations();
  const districts: DistrictType[] = await getDistricts();
  // console.log(user)

  return (
    <div className="min-h-screen flex flex-col bg-white p-4 pb-8 md:pb-16">
      <div className="border-b pb-4 mb-4 w-full">
        <h2 className="text-xl">{heading}</h2>
      </div>
      {edit ? (
        <EditDetails
          states={states}
          districts={districts}
          locations={locations}
          initialData={user}
        />
      ) : (
        <EditDetails
          states={states}
          districts={districts}
          locations={locations}
        />
      )}
    </div>
  );
}

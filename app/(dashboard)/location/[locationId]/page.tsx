import { getLocationDetails } from "@/actions/get-location";
import { LocationForm } from "./_components/form";

interface Props {
  params: { locationId: string };
}

export default async function LocationIdPage({ params }: Props) {
  const edit = params.locationId !== "new";
  let locationData;
  if (edit) {
    locationData = await getLocationDetails(params.locationId);
  }

  const heading = edit ? "Edit" : "Add New";
  return (
    <div className="min-h-screen flex flex-col bg-white p-4">
      <div className="border-b pb-4 mb-4 w-full">
        <h2 className="text-2xl mb-4">{heading}</h2>
      </div>
      {edit ? <LocationForm initialData={locationData} /> : <LocationForm />}
    </div>
  );
}

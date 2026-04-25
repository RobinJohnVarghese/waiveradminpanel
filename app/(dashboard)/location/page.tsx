import { getLocations } from "@/actions/ride-cost";
import { Location } from "@/lib/types";
import { Client } from "./_components/client";

export default async function LocationPage() {
  const locations: Location[] = await getLocations();
  return (
    <div className="bg-white h-full p-4">
      <h2 className="text-2xl">Location</h2>
    {locations && locations.length >0 && <Client data={locations} />}
    </div>
  );
}

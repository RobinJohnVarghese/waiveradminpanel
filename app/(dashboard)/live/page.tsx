
import LocationDetails from "./_components/location-details";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export default async function LiveLocationPage() {
  const session = await getServerSession(authOptions);
  return (
    <div className="bg-white h-full p-4">
      <h2 className="text-2xl mb-4">Live Location</h2>
      <LocationDetails session={session} />
    </div>
  );
}

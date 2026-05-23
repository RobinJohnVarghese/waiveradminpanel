import { getUsers } from "@/actions/get-users"
import { getLocations } from "@/actions/ride-cost"
import { Client } from "./_components/client"

export default async function DriverPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const users = await getUsers(
    "CHR",
    searchParams.location,
    searchParams.is_online,
    searchParams.status,
    searchParams.rating_min,
    searchParams.rating_max
  )

  const locations = await getLocations()

  return (
    <div className="bg-white p-4">
      <h2 className="text-2xl">Chauffeurs</h2>
      <Client data={users} locations={locations} />
    </div>
  )
}

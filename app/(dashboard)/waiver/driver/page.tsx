import { getUsers } from "@/actions/get-users"
import { Client } from "./_components/client"

export default async function DriverPage() {
  const users = await getUsers("DVR")

  return (
    <div className="bg-white p-4">
      <h2 className="text-2xl">Drivers</h2>
      <Client data={users} />
    </div>
  )
}

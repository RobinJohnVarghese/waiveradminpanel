import { getUsers } from "@/actions/get-users"
import { Client } from "./_components/client"

export default async function UsersPage() {
  const users = await getUsers("CTR")

  return (
    <div className="bg-white p-4">
      <h2 className="text-2xl">Users</h2>
      <Client data={users} />
    </div>
  )
}

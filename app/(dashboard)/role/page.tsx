import { getInternalUsers, getUsers } from "@/actions/get-users";
import { Client } from "./_components/client";

export default async function UsersPage() {
  const users = await getInternalUsers();
  // console.log(users)
  return (
    <div className="bg-white p-4">
      <h2 className="text-2xl">Role Management</h2>
      {users && <Client data={users} />}
    </div>
  );
}

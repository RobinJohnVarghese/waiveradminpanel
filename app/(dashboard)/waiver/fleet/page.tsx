import { getUsers } from "@/actions/get-users";
import { Client } from "./_components/client";

export default async function FleetPage() {
  const users = await getUsers("FTR");
  return (
    <div className="bg-white p-4">
      <h2 className="text-2xl">Fleet Owners</h2>
      <Client data={users} />
    </div>
  );
}

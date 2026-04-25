import { getUserDetails } from "@/actions/get-users";

interface Props {
  params: { userId: string };
}
export default async function UserDetailsPage({params}: Props) {
  const userDetails = await getUserDetails(params.userId);
  return (
    <div className="bg-white min-h-screen p-4">
      <h2 className="text-2xl">User Details</h2>
    </div>
  );
}

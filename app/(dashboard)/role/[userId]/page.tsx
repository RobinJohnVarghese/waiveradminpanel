import { getInternalUserDetails, getUserDetails } from "@/actions/get-users";
import { NewUserForm } from "./_components/form";

interface Props {
  params: { userId: string };
}
export default async function UserIdPage({ params }: Props) {
  const edit = params.userId !== "new";
  let userDetails;
  if (edit) {
    userDetails = await getInternalUserDetails(params.userId,);
  }
  console.log(userDetails)
  return (
    <div className="min-h-screen flex flex-col bg-white p-4">
      <div className="border-b pb-4 mb-4 w-full">
        <h2 className="text-xl">
          {edit ? "Edit User details" : "Add New User"}
        </h2>
      </div>
      <NewUserForm initialData={userDetails} />
      {edit && 
        <div>
          
        </div>
      }
    </div>
  );
}

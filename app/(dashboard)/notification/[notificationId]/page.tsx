import { getUserDetails } from "@/actions/get-users";
import {
  getCabRideCostDetails,
  getLocations,
  getNotifcation,
  getPushNotificationReceiverTypes,
  getVehicleTypes,
} from "@/actions/ride-cost";
import { Location, ReceiverType, UserDetails, VehicleType } from "@/lib/types";
import { NotificationForm } from "./_components/form";

interface Props {
  params: { notificationId: string };
}

export default async function NotificationIdPage({ params }: Props) {
  const edit = params.notificationId !== "new";
  let notification;
  if (edit) {
    notification = await getNotifcation(params.notificationId);
  }

  const receiverTypes: ReceiverType[] = await getPushNotificationReceiverTypes();
  const locations: Location[] = await getLocations();

  const heading = edit ? "Edit" : "Add New";
  return (
    <div className="min-h-screen flex flex-col bg-white p-4">
      <div className="border-b pb-4 mb-4 w-full">
        <h2 className="text-2xl mb-4">{heading}</h2>
      </div>
        {edit ? (
          <NotificationForm
            initialData={notification}
            receiverTypes={receiverTypes}
            locations={locations}
          />
        ) : (
          <NotificationForm receiverTypes={receiverTypes} locations={locations} />
        )}
    </div>
  );
}

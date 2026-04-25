import { getNotifcations, getPushNotificationReceiverTypes } from "@/actions/ride-cost";
import { Client } from "./_components/client";

export default async function PushNotificationPage() {
  const notifications = await getNotifcations();
  const receivers = await getPushNotificationReceiverTypes();

  return (
    <div className="bg-white h-full p-4">
      <h2 className="text-2xl">PushNotification</h2>
      <Client data={notifications} />
    </div>
  );
}

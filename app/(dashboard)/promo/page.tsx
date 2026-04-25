import { getNotifcations, getPromoReceiverTypes, getPromos, getPushNotificationReceiverTypes } from "@/actions/ride-cost";
import { Client } from "./_components/client";

export default async function PromoPage() {
  const promos = await getPromos();
  const receivers = await getPromoReceiverTypes();

  return (
    <div className="bg-white h-full p-4">
      <h2 className="text-2xl">Promo Management</h2>
      <Client data={promos} />
    </div>
  );
}

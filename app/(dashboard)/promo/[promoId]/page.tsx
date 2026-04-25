import { getUserDetails } from "@/actions/get-users";
import {
  getCabRideCostDetails,
  getLocations,
  getNotifcation,
  getPromo,
  getPromoReceiverTypes,
  getPushNotificationReceiverTypes,
  getVehicleTypes,
} from "@/actions/ride-cost";
import { Location, ReceiverType, UserDetails, VehicleType } from "@/lib/types";
import { PromoForm } from "./_components/form";

interface Props {
  params: { promoId: string };
}

export default async function PromoIdPage({ params }: Props) {
  const edit = params.promoId !== "new";
  let promo;
  if (edit) {
    promo = await getPromo(params.promoId);
  }

  const receiverTypes: ReceiverType[] = await getPromoReceiverTypes();
  const locations: Location[] = await getLocations();

  const heading = edit ? "Edit" : "Add New";
  return (
    <div className="min-h-screen flex flex-col bg-white p-4">
      <div className="border-b pb-4 mb-4 w-full">
        <h2 className="text-2xl mb-4">{heading}</h2>
      </div>
        {edit ? (
          <PromoForm
            initialData={promo}
            receiverTypes={receiverTypes}
            locations={locations}
          />
        ) : (
          <PromoForm receiverTypes={receiverTypes} locations={locations} />
        )}
    </div>
  );
}

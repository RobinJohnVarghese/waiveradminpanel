import { Location, PlanService, PlanType, UserDetails, VehicleType } from "@/lib/types";
import { SubscriptionForm } from "./_components/subscription-form";
import { getSubscriptionPlanDetails, getSubscriptionPlanServices, getSubscriptionPlanTypes } from "@/actions/subscription";

interface Props {
  params: { subscriptionId: string };
}

export default async function SubscriptionIdPage({ params }: Props) {
  const edit = params.subscriptionId !== "new";
  let plan;
  if (edit) {
    plan = await getSubscriptionPlanDetails(params.subscriptionId);
  }

  const planTypes: PlanType[] = await getSubscriptionPlanTypes();
  const planServices: PlanService[] = await getSubscriptionPlanServices();

  const heading = edit ? "Edit" : "Add New";
  return (
    <div className="min-h-screen flex flex-col bg-white p-4">
      <div className="border-b pb-4 mb-4 w-full">
        <h2 className="text-2xl mb-4">{heading}</h2>
      </div>
        {edit ? (
          <SubscriptionForm
            initialData={plan}
            planTypes={planTypes}
            planServices={planServices}
          />
        ) : (
          <SubscriptionForm planTypes={planTypes} planServices={planServices} />
        )}
    </div>
  );
}

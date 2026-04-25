import { Client } from "./_components/client";
import { getSubscriptionPlans } from "@/actions/subscription";

export default async function SubscriptionPage() {
  const plans = await getSubscriptionPlans()
  return (
    <div className="bg-white min-h-screen p-4">
      <h2 className="text-2xl">Subscription</h2>
      {plans && <Client data={plans} />}
    </div>
  );
}

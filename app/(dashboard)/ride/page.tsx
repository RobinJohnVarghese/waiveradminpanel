import { getCabRideCosts } from "@/actions/ride-cost";
import { Client } from "./_components/client";

export default async function RidingCostPage() {
  const costs = await getCabRideCosts()
  return (
    <div className="bg-white min-h-screen p-4">
      <h2 className="text-2xl">Cab Riding Cost</h2>
      <Client data={costs} />
    </div>
  );
}

import { getCabRideCosts, getChauffeurRideCosts } from "@/actions/ride-cost";
import { Client } from "./_components/client";

export default async function ChauffeurPage() {
  const costs = await getChauffeurRideCosts()
  console.log('costs',costs);
  
  return (
    <div className="bg-white h-full p-4">
      <h2 className="text-2xl">Chauffeur Ride Cost</h2>
      {costs && <Client data={costs} />}
    </div>
  );
}

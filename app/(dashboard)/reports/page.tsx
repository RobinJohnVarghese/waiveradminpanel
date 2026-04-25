import { getWaiverReport } from "@/actions/ride-cost";
import { Client } from "./_components/client";

export default async function WaiverReportPage() {
  const report = await getWaiverReport();
  console.log(report)
  return (
    <div className="bg-white h-full p-4">
      <h2 className="text-2xl">Waiver Reports</h2>
      <Client data={report} />
    </div>
  );
}

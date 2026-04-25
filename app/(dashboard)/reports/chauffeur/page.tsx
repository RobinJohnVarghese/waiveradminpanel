import { Client } from '@/app/(dashboard)/reports/chauffeur/_components/client';

import { getReportApi } from '@/actions/reports';

export default async function ChauffeurPage() {
  const chauffeurReport = await getReportApi("CHR");

  return (
    <div className="bg-white h-full p-4">
      <h2 className="text-2xl">Chauffeur Reports</h2>
      <Client data={chauffeurReport} />
    </div>
  );
}

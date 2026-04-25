"use client";

import { DataTable } from "./data-table";
import { Column, columns } from "./columns";

interface ClientProps {
  data: Column[];
  analytics: any;
}

export const Client: React.FC<ClientProps> = ({ data, analytics }) => {
  return (
    <>
      <DataTable
        searchKey="passenger_name"
        columns={columns}
        data={data}
        analytics={analytics}
      />
    </>
  );
};

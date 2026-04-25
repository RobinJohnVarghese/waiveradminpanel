"use client";

import { DataTable } from "./data-table";
import { Column, columns } from "./columns";

interface ClientProps {
  data: Column[];
  fleetId: string;
}

export const Client: React.FC<ClientProps> = ({ data, fleetId }) => {
  return (
    <>
      <DataTable
        searchKey="name"
        columns={columns}
        data={data}
        fleetId={fleetId}
      />
    </>
  );
};

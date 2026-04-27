"use client";

import { DataTable } from "./data-table";
import { Column, columns } from "./columns";

interface ClientProps {
  data: Column[];
}

export const Client: React.FC<ClientProps> = ({ data = [] }) => {
  return (
    <>
      <DataTable searchKey="fullname" columns={columns} data={data} />
    </>
  );
};

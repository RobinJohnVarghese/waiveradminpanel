"use client"

import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Location } from "@/lib/types";

interface ClientProps {
  data: Location[];
}

export const Client: React.FC<ClientProps> = ({ data }) => {
  return (
    <>
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};

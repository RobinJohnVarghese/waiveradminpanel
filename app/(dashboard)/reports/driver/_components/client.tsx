"use client"

import { columns } from "./columns";
import { RatingType } from "@/lib/types";
import { DataTable } from "./data-table";

interface ClientProps {
  data: RatingType[];
}

export const Client: React.FC<ClientProps> = ({ data = [] }) => {
  return (
    <>
      <DataTable searchKey="driver_name" columns={columns} data={data} />
    </>
  );
};

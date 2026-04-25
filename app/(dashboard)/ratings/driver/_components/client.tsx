"use client"

import { DataTable } from "./data-table";
import { columns } from "./columns";
import { RatingType } from "@/lib/types";

interface ClientProps {
  data: RatingType[];
}

export const Client: React.FC<ClientProps> = ({ data }) => {
  return (
    <>
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};

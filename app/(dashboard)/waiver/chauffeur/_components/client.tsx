"use client"

import { DataTable } from "./data-table";
import { Column, columns } from "./columns";

interface ClientProps {
  data: Column[];
  locations?: any[];
}

export const Client: React.FC<ClientProps> = ({ data = [], locations = [] }) => {
  return (
    <>
      <DataTable searchKey="fullname" columns={columns} data={[...data].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())} locations={locations} />
    </>
  );
};

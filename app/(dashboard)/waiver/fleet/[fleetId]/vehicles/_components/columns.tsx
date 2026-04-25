"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ChangeUserStatus } from "./change-user-status";

export type Column = {
  status: string;
  id: string;
  driver: string;
  driver_id: string;
  fleet: string;
  driver_name: string;
  passenger_name: string;
  user_type: string;
  permit_end_date: string;
  insurance_end_date: string;
  date: string;
  user: string;
};

export const columns: ColumnDef<Column>[] = [
  {
    header: "No",
    cell: ({ row }) => {
      return <>{row.index + 1}</>;
    },
  },
  {
    accessorKey: "registration_number",
    header: "Registration Number",
  },
  {
    accessorKey: "brand",
    header: "Vehicle Brand",
  },
  {
    accessorKey: "name",
    header: "Vehicle Name",
  },
  {
    accessorKey: "vehicle_type_name",
    header: "Vehicle Type",
  },
  {
    accessorKey: "transmission_type_name",
    header: "Transmission Type",
  },
  {
    accessorKey: "permit_end_date",
    header: "Permit End date",
    cell: ({ row }) => {
      return <p>{new Date(row.original.permit_end_date).toDateString()}</p>;
    },
  },
  {
    accessorKey: "insurance_end_date",
    header: "Insurance End Date",
    cell: ({ row }) => {
      return <p>{new Date(row.original.insurance_end_date).toDateString()}</p>;
    },
  },
  {
    accessorKey: "driver_id",
    header: "Driver Name & ID",
    cell: ({ row }) => {
      return (
        <>
          {row.original.driver_id ? (
            <div className="flex flex-col space-y-2">
              <div className="flex flex-row space-x-2">
                <p>{row.original.driver_name} </p>
              </div>
              <div className="flex flex-row space-x-2">
                <p>{row.original.driver_id} </p>
              </div>
            </div>
          ) : (
            <Link
              className={cn(buttonVariants({ variant: "default" }))}
              href={`/waiver/fleet/${row.original.fleet}/vehicles/${row.original.id}/driver`}
            >
              Add Driver
            </Link>
          )}
        </>
      );
    },
  },
  {
    header: "status",
    cell: ({ row }) => (
      <div className="flex w-fit flex-row space-x-2">
        <ChangeUserStatus
          row={row}
          id={row.original.id}
          status={row.original.status}
          name={row.original.driver_name}
        />
      </div>
    ),
  },
  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   cell: ({ row }) => {
  //     const status = row.getValue("status");

  //     return (
  //       <Badge
  //         className={cn(
  //           status == "PDG"
  //             ? "bg-blue-500"
  //             : status == "ACE"
  //             ? "bg-green-500"
  //             : status == "BCD"
  //             ? "bg-red-500"
  //             : "bg-orange-400"
  //         )}
  //       >
  //         {row.original.status == "PDG"
  //           ? "Pending"
  //           : row.original.status == "ACE"
  //           ? "Active"
  //           : row.original.status == "BCD"
  //           ? "Blocked"
  //           : "Rejected"}
  //       </Badge>
  //     );
  //   },
  // },
  {
    header: "Other Action",
    cell: ({ row }) => {
      return (
        <div className="flex w-fit flex-col space-y-2">
          <Link
            href={`/waiver/fleet/${row.original.fleet}/vehicles/${row.original.id}`}
            className={cn(
              "bg-blue-500 rounded-md p-2 w-[100px] text-white text-center"
            )}
          >
            Document
          </Link>
        </div>
      );
    },
  },
  // {
  //   header: "Action",
  //   cell: ({ row }) => (
  //     <div className="flex w-fit flex-row space-x-2">
  //       <ChangeUserStatus
  //         profileId={row.original.id}
  //         status={row.original.status}
  //         name={row.original.fullname}
  //       />
  //       <DeleteUser userId={row.original.user} />
  //     </div>
  //   ),
  // },
];

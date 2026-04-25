"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { CellAction } from "./cell-action";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Edit, Pencil, Trash } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { DeleteUser } from "./delete";
import { ChangeUserStatus } from "./change-user-status";
import Link from "next/link";

// import { CellAction } from "./cell-action"

export type Column = {
  status: string;
  id: string;
  name: string;
  fullname: string;
  user_type: string;
  course: string;
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
    accessorKey: "fullname",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "location_name",
    header: "Location",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");

      return (
        <Badge
          className={cn(
            status == "PDG"
              ? "bg-blue-500"
              : status == "ACE"
              ? "bg-green-500"
              : status == "BCD"
              ? "bg-red-500"
              : "bg-orange-400"
          )}
        >
          {row.original.status == "PDG"
            ? "Pending"
            : row.original.status == "ACE"
            ? "Active"
            : row.original.status == "BCD"
            ? "Blocked"
            : "Rejected"}
        </Badge>
      );
    },
  },
  {
    header: "Other Action",
    cell: ({ row }) => {
      const userType = row.original.user_type
      let userLink;
      if (userType == "DVR") {
        userLink = "driver";
      } else if (userType == "FTR") {
        userLink = "fleet";
      } else if (userType == "CHR") {
        userLink = "chauffeur";
      }
      return (
        <div className="flex w-fit flex-col space-y-2">
          <Link
            href={`/waiver/${userLink}/${row.original.id}/history`}
            className={cn("bg-green-500 rounded-md p-2 w-[100px]")}
          >
            Ride history
          </Link>
          <Link
            href={`/waiver/${userLink}/${row.original.id}`}
            className={cn("bg-blue-500 rounded-md p-2 w-[100px]")}
          >
            Details
          </Link>
        </div>
      );
    },
  },
  {
    header: "Action",
    cell: ({ row }) => (
      <div className="flex w-fit flex-row space-x-2">
        <ChangeUserStatus
          profileId={row.original.id}
          status={row.original.status}
          name={row.original.fullname}
        />
        <DeleteUser userId={row.original.id} />
      </div>
    ),
  },
];

"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { CellAction } from "./cell-action";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Edit, Pencil, Trash } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { DeleteRideCost } from "./delete";
import Link from "next/link";

// import { CellAction } from "./cell-action"

export type Column = {
  status: string;
  id: string;
  name: string;
  image: string;
  location: string;
  send_time: string;
  notification_status: string;
};

export const columns: ColumnDef<Column>[] = [
  {
    header: "No",
    cell: ({ row }) => {
      return <>{row.index + 1}</>;
    },
  },
  {
    accessorKey: "receiver_name",
    header: "Send To",
  },

  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      return (
        <Image
          src={`${process.env.BACKEND_URL}/${row.original.image}` || ""}
          alt={row.original.name}
          height={40}
          width={40}
        />
      );
    },
  },
  {
    accessorKey: "location_name",
    header: "Location",
  },
  {
    accessorKey: "content",
    header: "Message",
  },
  {
    accessorKey: "send_time",
    header: "Date & Time",
    cell: ({ row }) => {
      return <p>{new Date(row.original.send_time).toLocaleString()}</p>;
    },
  },
  {
    accessorKey: "notification_status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("notification_status");

      return (
        <Badge
          className={cn(
            row.original.notification_status === "ATV" ? "bg-green-500" : "bg-red-500"
          )}
        >
          {row.original.notification_status === "ATV" ? "Active" : "Blocked"}
        </Badge>
      );
    },
  },

  {
    header: "Action",
    cell: ({ row }) => (
      <div className="flex w-fit flex-row items-center space-x-2">
        <Link
          href={`/notification/${row.original.id}`}
          className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
        >
          {" "}
          <Pencil className="h-4 w-4" />
        </Link>
        <DeleteRideCost costId={row.original.id} />
      </div>
    ),
  },
];

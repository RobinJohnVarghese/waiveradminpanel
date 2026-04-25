"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { CellAction } from "./cell-action";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Edit, Pencil, Trash } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { DeletePromo } from "./delete";
import Link from "next/link";

// import { CellAction } from "./cell-action"

export type Column = {
  status: string;
  id: string;
  name: string;
  image: string;
  location: string;
  start_time: string;
  end_time: string;
  promo_status: string;
};

export const columns: ColumnDef<Column>[] = [
  {
    header: "No",
    cell: ({ row }) => {
      return <>{row.index + 1}</>;
    },
  },
  {
    accessorKey: "name",
    header: "Promo Name",
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
    accessorKey: "promo_type",
    header: "Type",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "usage_limit",
    header: "Usage Limit",
  },
  {
    accessorKey: "used_count",
    header: "User Used",
  },
  {
    accessorKey: "start_time",
    header: "Start Date & Time",
    cell: ({ row }) => {
      return <p>{new Date(row.original.start_time).toLocaleString()}</p>;
    },
  },
  {
    accessorKey: "end_time",
    header: "Expire Date & Time",
    cell: ({ row }) => {
      return <p>{new Date(row.original.end_time).toLocaleString()}</p>;
    },
  },
  {
    accessorKey: "receiver_name",
    header: "Promo To",
  },
  {
    accessorKey: "location_name",
    header: "Location",
  },

  {
    accessorKey: "promo_status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("promo_status");

      return (
        <Badge
          className={cn(
            row.original.promo_status === "ATV" ? "bg-green-500" : "bg-red-500"
          )}
        >
          {row.original.promo_status === "ATV" ? "Active" : "Blocked"}
        </Badge>
      );
    },
  },

  {
    header: "Action",
    cell: ({ row }) => (
      <div className="flex w-fit flex-row items-center space-x-2">
        <Link
          href={`/promo/${row.original.id}`}
          className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
        >
          {" "}
          <Pencil className="h-4 w-4" />
        </Link>
        <DeletePromo costId={row.original.id} />
      </div>
    ),
  },
];

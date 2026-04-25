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
  cost_per_km: number;
  cost_per_minutes: number;
  min_rate: number;
  min_rate_km: number;
  return_charge: number;
  location: string;
  is_active: boolean;
  ride_status: string;
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
    header: "Ride Name",
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
    accessorKey: "min_charge_km",
    header: "Min Charge Km",
  },
  {
    accessorKey: "min_charge_hr",
    header: "Min Charge Hour",
  },

  {
    accessorKey: "min_charge_return_amount",
    header: "Return Charge",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");

      return (
        <Badge
          className={cn(
            row.original.ride_status === "ATV" ? "bg-green-500" : "bg-red-500"
          )}
        >
          {row.original.ride_status === "ATV" ? "Active" : "Blocked"}
        </Badge>
      );
    },
  },

  {
    header: "Action",
    cell: ({ row }) => (
      <div className="flex w-fit flex-row items-center space-x-2">
        <Link
          href={`/ride/chauffeur/${row.original.id}`}
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

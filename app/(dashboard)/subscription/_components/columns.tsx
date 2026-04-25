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
  id: string;
  name: string;
  plan_type: string;
  bookings_no: number;
  validity_days: number;
  max_duration_km: number;
  max_duration_hr: number;
  price: number;
  compare_price: number;
  is_active: boolean;
  plan_status: string;
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
    header: "Subscription Name",
  },
  {
    accessorKey: "plan_type_name",
    header: "Type",
  },
  {
    accessorKey: "bookings_no",
    header: "Bookings",
  },
  {
    accessorKey: "validity_days",
    header: "Validity",
  },
  {
    accessorKey: "max_distance_km",
    header: "Max Km Per Booking",
  },
  {
    accessorKey: "max_duration_hr",
    header: "Max Hr Per Booking",
  },
  {
    accessorKey: "price",
    header: "Subscription Price",
  },
  {
    accessorKey: "compare_price",
    header: "Compare at Price",
  },
  {
    accessorKey: "plan_status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");

      return (
        <Badge
          className={cn(
            row.original.plan_status === "ATV" ? "bg-green-500" : "bg-red-500"
          )}
        >
          {row.original.plan_status === "ATV" ? "Active" : "Blocked"}
        </Badge>
      );
    },
  },

  {
    header: "Action",
    cell: ({ row }) => (
      <div className="flex w-fit flex-row items-center space-x-2">
        <Link
          href={`/subscription/${row.original.id}`}
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

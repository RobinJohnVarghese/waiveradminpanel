"use client";

import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Edit, Pencil, Trash } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { DeleteRating } from "./delete";
import Link from "next/link";
import { RatingType } from "@/lib/types";

// import { CellAction } from "./cell-action"

export const columns: ColumnDef<RatingType>[] = [
  {
    header: "No",
    cell: ({ row }) => {
      return <>{row.index + 1}</>;
    },
  },
  {
    accessorKey: "driver_id",
    header: "Driver ID",
  },
  {
    accessorKey: "ride_type",
    header: "Ride Type",
  },
  {
    accessorKey: "driver_name",
    header: "Driver Name",
  },
  {
    accessorKey: "passenger_name",
    header: "Passenger Name",
  },
  {
    accessorKey: "updated_at",
    header: "Date & Time",
  },
  {
    accessorKey: "rating",
    header: "Ratings & Reviews",
  },
  {
    accessorKey: "review",
    header: "Comment",
  },
  {
    header: "Action",
    cell: ({ row }) => (
      <div className="flex w-fit flex-row items-center space-x-2">

        <Pencil className="h-4 w-4" />
        <DeleteRating costId={row.original.id} />
      </div>
    ),
  },
];

"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { CellAction } from "./cell-action";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Edit, Pencil, Trash } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { DeleteLocation } from "./delete";
import Link from "next/link";
import { Location } from "@/lib/types";

// import { CellAction } from "./cell-action"



export const columns: ColumnDef<Location>[] = [
  {
    header: "No",
    cell: ({ row }) => {
      return <>{row.index + 1}</>;
    },
  },
  {
    accessorKey: "name",
    header: "Location Name",
  },

  {
    accessorKey: "radius",
    header: "Radius",
  },
  {
    accessorKey: "location_type",
    header: "Location Type",
    cell: ({ row }) => {

      return (
        <p
          
        >
          {row.original.location_type === "PMN" ? "Promotion" : "Service Area"}
        </p>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");

      return (
        <Badge
          className={cn(
            row.original.status === "ATV" ? "bg-green-500" : "bg-red-500"
          )}
        >
          {row.original.status === "ATV" ? "Active" : "Blocked"}
        </Badge>
      );
    },
  },

  {
    header: "Action",
    cell: ({ row }) => (
      <div className="flex w-fit flex-row items-center space-x-2">
        <Link
          href={`/location/${row.original.id}`}
          className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
        >
          {" "}
          <Pencil className="h-4 w-4" />
        </Link>
        <DeleteLocation id={row.original.id} />
      </div>
    ),
  },
];

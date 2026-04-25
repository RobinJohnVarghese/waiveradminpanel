"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, } from "lucide-react";
import { RatingType } from "@/lib/types";
import ChauffeurReportDialog from "./driver-report-dialog";

// import { CellAction } from "./cell-action"

export const columns: ColumnDef<RatingType>[] = [
  {
    header: "No",
    cell: ({ row }) => {
      return <>{row.index + 1}</>;
    },
  },
  {
    accessorKey: "driver_name",
    header: "Driver Name",
  },
  {
    accessorKey: "ride_type",
    header: "Ride Type",
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
    header: "Actions",
    cell: ({ row }) => <ChauffeurReportDialog report={row.original} />,
  },
];

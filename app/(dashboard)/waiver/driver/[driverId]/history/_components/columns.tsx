"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { MapPin } from "lucide-react";

export type Column = {
  status: string;
  ride_status: string;
  id: string;
  driver: string;
  driver_id: string;
  passenger_name: string;
  user_type: string;
  start_time: string;
  end_time: string;
  start_location: string;
  end_location: string;
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
    accessorKey: "passenger_name",
    header: "Driver Name",
  },
  {
    accessorKey: "start_time",
    header: "Pickup Date & Tiime",
    cell: ({ row }) => {
      return <p>{new Date(row.original.start_time).toLocaleString()}</p>;
    },
  },
  {
    accessorKey: "end_time",
    header: "Drop Date & Tiime",
    cell: ({ row }) => {
      return <p>{new Date(row.original.start_time).toLocaleString()}</p>;
    },
  },
  {
    accessorKey: "start_location",
    header: "pickup",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col space-y-2">
          <div className="flex flex-row space-x-2">
            <MapPin className="text-green-600 h-5 w-5" />
            <p>{row.original.start_location} </p>
          </div>
          <div className="flex flex-row space-x-2">
            <MapPin className="text-red-600 h-5 w-5" />
            <p>{row.original.end_location} </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "earning",
    header: "Earned",
  },
  {
    accessorKey: "rating",
    header: "Rating",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");

      return (
        <div className="flex flex-col space-y-2">
          <Badge
            className={cn(
              status == "CAD"
                ? "bg-red-500"
                : status == "COD"
                ? "bg-green-500"
                : status == "PSD"
                ? "bg-orange-400"
                : "bg-blue-500"
            )}
          >
            {row.original.ride_status}
          </Badge>
          <Link
          className="text-sm underline text-blue-600"
            href={`/waiver/driver/${row.original.driver_id}/history/${row.original.id}`}
          >View Details</Link>
        </div>
      );
    },
  },
];

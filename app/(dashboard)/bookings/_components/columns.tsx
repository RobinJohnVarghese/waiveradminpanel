"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { MapPin } from "lucide-react";
import dayjs from "dayjs";

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
    accessorKey: "id",
    header: "Ride ID",
  },
  {
    accessorKey: "ride_option_type",
    header: "Ride Type",
  },
  {
    accessorKey: "passenger_name",
    header: "User Name",
  },
  {
    accessorKey: "driver_name",
    header: "Driver/Chauffeur Name",
  },
  {
    accessorKey: "start_time",
    header: "Pickup Date & Time",
    cell: ({ row }) => {
      return <p className="text-xs">{dayjs(row.original.start_time).format("DD MMM YYYY, hh:mm A")}</p>;
    },
  },
  {
    accessorKey: "end_time",
    header: "Drop Date & Time",
    cell: ({ row }) => {
      return <p className="text-xs">{dayjs(row.original.end_time).format("DD MMM YYYY, hh:mm A")}</p>;
    },
  },
  {
    accessorKey: "start_location",
    header: "Pickup/Drop Address",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col space-y-2">
          <div className="flex flex-row space-x-2">
            <MapPin className="text-green-600 h-5 w-5" />
            <p className="text-xs">{row.original.start_location} </p>
          </div>
          <div className="flex flex-row space-x-2">
            <MapPin className="text-red-600 h-5 w-5" />
            <p className="text-xs">{row.original.end_location} </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");

      return (
        <div className="flex flex-col space-y-2">
          <Badge
            className={cn('text-xs text-center',
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
          className="text-xs  bg-blue-600 text-white rounded-md px-2 py-1 text-center cursor-pointer"
            href={`/bookings/rides/${row.original.id}`}
          >View Details</Link>
        </div>
      );
    },
  },
];

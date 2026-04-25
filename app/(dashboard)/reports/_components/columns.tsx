"use client";

import { ColumnDef } from "@tanstack/react-table";
import WaiverReportDialog from "../../../../components/pages/reports/waiver-report-dialog";

// import { CellAction } from "./cell-action"

export type Column = {
  status: string;
  id: string;
  name: string;
  image: string;
  start_time: string;
  total_amount: number;
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
    header: "Ride ID",
    accessorKey: "ride_id"
  },
  {
    accessorKey: "vehicle_details.vehicle_type_name",
    header: "Ride Type",
  },
  {
    accessorKey: "driver_name",
    header: "Driver/Chauffeur Name",
  },
  {
    accessorKey: "passenger_name",
    header: "User Name",
  },
  {
    accessorKey: "end_time",
    header: "Ride Date & Time",
    cell: ({ row }) => {
      return <p>{new Date(row.original.start_time).toLocaleString()}</p>;
    },
  },
  {
    accessorKey: "payment_details.total",
    header: "Total Amount",
  },
  {
    accessorKey: "payment_details.tip",
    header: "Commission",
  },
  {
    accessorKey: "payment_details.tax",
    header: "Tax",
  },
  {
    accessorKey: "payment_details.fare",
    header: "Earned",
  },
  {
    accessorKey: "payment_details.payment_type",
    header: "P.Type",
  },
  {
    header: "Actions",
    cell: ({ row }) => <WaiverReportDialog report={row.original} />,
  },
];

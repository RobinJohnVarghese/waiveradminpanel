"use client";

import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { CloudDownload } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  analytics: any;
}

export function DataTable<TData, TValue>({
  columns,
  data = [],
  searchKey,
  analytics,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });


  return (
    <div>
      <div className="flex flex-row justify-between items-center py-4">
        <div className="flex flex-row space-x-2 items-center">
          <Link
            className={cn(buttonVariants({ variant: "default" }))}
            href={`/bookings/new`}
          >
            Add New Booking
          </Link>

          <Button variant="outline">
            <CloudDownload className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
        <Input
          placeholder="Search"
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(searchKey)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      {analytics && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-4">
          <StatTile
            stat={analytics.total}
            label="Total Rides"
            icon="/images/assets/total-fleet.png"
          />
          <StatTile
            stat={analytics.completed}
            label="Completed Rides"
            icon="/images/assets/active.png"
          />
          <StatTile
            stat={analytics.cancelled}
            label="Cancelled Rides"
            icon="/images/assets/rejected.png"
          />
          <StatTile
            stat={analytics.scheduled}
            label="Scheduled Rides"
            icon="/images/assets/scheduled.png"
          />
          <StatTile
            stat={analytics.pending}
            label="Pending Rides"
            icon="/images/assets/pending.png"
          />
          <StatTile
            stat={analytics.ongoing}
            label="Ongoing Rides"
            icon="/images/assets/ongoing.png"
          />
          <StatTile
            stat={analytics.revenue}
            label="Revenue"
            icon="/images/assets/revenue.png"
          />
          <StatTile
            stat={analytics.earnings}
            label="Earned"
            icon="/images/assets/earnings.png"
          />
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-muted">
            {table && table.getHeaderGroups() && table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {(table && table?.getRowModel() && table?.getRowModel()?.rows && table?.getRowModel()?.rows?.length) ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

interface StatTileProps {
  stat: number;
  label: string;
  icon: string;
}

const StatTile = ({ stat, label, icon }: StatTileProps) => {
  return (
    <div className="border rounded-lg w-full flex flex-row items-center p-4 space-x-6 bg-white shadow-md">
      <Image src={icon} alt={label} width={40} height={40} />
      <div className="w-full flex flex-col">
        <h2 className="text-primary text-lg lg:text-4xl">{stat ? stat : 0}</h2>
        <p className="text-xs md:text-sm">{label}</p>
      </div>
    </div>
  );
};

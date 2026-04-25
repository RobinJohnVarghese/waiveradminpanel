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
import { exportToCSV } from "@/lib/utils/csv";
import StatTile from "@/components/stat-tile";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  analytics?: {
    total: number;
    completed: number;
    cancelled: number;
    earnings: number;
  };
}

export function DataTable<TData, TValue>({
  columns,
  data,
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

  const handleDownload = () => {
    const dataToExport = table.getFilteredRowModel().rows.map(row => row.original);
    exportToCSV(dataToExport, 'user-history');
  };

  const filterFields = [
    { name: "type", label: "Activity Type" },
    { name: "date", label: "Date", type: "date" },
    // Add more fields as needed
  ];

  return (
    <div>
      <div className="flex flex-row justify-between items-center py-4">
        <Button variant="outline" onClick={handleDownload}>
          <CloudDownload className="mr-2 h-4 w-4" />
          Download
        </Button>
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
        <div className="grid grid-cols-4 mb-4 gap-4">
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
            stat={analytics.earnings}
            label="Earned"
            icon="/images/assets/earnings.png"
          />
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
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
            {table?.getRowModel().rows?.length ? (
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

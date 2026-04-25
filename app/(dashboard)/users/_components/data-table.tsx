"use client";

import { ReactNode, useMemo, useState } from "react";
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
import { CloudDownload, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { exportToCSV } from "@/lib/utils/csv";
import Image from "next/image";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey = 'fullName',
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filterValues, setFilterValues] = useState({
    status: null as string | null, // null means no filter applied
  });
  const [globalFilter, setGlobalFilter] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchColumns = ['fullName', 'phone', 'email'];

  const globalFilterFn = (row: any, columnIds: any, filterValue: any) => {
    return searchColumns.some((colId) => {
      const rowValue = row.getValue(colId);
      return String(rowValue).toLowerCase().includes(filterValue.toLowerCase());
    });
  };
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
      columnFilters
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn,
    filterFns: { globalFilterFn },
  });

  const handleFilterChange = (field: string, value: string | boolean) => {
    setFilterValues(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const applyFilters = () => {
    const filters = Object.entries(filterValues).filter(([field, value]) => value !== null) // Exclude null filters
      .map(([field, value]) => ({
        id: field,
        value,
      }));
    setColumnFilters(filters);
    setDropdownOpen(false);
  };

  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleDownload = () => {
    if (!data.length) return;
    const dataToExport = table.getFilteredRowModel().rows.map(row => row.original);
    exportToCSV(dataToExport, 'chauffeur-waivers');
  };

  const summary = useMemo(() => {
    if (data && Array.isArray(data)) {
      const totalCount = data.length;

      const pendingUsersCount = data.filter((user: any) => user.status === 'PDG').length;
      const activeUsersCount = data.filter((user: any) => user.status === 'ATV').length;
      const inactiveUsersCount = data.filter((user: any) => user.status === 'BCD').length;

      return {
        totalCount,
        pendingUsersCount,
        activeUsersCount,
        inactiveUsersCount
      };
    }

    return {
      totalCount: 0,
      pendingUsersCount: 0,
      activeUsersCount: 0,
      inactiveUsersCount: 0
    };
  }, [data]);

  return (
    <div>
      <div className="flex items-center py-4 justify-between">
        <div className="flex flex-row space-x-2 items-center">
          <Link className={cn(buttonVariants({ variant: "default" }))} href={`/users/new`}>Add New User</Link>
          <Button type="button" variant="outline" onClick={() => handleDownload()}>
            <CloudDownload className="mr-2 h-4 w-4" />
            Download
          </Button>

          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                  <div className="w-full space-y-2">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id="pending"
                          name="status"
                          value="pending"
                          checked={filterValues.status === 'PDG'}
                          onChange={(e) => handleFilterChange("status", 'PDG')}
                          onClick={handleInputClick}
                        />
                        <label htmlFor="pending">Pending</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id="active"
                          name="status"
                          value="active"
                          checked={filterValues.status === 'ATV'}
                          onChange={(e) => handleFilterChange("status", 'ATV')}
                          onClick={handleInputClick}
                        />
                        <label htmlFor="active">Active</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id="inactive"
                          name="status"
                          value="inactive"
                          checked={filterValues.status === 'BCD'}
                          onChange={(e) => handleFilterChange("status", 'BCD')}
                          onClick={handleInputClick}
                        />
                        <label htmlFor="inactive">Inactive</label>
                      </div>
                    </div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                <Button
                  onClick={applyFilters}
                  className="w-full"
                >
                  Submit
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Input
          placeholder="Search"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <Section title="User Statistics" customClass={true}>
        <StatGrid>
          <StatTile stat={summary.totalCount} label="Total Users" icon="/images/assets/total-chauffeurs.png" />
          <StatTile stat={summary.pendingUsersCount} label="Active Users" icon="/images/assets/active.png" />
          <StatTile stat={summary.activeUsersCount} label="Active Users" icon="/images/assets/active.png" />
          <StatTile stat={summary.inactiveUsersCount} label="Blocked Users" icon="/images/assets/blocked.png" />
        </StatGrid>
      </Section>
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

const Section = ({ children, title, customClass = false }: { title: string; children: ReactNode, customClass?: boolean }) => {

  return (
    <div className={cn("border rounded-lg shadow-md bg-white w-full p-4 sm:p-6 mb-3",)}>
      <h4 className="text-base sm:text-[16px] md:text-lg font-semibold text-gray-700 mb-3">{title}</h4>
      {children}
    </div>
  );
}

const StatGrid = ({ children }: { children: ReactNode }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">{children}</div>
);

const StatTile = ({ stat, label, icon }: { stat: number; label: string; icon: string }) => (
  <div className="bg-gradient-to-r from-white to-gray-50 border rounded-md shadow-sm p-3 md:p-4 flex items-center space-x-3 hover:shadow-md transition-shadow">
    <Image src={icon} alt={label} width={40} height={40} className="rounded-full bg-gray-200 p-2 shadow-inner" />
    <div className="flex flex-col">
      <h2 className="text-base sm:text-[16px] font-bold text-gray-800">{stat ?? 0}</h2>
      <p className="text-xs sm:text-sm text-gray-600">{label}</p>
    </div>
  </div>
);
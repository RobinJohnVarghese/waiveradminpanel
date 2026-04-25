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
  searchKey,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filterValues, setFilterValues] = useState({
    location: [] as string[],
    online: "",
    status: "",
    rating_min: "0.0",
    rating_max: "0.0",
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const handleFilterChange = (field: string, value: string) => {
    setFilterValues(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };


  const applyFilters = () => {
    const filters = Object.entries(filterValues).map(([field, value]) => ({
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

      const isOnlineCount = data.filter((user: any) => user.is_online === true).length;
      const isNotOnlineCount = data.filter((user: any) => user.is_online === false).length;

      return {
        totalCount,
        isOnlineCount,
        isNotOnlineCount
      };
    }

    return {
      totalCount: 0,
      isOnlineCount: 0,
      isNotOnlineCount: 0
    };
  }, [data]);
  console.log('summary', summary);

  return (
    <div>
      <div className="flex items-center py-4 justify-between">
        <div className="flex flex-row space-x-2 items-center">
          <Link
            className={cn(buttonVariants({ variant: "default" }))}
            href={`/waiver/chauffeur/new`}
          >
            Add New Chauffeur
          </Link>
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
                    <span className="text-sm text-muted-foreground">Location</span>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="kochi"
                          checked={filterValues.location.includes('Kochi')}
                          onChange={(e) => {
                            const newLocations = e.target.checked
                              ? [...filterValues.location, 'Kochi']
                              : filterValues.location.filter(loc => loc !== 'Kochi');
                            handleFilterChange('location', newLocations.join(','));
                          }}
                          onClick={handleInputClick}
                        />
                        <label htmlFor="kochi">Kochi</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="kollam"
                          checked={filterValues.location.includes('Kollam')}
                          onChange={(e) => {
                            const newLocations = e.target.checked
                              ? [...filterValues.location, 'Kollam']
                              : filterValues.location.filter(loc => loc !== 'Kollam');
                            handleFilterChange('location', newLocations.join(','));
                          }}
                          onClick={handleInputClick}
                        />
                        <label htmlFor="kollam">Kollam</label>
                      </div>
                    </div>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                  <div className="w-full space-y-2">
                    <span className="text-sm text-muted-foreground">Online/Offline</span>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id="online"
                          name="online_status"
                          value="online"
                          checked={filterValues.online === 'online'}
                          onChange={(e) => handleFilterChange('online', e.target.value)}
                          onClick={handleInputClick}
                        />
                        <label htmlFor="online">Online</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id="offline"
                          name="online_status"
                          value="offline"
                          checked={filterValues.online === 'offline'}
                          onChange={(e) => handleFilterChange('online', e.target.value)}
                          onClick={handleInputClick}
                        />
                        <label htmlFor="offline">Offline</label>
                      </div>
                    </div>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                  <div className="w-full space-y-2">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id="active"
                          name="status"
                          value="active"
                          checked={filterValues.status === 'active'}
                          onChange={(e) => handleFilterChange('status', e.target.value)}
                          onClick={handleInputClick}
                        />
                        <label htmlFor="active">Active</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id="pending"
                          name="status"
                          value="pending"
                          checked={filterValues.status === 'pending'}
                          onChange={(e) => handleFilterChange('status', e.target.value)}
                          onClick={handleInputClick}
                        />
                        <label htmlFor="pending">Pending</label>
                      </div>
                    </div>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex flex-col" onClick={(e) => e.preventDefault()}>
                  <span className="text-sm text-muted-foreground mb-2">Rating</span>
                  <div className="flex gap-2 items-center">
                    <Input
                      type="number"
                      placeholder="0.0"
                      min="0"
                      max="5"
                      step="0.1"
                      value={filterValues.rating_min}
                      onChange={(e) => handleFilterChange('rating_min', e.target.value)}
                      className="w-20"
                      onClick={handleInputClick}
                    />
                    <span>To</span>
                    <Input
                      type="number"
                      placeholder="0.0"
                      min="0"
                      max="5"
                      step="0.1"
                      value={filterValues.rating_max}
                      onChange={(e) => handleFilterChange('rating_max', e.target.value)}
                      className="w-20"
                      onClick={handleInputClick}
                    />
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
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(searchKey)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <Section title="Chauffeurs Statistics" customClass={true}>
        <StatGrid>
          <StatTile stat={summary.totalCount} label="Total Chauffeurs" icon="/images/assets/total-chauffeurs.png" />
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
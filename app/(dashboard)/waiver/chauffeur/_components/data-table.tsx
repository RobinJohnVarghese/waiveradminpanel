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
import { useRouter, useSearchParams, usePathname } from "next/navigation";
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
  locations?: any[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  locations = [],
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filterValues, setFilterValues] = useState({
    location: searchParams?.get("location") || "",
    online: searchParams?.get("is_online") || "",
    status: searchParams?.get("status") || "",
    rating_min: searchParams?.get("rating_min") || "0.0",
    rating_max: searchParams?.get("rating_max") || "0.0",
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });

  const descendingData = data.reverse();

  const table = useReactTable({
    data: descendingData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
      pagination,
    },

    onPaginationChange: setPagination,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 20,
      },
    },
  });

  const handleFilterChange = (field: string, value: string) => {
    setFilterValues((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    
    if (filterValues.location) {
      params.set("location", filterValues.location);
    } else {
      params.delete("location");
    }
    
    if (filterValues.online) {
      params.set("is_online", filterValues.online);
    } else {
      params.delete("is_online");
    }
    
    if (filterValues.status) {
      params.set("status", filterValues.status);
    } else {
      params.delete("status");
    }

    if (filterValues.rating_min && filterValues.rating_min !== "0.0") {
      params.set("rating_min", filterValues.rating_min);
    } else {
      params.delete("rating_min");
    }

    if (filterValues.rating_max && filterValues.rating_max !== "0.0") {
      params.set("rating_max", filterValues.rating_max);
    } else {
      params.delete("rating_max");
    }

    setDropdownOpen(false);
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    setFilterValues({
      location: "",
      online: "",
      status: "",
      rating_min: "0.0",
      rating_max: "0.0",
    });
    setDropdownOpen(false);
    router.push(pathname);
  };

  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleDownload = () => {
    if (!data.length) return;
    const dataToExport = table
      .getFilteredRowModel()
      .rows.map((row) => row.original);
    exportToCSV(dataToExport, "chauffeur-waivers");
  };

  const summary = useMemo(() => {
    if (data && Array.isArray(data)) {
      const totalCount = data.length;

      const isOnlineCount = data.filter(
        (user: any) => user.is_online === true
      ).length;
      const isNotOnlineCount = data.filter(
        (user: any) => user.is_online === false
      ).length;

      return {
        totalCount,
        isOnlineCount,
        isNotOnlineCount,
      };
    }

    return {
      totalCount: 0,
      isOnlineCount: 0,
      isNotOnlineCount: 0,
    };
  }, [data]);
  console.log("summary", summary);

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
          <Button
            type="button"
            variant="outline"
            onClick={() => handleDownload()}
          >
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
                    <span className="text-sm text-muted-foreground">
                      Location
                    </span>
                    <div className="flex flex-col gap-2">
                      {locations.map((location) => (
                        <div key={location.id} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={`location-${location.id}`}
                            checked={filterValues.location.includes(location.name)}
                            onChange={(e) => {
                              const locArray = filterValues.location ? filterValues.location.split(",") : [];
                              const newLocations = e.target.checked
                                ? [...locArray, location.name]
                                : locArray.filter((loc) => loc !== location.name);
                              handleFilterChange("location", newLocations.join(","));
                            }}
                            onClick={handleInputClick}
                          />
                          <label htmlFor={`location-${location.id}`}>{location.name}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                  <div className="w-full space-y-2">
                    <span className="text-sm text-muted-foreground">
                      Online/Offline
                    </span>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id="online"
                          name="online_status"
                          value="online"
                          checked={filterValues.online === "online"}
                          onChange={(e) =>
                            handleFilterChange("online", e.target.value)
                          }
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
                          checked={filterValues.online === "offline"}
                          onChange={(e) =>
                            handleFilterChange("online", e.target.value)
                          }
                          onClick={handleInputClick}
                        />
                        <label htmlFor="offline">Offline</label>
                      </div>
                    </div>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                  <div className="w-full space-y-2">
                    <span className="text-sm text-muted-foreground">
                      Status
                    </span>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id="active"
                          name="status"
                          value="ACE"
                          checked={filterValues.status === "ACE"}
                          onChange={(e) =>
                            handleFilterChange("status", e.target.value)
                          }
                          onClick={handleInputClick}
                        />
                        <label htmlFor="active">Active</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id="pending"
                          name="status"
                          value="PDG"
                          checked={filterValues.status === "PDG"}
                          onChange={(e) =>
                            handleFilterChange("status", e.target.value)
                          }
                          onClick={handleInputClick}
                        />
                        <label htmlFor="pending">Pending</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id="blocked"
                          name="status"
                          value="BCD"
                          checked={filterValues.status === "BCD"}
                          onChange={(e) =>
                            handleFilterChange("status", e.target.value)
                          }
                          onClick={handleInputClick}
                        />
                        <label htmlFor="blocked">Blocked</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id="rejected"
                          name="status"
                          value="RJD"
                          checked={filterValues.status === "RJD"}
                          onChange={(e) =>
                            handleFilterChange("status", e.target.value)
                          }
                          onClick={handleInputClick}
                        />
                        <label htmlFor="rejected">Rejected</label>
                      </div>
                    </div>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="flex flex-col"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="text-sm text-muted-foreground mb-2">
                    Rating
                  </span>
                  <div className="flex gap-2 items-center">
                    <Input
                      type="number"
                      placeholder="0.0"
                      min="0"
                      max="5"
                      step="0.1"
                      value={filterValues.rating_min}
                      onChange={(e) =>
                        handleFilterChange("rating_min", e.target.value)
                      }
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
                      onChange={(e) =>
                        handleFilterChange("rating_max", e.target.value)
                      }
                      className="w-20"
                      onClick={handleInputClick}
                    />
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                <div className="flex flex-col gap-2 w-full">
                  <Button onClick={applyFilters} className="w-full">
                    Submit
                  </Button>
                  <Button onClick={clearFilters} variant="outline" className="w-full">
                    Clear
                  </Button>
                </div>
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
          <StatTile
            stat={summary.totalCount}
            label="Total Chauffeurs"
            icon="/images/assets/total-chauffeurs.png"
          />
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

const Section = ({
  children,
  title,
  customClass = false,
}: {
  title: string;
  children: ReactNode;
  customClass?: boolean;
}) => {
  return (
    <div
      className={cn(
        "border rounded-lg shadow-md bg-white w-full p-4 sm:p-6 mb-3"
      )}
    >
      <h4 className="text-base sm:text-[16px] md:text-lg font-semibold text-gray-700 mb-3">
        {title}
      </h4>
      {children}
    </div>
  );
};

const StatGrid = ({ children }: { children: ReactNode }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">{children}</div>
);

const StatTile = ({
  stat,
  label,
  icon,
}: {
  stat: number;
  label: string;
  icon: string;
}) => (
  <div className="bg-gradient-to-r from-white to-gray-50 border rounded-md shadow-sm p-3 md:p-4 flex items-center space-x-3 hover:shadow-md transition-shadow">
    <Image
      src={icon}
      alt={label}
      width={40}
      height={40}
      className="rounded-full bg-gray-200 p-2 shadow-inner"
    />
    <div className="flex flex-col">
      <h2 className="text-base sm:text-[16px] font-bold text-gray-800">
        {stat ?? 0}
      </h2>
      <p className="text-xs sm:text-sm text-gray-600">{label}</p>
    </div>
  </div>
);

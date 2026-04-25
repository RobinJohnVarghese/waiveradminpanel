"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { CellAction } from "./cell-action";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Edit, Pencil, Trash } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { DeleteUser } from "./delete";
import { ChangeUserStatus } from "./change-user-status";
import Link from "next/link";

// import { CellAction } from "./cell-action"

export type Column = {
  status: string;
  id: string;
  fullname: string;
  course: string;
  date: string;
  user: string;
  is_active: boolean;
};

export const columns: ColumnDef<Column>[] = [
  {
    header: "No",
    cell: ({ row }) => {
      return <>{row.index + 1}</>;
    },
  },
  {
    accessorKey: "role",
    header: "Role Name",
  },
  {
    accessorKey: "fullname",
    header: "User Name",
  },
  {
    accessorKey: "access",
    header: "Access",
  },
  
  {
    header: "Action",
    cell: ({ row }) => (
      <div className="flex w-fit flex-row space-x-2">
        {/* <ChangeUserStatus
          profileId={row.original.id}
          status={row.original.status}
          name={row.original.fullname}
        /> */}
        <Link
          href={`/role/${row.original.id}`}
          className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
        >
          {" "}
          <Pencil className="h-4 w-4" />
        </Link>
        <DeleteUser userId={row.original.id} />
      </div>
    ),
  },
];

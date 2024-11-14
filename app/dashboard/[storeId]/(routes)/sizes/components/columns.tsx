"use client";

import CellActionButton from "@/components/CellActionButton";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type SizeColumn = {
  id: string;
  name: string;
  createdAt: string;
  value: string;
};

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "value",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Value
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
  },
  {
    id: "action",
    cell: ({ row }) => {
      return (
        <CellActionButton edit routeName="sizes" dataId={row.original.id} />
      );
    },
  },
];

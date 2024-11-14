"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import CellActionButton from "@/components/CellActionButton";

export type categoryColumn = {
  id: string;
  name: string;
  createdAt: string;
  billboardLabel: string;
  logo: string;
};

export const columns: ColumnDef<categoryColumn>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Label
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
    accessorKey: "logo",
    header: "logo ",

    cell: ({ row }) => (
      <Image height={50} width={50} alt="" src={row.original.logo} />
    ),
  },
  {
    accessorKey: "billboardLabel",
    header: "billBoard label",

    cell: ({ row }) => row.original.billboardLabel,
  },
  {
    id: "action",
    cell: ({ row }) => {
      return (
        <CellActionButton
          edit
          routeName="categories"
          dataId={row.original.id}
        />
      );
    },
  },
];

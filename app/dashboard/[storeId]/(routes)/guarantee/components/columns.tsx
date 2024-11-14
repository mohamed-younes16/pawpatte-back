"use client";

import CellActionButton from "@/components/CellActionButton";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type GuaranteeColumn = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  orderId: string;
  notes: string;
  createdAt: Date;
};

export const columns: ColumnDef<GuaranteeColumn>[] = [
  {
    accessorKey: "fullName",
    header: "Full Name",
    cell: ({ row }) => (
      <div className="text-base  whitespace-nowrap">
        {row.original.fullName}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      return (
        <div className="font-bold whitespace-nowrap">{row.original.phone}</div>
      );
    },
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => <div>{row.original.address}</div>,
  },
  {
    accessorKey: "orderId",
    header: "Order ID",
    cell: ({ row }) => <div>{row.original.orderId}</div>,
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => <div>{row.original.notes}</div>,
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
    cell: ({ row }) => (
      <div>{new Date(row.original.createdAt).toLocaleDateString()}</div>
    ),
  },
  {
    id: "action",
    cell: ({ row }) => {
      return (
        <CellActionButton
          dataId={row.original.id}
          edit={false}
          routeName="guarantee"
        />
      );
    },
  },
];

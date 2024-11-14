import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import prismadb from "@/lib/prismabd";
import { format } from "date-fns";
import cuid from "cuid";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import { GuaranteeColumn, columns } from "./components/columns";
import ApiList from "@/components/ApiList";
import { Separator } from "@/components/ui/separator";
import { Guarantee } from "@prisma/client";

const page = async ({
  params: { storeId },
}: {
  params: { storeId: Guarantee };
}) => {
  const guarantees = await prismadb.guarantee.findMany();
  const formattedGuarantees: GuaranteeColumn[] = guarantees.map(
    ({ address, email, fullName, notes, createdAt, id, orderId, phone }) => ({
      id,
      address,
      email,
      fullName,
      notes,
      createdAt,
      orderId,
      phone,
    })
  );
  // await prismadb.guarantee.create({
  //   data: {
  //     fullName: "Alice Johnson",
  //     email: "alice@example.com",
  //     phone: "123-456-7890",
  //     address: "123 Apple St, Citytown",
  //     orderId: "cm34hq4o5000113tps91q0s31",
  //     notes: "Priority shipping requested",
    
  //   },
  // });


  return (
    <div id="content" className="p-6">
      <div className="flex items-center justify-between">
        <Heading
          title={`guarantees (${guarantees.length})`}
          description="Manage guarantees For Your Store"
        />{" "}
        {/* <Link
          href={`/dashboard/${storeId}/guarantee/new`}
          className="flexcenter"
        >
          <Button className="flexcenter gap-6">
            <PlusCircle /> Add New{" "}
          </Button>
        </Link> */}
      </div>{" "}
      <Separator className="my-6" />
      <DataTable searchKey="id" columns={columns} data={formattedGuarantees} />
      <ApiList entityName="guarantee" entitiIdName="guaranteeId" />
    </div>
  );
};

export default page;

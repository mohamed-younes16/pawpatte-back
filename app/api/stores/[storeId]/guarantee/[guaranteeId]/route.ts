import prismadb from "@/lib/prismabd";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { GuaranteeSchema } from "../../../../../../models/Schemas/Setup";

export async function POST(
  req: NextRequest,
  params: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("unauthorized", { status: 401 });
    const {
      address,
      email,
      fullName,
      notes,
      phone,
      orderId,
    }: z.infer<typeof GuaranteeSchema> = await req.json();

    if (!email) return new NextResponse("no name Provided", { status: 401 });

    if (email) {
      const guranteeOperation = prismadb.guarantee.create({
        data: {
          address,
          email,
          fullName,
          notes,
          phone,
          orderId,
        },
      });
      return guranteeOperation
        .then((e) => {
          return NextResponse.json(
            { message: "Created guarantee successfully ✅", guarantee: e },
            { status: 201 }
          );
        })
        .catch((err) => {
          console.log(err.message);
          return NextResponse.json(
            { message: "Error Happend ❌" },
            { status: 500 }
          );
        });
    }
  } catch (error) {
    console.log("###guarantee--nested-post########", error);
  }
}
export async function PATCH(
  req: NextRequest,
  params: { params: { storeId: string; guaranteeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("unauthorized", { status: 401 });
    const { guaranteeId } = params.params;
    const {
      address,
      email,
      fullName,
      notes,
      phone,
      orderId,
    }: z.infer<typeof GuaranteeSchema> = await req.json();

    if (!email) return new NextResponse("no email Provided", { status: 401 });

    if (email) {
      const guranteeOperation = prismadb.guarantee.update({
        where: {
          id: guaranteeId,
        },
        data: {
          address,
          email,
          fullName,
          notes,
          phone,
          orderId,
        },
      });

      return guranteeOperation
        .then((e) => {
          return NextResponse.json(
            { message: "Updated guarantee successfully ✅", guarantee: e },
            { status: 201 }
          );
        })
        .catch((err) => {
          console.log(err.message);
          return NextResponse.json(
            { message: "Error Happend ❌" },
            { status: 500 }
          );
        });
    }
  } catch (error) {
    console.log("###guarantee--nested-patch########", error);
  }
}

export async function DELETE(
  req: NextRequest,
  params: { params: { storeId: string; guaranteeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("unauthorized", { status: 401 });
    const { guaranteeId, } = params.params;

    const guranteeOperation = prismadb.guarantee.delete({
      where: {
        id: guaranteeId,
      },
    });
    return guranteeOperation
      .then((e) => {
        console.log(e);

        return NextResponse.json(
          { message: "Deleted guarantee successfully ✅", guarantee: e },
          { status: 201 }
        );
      })
      .catch((err) => {
        console.log(err.message);
        return NextResponse.json(
          { message: "Error Happend ❌" },
          { status: 401 }
        );
      });
  } catch (error) {
    console.log("###guarantee--nested-patch########", error);
  }
}
export async function GET(
  req: NextRequest,
  params: { params: { guaranteeId: string } }
) {
  try {
    const { guaranteeId } = params.params;

    const guranteeOperation = prismadb.guarantee.findFirst({
      where: {
        id: guaranteeId,
      },
    });
    return guranteeOperation
      .then((e) => {
        console.log(e);

        return NextResponse.json(e);
      })
      .catch((err) => {
        console.log(err.message);
        return NextResponse.json(
          { message: "Error Happend ❌" },
          { status: 401 }
        );
      });
  } catch (error) {
    console.log("###guarantee--nested-patch########", error);
  }
}

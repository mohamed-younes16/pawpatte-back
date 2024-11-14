import prismadb from "@/lib/prismabd";
import { GuaranteeSchema } from "@/models/Schemas/Setup";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isFeatured = searchParams.get("isFeatured");

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        sizeId,
        isFeatured:
          isFeatured === "true"
            ? true
            : isFeatured === "false"
            ? false
            : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[COLORS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
export async function POST(req: NextRequest) {
  try {
    const {
      address,
      email,
      fullName,
      notes,
      phone,
      orderId,
    }: z.infer<typeof GuaranteeSchema> = await req.json();
   
    const order = await prismadb.order.count({
      where: { id: orderId },
    });
    if (order != 1)
      return NextResponse.json(
        { message: "no order found with this id Provided" },
        {
          status: 401,
        }
      );
    const guarantee = await prismadb.guarantee.count({
      where: { orderId },
    });
    if (guarantee === 1)
      return NextResponse.json(
        { message: "already found a guarantee request with this order id " },
        {
          status: 401,
        }
      );
    if (!email) return new NextResponse("no email Provided", { status: 401 });

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

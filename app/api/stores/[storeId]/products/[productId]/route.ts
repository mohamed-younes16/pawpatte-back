import prismadb from "@/lib/prismabd";
import { productSchema } from "@/models/Schemas/Setup";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function PATCH(
  req: NextRequest,
  params: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("unauthorized", { status: 401 });
    const { productId, storeId } = params.params;
    const {
      name,
      categoryId,
      description,
      isArchived,
      sizeId,
      price,
      isFeatured,
      animal,
      images,
      colors,
      stars,
    }: z.infer<typeof productSchema> = await req.json();

    if (!name) return new NextResponse("no name Provided", { status: 401 });

    if (name) {
      const productsOperation = prismadb.product.update({
        where: {
          id: productId,
        },
        data: {
          storeId,
          name,
          categoryId,
          description,
          isArchived,
          sizeId,
          stars,
          animal,
          price,
          isFeatured,
          images: {
            deleteMany: { productId },
            createMany: { data: [...images.map((url) => ({ url }))] },
          },
          color: {
            set: colors?.map((id: string) => ({ id })),
          },
        },
      });

      return productsOperation
        .then((e) => {
          return NextResponse.json(
            { message: "Updated product successfully ✅", product: e },
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
    console.log("###product--nested-patch########", error);
  }
}

export async function POST(
  req: NextRequest,
  params: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("unauthorized", { status: 401 });
    const { storeId } = params.params;
    const {
      name,
      categoryId,
      description,
      isArchived,
      sizeId,
      price,
      isFeatured,
      images,
      animal,
      colors,
      stars,
    }: z.infer<typeof productSchema> = await req.json();

    if (!name) return new NextResponse("no name Provided", { status: 401 });

    if (name) {
      const productsOperation = prismadb.product.create({
        data: {
          storeId,
          name,
          categoryId: categoryId || null,
          description,
          isArchived,
          sizeId: sizeId || null,
          stars,
          price,
          isFeatured,
          animal,
          images: {
            createMany: { data: [...images.map((url) => ({ url }))] },
          },
          color: colors && colors.length > 0 ? {
            connect: colors.map((id: string) => ({ id })),
          } : undefined,
        },
      });
      return productsOperation
        .then((e) => {
          return NextResponse.json(
            { message: "Created product successfully ✅", product: e },
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
    console.log("###product--nested-post########", error);
  }
}
export async function DELETE(
  req: NextRequest,
  params: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("unauthorized", { status: 401 });
    const { productId, storeId } = params.params;
    await prismadb.image.deleteMany({ where: { productId } });
    const productsOperation = prismadb.store.update({
      where: {
        id: storeId,
        userId,
      },
      data: { products: { delete: { id: productId } } },
    });
    return productsOperation
      .then((e) => {
        console.log(e);

        return NextResponse.json(
          { message: "Deleted product successfully ✅", product: e },
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
    console.log("###product--nested-patch########", error);
  }
}
export async function GET(
  req: NextRequest,
  params: { params: { productId: string } }
) {
  try {
    const { productId } = params.params;

    const productsOperation = prismadb.product.findFirst({
      where: {
        id: productId,
      },
      include: {
        category: true,
        color: true,
        size: true,
        images: true,
      },
    });
    return productsOperation
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
    console.log("###product--nested-patch########", error);
  }
}

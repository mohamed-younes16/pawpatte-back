import prismadb from "@/lib/prismabd";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

// export async function PATCH(
//   req: NextRequest,
//   params: { params: { storeId: string; billboardId: string } }
// ) {
//   try {
//     const { userId } = auth();
//     if (!userId) return new NextResponse("unauthorized", { status: 401 });
//     const { billboardId, storeId } = params.params;
//     const {
//       label,
//       imageUrl,
//       labelColor,
//       shown,
//     }: { label: string; imageUrl: string; labelColor: string; shown: boolean } =
//       await req.json();

//     const billboardOperation = prismadb.store.update({
//       where: {
//         id: storeId,
//         userId,
//       },
//       data: {
//         billBoards: {
//           update: {
//             where: { id: billboardId },
//             data: { imageUrl, label, labelColor, shown },
//           },
//         },
//       },
//     });

//     return billboardOperation
//       .then((e) => {
//         return NextResponse.json(
//           { message: "Updated BillBoard successfully ✅", billBoard: e },
//           { status: 201 }
//         );
//       })
//       .catch((err) => {
//         console.log(err.message);
//         return NextResponse.json(
//           { message: "Error Happend ❌" },
//           { status: 500 }
//         );
//       });
//   } catch (error) {
//     console.log("###store--nested-patch########", error);
//   }
// }

// export async function POST(
//   req: NextRequest,
//   params: { params: { storeId: string; billboardId: string } }
// ) {
//   try {
//     const { userId } = auth();
//     if (!userId) return new NextResponse("unauthorized", { status: 401 });
//     const { storeId } = params.params;

//     const {
//       label,
//       imageUrl,
//       labelColor,
//       text,
//       shown,
//     }: {
//       label: string;
//       imageUrl: string;
//       labelColor: string;
//       text: string;
//       shown: boolean;
//     } = await req.json();

//     const billboardOperation = prismadb.store.update({
//       where: {
//         id: storeId,
//         userId,
//       },
//       data: {
//         billBoards: { create: { imageUrl, label, labelColor, text, shown } },
//       },
//     });
//     return billboardOperation
//       .then((e) => {
//         return NextResponse.json(
//           { message: "Created BillBoard successfully ✅", billBoard: e },
//           { status: 201 }
//         );
//       })
//       .catch((err) => {
//         console.log(err.message);
//         return NextResponse.json(
//           { message: "Error Happend ❌" },
//           { status: 500 }
//         );
//       });
//   } catch (error) {
//     console.log("###store--nested-patch########", error);
//     return NextResponse.json({ message: "Error Happend ❌" }, { status: 500 });
//   }
// }
// export async function DELETE(
//   req: NextRequest,
//   params: { params: { storeId: string; billboardId: string } }
// ) {
//   try {
//     const { userId } = auth();
//     if (!userId) return new NextResponse("unauthorized", { status: 401 });
//     const { billboardId, storeId } = params.params;

//     const billboardOperation = prismadb.store.update({
//       where: {
//         id: storeId,
//         userId,
//       },
//       data: { billBoards: { delete: { id: billboardId } } },
//     });
//     return billboardOperation
//       .then((e) => {
//         return NextResponse.json(
//           { message: "Deleted successfully ✅", billBoard: e },
//           { status: 201 }
//         );
//       })
//       .catch((err) => {
//         console.log(err.message);
//         return NextResponse.json(
//           { message: "Error Happend ❌" },
//           { status: 401 }
//         );
//       });
//   } catch (error) {
//     console.log("###store--nested-patch########", error);
//   }
// }
// export async function GET(
//   req: NextRequest,
//   params: { params: { billboardId: string } }
// ) {
//   try {
//     const { billboardId } = params.params;

//     const billboardOperation = prismadb.billBoard.findMany({
//       where: {
//         id: billboardId,
//         shown: true,
//       },
//     });
//     return billboardOperation
//       .then((e) => {
//         return NextResponse.json(e, { status: 201 });
//       })
//       .catch((err) => {
//         console.log(err.message);
//         return NextResponse.json(
//           { message: "Error Happend ❌" },
//           { status: 500 }
//         );
//       });
//   } catch (error) {
//     console.log("###store--nested-patch########", error);
//   }
// }




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
      colorId,
      description,
      isArchived,
      sizeId,
      updatedAt,
      price,
      isFeatured,
      images,
      animal,
      colors,
    }: any = await req.json();

    if (!name) return new NextResponse("no name Provided", { status: 401 });

    if (name) {
      const productsOperation = prismadb.product.create({
        data: {
          storeId,
          name,
          categoryId,
          description,
          isArchived,
          sizeId,
          updatedAt,
          price,
          isFeatured,
          animal,
          images: {
            createMany: { data: [...images.map((url) => ({ url }))] },
          },
          color: {
            connect: colors.map((id: string) => ({ id })),
          },
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
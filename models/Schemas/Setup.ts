import * as z from "zod";

export const StoreSchema = z.object({
  name: z
    .string()
    .min(4, { message: "must be at least 4 characters long" })
    .max(14),
});

export const BillBoardSchema = z.object({
  label: z.string().default(""),
  imageUrl: z.string().min(1),
  labelColor: z.string().default(""),
  text: z.string().default(""),
  shown: z.boolean().default(true),
});

export const discountSchema = z.object({
  amount: z.number().min(1).max(100),
  userEmail: z.string().email(),
});
export const CategorySchema = z.object({
  name: z
    .string()
    .min(4, { message: "must be at least 4 characters long" })
    .max(20),
  billboardId: z.string().min(1),
  logo: z.string().min(1),
});
export const sizeSchema = z.object({
  name: z
    .string()
    .min(1, { message: "must be at least 4 characters long" })
    .max(20),
  value: z.enum(["S", "M", "L", "XL", "XXL", "XXXL"]),
});
export const colorSchema = z.object({
  name: z
    .string()
    .min(1, { message: "must be at least 4 characters long" })
    .max(20),
  value: z.string().min(1),
});

export const productSchema = z.object({
  name: z.string().min(4),
  sizeId: z.string().optional().nullable(),
  categoryId: z.string().optional().nullable(),
  colors: z.array(z.string()).optional(),
  price: z.number().min(1),
  description: z.string().min(1),
  isArchived: z.boolean(),
  isFeatured: z.boolean(),
  images: z.string().array().min(1),
  animal: z.enum(["DOG", "CAT"]),
  stars: z.number().min(1).max(5).optional().default(5),
});
export const GuaranteeSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  orderId: z.string().min(1, "Serial number is required"),
  notes: z.string().default(""),
});

import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().min(3).max(30),
  price: z.coerce.number().min(1000),
  categoryId: z.string(),
  imageUrl: z.string().url().optional(),
});

const baseUpdateProductSchema = z.object({
  id: z.string(),
  name: z.string().min(3).max(30),
  price: z.coerce.number().min(1000),
  categoryId: z.string(),
});

export const updateProductSchema = baseUpdateProductSchema;
export const updateProductSchemaWithoutId = baseUpdateProductSchema.omit({
  id: true,
});

export type ProductFormSchema = z.infer<typeof productFormSchema>;
export type UpdateProductSchema = z.infer<typeof updateProductSchema>;
export type UpdateProductFormSchema = z.infer<
  typeof updateProductSchemaWithoutId
>;

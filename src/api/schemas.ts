import { z } from "zod";

const productSchema = z.object({
    sys: z.object({
        id: z.string(),
    }),
    name: z.string(),
    unitaryValue: z.number(),
    picturesCollection: z.object({
        items: z.array(
            z.object({
                title: z.string(),
                url: z.string().url(),
                height: z.number(),
                width: z.number(),
            })
        ),
    }),
});

export const productsSchema = z.array(productSchema);

export const productsQueryResultSchema = z.object({
    productCollection: z.object({
        items: z.array(productSchema),
    }),
});

export type Product = z.infer<typeof productSchema>;
export type Products = z.infer<typeof productsSchema>;
export type ProductsQueryResult = z.infer<typeof productsQueryResultSchema>;

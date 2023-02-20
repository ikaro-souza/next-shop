import { productsSchema } from "./schemas";

const baseUrl =
    typeof window !== "undefined"
        ? "/api" // browser should use relative url
        : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}/api` // SSR should use vercel url
        : `http://localhost:${process.env.PORT ?? 3000}/api`; // dev SSR should use localhost;

export const getProducts = async () => {
    const response = await fetch(`${baseUrl}/products`);
    const json: unknown = await response.json();
    return productsSchema.parse(json);
};

export * from "./schemas";

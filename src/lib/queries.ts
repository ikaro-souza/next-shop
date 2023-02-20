import { useQuery } from "@tanstack/react-query";
import { getProducts } from "~/api";

export const queryKeys = {
    useProducts: ["products"],
};

export const useProducts = () => {
    const { data: products } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    });

    return products;
};

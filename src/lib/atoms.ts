/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useAtom, useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";
import React from "react";
import type { Product } from "~/api";
import { useProducts } from "./queries";
import { notify } from "./toast";

type ShoppingBagItem = {
    productId: string;
    quantity: number;
};

export type ShoppingBagProduct = Product & {
    quantity: number;
    totalValue: number;
};

type ShoppingBag = {
    products: ShoppingBagProduct[];
    length: number;
    totalValue: number;
};

// Creates an atom that automatically syncs with localStorage, doing JSON parsing if necessary.
// May use other storage locations as sesstionStorage but the default is localStorage.
const shoppingBagAtom = atomWithStorage<ShoppingBagItem[]>("shopping-bag", []);

export const useShoppingBag = () => {
    const items = useAtomValue(shoppingBagAtom);
    const { products, isLoading } = useProducts();

    const shoppingBag = React.useMemo<ShoppingBag>(() => {
        if (!products) return { products: [], length: 0, totalValue: 0 };

        const _products = items.map((x) => {
            const product = products.find((y) => y.sys.id === x.productId)!;
            return {
                ...product,
                quantity: x.quantity,
                totalValue: x.quantity * product.unitaryValue,
            };
        });
        const totalValue = _products.reduce(
            (total, current) => total + current.totalValue,
            0
        );

        return { products: _products, length: _products.length, totalValue };
    }, [items, products]);

    return { shoppingBag, isLoading };
};

export const useAddToShoppingBag = () => {
    const [shoppingBag, setShoppingBag] = useAtom(shoppingBagAtom);
    return (productId: string) => {
        const productAlreadyInBag = shoppingBag.find(
            (x) => x.productId === productId
        );

        if (productAlreadyInBag) {
            updateItemInShoppingBag(
                { productId, quantity: productAlreadyInBag.quantity + 1 },
                shoppingBag,
                setShoppingBag
            );
        } else {
            addItemToShoppingBag(
                { productId, quantity: 1 },
                shoppingBag,
                setShoppingBag
            );
        }

        notify("Item adicionado ?? sua sacola");
    };
};

const MAX_QUANTITY = 10;
const MIN_QUANTITY = 1;
export const useUpdateProductQuantity = () => {
    const [shoppingBag, setShoppingBag] = useAtom(shoppingBagAtom);

    return (item: ShoppingBagItem) => {
        if (!shoppingBag.some((x) => x.productId === item.productId)) {
            return;
        }

        if (item.quantity < MIN_QUANTITY) {
            item.quantity = MIN_QUANTITY;
        } else if (item.quantity > MAX_QUANTITY) {
            item.quantity = MAX_QUANTITY;
        }

        updateItemInShoppingBag(item, shoppingBag, setShoppingBag);
    };
};

export const useRemoveItemFromShoppingBag = () => {
    const [shoppingBag, setShoppingBag] = useAtom(shoppingBagAtom);
    return (productId: string) => {
        if (!shoppingBag.some((x) => x.productId === productId)) {
            return;
        }

        setShoppingBag(shoppingBag.filter((x) => x.productId !== productId));
    };
};

export const useClearShoppingBag = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setShoppingBag] = useAtom(shoppingBagAtom);
    return () => {
        setShoppingBag([]);
    };
};

function addItemToShoppingBag(
    item: ShoppingBagItem,
    shoppingBag: ShoppingBagItem[],
    setShoppingBag: (_: ShoppingBagItem[]) => void
) {
    const items = [...shoppingBag, item];
    setShoppingBag(items);
}

function updateItemInShoppingBag(
    item: ShoppingBagItem,
    shoppingBag: ShoppingBagItem[],
    setShoppingBag: (_: ShoppingBagItem[]) => void
) {
    setShoppingBag(
        shoppingBag.map((x) => (x.productId === item.productId ? item : x))
    );
}

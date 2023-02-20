import { useAtom, useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";

type ShoppingBagItem = {
    productId: string;
    quantity: number;
};

// Creates an atom that automatically syncs with localStorage, doing JSON parsing if necessary.
// May use other storage locations as sesstionStorage but the default is localStorage.
const shoppingBagAtom = atomWithStorage<ShoppingBagItem[]>("shopping-bag", []);

export const useShoppingBag = () => useAtomValue(shoppingBagAtom);

export const useAddToShoppingBag = () => {
    const [shoppingBag, add] = useAtom(shoppingBagAtom);
    return (productId: string) => {
        const productAlreadyInBag = shoppingBag.some(
            (x) => x.productId === productId
        );

        if (productAlreadyInBag) {
            return;
        }

        const items = [...shoppingBag, { productId, quantity: 1 }];
        add(items);
    };
};

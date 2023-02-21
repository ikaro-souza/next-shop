import { IconShoppingBag } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import { useShoppingBag } from "~/lib/atoms";

export const ShoppingBagWithBubbleCount: React.FC = () => {
    const itemsInShoppingBag = useShoppingBag().shoppingBag.products.length;

    return (
        <Link href="/shopping-bag">
            <div className="relative">
                <IconShoppingBag />
                {itemsInShoppingBag > 0 && (
                    <span className="absolute -bottom-0 -right-0 h-[16px] w-[16px] translate-x-1/4 translate-y-1/4 rounded-full bg-black text-center align-middle text-[10px] font-semibold text-white">
                        {itemsInShoppingBag}
                    </span>
                )}
            </div>
        </Link>
    );
};

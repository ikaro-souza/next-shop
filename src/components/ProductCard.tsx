import { IconShoppingBag } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";
import type { Product } from "~/api/schemas";
import { useAddToShoppingBag } from "~/lib/atoms";

export const ProductCard: React.FC<{
    product: Product;
}> = ({ product }) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const firstImage = product.picturesCollection.items[0]!;
    const addToShoppingBag = useAddToShoppingBag();

    const onAddToBagClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const productId = e.currentTarget.getAttribute(
            "data-product-id"
        ) as string;
        addToShoppingBag(productId);
    };

    return (
        <article className="min-h-32 flex items-center">
            <section className="relative aspect-square h-32 self-center lg:h-36">
                <Image
                    alt={firstImage.title}
                    src={firstImage.url}
                    fill
                    sizes="128,128"
                />
            </section>
            <section className="flex flex-grow flex-col self-stretch py-2 pl-3 pr-0 sm:items-end md:items-start lg:py-3">
                <h3 className="text-sm font-light">{product.name}</h3>
                <p className="mt-1 font-highlight text-2xl font-medium lg:mt-2">
                    R$ {product.unitaryValue.toFixed(2)}
                </p>
                <button
                    data-product-id={product.sys.id}
                    className="mt-auto flex h-9 w-fit items-center justify-center gap-x-2 justify-self-end border border-black pl-4 pr-3 text-sm font-medium"
                    onClick={onAddToBagClick}
                >
                    Adicionar à sacola
                    <IconShoppingBag className="aspect-square h-[18px]" />
                </button>
            </section>
        </article>
    );
};

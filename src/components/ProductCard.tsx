/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IconShoppingBag } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";
import type { Product } from "~/api/schemas";
import { useAddToShoppingBag } from "~/lib/atoms";
import { formatCurrency } from "~/utils";
import { Button } from "./Button";

export const ProductCard: React.FC<{
    product: Product;
}> = ({ product }) => {
    const cardRef = React.useRef<HTMLElement>(null);
    const firstImage = product.picturesCollection.items[0]!;
    const addToShoppingBag = useAddToShoppingBag();

    const onAddToBagClick = () => {
        if (!cardRef.current) return;
        addToShoppingBag(cardRef.current.getAttribute("data-product-id")!);
    };

    return (
        <article
            className="min-h-32 flex items-center"
            ref={cardRef}
            data-product-id={product.sys.id}
        >
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
                    {formatCurrency(product.unitaryValue)}
                </p>
                <Button
                    className="mt-3 w-fit justify-self-end"
                    rightIcon={
                        <IconShoppingBag className="aspect-square h-[18px]" />
                    }
                    onClick={onAddToBagClick}
                    height="small"
                >
                    Adicionar à sacola
                </Button>
            </section>
        </article>
    );
};

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IconMinus, IconPlus, IconX } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";
import {
    useRemoveItemFromShoppingBag,
    useUpdateProductQuantity,
    type ShoppingBagProduct,
} from "~/lib/atoms";
import { formatCurrency } from "~/utils";
import { Button } from "./Button";

export const ShoppingBagProductCard: React.FC<{
    product: ShoppingBagProduct;
}> = ({ product }) => {
    const cardRef = React.useRef<HTMLElement>(null);
    const firstImage = product.picturesCollection.items[0]!;
    const updateProductQuantity = useUpdateProductQuantity();
    const removeItemFromShoppingBag = useRemoveItemFromShoppingBag();

    const onSubtractClick = (quantity: number) => {
        if (!cardRef.current) return;
        if (quantity === 0) return;

        updateProductQuantity({
            productId: cardRef.current.getAttribute("data-product-id")!,
            quantity,
        });
    };

    const onQuantityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!cardRef.current) return;
        const productId = cardRef.current.getAttribute("data-product-id")!;

        const quantity = Number(e.target.value);
        updateProductQuantity({
            productId,
            quantity,
        });
    };

    const onAddClick = (quantity: number) => {
        if (!cardRef.current) return;
        if (quantity === 100) return;

        updateProductQuantity({
            productId: cardRef.current.getAttribute("data-product-id")!,
            quantity,
        });
    };

    const onRemoveClick = () => {
        if (!cardRef.current) return;

        removeItemFromShoppingBag(
            cardRef.current.getAttribute("data-product-id")!
        );
    };

    return (
        <article
            className="min-h-32 flex items-center"
            ref={cardRef}
            data-product-id={product.sys.id}
        >
            <section className="relative aspect-square h-32 self-center sm:h-36 lg:h-52">
                <Image alt={firstImage.title} src={firstImage.url} fill />
            </section>
            <section className="flex flex-grow flex-col self-stretch py-2 pl-3 pr-0 sm:items-end md:items-end lg:py-3">
                <h3 className="text-sm font-light lg:text-lg">
                    {product.name}
                </h3>
                <div className="flex flex-col sm:mt-3 sm:flex-row sm:items-center sm:gap-x-4">
                    <p className="mt-1 font-highlight text-xl font-medium sm:mt-0">
                        {formatCurrency(product.totalValue)}
                    </p>
                    <div className="mt-3 flex items-center gap-x-2 sm:mt-0">
                        <IconMinus
                            className="h-[18px]"
                            aria-label="Subtrair uma unidade"
                            onClick={() =>
                                onSubtractClick(product.quantity - 1)
                            }
                        />
                        <input
                            type="number"
                            inputMode="numeric"
                            value={product.quantity}
                            onChange={onQuantityInputChange}
                            min={1}
                            max={99}
                            className="w-6 text-center font-sans lg:w-10"
                        />
                        <IconPlus
                            className="h-[18px]"
                            aria-label="Adicionar uma unidade"
                            onClick={() => onAddClick(product.quantity + 1)}
                        />
                    </div>
                </div>
                <Button
                    className="mt-3 w-fit self-end justify-self-end sm:mb-2 sm:mt-auto md:mt-8"
                    height="small"
                    rightIcon={
                        <IconX
                            className="aspect-square h-[18px]"
                            aria-label="Remover produto da sacola"
                        />
                    }
                    onClick={onRemoveClick}
                >
                    Remover
                </Button>
            </section>
        </article>
    );
};

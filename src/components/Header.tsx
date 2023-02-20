import { ShoppingBagWithBubbleCount } from "./ShoppingBagWithBubbleCount";

export const Header = () => {
    return (
        <header className="flex h-14 items-center justify-between px-4 font-highlight sm:h-16 sm:px-14 md:px-20 lg:px-32 xl:px-40 2xl:mx-auto 2xl:max-w-screen-2xl">
            <span className="md:text-lg">Next Shop</span>
            <div className="flex items-end">
                <ShoppingBagWithBubbleCount />
            </div>
        </header>
    );
};

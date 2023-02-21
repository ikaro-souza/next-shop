import Link from "next/link";
import { ShoppingBagWithBubbleCount } from "./ShoppingBagWithBubbleCount";

export const Header = () => {
    return (
        <header className="flex h-14 items-center justify-between font-highlight">
            <Link href="/">
                <span className="md:text-lg">Next Shop</span>
            </Link>
            <div className="flex items-end">
                <ShoppingBagWithBubbleCount />
            </div>
        </header>
    );
};

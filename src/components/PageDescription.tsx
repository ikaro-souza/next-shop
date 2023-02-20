import clsx from "clsx";
import React from "react";

export const PageDescription: React.FC<
    React.PropsWithChildren<{ className?: string }>
> = ({ children, className }) => {
    return (
        <h2
            className={clsx(
                "mt-1 text-xs sm:text-center lg:mt-3 lg:text-base",
                className
            )}
        >
            {children}
        </h2>
    );
};

import clsx from "clsx";
import React from "react";

export const PageTitle: React.FC<
    React.PropsWithChildren<{ className?: string }>
> = ({ children, className }) => {
    return (
        <h1
            className={clsx(
                "mt-10 font-highlight text-3xl font-semibold tracking-[4%] sm:text-center lg:mt-16 lg:text-4xl",
                className
            )}
        >
            {children}
        </h1>
    );
};

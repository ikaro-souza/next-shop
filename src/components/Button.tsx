import clsx from "clsx";
import React from "react";

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
    fullWidth?: boolean;
    height?: "small" | "regular" | "large";
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    type?: "button" | "submit" | "reset";
    variant?: "outlined" | "filled";
}

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
    children,
    className,
    fullWidth,
    leftIcon,
    rightIcon,
    height = "regular",
    type = "button",
    variant = "outlined",
    ...rest
}) => {
    return (
        <button
            className={clsx(
                "flex min-w-[64px] items-center justify-center border border-black py-3 px-4 align-middle font-sans font-medium text-black outline-none",
                height === "small"
                    ? "h-8 gap-x-2 text-sm"
                    : height === "regular"
                    ? "h-10 gap-x-2 text-sm"
                    : "h-12 gap-x-3 text-lg",
                leftIcon && "pl-3 pr-4",
                rightIcon && "pl-4 pr-3",
                variant === "filled" && "bg-black text-white",
                fullWidth && "w-full",
                className
            )}
            type={type}
            {...rest}
        >
            {leftIcon && <IconContainer>{leftIcon}</IconContainer>}
            {children}
            {rightIcon && <IconContainer>{rightIcon}</IconContainer>}
        </button>
    );
};

const IconContainer: React.FC<React.PropsWithChildren> = ({ children }) => (
    <span className="flex h-6 w-6 items-center justify-center text-sm text-inherit">
        {children}
    </span>
);

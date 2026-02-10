import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
    "flex-row items-center justify-center rounded-2xl px-4 py-3 active:opacity-80 overflow-hidden relative",
    {
        variants: {
            variant: {
                default: "bg-slate-900 shadow-md shadow-slate-900/20",
                secondary: "bg-slate-100",
                outline: "border border-slate-200 bg-transparent",
                ghost: "bg-transparent",
                destructive: "bg-red-500",
                zesti: "bg-zesti-blue",
                glass: "bg-white/20 backdrop-blur-md border border-white/30 shadow-lg shadow-black/5",
                liquid: "bg-gradient-to-br from-blue-400/80 to-blue-600/80 backdrop-blur-lg border border-white/20 shadow-xl shadow-blue-500/30",
            },
            size: {
                default: "h-12",
                sm: "h-9 px-3",
                lg: "h-14 px-8",
                icon: "h-10 w-10 min-w-[40px] items-center justify-center p-0",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

const textVariants = cva("text-base font-bold tracking-wide", {
    variants: {
        variant: {
            default: "text-white",
            secondary: "text-slate-900",
            outline: "text-slate-900",
            ghost: "text-slate-900",
            destructive: "text-white",
            zesti: "text-white",
            glass: "text-white",
            liquid: "text-white",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

interface ButtonProps
    extends React.ComponentPropsWithoutRef<typeof TouchableOpacity>,
    VariantProps<typeof buttonVariants> {
    label?: string;
    labelClasses?: string;
    icon?: React.ReactNode;
}

const Button = React.forwardRef<React.ElementRef<typeof TouchableOpacity>, ButtonProps>(
    ({ className, variant, size, label, labelClasses, icon, children, ...props }, ref) => {
        return (
            <TouchableOpacity
                ref={ref}
                className={cn(buttonVariants({ variant, size, className }))}
                {...props}
            >
                {icon && <View className="mr-2">{icon}</View>}
                {label ? (
                    <Text className={cn(textVariants({ variant }), labelClasses)}>
                        {label}
                    </Text>
                ) : (
                    children
                )}
            </TouchableOpacity>
        );
    }
);

Button.displayName = "Button";

export { Button, buttonVariants };

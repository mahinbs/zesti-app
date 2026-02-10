import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { Text, View } from "react-native";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
    "items-center rounded-full px-2.5 py-0.5 border",
    {
        variants: {
            variant: {
                default: "border-transparent bg-primary",
                secondary: "border-transparent bg-secondary",
                destructive: "border-transparent bg-red-500",
                outline: "text-foreground",
                success: "border-transparent bg-green-500",
                zesti: "border-transparent bg-zesti-lightBlue",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

interface BadgeProps
    extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof badgeVariants> {
    label?: string;
    labelClasses?: string;
}

export function Badge({ className, variant, label, labelClasses, children, ...props }: BadgeProps) {
    return (
        <View className={cn(badgeVariants({ variant }), className)} {...props}>
            {label ? (
                <Text
                    className={cn(
                        "text-xs font-semibold",
                        variant === "zesti" ? "text-zesti-blue" : "text-white",
                        labelClasses
                    )}
                >
                    {label}
                </Text>
            ) : (
                children
            )}
        </View>
    );
}

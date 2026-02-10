import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { cn } from "../../lib/utils";

const cardVariants = cva(
    "rounded-[24px] overflow-hidden transition-all",
    {
        variants: {
            variant: {
                default: "bg-white border border-gray-100 shadow-sm shadow-gray-200/50",
                glass: "bg-white/60 backdrop-blur-2xl border border-white/40 shadow-xl shadow-slate-200/50",
                liquid: "bg-gradient-to-br from-white/90 to-white/40 backdrop-blur-3xl border border-white/60 shadow-2xl shadow-blue-500/10",
                outline: "bg-transparent border border-gray-200",
                elevated: "bg-white shadow-xl shadow-slate-200/80 border-0",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

interface CardProps extends VariantProps<typeof cardVariants> {
    children: React.ReactNode;
    className?: string;
    onPress?: () => void;
}

export function Card({ children, className, variant, onPress }: CardProps) {
    const Container = onPress ? TouchableOpacity : View;
    return (
        <Container
            className={cn(cardVariants({ variant, className }))}
            onPress={onPress}
            activeOpacity={0.9}
        >
            {/* Optional shine effect for liquid/glass cards could be added here directly if needed, 
                but CSS backdrop-blur covers most of the requirement. 
                We can add a subtle gradient overlay for 'liquid' feel. */}
            {variant === 'liquid' && (
                <View className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
            )}
            {children}
        </Container>
    );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
    return <View className={cn("p-5", className)}>{children}</View>;
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <Text className={cn("text-lg font-bold text-slate-800 tracking-tight", className)}>
            {children}
        </Text>
    );
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
    return <View className={cn("p-5 pt-0", className)}>{children}</View>;
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
    return <View className={cn("p-5 border-t border-gray-50", className)}>{children}</View>;
}

import { cn } from '@/src/lib/utils';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface HomeTabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export function HomeTabs({ activeTab, onTabChange }: HomeTabsProps) {
    const tabs = ["Following", "All", "Deals"];

    return (
        <View className="bg-white py-3 border-b border-gray-50">
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
            >
                {tabs.map((tab) => {
                    const isActive = activeTab === tab;
                    return (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => onTabChange(tab)}
                            className={cn(
                                "px-6 py-2 rounded-full border transition-all",
                                isActive
                                    ? "bg-slate-900 border-slate-900"
                                    : "bg-white border-gray-200"
                            )}
                        >
                            <Text
                                className={cn(
                                    "text-sm font-bold",
                                    isActive ? "text-white" : "text-slate-600"
                                )}
                            >
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}

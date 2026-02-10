import { Stack, useRouter } from "expo-router";
import { ArrowLeft, List, MapPin, Navigation } from "lucide-react-native";
import React from "react";
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { Button } from "../src/components/ui/Button";
import { MOCK_CAFES } from "../src/data/mockData";

export default function MapScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-gray-200 relative">
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar barStyle="dark-content" />

            {/* Mock Map Background */}
            <Image
                source={{ uri: "https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-122.4194,37.7749,12,0/800x1200?access_token=mock_token" }}
                className="w-full h-full"
                resizeMode="cover"
            />

            {/* Fallback pattern / Overlay if image fails or just for effect */}
            <View className="absolute inset-0 bg-blue-50/10" />

            {/* Pins Container */}
            <View className="absolute inset-0 flex-row flex-wrap justify-center items-center gap-24 p-10 pt-32">
                {/* Mock Map Pins */}
                {MOCK_CAFES.map((cafe, index) => (
                    <TouchableOpacity
                        key={cafe.id}
                        className="items-center shadow-xl shadow-slate-500/30"
                        style={{ top: index * 40, left: index % 2 === 0 ? 30 : -30 }}
                        onPress={() => router.push(`/cafe/${cafe.id}`)}
                        activeOpacity={0.8}
                    >
                        <View className="bg-slate-900 p-3 rounded-full border-[3px] border-white shadow-lg items-center justify-center">
                            <MapPin size={20} color="white" fill="white" />
                        </View>
                        <View className="bg-white px-3 py-1.5 rounded-lg shadow-md mt-2 border border-gray-100/50">
                            <Text className="text-xs font-bold text-slate-800">{cafe.name}</Text>
                        </View>
                        {/* Triangle pointer for label */}
                        <View className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-white absolute top-[46px]" />
                    </TouchableOpacity>
                ))}

                {/* User Location Pin */}
                <View className="absolute bottom-1/3 right-10 items-center">
                    <View className="w-16 h-16 bg-blue-500/20 rounded-full items-center justify-center animate-pulse">
                        <View className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg" />
                    </View>
                </View>
            </View>

            {/* Top Bar */}
            <View className="absolute top-12 left-5 right-5 flex-row justify-between items-center z-10">
                <TouchableOpacity onPress={() => router.back()} className="bg-white p-3.5 rounded-2xl shadow-lg shadow-gray-200 border border-gray-100">
                    <ArrowLeft size={24} color="#0F172A" />
                </TouchableOpacity>

                <View className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-white shadow-lg shadow-gray-200">
                    <Text className="font-bold text-slate-800">Downtown Area</Text>
                </View>

                <TouchableOpacity className="bg-white p-3.5 rounded-2xl shadow-lg shadow-gray-200 border border-gray-100">
                    <Navigation size={24} color="#0F172A" />
                </TouchableOpacity>
            </View>

            {/* List Toggle */}
            <View className="absolute bottom-10 self-center w-full px-10">
                <Button className="rounded-2xl shadow-2xl shadow-slate-900/40 bg-slate-900 h-16 flex-row gap-3 border border-white/10 w-full" onPress={() => router.back()}>
                    <List size={20} color="white" />
                    <Text className="text-white font-bold text-lg tracking-wide">View List</Text>
                </Button>
            </View>
        </View>
    );
}

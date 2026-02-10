import { Stack, useRouter } from "expo-router";
import { Camera, Check, Home, Star } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Button } from "../src/components/ui/Button";

export default function OrderSuccessScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-white items-center justify-center px-6 relative">
            <Stack.Screen options={{ headerShown: false }} />

            {/* Background blobs */}
            <View className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
            <View className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-20 -mb-20" />

            <View className="bg-green-50 p-8 rounded-full mb-6 border-[6px] border-green-100 shadow-xl shadow-green-100">
                <Check size={48} color="#15803d" strokeWidth={3} />
            </View>

            <Text className="text-3xl font-bold text-slate-800 text-center mb-3 tracking-tight">Order Confirmed!</Text>
            <Text className="text-slate-500 text-center mb-10 leading-relaxed px-4">
                Your group order has been sent to the kitchen. You'll be notified when it's ready for pickup.
            </Text>

            {/* Post-Order Loop Trigger */}
            <View className="w-full bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 mb-10">
                <Text className="font-bold text-slate-800 mb-4 text-center text-lg">How was your experience?</Text>
                <View className="flex-row justify-center gap-3 mb-6">
                    {[1, 2, 3, 4, 5].map(star => (
                        <TouchableOpacity key={star}>
                            <Star size={36} color="#CBD5E1" fill={star <= 4 ? "#F59E0B" : "#CBD5E1"} className={star <= 4 ? "text-yellow-500" : "text-slate-300"} />
                        </TouchableOpacity>
                    ))}
                </View>
                <TouchableOpacity className="flex-row gap-3 justify-center items-center border-[2px] border-dashed border-blue-200 bg-blue-50/50 p-4 rounded-xl active:bg-blue-50">
                    <Camera size={20} color="#0EA5E9" />
                    <Text className="text-blue-600 font-bold">Add a photo to earn points</Text>
                </TouchableOpacity>
            </View>

            <Button className="w-full bg-slate-900 h-14 rounded-2xl shadow-lg shadow-slate-300 flex-row gap-2" onPress={() => router.navigate("/")}>
                <Home size={20} color="white" />
                <Text className="text-white font-bold text-base">Back to Home</Text>
            </Button>
        </View>
    );
}

import { Stack, useRouter } from "expo-router";
import { ArrowLeft, Minus, Plus, Send, Share2, ShoppingBag, UserPlus } from "lucide-react-native";
import React from "react";
import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Button } from "../src/components/ui/Button";
import { CURRENT_USER } from "../src/data/mockData";

export default function GroupOrderScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white">
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View className="px-5 py-3 border-b border-gray-50 flex-row items-center justify-between bg-white">
                <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-gray-50">
                    <ArrowLeft size={24} color="#0F172A" />
                </TouchableOpacity>
                <View className="items-center">
                    <Text className="font-bold text-lg text-slate-800">Group Order</Text>
                    <View className="flex-row items-center gap-1.5 mt-0.5">
                        <View className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <Text className="text-xs text-green-600 font-bold tracking-wide">ACTIVE SESSION</Text>
                    </View>
                </View>
                <TouchableOpacity className="p-2 relative bg-gray-50 rounded-full">
                    <ShoppingBag size={20} color="#0F172A" />
                    <View className="absolute top-0 right-0 bg-red-500 w-4 h-4 rounded-full items-center justify-center border-2 border-white shadow-sm">
                        <Text className="text-[9px] text-white font-bold">3</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Participants */}
            <View className="px-5 py-6 border-b border-gray-50/50 bg-gray-50/30">
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest">Participants (3)</Text>
                    <TouchableOpacity className="flex-row items-center gap-1">
                        <Share2 size={12} color="#3B82F6" />
                        <Text className="text-blue-500 text-xs font-bold">INVITE LINK</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 16 }}>
                    <View className="items-center">
                        <View className="w-14 h-14 rounded-full border-2 border-blue-500 p-0.5 shadow-md shadow-blue-100">
                            <Image source={{ uri: CURRENT_USER.avatar }} className="w-full h-full rounded-full" />
                        </View>
                        <Text className="text-xs font-bold mt-2 text-slate-700">You</Text>
                    </View>
                    <View className="items-center">
                        <View className="w-14 h-14 rounded-full border-2 border-white shadow-sm">
                            <Image source={{ uri: 'https://i.pravatar.cc/150?u=u2' }} className="w-full h-full rounded-full" />
                        </View>
                        <Text className="text-xs font-medium mt-2 text-gray-500">Sarah</Text>
                    </View>
                    <View className="items-center">
                        <TouchableOpacity className="w-14 h-14 rounded-full bg-white items-center justify-center border-2 border-dashed border-gray-300 shadow-sm">
                            <UserPlus size={20} color="#94A3B8" />
                        </TouchableOpacity>
                        <Text className="text-xs font-medium mt-2 text-gray-400">Invite</Text>
                    </View>
                </ScrollView>
            </View>

            {/* Shared Cart Items */}
            <ScrollView className="flex-1 px-5 pt-6 bg-white">
                <Text className="text-xs font-bold text-gray-400 mb-6 uppercase tracking-widest">Shared Cart</Text>

                {/* Item 1 */}
                <View className="flex-row items-start gap-4 mb-8">
                    <Image source={{ uri: "https://images.unsplash.com/photo-1485808191679-5f8c7c8606f4?q=80&w=2600&auto=format&fit=crop" }} className="w-20 h-20 rounded-2xl bg-gray-100" />
                    <View className="flex-1 pt-1">
                        <View className="flex-row justify-between items-start">
                            <Text className="font-bold text-slate-800 text-base">Caramel Macchiato</Text>
                            <Text className="font-bold text-slate-800">₹180</Text>
                        </View>
                        <Text className="text-gray-500 text-xs mt-1">Medium • Oat Milk</Text>

                        <View className="flex-row items-end justify-between mt-3">
                            <View className="flex-row items-center gap-2 bg-gray-50 px-2 py-1 rounded-lg">
                                <Image source={{ uri: CURRENT_USER.avatar }} className="w-4 h-4 rounded-full" />
                                <Text className="text-[10px] text-gray-500 font-medium">Added by You</Text>
                            </View>

                            {/* Quantity Control Mock */}
                            <View className="flex-row items-center gap-3 bg-white border border-gray-100 rounded-lg px-2 py-1 shadow-sm">
                                <Minus size={14} color="#CBD5E1" />
                                <Text className="text-xs font-bold text-slate-800">1</Text>
                                <Plus size={14} color="#0EA5E9" />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Item 2 */}
                <View className="flex-row items-start gap-4 mb-8">
                    <Image source={{ uri: "https://images.unsplash.com/photo-1588137372308-15f75323ca8d?q=80&w=2600&auto=format&fit=crop" }} className="w-20 h-20 rounded-2xl bg-gray-100" />
                    <View className="flex-1 pt-1">
                        <View className="flex-row justify-between items-start">
                            <Text className="font-bold text-slate-800 text-base">Avocado Toast</Text>
                            <Text className="font-bold text-slate-800">₹250</Text>
                        </View>
                        <Text className="text-gray-500 text-xs mt-1">Extra Chili Flakes</Text>

                        <View className="flex-row items-end justify-between mt-3">
                            <View className="flex-row items-center gap-2 bg-gray-50 px-2 py-1 rounded-lg">
                                <Image source={{ uri: 'https://i.pravatar.cc/150?u=u2' }} className="w-4 h-4 rounded-full" />
                                <Text className="text-[10px] text-gray-500 font-medium">Added by Sarah</Text>
                            </View>

                            <View className="flex-row items-center gap-3 bg-white border border-gray-100 rounded-lg px-2 py-1 shadow-sm">
                                <Minus size={14} color="#CBD5E1" />
                                <Text className="text-xs font-bold text-slate-800">1</Text>
                                <Plus size={14} color="#0EA5E9" />
                            </View>
                        </View>
                    </View>
                </View>

            </ScrollView>

            {/* Chat Input Area (Mock) */}
            <View className="px-5 py-3 border-t border-gray-100 bg-white">
                <View className="flex-row items-center gap-3">
                    <View className="flex-1 bg-gray-50 rounded-full px-5 py-3 border border-gray-100 flex-row items-center">
                        <TextInput placeholder="Chat with group..." placeholderTextColor="#94A3B8" className="flex-1 text-slate-800" />
                    </View>
                    <TouchableOpacity className="bg-slate-900 p-3.5 rounded-full shadow-lg shadow-slate-200">
                        <Send size={18} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Checkout Button */}
            <View className="px-5 pt-2 pb-6 bg-white">
                <Button className="w-full bg-slate-900 h-14 rounded-2xl shadow-xl shadow-slate-200" onPress={() => router.push("/order-success")}>
                    <View className="flex-row items-center justify-between w-full px-2">
                        <Text className="text-white font-bold text-base">Checkout</Text>
                        <View className="flex-row items-center gap-2">
                            <Text className="text-slate-400 font-medium text-sm">Total</Text>
                            <Text className="text-white font-bold text-lg">₹430</Text>
                        </View>
                    </View>
                </Button>
            </View>
        </SafeAreaView>
    );
}

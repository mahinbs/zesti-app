import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, MapPin, Minus, Plus, Share2, Star, Users, Utensils } from "lucide-react-native";
import React from "react";
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { Button } from "../../src/components/ui/Button";
import { MOCK_CAFES } from "../../src/data/mockData";
import { cn } from "../../src/lib/utils";

export default function CafeDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const cafe = MOCK_CAFES.find(c => c.id === id) || MOCK_CAFES[0]; // Fallback for dev

    return (
        <View className="flex-1 bg-white">
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar barStyle="light-content" />

            {/* Hero Image */}
            <View className="h-72 w-full relative">
                <Image source={{ uri: cafe.image }} className="w-full h-full" resizeMode="cover" />
                <View className="absolute top-12 left-5 z-10">
                    <TouchableOpacity onPress={() => router.back()} className="bg-black/20 backdrop-blur-md p-3 rounded-full border border-white/10">
                        <ArrowLeft color="white" size={24} />
                    </TouchableOpacity>
                </View>
                <View className="absolute top-12 right-5 z-10 flex-row gap-3">
                    <TouchableOpacity className="bg-black/20 backdrop-blur-md p-3 rounded-full border border-white/10">
                        <Share2 color="white" size={22} />
                    </TouchableOpacity>
                </View>
                <View className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <View className="absolute bottom-8 left-5 right-5">
                    <Text className="text-3xl font-bold text-white tracking-tight leading-tight mb-2">{cafe.name}</Text>
                    <View className="flex-row items-center gap-2">
                        <View className="bg-white/20 backdrop-blur-md px-2 py-1 rounded-md flex-row items-center gap-1">
                            <Star size={14} fill="#F59E0B" color="#F59E0B" />
                            <Text className="text-white font-bold text-xs">{cafe.rating} (500+)</Text>
                        </View>
                        <Text className="text-white/80 text-sm font-medium">• {cafe.distance}</Text>
                    </View>
                </View>
            </View>

            <ScrollView className="flex-1 -mt-4 bg-white rounded-t-[32px] pt-8 px-6" showsVerticalScrollIndicator={false}>

                {/* Address */}
                <View className="flex-row items-center gap-2 mb-8">
                    <MapPin size={18} color="#64748B" />
                    <Text className="text-slate-500 text-sm font-medium leading-relaxed flex-1">{cafe.address}</Text>
                </View>

                {/* Loyalty Card */}
                {cafe.loyaltyProgram && (
                    <View className="relative overflow-hidden rounded-3xl p-6 shadow-xl shadow-blue-200">
                        {/* Gradient Background mockup using View since LinearGradient needs expo-linear-gradient */}
                        <View className="absolute inset-0 bg-blue-600" />
                        <View className="absolute -right-10 -top-10 bg-white/10 w-40 h-40 rounded-full blur-2xl" />
                        <View className="absolute -left-10 -bottom-10 bg-black/10 w-40 h-40 rounded-full blur-xl" />

                        <View className="flex-row justify-between items-start mb-6 relative z-10">
                            <View>
                                <View className="flex-row items-center gap-2 mb-1">
                                    <Star size={16} color="#93C5FD" fill="#93C5FD" />
                                    <Text className="text-blue-100 font-bold tracking-wider text-xs uppercase">Loyalty Program</Text>
                                </View>
                                <Text className="text-white font-bold text-2xl tracking-tight">Free {cafe.loyaltyProgram.reward}</Text>
                            </View>
                            <View className="bg-white/20 p-2.5 rounded-xl backdrop-blur-sm border border-white/10">
                                <Utensils size={20} color="white" />
                            </View>
                        </View>

                        {/* Progress Bar Visual */}
                        <View className="relative z-10">
                            <View className="flex-row justify-between mb-3">
                                <Text className="text-white font-bold text-lg">{cafe.loyaltyProgram.current}/{cafe.loyaltyProgram.target} <Text className="text-blue-200 text-sm font-normal">visits</Text></Text>
                                <Text className="text-blue-200 font-medium text-sm">Almost there!</Text>
                            </View>
                            <View className="h-2.5 bg-black/20 rounded-full overflow-hidden">
                                <View
                                    className="h-full bg-white rounded-full shadow-sm"
                                    style={{ width: `${(cafe.loyaltyProgram.current! / cafe.loyaltyProgram.target) * 100}%` }}
                                />
                            </View>
                            <Text className="text-blue-200/80 text-xs mt-3 font-medium">Earn {cafe.loyaltyProgram.target - cafe.loyaltyProgram.current!} more visits to unlock your reward.</Text>
                        </View>
                    </View>
                )}

                {/* Group Order Button */}
                <Button
                    className="mt-8 bg-slate-900 h-16 rounded-2xl flex-row justify-between items-center px-5 shadow-lg shadow-slate-200"
                    onPress={() => router.push("/group-order")}
                >
                    <View className="flex-row items-center gap-3">
                        <View className="bg-white/10 p-2 rounded-full">
                            <Users size={20} color="white" />
                        </View>
                        <View>
                            <Text className="text-white font-bold text-base">Group Order</Text>
                            <Text className="text-gray-400 text-xs">Order together & save</Text>
                        </View>
                    </View>
                    <ArrowLeft size={18} color="white" className="rotate-180" />
                </Button>

                {/* Menu Section */}
                <View className="mt-10 mb-6 flex-row justify-between items-center">
                    <Text className="text-xl font-bold text-slate-800">Menu</Text>
                    <TouchableOpacity><Text className="text-blue-500 font-medium text-sm">Full Menu</Text></TouchableOpacity>
                </View>

                {/* Filter Tags */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6" contentContainerStyle={{ gap: 10 }}>
                    {["All", "Bestsellers", "Coffee", "Snacks", "Desserts"].map((cat, idx) => (
                        <TouchableOpacity key={idx} className={cn("px-4 py-2 rounded-full border shadow-sm", idx === 0 ? "bg-slate-800 border-slate-800" : "border-gray-200 bg-white")}>
                            <Text className={cn("text-xs font-semibold", idx === 0 ? "text-white" : "text-gray-600")}>{cat}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Menu Items */}
                <View className="gap-6 pb-12">
                    {cafe.menu.length > 0 ? cafe.menu.map((item) => (
                        <View key={item.id} className="flex-row gap-4 border-b border-gray-50 pb-6">
                            <View className="flex-1 py-1">
                                <View className="flex-row items-start justify-between mb-1">
                                    <Text className="font-bold text-slate-800 text-lg flex-1 pr-2">{item.name}</Text>
                                    <Text className="font-bold text-slate-800 text-base">₹{item.price}</Text>
                                </View>
                                {item.tags.includes("Bestseller") && (
                                    <View className="flex-row items-center gap-1 mb-2">
                                        <Star size={10} fill="#F59E0B" color="#F59E0B" />
                                        <Text className="text-[10px] font-bold text-orange-500 uppercase tracking-wide">Popular Choice</Text>
                                    </View>
                                )}
                                <Text className="text-gray-500 text-sm leading-relaxed" numberOfLines={2}>Delicious blend of espresso and steamed milk with vanilla syrup.</Text>
                                <View className="flex-row gap-0.5 mt-3 items-center">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} fill={s <= Math.round(item.rating) ? "#F59E0B" : "none"} color={s <= Math.round(item.rating) ? "#F59E0B" : "#CBD5E1"} />)}
                                    <Text className="text-xs text-gray-400 ml-2 font-medium">({item.reviews})</Text>
                                </View>
                            </View>
                            <View className="items-center relative">
                                <Image source={{ uri: item.image }} className="w-28 h-28 rounded-2xl bg-gray-100" />
                                <View className="absolute -bottom-3 bg-white shadow-lg shadow-gray-200 border border-gray-100 rounded-xl flex-row items-center w-24 justify-between px-2 py-1.5">
                                    <TouchableOpacity>
                                        <Minus size={16} color="#0F172A" />
                                    </TouchableOpacity>
                                    <Text className="font-bold text-slate-800">ADD</Text>
                                    <TouchableOpacity>
                                        <Plus size={16} color="#0F172A" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )) : (
                        <Text className="text-center text-gray-500 py-10">Menu items loading...</Text>
                    )}
                </View>

            </ScrollView>
        </View>
    );
}

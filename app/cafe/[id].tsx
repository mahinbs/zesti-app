import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Clock, Heart, MessageCircle, Minus, Plus, ShoppingBag, Star, Sun, Users, X } from "lucide-react-native";
import React, { useState } from "react";
import { Image, Modal, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { FoodItem, MOCK_CAFES } from "../../src/data/mockData";
import { getCafeTheme } from "../../src/lib/cafeThemes";
import { cn } from "../../src/lib/utils";

export default function CafeDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const cafe = MOCK_CAFES.find(c => c.id === id) || MOCK_CAFES[0];
    const theme = getCafeTheme(cafe.id);
    const [isFollowing, setIsFollowing] = useState(cafe.followed);
    const [activeTab, setActiveTab] = useState("Welcome!");

    // Cart modal state
    const [cartModalVisible, setCartModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useState<{ item: FoodItem; qty: number }[]>([]);

    const tabs = ["Welcome!", "Snacks", "Drinks", "Desserts"];

    const openAddModal = (item: FoodItem) => {
        setSelectedItem(item);
        setQuantity(1);
        setCartModalVisible(true);
    };

    const addToCart = () => {
        if (!selectedItem) return;
        setCart(prev => {
            const existing = prev.find(c => c.item.id === selectedItem.id);
            if (existing) {
                return prev.map(c => c.item.id === selectedItem.id ? { ...c, qty: c.qty + quantity } : c);
            }
            return [...prev, { item: selectedItem, qty: quantity }];
        });
        setCartModalVisible(false);
    };

    const totalCartItems = cart.reduce((sum, c) => sum + c.qty, 0);
    const totalCartPrice = cart.reduce((sum, c) => sum + c.item.price * c.qty, 0);

    const filteredMenu = cafe.menu.filter(item => {
        if (activeTab === "Welcome!") return true;
        if (activeTab === "Drinks") return item.tags.some(t => ["Coffee", "Tea", "Drink", "Beverage"].includes(t));
        if (activeTab === "Snacks") return item.tags.some(t => ["Snack", "Breakfast", "Lunch", "Burger", "Sandwich"].includes(t));
        if (activeTab === "Desserts") return item.tags.some(t => ["Sweet", "Dessert", "Cake", "Pastry"].includes(t));
        return true;
    });

    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: "#FFFFFF" }}>
            <StatusBar barStyle="dark-content" />
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View className="flex-row items-center justify-between px-5 py-2">
                <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                    <ArrowLeft size={24} color="#0F172A" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-slate-800">{cafe.name}</Text>
                <TouchableOpacity
                    onPress={() => setIsFollowing(!isFollowing)}
                    style={{ backgroundColor: isFollowing ? theme.primary : theme.background }}
                    className={cn("flex-row items-center gap-1 px-4 py-2 rounded-full", !isFollowing && "border")}
                >
                    {isFollowing ? (
                        <>
                            <Heart size={14} color="white" fill="white" />
                            <Text className="text-white font-bold text-xs ml-1">Following</Text>
                        </>
                    ) : (
                        <Text style={{ color: theme.primary }} className="font-bold text-xs">Follow</Text>
                    )}
                </TouchableOpacity>
            </View>

            {/* Scrollable content — paddingBottom leaves room for the bottom bar */}
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingBottom: totalCartItems > 0 ? 120 : 80 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Profile Section */}
                <View className="items-center mt-4 mb-6">
                    <View className="relative shadow-lg shadow-gray-200 mb-4">
                        <Image source={{ uri: cafe.image }} className="w-28 h-28 rounded-full border-4 border-white" />
                        <View className="absolute bottom-1 right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white" />
                    </View>
                    <Text className="text-2xl font-bold text-slate-800 text-center mb-1">{cafe.name}</Text>
                    <Text className="text-slate-500 font-medium">{cafe.followers} Followers</Text>
                </View>

                {/* Rewards Card */}
                {cafe.loyaltyProgram && (
                    <View className="px-5 mb-8">
                        <View
                            style={{ backgroundColor: theme.primary }}
                            className="rounded-3xl p-6 shadow-md shadow-slate-200 relative overflow-hidden"
                        >
                            <View className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/10" />
                            <View className="absolute -left-4 -bottom-4 w-32 h-32 rounded-full bg-white/5" />
                            <View className="flex-row justify-between items-center mb-4">
                                <View className="flex-row items-center gap-1">
                                    <Text className="text-white font-bold text-xl">Rewards</Text>
                                    <Star size={16} color="white" fill="white" />
                                </View>
                                <Text className="text-white font-bold text-xl">{cafe.loyaltyProgram.current}</Text>
                            </View>
                            <View className="h-2 bg-black/20 rounded-full mb-4 overflow-hidden">
                                <View
                                    className="h-full bg-white rounded-full"
                                    style={{ width: `${(cafe.loyaltyProgram.current! / cafe.loyaltyProgram.target) * 100}%` }}
                                />
                            </View>
                            <View className="flex-row justify-between items-center bg-white/10 p-3 rounded-xl">
                                <Text className="text-white font-bold">{cafe.loyaltyProgram.reward}</Text>
                                <View className="bg-white/20 px-3 py-1 rounded-full">
                                    <Text className="text-white font-bold text-xs">{cafe.loyaltyProgram.target - cafe.loyaltyProgram.current!} more</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )}

                {/* Info Row */}
                <View className="flex-row px-5 mb-8 justify-between">
                    <View>
                        <View className="flex-row items-center gap-2 mb-1">
                            <Sun size={18} color="#16A34A" />
                            <Text className="font-bold text-green-600">Open</Text>
                        </View>
                        <Text className="text-slate-500 text-sm">9:00 am – 11:00 pm</Text>
                    </View>
                    <View className="w-[1px] bg-gray-200 mx-4" />
                    <View>
                        <View className="flex-row items-center gap-2 mb-1">
                            <Clock size={16} color="#0F172A" />
                            <Text className="font-bold text-slate-800">10-15 mins</Text>
                        </View>
                        <Text className="text-slate-500 text-sm">pickup time</Text>
                    </View>
                </View>

                {/* Tabs */}
                <View className="border-b border-gray-100 mb-6">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
                        {tabs.map(tab => {
                            const isActive = activeTab === tab;
                            return (
                                <TouchableOpacity
                                    key={tab}
                                    onPress={() => setActiveTab(tab)}
                                    className="mr-6 pb-3 border-b-2"
                                    style={{ borderColor: isActive ? theme.primary : "transparent" }}
                                >
                                    <Text
                                        className={cn("font-bold text-base", !isActive && "text-gray-400")}
                                        style={{ color: isActive ? theme.primary : undefined }}
                                    >
                                        {tab}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>

                {/* Tab Content */}
                <View className="px-5">
                    {activeTab === "Welcome!" && (
                        <View className="mb-6">
                            <Text className="text-slate-600 leading-relaxed text-base">
                                Welcome! Try our fresh and delicious handcrafted beverages and snacks. Bring home a treat today! 🥐☕️
                            </Text>
                        </View>
                    )}

                    {/* Menu List */}
                    <View className="gap-5">
                        {filteredMenu.map((item) => (
                            <View key={item.id} className="flex-row items-center gap-4">
                                <Image source={{ uri: item.image }} style={{ width: 80, height: 80, borderRadius: 12 }} />
                                <View className="flex-1">
                                    <Text className="font-bold text-slate-800 text-base mb-0.5">{item.name}</Text>
                                    <Text className="text-slate-500 font-medium text-sm">from ₹{item.price}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => openAddModal(item)}
                                    style={{ borderColor: theme.primary }}
                                    className="border px-3 py-1.5 rounded-full flex-row items-center gap-1"
                                >
                                    <Plus size={14} color={theme.primary} />
                                    <Text style={{ color: theme.primary }} className="font-bold text-sm">Add</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                        {filteredMenu.length === 0 && (
                            <Text className="text-center text-gray-400 py-10">No items in this category.</Text>
                        )}
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Action Bar */}
            <View
                className="absolute bottom-0 left-0 right-0 px-5 py-4 border-t border-gray-100 bg-white"
                style={{ paddingBottom: 28 }}
            >
                {totalCartItems > 0 ? (
                    // Cart summary bar
                    <View
                        style={{ backgroundColor: theme.primary }}
                        className="flex-row items-center justify-between px-5 py-3.5 rounded-2xl"
                    >
                        <View className="bg-white/20 px-2.5 py-1 rounded-lg">
                            <Text className="text-white font-bold text-sm">{totalCartItems} item{totalCartItems > 1 ? "s" : ""}</Text>
                        </View>
                        <Text className="text-white font-bold text-base">View Cart</Text>
                        <Text className="text-white font-bold text-base">₹{totalCartPrice}</Text>
                    </View>
                ) : (
                    // Default action buttons
                    <View className="flex-row gap-3">
                        <TouchableOpacity
                            style={{ backgroundColor: theme.primary }}
                            className="flex-1 flex-row items-center justify-center gap-2 py-3.5 rounded-2xl"
                        >
                            <MessageCircle size={18} color="white" />
                            <Text className="text-white font-bold text-sm">Chat with Café</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ borderColor: theme.primary }}
                            className="flex-1 flex-row items-center justify-center gap-2 py-3.5 rounded-2xl border-2"
                        >
                            <Users size={18} color={theme.primary} />
                            <Text style={{ color: theme.primary }} className="font-bold text-sm">Group Order</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {/* Add to Cart Modal */}
            <Modal
                visible={cartModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setCartModalVisible(false)}
            >
                <View className="flex-1 justify-end bg-black/40">
                    <View className="bg-white rounded-t-[32px] px-6 pt-6 pb-10">
                        {/* Handle */}
                        <View className="w-10 h-1 bg-gray-200 rounded-full self-center mb-5" />

                        {/* Close */}
                        <TouchableOpacity
                            onPress={() => setCartModalVisible(false)}
                            className="absolute top-5 right-5 p-1"
                        >
                            <X size={22} color="#64748B" />
                        </TouchableOpacity>

                        {selectedItem && (
                            <>
                                {/* Item Image */}
                                <Image
                                    source={{ uri: selectedItem.image }}
                                    style={{ width: "100%", height: 180, borderRadius: 20 }}
                                    resizeMode="cover"
                                    className="mb-4"
                                />

                                <Text className="text-xl font-bold text-slate-800 mb-1">{selectedItem.name}</Text>
                                <Text className="text-slate-500 mb-6">₹{selectedItem.price} per item</Text>

                                {/* Quantity Selector */}
                                <View className="flex-row items-center justify-between mb-6">
                                    <Text className="font-bold text-slate-700 text-base">Quantity</Text>
                                    <View className="flex-row items-center gap-4">
                                        <TouchableOpacity
                                            onPress={() => setQuantity(q => Math.max(1, q - 1))}
                                            style={{ borderColor: theme.primary }}
                                            className="w-9 h-9 rounded-full border-2 items-center justify-center"
                                        >
                                            <Minus size={16} color={theme.primary} />
                                        </TouchableOpacity>
                                        <Text className="text-xl font-bold text-slate-800 w-6 text-center">{quantity}</Text>
                                        <TouchableOpacity
                                            onPress={() => setQuantity(q => q + 1)}
                                            style={{ backgroundColor: theme.primary }}
                                            className="w-9 h-9 rounded-full items-center justify-center"
                                        >
                                            <Plus size={16} color="white" />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* Add Button */}
                                <TouchableOpacity
                                    onPress={addToCart}
                                    style={{ backgroundColor: theme.primary }}
                                    className="flex-row items-center justify-between px-6 py-4 rounded-2xl"
                                >
                                    <View className="flex-row items-center gap-2">
                                        <ShoppingBag size={18} color="white" />
                                        <Text className="text-white font-bold text-base">Add to Cart</Text>
                                    </View>
                                    <Text className="text-white font-bold text-base">₹{selectedItem.price * quantity}</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

import { Stack, useRouter } from "expo-router";
import { ArrowLeft, ChevronRight, CreditCard, Gift, QrCode } from "lucide-react-native";
import React from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Card } from "../src/components/ui/Card";
import { MOCK_CAFES } from "../src/data/mockData";

export default function RewardsScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-gray-50/50">
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View className="px-5 py-3 border-b border-gray-100 flex-row items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-gray-50">
                    <ArrowLeft size={24} color="#0F172A" />
                </TouchableOpacity>
                <Text className="font-bold text-lg text-slate-800 tracking-tight">My Wallet</Text>
                <TouchableOpacity className="p-2 rounded-full bg-gray-50 hover:bg-gray-100">
                    <QrCode size={20} color="#0F172A" />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
                {/* Points Card */}
                <View className="h-48 bg-slate-900 rounded-[24px] p-6 mb-8 relative overflow-hidden shadow-2xl shadow-slate-300">
                    {/* Abstract background shapes */}
                    <View className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16" />
                    <View className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl -ml-10 -mb-10" />

                    <View className="flex-row justify-between items-start mb-6">
                        <View className="flex-row items-center gap-2">
                            <View className="bg-white/10 p-1.5 rounded-lg backdrop-blur-sm">
                                <CreditCard size={16} color="white" />
                            </View>
                            <Text className="text-white/80 font-medium tracking-wide text-xs uppercase">Zesti Rewards</Text>
                        </View>
                        <Text className="text-white/50 text-xs font-bold tracking-widest">VISA</Text>
                    </View>

                    <View>
                        <Text className="text-slate-300 text-sm font-medium mb-1">Total Balance</Text>
                        <Text className="text-4xl font-bold text-white mb-6">1,250 <Text className="text-lg font-medium text-slate-400">pts</Text></Text>
                    </View>

                    <View className="flex-row justify-between items-end">
                        <View>
                            <Text className="text-white/60 text-[10px] font-bold uppercase tracking-wider mb-1">Member Status</Text>
                            <View className="flex-row items-center gap-1.5">
                                <View className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
                                <Text className="text-white font-bold text-sm">Gold Tier</Text>
                            </View>
                        </View>
                        <TouchableOpacity className="bg-white px-4 py-2 rounded-xl shadow-lg">
                            <Text className="text-slate-900 font-bold text-xs">View History</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Available Rewards */}
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-lg font-bold text-slate-800">Ready to Redeem</Text>
                    <TouchableOpacity><Text className="text-blue-500 font-medium text-xs">See all</Text></TouchableOpacity>
                </View>

                <View className="gap-4">
                    {MOCK_CAFES.map((cafe) => (
                        <Card key={cafe.id} className="flex-row p-4 items-center gap-4 border-0 bg-white shadow-lg shadow-gray-100/50 rounded-2xl">
                            <View className="bg-blue-50 p-3.5 rounded-2xl">
                                <Gift size={22} color="#0EA5E9" fill="#0EA5E9" fillOpacity={0.1} />
                            </View>
                            <View className="flex-1">
                                <Text className="font-bold text-slate-800 text-base">{cafe.loyaltyProgram.reward}</Text>
                                <Text className="text-gray-400 text-xs font-medium mt-0.5">at {cafe.name}</Text>
                            </View>
                            <TouchableOpacity className="bg-slate-900 px-4 py-2.5 rounded-xl shadow-md shadow-slate-200">
                                <Text className="text-white font-bold text-xs">Redeem</Text>
                            </TouchableOpacity>
                        </Card>
                    ))}
                </View>

                {/* In Progress */}
                <View className="flex-row justify-between items-center mt-10 mb-4">
                    <Text className="text-lg font-bold text-slate-800">In Progress</Text>
                </View>

                <View className="gap-5 pb-12">
                    {MOCK_CAFES.map((cafe) => (
                        <Card key={`prog-${cafe.id}`} className="p-5 border-0 bg-white shadow-md shadow-gray-100 rounded-3xl">
                            <View className="flex-row justify-between mb-3">
                                <View>
                                    <Text className="font-bold text-slate-800 text-base">{cafe.name}</Text>
                                    <View className="flex-row items-center gap-1 mt-1">
                                        <Text className="text-xs text-blue-500 font-bold">{cafe.loyaltyProgram.current}/{cafe.loyaltyProgram.target}</Text>
                                        <Text className="text-xs text-gray-400">visits completed</Text>
                                    </View>
                                </View>
                                <View className="bg-gray-50 w-10 h-10 rounded-full items-center justify-center">
                                    <ChevronRight size={18} color="#94A3B8" />
                                </View>
                            </View>

                            <View className="h-2.5 bg-gray-100 rounded-full overflow-hidden mb-3">
                                <View
                                    className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                                    style={{ width: `${(cafe.loyaltyProgram.current! / cafe.loyaltyProgram.target) * 100}%` }}
                                />
                            </View>

                            <View className="flex-row items-center gap-2 bg-blue-50/50 p-2 rounded-lg">
                                <Gift size={12} color="#3B82F6" />
                                <Text className="text-xs text-slate-500 font-medium">
                                    {cafe.loyaltyProgram.target - cafe.loyaltyProgram.current!} more visits for a <Text className="font-bold text-blue-600">{cafe.loyaltyProgram.reward}</Text>
                                </Text>
                            </View>
                        </Card>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

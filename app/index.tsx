import { Stack, useRouter } from "expo-router";
import { ArrowRight, ChevronRight, Clock, Coffee, Filter, Flame, Leaf, MapPin, Sandwich, Search, Sparkles, Star, Users, Utensils } from "lucide-react-native";
import React from "react";
import { Dimensions, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Badge } from "../src/components/ui/Badge";
import { Button } from "../src/components/ui/Button";
import { Card, CardContent } from "../src/components/ui/Card";
import { MOCK_CAFES, TRENDING_ITEMS } from "../src/data/mockData";
import { cn } from "../src/lib/utils";

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-50/50">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View className="px-5 py-3 flex-row justify-between items-center bg-white/70 backdrop-blur-xl sticky top-0 z-50 border-b border-white/20">
        <View className="flex-row items-center gap-3">
          <View className="bg-blue-50/80 p-2.5 rounded-full border border-blue-100 shadow-sm shadow-blue-100/50 backdrop-blur-sm">
            <MapPin size={20} color="#0EA5E9" fill="#0EA5E9" fillOpacity={0.2} />
          </View>
          <View>
            <Text className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mb-0.5">Location</Text>
            <TouchableOpacity className="flex-row items-center gap-1 active:opacity-70">
              <Text className="text-sm font-bold text-slate-800">Downtown, SF</Text>
              <ChevronRight size={14} color="#64748B" strokeWidth={3} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={() => router.push("/rewards")} className="shadow-lg shadow-orange-500/20 active:scale-95 transition-transform">
          <Badge variant="zesti" className="flex-row items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-50/90 to-orange-50/90 border border-orange-100/50 backdrop-blur-md">
            <Star size={14} color="#F59E0B" fill="#F59E0B" />
            <Text className="font-bold text-orange-700 text-xs">1,250</Text>
          </Badge>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 110 }} showsVerticalScrollIndicator={false}>

        {/* Search Bar */}
        <View className="px-5 mt-6 flex-row gap-3">
          <View className="flex-1 flex-row items-center bg-white/80 backdrop-blur-lg rounded-2xl px-4 py-3.5 border border-white/50 shadow-lg shadow-gray-200/50">
            <Search size={22} color="#94A3B8" />
            <TextInput
              placeholder="What are you craving?"
              placeholderTextColor="#94A3B8"
              className="flex-1 ml-3 text-slate-800 font-medium text-base"
            />
          </View>
          <Button variant="default" size="icon" className="rounded-2xl w-14 h-[54px] shadow-xl shadow-slate-900/30 active:bg-slate-800 bg-slate-900">
            <Filter size={20} color="white" />
          </Button>
        </View>

        {/* Categories / Tags */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-8 pl-5" contentContainerStyle={{ gap: 12, paddingRight: 40 }}>
          {[
            { label: "Trending", icon: Flame, color: "#F59E0B" },
            { label: "Healthy", icon: Leaf, color: "#22C55E" },
            { label: "Burgers", icon: Sandwich, color: "#EF4444" },
            { label: "Coffee", icon: Coffee, color: "#8B5CF6" },
            { label: "Sweet", icon: Utensils, color: "#EC4899" }
          ].map((cat, index) => (
            <TouchableOpacity key={index} className={cn("px-4 py-2.5 rounded-full border flex-row items-center gap-2 shadow-sm transition-all backdrop-blur-md", index === 0 ? "bg-slate-900 border-slate-900 shadow-slate-900/20" : "bg-white/70 border-white/50 shadow-gray-200/20")}>
              <cat.icon size={16} color={index === 0 ? "white" : cat.color} fill={index === 0 ? "white" : cat.color} fillOpacity={0.2} />
              <Text className={cn("font-medium text-[13px]", index === 0 ? "text-white" : "text-gray-600")}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Section: Exclusive Offers (Liquid Glass) */}
        <View className="px-5 mt-10 mb-4 flex-row items-center gap-2">
          <Sparkles size={18} color="#0EA5E9" fill="#0EA5E9" fillOpacity={0.2} />
          <Text className="text-lg font-bold text-slate-800 tracking-tight">Exclusive Offers</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-5" contentContainerStyle={{ gap: 16, paddingRight: 40 }}>
          {[
            { title: "50% OFF", sub: "On your first group order", color: "bg-indigo-500", img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=2600" },
            { title: "Free Coffee", sub: "With any breakfast item", color: "bg-orange-500", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2600" }
          ].map((offer, i) => (
            <TouchableOpacity key={i} className="relative w-[280px] h-36 rounded-[24px] overflow-hidden shadow-2xl shadow-gray-300/60 border border-white/20">
              <Image source={{ uri: offer.img }} className="absolute inset-0 w-full h-full" resizeMode="cover" />
              <View className={cn("absolute inset-0 opacity-80 backdrop-blur-[2px]", offer.color)} />

              {/* Glass Overlay on Card */}
              <View className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

              <View className="absolute inset-0 p-6 justify-center">
                <View className="bg-white/20 self-start px-3 py-1 rounded-lg backdrop-blur-md mb-2 border border-white/20 shadow-sm">
                  <Text className="text-white text-[10px] font-bold uppercase tracking-wider">Limited Time</Text>
                </View>
                <Text className="text-white text-3xl font-black italic shadow-sm">{offer.title}</Text>
                <Text className="text-white/95 font-medium shadow-sm">{offer.sub}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Section Title: Trending Near You */}
        <View className="px-5 mt-10 flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold text-slate-800 tracking-tight">Trending Near You</Text>
          <TouchableOpacity className="flex-row items-center gap-1">
            <Text className="text-blue-500 font-bold text-xs uppercase tracking-wide">View All</Text>
            <ArrowRight size={14} color="#3B82F6" />
          </TouchableOpacity>
        </View>

        {/* Trending Horizontal List (Liquid Glass Cards) */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-5" contentContainerStyle={{ gap: 20, paddingRight: 40 }}>
          {TRENDING_ITEMS.map((item, index) => (
            <Card key={index} variant="liquid" className="w-[280px]" onPress={() => router.push(`/cafe/${item.cafeId}`)}>
              <View className="h-48 w-full relative p-2">
                <Image source={{ uri: item.image }} className="w-full h-full rounded-[20px]" resizeMode="cover" />

                {/* Glass Badge */}
                <View className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-2.5 py-1.5 rounded-xl flex-row items-center gap-1.5 shadow-sm border border-white/40">
                  <Star size={12} color="#F59E0B" fill="#F59E0B" />
                  <Text className="text-xs font-bold text-slate-800">{item.rating}</Text>
                  <Text className="text-[10px] text-gray-500">({item.reviews})</Text>
                </View>

                {item.socialProof && (
                  <View className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-2.5 rounded-xl flex-row items-center gap-3 border border-white/10 shadow-lg">
                    <View className="bg-white/10 p-1.5 rounded-full">
                      {item.socialProof.type === 'friends' ? <Users size={12} color="white" /> : <Flame size={12} color="#F59E0B" fill="#F59E0B" />}
                    </View>
                    <Text className="text-[11px] text-white font-medium flex-1" numberOfLines={1}>{item.socialProof.message}</Text>
                  </View>
                )}
              </View>
              <CardContent className="pt-2 pb-5 px-5">
                <View className="flex-row justify-between items-start">
                  <View className="flex-1 mr-2">
                    <Text className="text-lg font-bold text-slate-800" numberOfLines={1}>{item.name}</Text>
                    <View className="flex-row items-center gap-1.5 mt-1">
                      <Clock size={12} color="#94A3B8" />
                      <Text className="text-xs text-gray-500 font-medium">{item.cafeName} • 15 min</Text>
                    </View>
                  </View>
                  <Text className="text-lg font-bold text-blue-600 bg-blue-50/80 backdrop-blur-sm px-2.5 py-1 rounded-lg">₹{item.price}</Text>
                </View>
              </CardContent>
            </Card>
          ))}
        </ScrollView>

        {/* Section: Curated Collections */}
        <View className="px-5 mt-10 mb-4 flex-row justify-between items-center">
          <Text className="text-xl font-bold text-slate-800 tracking-tight">Curated Collections</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-5 mb-2" contentContainerStyle={{ gap: 16, paddingRight: 40 }}>
          {[
            { name: "Best Coffee", count: "12 Places", color: "bg-amber-100/50", icon: Coffee, iconColor: "#D97706" },
            { name: "Date Night", count: "8 Places", color: "bg-rose-100/50", icon: Utensils, iconColor: "#E11D48" },
            { name: "Work Friendly", count: "15 Places", color: "bg-blue-100/50", icon: Users, iconColor: "#2563EB" },
          ].map((col, i) => (
            <TouchableOpacity key={i} className={cn("w-36 h-36 rounded-[28px] p-5 justify-between border border-white/40 shadow-lg shadow-gray-200/40 backdrop-blur-sm", col.color)}>
              <View className="w-10 h-10 bg-white/80 rounded-2xl items-center justify-center backdrop-blur-md shadow-sm">
                <col.icon size={20} color={col.iconColor} />
              </View>
              <View>
                <Text className="font-bold text-slate-800 text-lg leading-tight mb-1">{col.name}</Text>
                <Text className="text-xs font-semibold text-slate-500">{col.count}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Section Title: Popular Cafes */}
        <View className="px-5 mt-8 mb-4 flex-row justify-between items-center">
          <Text className="text-xl font-bold text-slate-800 tracking-tight">Popular Spots</Text>
        </View>

        {/* Vertical Cafe List */}
        <View className="px-5 gap-5">
          {MOCK_CAFES.map((cafe) => (
            <Card key={cafe.id} variant="glass" className="flex-row overflow-hidden h-36" onPress={() => router.push(`/cafe/${cafe.id}`)}>
              <View className="p-3">
                <Image source={{ uri: cafe.image }} className="w-28 h-full rounded-2xl" resizeMode="cover" />
              </View>
              <View className="flex-1 py-4 pr-5 pl-1 justify-between">
                <View>
                  <View className="flex-row justify-between items-start mb-1">
                    <Text className="text-lg font-bold text-slate-800 flex-1 mr-2" numberOfLines={1}>{cafe.name}</Text>
                    <View className="bg-green-50 px-2 py-1 rounded-lg flex-row items-center gap-1 border border-green-100">
                      <Text className="text-[10px] font-bold text-green-700">{cafe.rating}</Text>
                      <Star size={8} fill="#15803d" color="#15803d" />
                    </View>
                  </View>
                  <View className="flex-row items-center gap-1">
                    <MapPin size={12} color="#94A3B8" />
                    <Text className="text-xs text-gray-400 font-medium">{cafe.address}</Text>
                  </View>
                  <Text className="text-xs text-gray-400 font-medium ml-4 mt-0.5">• {cafe.distance}</Text>
                </View>
                {cafe.loyaltyProgram && (
                  <View className="flex-row items-center gap-2 bg-blue-50/50 p-2.5 rounded-xl border border-blue-50">
                    <Badge variant="zesti" className="px-1.5 py-0.5 h-5 bg-blue-100 shadow-none">
                      <Text className="text-[9px] text-blue-600 font-bold">LOYALTY</Text>
                    </Badge>
                    <Text className="text-[10px] text-slate-600 font-medium flex-1" numberOfLines={1}>
                      {cafe.loyaltyProgram.reward} after {cafe.loyaltyProgram.target} visits
                    </Text>
                  </View>
                )}
              </View>
            </Card>
          ))}
        </View>

      </ScrollView>

      {/* Floating Map Toggle */}
      <View className="absolute bottom-8 self-center">
        <Button variant="liquid" className="rounded-full px-8 h-[60px] flex-row gap-3 w-48" onPress={() => router.push("/map")}>
          <MapPin size={22} color="white" fill="white" fillOpacity={0.2} />
          <Text className="text-white font-bold tracking-wide text-base">Map View</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

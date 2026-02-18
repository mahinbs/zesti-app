import { Stack, useRouter } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { HomeHeader } from "../../src/components/home/HomeHeader";
import { HomeTabs } from "../../src/components/home/HomeTabs";
import { CafeCard } from "../../src/components/ui/CafeCard";
import { Cafe, MOCK_CAFES } from "../../src/data/mockData";

export default function HomeScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("All");

  // Filter Logic
  const followedCafes = MOCK_CAFES.filter(c => c.followed);
  const nearbyCafes = MOCK_CAFES; // Assuming all are nearby for now, or sort by distance
  const dealCafes = MOCK_CAFES.filter(c => c.loyaltyProgram); // Cafes with loyalty programs as "Deals"

  const handleSeeMore = (tabName: string) => {
    setActiveTab(tabName);
  };

  const renderSectionHeader = (title: string, onSeeMore: () => void) => (
    <View className="flex-row justify-between items-center mb-4 px-4">
      <Text className="text-xl font-bold text-slate-800">{title}</Text>
      <TouchableOpacity onPress={onSeeMore} className="flex-row items-center gap-1">
        <Text className="text-blue-500 font-bold text-sm">See More</Text>
        <ArrowRight size={16} color="#3B82F6" />
      </TouchableOpacity>
    </View>
  );

  const renderCafeList = (cafes: Cafe[]) => (
    <View className="px-4 gap-4 pb-20">
      {cafes.map(cafe => (
        <CafeCard key={cafe.id} cafe={cafe} />
      ))}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50/50">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <HomeHeader />

      {/* Tabs */}
      <HomeTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <ScrollView className="flex-1 mt-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {activeTab === "All" && (
          <>
            {/* Following Section (Preview) */}
            <View className="mb-8">
              {renderSectionHeader("Following", () => handleSeeMore("Following"))}
              <View className="px-4 gap-4">
                {followedCafes.slice(0, 3).map(cafe => (
                  <CafeCard key={cafe.id} cafe={cafe} />
                ))}
              </View>
            </View>

            {/* Nearby Section (Preview) */}
            <View className="mb-8">
              {renderSectionHeader("Nearby", () => console.log("Navigate to Nearby list"))}
              <View className="px-4 gap-4">
                {nearbyCafes.slice(0, 3).map(cafe => (
                  <CafeCard key={cafe.id} cafe={cafe} />
                ))}
              </View>
            </View>
          </>
        )}

        {activeTab === "Following" && (
          <View className="mt-2">
            <Text className="text-xl font-bold text-slate-800 px-4 mb-4">Your Followed Cafes</Text>
            {renderCafeList(followedCafes)}
          </View>
        )}

        {activeTab === "Deals" && (
          <View className="mt-2">
            <Text className="text-xl font-bold text-slate-800 px-4 mb-4">Latest Deals</Text>
            {renderCafeList(dealCafes)}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

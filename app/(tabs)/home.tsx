import { Stack, useRouter } from "expo-router";
import { ArrowRight, ChevronRight, Clock, Heart, MapPin, MessageCircle, MessageSquare, Plus, Search, Share2, Star, Utensils } from "lucide-react-native";
import React from "react";
import { Dimensions, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Badge } from "../../src/components/ui/Badge";
import { Button } from "../../src/components/ui/Button";
import { Card, CardContent } from "../../src/components/ui/Card";
import { FRIENDS_ACTIVITIES, MOCK_CAFES, MOCK_STORIES, TRENDING_ITEMS } from "../../src/data/mockData";

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
        <View className="flex-row items-center gap-3">
          <TouchableOpacity className="p-2 bg-white rounded-full shadow-sm border border-gray-100">
            <MessageCircle size={22} color="#1E293B" />
            <View className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/(tabs)/rewards" as any)} className="shadow-lg shadow-orange-500/20 active:scale-95 transition-transform">
            <Badge variant="zesti" className="flex-row items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-50/90 to-orange-50/90 border border-orange-100/50 backdrop-blur-md">
              <Star size={14} color="#F59E0B" fill="#F59E0B" />
              <Text className="font-bold text-orange-700 text-xs">1,250</Text>
            </Badge>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 110 }} showsVerticalScrollIndicator={false}>

        {/* Stories / Happening Now Section */}
        <View className="mt-6">
          <View className="px-5 mb-3 flex-row justify-between items-center">
            <Text className="text-lg font-bold text-slate-800 tracking-tight">Happening Now</Text>
            <TouchableOpacity>
              <Text className="text-blue-500 font-bold text-xs">View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-5" contentContainerStyle={{ gap: 16, paddingRight: 40 }}>
            {/* My Story Add */}
            <View className="items-center gap-1">
              <View className="relative">
                <Image source={{ uri: "https://i.pravatar.cc/150?u=u1" }} className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300" />
                <View className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 border-2 border-white">
                  <Plus size={12} color="white" />
                </View>
              </View>
              <Text className="text-xs font-medium text-gray-500">My Story</Text>
            </View>

            {/* Friend Stories */}
            {MOCK_STORIES.map((story) => (
              <TouchableOpacity key={story.id} className="items-center gap-1">
                <View className="relative p-[2px] rounded-full border-2 border-blue-500">
                  <Image source={{ uri: story.user.avatar }} className="w-16 h-16 rounded-full border-2 border-white" />
                  {story.cafeName && (
                    <View className="absolute -bottom-1 -right-1 bg-white px-1.5 py-0.5 rounded-full border border-gray-100 shadow-sm max-w-[60px]">
                      <Text className="text-[8px] font-bold text-slate-700 truncate" numberOfLines={1}>📍{story.cafeName}</Text>
                    </View>
                  )}
                </View>
                <Text className="text-xs font-medium text-slate-700">{story.user.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Social Feed Section */}
        <View className="px-5 mt-8">
          <Text className="text-lg font-bold text-slate-800 tracking-tight mb-4">Friends Activity</Text>
          <View className="gap-6">
            {FRIENDS_ACTIVITIES.map((activity) => (
              <View key={activity.id} className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
                {/* Feed Header */}
                <View className="flex-row items-start gap-3 mb-3">
                  <Image source={{ uri: activity.user.avatar }} className="w-10 h-10 rounded-full" />
                  <View className="flex-1">
                    <View className="flex-row flex-wrap items-center gap-1">
                      <Text className="font-bold text-slate-800">{activity.user.name}</Text>
                      <Text className="text-gray-500 text-sm">
                        {activity.type === 'ordered' ? 'ordered' : activity.type === 'visited' ? 'checked in at' : 'reviewed'}
                      </Text>
                      <Text className="font-bold text-slate-800">{activity.cafe.name}</Text>
                    </View>
                    <Text className="text-xs text-gray-400 mt-0.5">{activity.timestamp}</Text>
                  </View>
                </View>

                {/* Feed Content */}
                <View className="rounded-2xl overflow-hidden bg-gray-50 mb-3 border border-gray-100">
                  {activity.image && (
                    <View>
                      <Image source={{ uri: activity.image }} className="w-full h-48" resizeMode="cover" />
                      {activity.type === 'ordered' && activity.foodItem && (
                        <View className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl flex-row items-center gap-2 shadow-sm">
                          <View className="bg-orange-100 p-1 rounded-full">
                            <Utensils size={12} color="#F97316" />
                          </View>
                          <View>
                            <Text className="text-xs font-bold text-slate-800">{activity.foodItem.name}</Text>
                            <Text className="text-[10px] text-gray-500">Recommended</Text>
                          </View>
                        </View>
                      )}
                    </View>
                  )}
                </View>

                {/* Feed Actions */}
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-4">
                    <TouchableOpacity className="flex-row items-center gap-1.5">
                      <Heart size={20} color={activity.id === 'a2' ? '#EF4444' : '#64748B'} fill={activity.id === 'a2' ? '#EF4444' : 'none'} />
                      <Text className="text-xs font-semibold text-slate-600">{activity.likes}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center gap-1.5">
                      <MessageSquare size={20} color="#64748B" />
                      <Text className="text-xs font-semibold text-slate-600">{activity.comments}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Share2 size={20} color="#64748B" />
                    </TouchableOpacity>
                  </View>
                  <Button
                    className="h-8 px-4 rounded-full bg-slate-900"
                    onPress={() => router.push(`/cafe/${activity.cafe.id}`)}
                  >
                    <Text className="text-white text-xs font-bold">View Cafe</Text>
                  </Button>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Cafes You Follow */}
        <View className="mt-10">
          <View className="px-5 mb-4 flex-row justify-between items-center">
            <View className="flex-row items-center gap-2">
              <Heart size={18} color="#E11D48" fill="#E11D48" />
              <Text className="text-lg font-bold text-slate-800 tracking-tight">Cafes You Follow</Text>
            </View>
            <TouchableOpacity>
              <ArrowRight size={20} color="#64748B" />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-5" contentContainerStyle={{ gap: 16, paddingRight: 40 }}>
            {MOCK_CAFES.filter(c => c.followed).map((cafe) => (
              <TouchableOpacity key={cafe.id} onPress={() => router.push(`/cafe/${cafe.id}`)} className="items-center gap-2">
                <View className="relative">
                  <Image source={{ uri: cafe.image }} className="w-16 h-16 rounded-full border border-gray-200" />
                  <View className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white" />
                </View>
                <Text className="text-xs font-bold text-slate-700 w-16 text-center" numberOfLines={1}>{cafe.name}</Text>
                <View className="bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                  <Text className="text-[9px] font-bold text-red-500">2 New</Text>
                </View>
              </TouchableOpacity>
            ))}
            <TouchableOpacity className="items-center gap-2 justify-center w-16">
              <View className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 items-center justify-center bg-gray-50">
                <Plus size={24} color="#94A3B8" />
              </View>
              <Text className="text-xs font-medium text-gray-400 text-center">Follow More</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Search Bar (Moved down) */}
        <View className="px-5 mt-10">
          <View className="flex-row items-center bg-white rounded-2xl px-4 py-3.5 border border-gray-200 shadow-sm">
            <Search size={22} color="#94A3B8" />
            <TextInput
              placeholder="Search food, cafes, friends..."
              placeholderTextColor="#94A3B8"
              className="flex-1 ml-3 text-slate-800 font-medium text-base"
            />
          </View>
        </View>

        {/* Section: Trending Near You (Keep existing) */}
        <View className="px-5 mt-8 flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold text-slate-800 tracking-tight">Trending Near You</Text>
          <TouchableOpacity className="flex-row items-center gap-1">
            <Text className="text-blue-500 font-bold text-xs uppercase tracking-wide">View All</Text>
            <ArrowRight size={14} color="#3B82F6" />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-5" contentContainerStyle={{ gap: 20, paddingRight: 40 }}>
          {TRENDING_ITEMS.map((item, index) => (
            <Card key={index} variant="liquid" className="w-[280px]" onPress={() => router.push(`/cafe/${item.cafeId}`)}>
              <View className="h-48 w-full relative p-2">
                <Image source={{ uri: item.image }} className="w-full h-full rounded-[20px]" resizeMode="cover" />
                <View className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-2.5 py-1.5 rounded-xl flex-row items-center gap-1.5 shadow-sm border border-white/40">
                  <Star size={12} color="#F59E0B" fill="#F59E0B" />
                  <Text className="text-xs font-bold text-slate-800">{item.rating}</Text>
                  <Text className="text-[10px] text-gray-500">({item.reviews})</Text>
                </View>
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

        {/* Floating Map Toggle */}
        <View className="absolute bottom-8 self-center">
          <Button variant="liquid" className="rounded-full px-8 h-[60px] flex-row gap-3 w-48" onPress={() => router.push("/(tabs)/map" as any)}>
            <MapPin size={22} color="white" fill="white" fillOpacity={0.2} />
            <Text className="text-white font-bold tracking-wide text-base">Map View</Text>
          </Button>
        </View>

      </ScrollView>

    </SafeAreaView>
  );
}

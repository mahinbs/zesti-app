import { COLORS } from '@/src/constants/colors';
import { Cafe } from '@/src/data/mockData';
import { cn } from '@/src/lib/utils';
import { useRouter } from 'expo-router';
import { MapPin, Star, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface CafeCardProps {
    cafe: Cafe;
}

export function CafeCard({ cafe }: CafeCardProps) {
    const router = useRouter();
    const [isFollowing, setIsFollowing] = useState(cafe.followed);

    const isOpen = true;

    const handlePress = () => {
        router.push(`/cafe/${cafe.id}` as any);
    };

    const toggleFollow = () => {
        setIsFollowing(!isFollowing);
    };

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={handlePress}
            className="bg-white rounded-[20px] overflow-hidden shadow-sm border border-gray-100"
        >
            {/* Image Section — shorter height */}
            <View style={{ height: 150 }} className="relative">
                <Image
                    source={{ uri: cafe.image }}
                    className="w-full h-full"
                    resizeMode="cover"
                />
                <View className="absolute top-2.5 left-2.5 bg-white/90 px-2.5 py-0.5 rounded-full">
                    <Text className={cn("text-xs font-bold uppercase", isOpen ? "text-green-600" : "text-red-500")}>
                        {isOpen ? "Open" : "Closed"}
                    </Text>
                </View>
                <View className="absolute top-2.5 right-2.5 bg-black/40 px-2.5 py-0.5 rounded-full flex-row items-center gap-1">
                    <Star size={11} fill="#F59E0B" color="#F59E0B" />
                    <Text className="text-white text-xs font-bold">{cafe.rating}</Text>
                </View>
            </View>

            {/* Content Section */}
            <View className="px-3 py-2.5">
                <View className="flex-row justify-between items-center">
                    <View className="flex-1 mr-2">
                        <Text className="text-base font-bold text-slate-900 leading-tight" numberOfLines={1}>{cafe.name}</Text>
                        <View className="flex-row items-center gap-1 mt-0.5">
                            <MapPin size={12} color={COLORS.text.secondary} />
                            <Text className="text-slate-500 text-xs font-medium" numberOfLines={1}>{cafe.distance} • {cafe.address}</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={(e) => {
                            e.stopPropagation();
                            toggleFollow();
                        }}
                        className={cn(
                            "px-3 py-1 rounded-full border",
                            isFollowing
                                ? "bg-white border-gray-200"
                                : "bg-slate-900 border-slate-900"
                        )}
                    >
                        <Text className={cn(
                            "text-xs font-bold",
                            isFollowing ? "text-slate-700" : "text-white"
                        )}>
                            {isFollowing ? "Following" : "Follow"}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Followers row */}
                <View className="flex-row items-center gap-1 mt-2">
                    <User size={12} color={COLORS.text.secondary} />
                    <Text className="text-slate-400 text-xs">{cafe.followers} Followers</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

import { COLORS } from '@/src/constants/colors';
import { Cafe } from '@/src/data/mockData';
import { cn } from '@/src/lib/utils';
import { useRouter } from 'expo-router';
import { MapPin } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface CafeCardProps {
    cafe: Cafe;
}

export function CafeCard({ cafe }: CafeCardProps) {
    const router = useRouter();
    const [isFollowing, setIsFollowing] = useState(cafe.followed);

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
            className="bg-white rounded-[24px] p-4 flex-row items-center shadow-sm border border-gray-100 mb-4"
        >
            {/* Left: Image */}
            <View className="relative mr-4 bg-red-100 rounded-full">
                <Image
                    source={{ uri: cafe.image }}
                    className="w-[80px] h-[80px] rounded-full"
                    resizeMode="cover"
                />
                {/* Optional: Add a badge if needed, but design shows clean image */}
            </View>

            {/* Right: Content */}
            <View className="flex-1">
                {/* Header: Name + Offer */}
                <View className="flex-row justify-between items-start">
                    <Text className="text-[17px] font-bold text-slate-900 flex-1 mr-2 leading-[22px]" numberOfLines={1}>
                        {cafe.name}
                    </Text>
                    {cafe.offer && (
                        <Text className="text-[#10B981] text-[13px] font-bold text-right">
                            {cafe.offer}
                        </Text>
                    )}
                </View>

                {/* Subheader: Distance + Status */}
                <View className="flex-row items-center mt-1">
                    <MapPin size={12} color={COLORS.text.secondary} />
                    <Text className="text-slate-500 text-[13px] ml-1">
                        {cafe.distance} • <Text className={cn(cafe.isOpen ? "text-green-600" : "text-slate-500")}>
                            {cafe.isOpen ? "Open" : "closed"}
                        </Text>
                    </Text>
                </View>

                {/* Tagline */}
                {cafe.tagline && (
                    <Text className="text-slate-600 text-[13px] mt-1" numberOfLines={1}>
                        {cafe.tagline}
                    </Text>
                )}

                {/* Footer: Followers + Button */}
                <View className="flex-row justify-between items-center mt-3">
                    {/* Followers */}
                    <View className="flex-row items-center">
                        <View className="flex-row items-center mr-2">
                            {cafe.followerImages?.slice(0, 3).map((img, index) => (
                                <Image
                                    key={index}
                                    source={{ uri: img }}
                                    className="w-5 h-5 rounded-full border border-white"
                                    style={{ marginLeft: index > 0 ? -8 : 0 }}
                                />
                            ))}
                        </View>
                        <Text className="text-slate-500 text-[11px] font-medium">
                            {cafe.followers.toLocaleString()} Followers
                        </Text>
                    </View>

                    {/* Follow Button */}
                    <TouchableOpacity
                        onPress={(e) => {
                            e.stopPropagation();
                            toggleFollow();
                        }}
                        className={cn(
                            "px-4 py-1.5 rounded-full transition-all",
                            isFollowing
                                ? "bg-gray-100"
                                : "bg-[#1da1f2]" // Using a generic blue or brand color. Design had blue button.
                        )}
                        style={{ backgroundColor: isFollowing ? '#F3F4F6' : '#1D9BF0' }}
                    >
                        <Text className={cn(
                            "text-[13px] font-bold",
                            isFollowing ? "text-slate-600" : "text-white"
                        )}>
                            {isFollowing ? "Following" : "Follow"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
}

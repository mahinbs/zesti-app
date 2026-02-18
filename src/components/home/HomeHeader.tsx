import { COLORS } from '@/src/constants/colors';
import { Inbox, Search, User } from 'lucide-react-native';
import React from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';

export function HomeHeader() {
    return (
        <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
            {/* Logo */}
            <TouchableOpacity>
                <Image
                    source={require('../../../assets/app-logo/zesti-app-logo.png')}
                    style={{ width: 40, height: 40, borderRadius: 8 }}
                    resizeMode="contain"
                />
            </TouchableOpacity>

            {/* Search Bar */}
            <View className="flex-1 mx-3 flex-row items-center bg-gray-100 rounded-full px-3 py-2 border border-gray-200">
                <Search size={18} color={COLORS.text.secondary} />
                <TextInput
                    placeholder="Search cafes, food..."
                    placeholderTextColor={COLORS.text.secondary}
                    className="flex-1 ml-2 text-sm text-slate-800"
                />
            </View>

            {/* Icons */}
            <View className="flex-row items-center gap-3">
                <TouchableOpacity className="p-1">
                    <Inbox size={24} color={COLORS.text.primary} />
                </TouchableOpacity>
                <TouchableOpacity className="p-1 bg-gray-100 rounded-full profile-icon">
                    <User size={20} color={COLORS.text.primary} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

import { Tabs } from "expo-router";
import { Chrome as Home, Map as MapIcon } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    borderTopWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0.1,
                    shadowRadius: 10,
                    shadowColor: '#000',
                    height: 80,
                    paddingBottom: 20,
                    paddingTop: 10,
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    right: 20,
                    borderRadius: 30,
                },
                tabBarActiveTintColor: '#0EA5E9',
                tabBarInactiveTintColor: '#94A3B8',
                tabBarShowLabel: false,
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View className={`items-center justify-center ${focused ? 'bg-blue-50 p-3 rounded-full' : ''}`}>
                            <Home size={24} color={color} strokeWidth={focused ? 3 : 2} />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="map"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View className={`items-center justify-center ${focused ? 'bg-blue-50 p-3 rounded-full' : ''}`}>
                            <MapIcon size={24} color={color} strokeWidth={focused ? 3 : 2} />
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}

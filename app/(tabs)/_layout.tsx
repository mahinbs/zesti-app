import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
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
                    height: 60,
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
                            <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="map"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View className={`items-center justify-center ${focused ? 'bg-blue-50 p-3 rounded-full' : ''}`}>
                            <Ionicons name={focused ? "map" : "map-outline"} size={24} color={color} />
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}

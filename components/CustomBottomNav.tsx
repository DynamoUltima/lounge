import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import CreateListingModal from './CreateListingModal';

interface CustomBottomNavProps {
    activeTab: 'home' | 'explore' | 'chats' | 'profile';
}

export default function CustomBottomNav({ activeTab }: CustomBottomNavProps) {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCreateListingOpen, setIsCreateListingOpen] = useState(false);

    // Rotation animation for the center button
    const iconAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: withTiming(isMenuOpen ? '45deg' : '0deg', { duration: 300 }) }],
        };
    });

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <BlurView intensity={80} tint="light" className="absolute bottom-0 w-full border-t border-slate-200 z-40" style={{ paddingBottom: 30 }}>
                <View className="flex-row justify-between items-center px-6 py-4">
                    <TouchableOpacity
                        className="items-center gap-1"
                        onPress={() => router.replace('/(tabs)')}
                    >
                        {activeTab === 'home' ? (
                            <Ionicons name="home" size={24} color="#0f172a" />
                        ) : (
                            <Ionicons name="home-outline" size={24} color="#94a3b8" />
                        )}

                        <Text className={`text-[10px] font-medium ${activeTab === 'home' ? 'text-slate-900 font-semibold' : 'text-slate-400'}`}>Home</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="items-center gap-1"
                        onPress={() => router.replace('/(tabs)/explore')}
                    >
                        {activeTab === 'explore' ? (
                            <Ionicons name="compass" size={24} color="#0f172a" />
                        ) : (
                            <Ionicons name="compass-outline" size={24} color="#94a3b8" />
                        )}
                        <Text className={`text-[10px] font-medium ${activeTab === 'explore' ? 'text-slate-900 font-semibold' : 'text-slate-400'}`}>Explore</Text>
                    </TouchableOpacity>

                    {/* Floating Action Button (Base layer - only active if modal is closed) */}
                    <View className="relative -mt-10 z-50">
                        {isMenuOpen && (
                            <View className="absolute inset-0 rounded-full blur-md" style={{ backgroundColor: 'rgba(99,102,241,0.4)' }} />
                        )}
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={toggleMenu}
                            className={`relative w-14 h-14 rounded-full flex items-center justify-center border-[4px] border-white transition-transform ${isMenuOpen ? 'bg-slate-900' : 'bg-indigo-600'}`}
                            style={{ shadowColor: '#0f172a', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 15, elevation: 10 }}
                        >
                            <Animated.View style={iconAnimatedStyle}>
                                <Ionicons name="add" size={28} color="white" />
                            </Animated.View>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        className="items-center gap-1"
                        onPress={() => router.replace('/(tabs)/chats')}
                    >
                        {activeTab === 'chats' ? (
                            <Ionicons name="chatbubble-ellipses" size={24} color="#0f172a" />
                        ) : (
                            <Ionicons name="chatbubble-ellipses-outline" size={24} color="#94a3b8" />
                        )}
                        <Text className={`text-[10px] font-medium ${activeTab === 'chats' ? 'text-slate-900 font-semibold' : 'text-slate-400'}`}>Chats</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="items-center gap-1"
                        onPress={() => router.replace('/(tabs)/profile')}
                    >
                        {activeTab === 'profile' ? (
                            <Ionicons name="person" size={24} color="#0f172a" />
                        ) : (
                            <Ionicons name="person-outline" size={24} color="#94a3b8" />
                        )}
                        <Text className={`text-[10px] font-medium ${activeTab === 'profile' ? 'text-slate-900 font-semibold' : 'text-slate-400'}`}>Profile</Text>
                        {activeTab === 'profile' && <View className="absolute -bottom-2 w-1 h-1 bg-slate-900 rounded-full" />}
                    </TouchableOpacity>
                </View>
            </BlurView>

            {/* Action Menu Modal */}
            {isMenuOpen && (
                <View style={[StyleSheet.absoluteFill, { zIndex: 100, elevation: 100 }]}>
                    <View className="flex-1 justify-end relative">

                        {/* Dim Overlay */}
                        <Animated.View entering={FadeIn.duration(200)} className="absolute inset-0">
                            <Pressable className="flex-1" onPress={toggleMenu}>
                                <BlurView intensity={60} tint="light" style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.4)' }} />
                            </Pressable>
                        </Animated.View>

                        {/* Pop-up Menu Card */}
                        <Animated.View
                            entering={FadeIn.duration(200)}
                            className="absolute bottom-[95px] left-6 right-6 border rounded-3xl p-2 flex flex-col gap-1 z-50 overflow-hidden"
                            style={{ backgroundColor: 'rgba(255,255,255,0.95)', borderColor: 'rgba(255,255,255,0.5)', shadowColor: '#0f172a', shadowOffset: { width: 0, height: 25 }, shadowOpacity: 0.1, shadowRadius: 50, elevation: 20 }}
                        >
                            <BlurView intensity={40} tint="light" className="absolute inset-0" />

                            {/* Menu Item 1: Create Listing */}
                            <TouchableOpacity
                                onPress={() => {
                                    setIsMenuOpen(false);
                                    setIsCreateListingOpen(true);
                                }}
                                className="flex-row items-center gap-4 p-3.5 rounded-2xl border border-transparent"
                            >
                                <View className="w-11 h-11 rounded-full bg-indigo-50 items-center justify-center">
                                    <Ionicons name="home-outline" size={22} color="#4f46e5" />
                                </View>
                                <View className="flex-1">
                                    <Text className="block text-sm font-semibold text-slate-900 tracking-tight">Create Listing</Text>
                                    <Text className="block text-[11px] text-slate-500 font-medium mt-0.5">Add a property for sale or rent</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={18} color="#cbd5e1" />
                            </TouchableOpacity>

                            {/* Menu Item 2: Schedule Visit */}
                            <TouchableOpacity className="flex-row items-center gap-4 p-3.5 rounded-2xl border border-transparent" activeOpacity={0.7}>
                                <View className="w-11 h-11 rounded-full bg-emerald-50 items-center justify-center">
                                    <Ionicons name="calendar-outline" size={22} color="#10b981" />
                                </View>
                                <View className="flex-1">
                                    <Text className="block text-sm font-semibold text-slate-900 tracking-tight">Schedule Visit</Text>
                                    <Text className="block text-[11px] text-slate-500 font-medium mt-0.5">Book a photographer or agent</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={18} color="#cbd5e1" />
                            </TouchableOpacity>

                            {/* Menu Item 3: Go Live */}
                            <TouchableOpacity className="flex-row items-center gap-4 p-3.5 rounded-2xl border border-transparent" activeOpacity={0.7}>
                                <View className="w-11 h-11 rounded-full bg-rose-50 items-center justify-center">
                                    <Ionicons name="videocam-outline" size={22} color="#f43f5e" />
                                </View>
                                <View className="flex-1">
                                    <Text className="block text-sm font-semibold text-slate-900 tracking-tight">Go Live</Text>
                                    <Text className="block text-[11px] text-slate-500 font-medium mt-0.5">Start a virtual open house tour</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={18} color="#cbd5e1" />
                            </TouchableOpacity>
                        </Animated.View>

                        {/* Exact overlay of the tab-bar for dismissing without closing the modal unnaturally */}
                        <View className="absolute bottom-0 w-full border-t border-transparent z-40 pointer-events-none" style={{ paddingBottom: 30 }}>
                            <View className="flex-row justify-between items-center px-6 py-4">
                                <View className="flex-1" />
                                <View className="relative -mt-10 z-50 pointer-events-auto">
                                    <View className="absolute inset-0 rounded-full blur-md" style={{ backgroundColor: 'rgba(99,102,241,0.4)' }} />
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        onPress={toggleMenu}
                                        className="relative w-14 h-14 rounded-full bg-slate-900 flex items-center justify-center border-[4px] border-white"
                                        style={{ shadowColor: '#0f172a', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 15, elevation: 10 }}
                                    >
                                        <Animated.View style={iconAnimatedStyle}>
                                            <Ionicons name="add" size={28} color="white" />
                                        </Animated.View>
                                    </TouchableOpacity>
                                </View>
                                <View className="flex-1" />
                            </View>
                        </View>

                    </View>
                </View>
            )}

            <CreateListingModal
                visible={isCreateListingOpen}
                onClose={() => setIsCreateListingOpen(false)}
            />
        </>
    );
}

import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomBottomNav from '../../components/CustomBottomNav';

export default function ProfileScreen() {
    const router = useRouter();
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

    return (
        <View className="flex-1 bg-white">
            <SafeAreaView className="flex-1" edges={['top', 'left', 'right']}>
                {/* Header */}
                <View className="px-6 pt-6 pb-4 bg-white/80 flex-row items-center justify-between z-20 border-b border-slate-50">
                    <Text className="text-xl font-semibold tracking-tight text-slate-900">Profile</Text>
                    <TouchableOpacity className="w-8 h-8 items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100" onPress={() => router.push('/settings')}>
                        <Ionicons name="settings-outline" size={20} color="#475569" />
                    </TouchableOpacity>
                </View>

                <ScrollView className="flex-1 bg-slate-50/50" contentContainerStyle={{ paddingBottom: 100 }}>
                    {/* Profile Info */}
                    <View className="px-6 py-6 bg-white border-b border-slate-100">
                        <View className="flex-row items-center gap-4">
                            <View className="relative">
                                <View className="w-20 h-20 rounded-full p-1 border border-slate-100 bg-white">
                                    <Image
                                        source={{ uri: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }}
                                        style={{ width: '100%', height: '100%', borderRadius: 40 }}
                                        contentFit="cover"
                                    />
                                </View>
                                <View className="absolute bottom-0 right-0 w-6 h-6 bg-indigo-600 border-2 border-white rounded-full items-center justify-center">
                                    <Ionicons name="pencil-outline" size={10} color="white" />
                                </View>
                            </View>
                            <View className="flex-1">
                                <Text className="text-lg font-semibold text-slate-900 tracking-tight">Alex Morgan</Text>
                                <Text className="text-xs text-slate-500 font-medium mb-3">alex.morgan@example.com</Text>
                                <TouchableOpacity className="bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full self-start">
                                    <Text className="text-xs font-semibold text-slate-700">Edit Profile</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Stats Grid */}
                        <View className="flex-row gap-4 mt-8">
                            <View className="flex-1 items-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                <Text className="text-lg font-semibold text-slate-900 tracking-tight">12</Text>
                                <Text className="text-[10px] uppercase tracking-wider text-slate-400 font-medium mt-1">Saved</Text>
                            </View>
                            <View className="flex-1 items-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                <Text className="text-lg font-semibold text-slate-900 tracking-tight">5</Text>
                                <Text className="text-[10px] uppercase tracking-wider text-slate-400 font-medium mt-1">Tours</Text>
                            </View>
                            <View className="flex-1 items-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                <Text className="text-lg font-semibold text-slate-900 tracking-tight">2</Text>
                                <Text className="text-[10px] uppercase tracking-wider text-slate-400 font-medium mt-1">Offers</Text>
                            </View>
                        </View>
                    </View>

                    {/* Marketing Banner */}
                    <View className="px-6 py-6">
                        <View className="relative overflow-hidden bg-slate-900 rounded-3xl p-5 shadow-lg shadow-slate-900/10">
                            {/* Gradient/Blur Effect */}
                            <View className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full opacity-20 -mr-10 -mt-10 blur-3xl" />

                            <View className="relative z-10 flex-row justify-between items-center">
                                <View>
                                    <Text className="text-white font-semibold text-sm tracking-tight mb-1">Go Premium</Text>
                                    <Text className="text-slate-400 text-xs font-medium">Get priority access & analytics.</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => router.push('/premium')}
                                    className="bg-white px-4 py-2 rounded-xl active:scale-95"
                                >
                                    <Text className="text-slate-900 text-xs font-bold tracking-tight">Upgrade</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Menu Groups */}
                    <View className="px-6 pb-6 gap-6">
                        {/* Group 1: My Estate */}
                        <View>
                            <Text className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 pl-1">My Estate</Text>
                            <View className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                                <TouchableOpacity className="w-full flex-row items-center justify-between p-4 border-b border-slate-50 active:bg-slate-50">
                                    <View className="flex-row items-center gap-3">
                                        <View className="w-8 h-8 rounded-full bg-indigo-50 items-center justify-center">
                                            <Ionicons name="home-outline" size={16} color="#4f46e5" />
                                        </View>
                                        <Text className="text-sm font-medium text-slate-700">My Listings</Text>
                                    </View>
                                    <Ionicons name="chevron-forward" size={18} color="#cbd5e1" />
                                </TouchableOpacity>

                                <TouchableOpacity className="w-full flex-row items-center justify-between p-4 border-b border-slate-50 active:bg-slate-50">
                                    <View className="flex-row items-center gap-3">
                                        <View className="w-8 h-8 rounded-full bg-pink-50 items-center justify-center">
                                            <Ionicons name="heart-outline" size={16} color="#ec4899" />
                                        </View>
                                        <Text className="text-sm font-medium text-slate-700">Favorites</Text>
                                    </View>
                                    <View className="flex-row items-center gap-2">
                                        <View className="bg-slate-50 px-2 py-0.5 rounded-md">
                                            <Text className="text-xs font-semibold text-slate-400">12</Text>
                                        </View>
                                        <Ionicons name="chevron-forward" size={18} color="#cbd5e1" />
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity className="w-full flex-row items-center justify-between p-4 active:bg-slate-50">
                                    <View className="flex-row items-center gap-3">
                                        <View className="w-8 h-8 rounded-full bg-orange-50 items-center justify-center">
                                            <Ionicons name="time-outline" size={16} color="#f97316" />
                                        </View>
                                        <Text className="text-sm font-medium text-slate-700">Recently Viewed</Text>
                                    </View>
                                    <Ionicons name="chevron-forward" size={18} color="#cbd5e1" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Group 2: Preferences */}
                        <View>
                            <Text className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 pl-1">Preferences</Text>
                            <View className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                                <TouchableOpacity className="w-full flex-row items-center justify-between p-4 border-b border-slate-50 active:bg-slate-50">
                                    <View className="flex-row items-center gap-3">
                                        <View className="w-8 h-8 rounded-full bg-slate-50 items-center justify-center">
                                            <Ionicons name="notifications-outline" size={16} color="#475569" />
                                        </View>
                                        <Text className="text-sm font-medium text-slate-700">Notifications</Text>
                                    </View>
                                    <View className="w-9 h-5 bg-indigo-600 rounded-full relative justify-center">
                                        <View className="absolute right-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity className="w-full flex-row items-center justify-between p-4 border-b border-slate-50 active:bg-slate-50">
                                    <View className="flex-row items-center gap-3">
                                        <View className="w-8 h-8 rounded-full bg-slate-50 items-center justify-center">
                                            <Ionicons name="shield-checkmark-outline" size={16} color="#475569" />
                                        </View>
                                        <Text className="text-sm font-medium text-slate-700">Security</Text>
                                    </View>
                                    <Ionicons name="chevron-forward" size={18} color="#cbd5e1" />
                                </TouchableOpacity>

                                <TouchableOpacity className="w-full flex-row items-center justify-between p-4 active:bg-slate-50">
                                    <View className="flex-row items-center gap-3">
                                        <View className="w-8 h-8 rounded-full bg-slate-50 items-center justify-center">
                                            <Ionicons name="card-outline" size={16} color="#475569" />
                                        </View>
                                        <Text className="text-sm font-medium text-slate-700">Payments</Text>
                                    </View>
                                    <Ionicons name="chevron-forward" size={18} color="#cbd5e1" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Logout Button */}
                        <TouchableOpacity
                            className="w-full py-4 bg-red-50/50 border border-red-100 rounded-2xl items-center active:bg-red-50 mb-2"
                            onPress={() => setIsLogoutModalVisible(true)}
                        >
                            <Text className="text-sm font-medium text-red-500">Log Out</Text>
                        </TouchableOpacity>

                        <View className="items-center pb-4">
                            <Text className="text-[10px] text-slate-400 font-medium">Version 2.4.0</Text>
                        </View>
                    </View>
                </ScrollView>

                <CustomBottomNav activeTab="profile" />

                {/* Bottom Fade */}
                <LinearGradient
                    colors={['transparent', 'rgba(255,255,255,0.8)', 'white']}
                    className="absolute bottom-[80px] left-0 w-full h-8 pointer-events-none z-10"
                />
            </SafeAreaView>

            {/* Logout Confirmation Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isLogoutModalVisible}
                onRequestClose={() => setIsLogoutModalVisible(false)}
            >
                <View className="flex-1 justify-end">
                    {/* Backdrop */}
                    <Pressable
                        className="absolute inset-0"
                        onPress={() => setIsLogoutModalVisible(false)}
                    >
                        <BlurView intensity={20} tint="dark" style={{ flex: 1 }} className="bg-slate-900/20" />
                    </Pressable>

                    {/* Modal Content */}
                    <View className="w-full bg-white rounded-t-[36px] p-6 shadow-2xl">
                        {/* Grab Handle */}
                        <View className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8" />

                        <View className="items-center text-center">
                            {/* Icon */}
                            <View className="w-16 h-16 bg-red-50 rounded-full items-center justify-center mb-6 border border-red-100">
                                <Ionicons name="log-out-outline" size={32} color="#ef4444" />
                            </View>

                            {/* Text Content */}
                            <Text className="text-xl font-semibold text-slate-900 tracking-tight mb-2">Log out?</Text>
                            <Text className="text-sm text-slate-500 font-medium text-center leading-relaxed max-w-[260px] mb-8">
                                Are you sure you want to log out? You'll need to login again to access your saved listings.
                            </Text>

                            {/* Actions */}
                            <View className="w-full gap-3">
                                <TouchableOpacity
                                    className="w-full py-4 bg-red-500 rounded-2xl items-center shadow-lg shadow-red-500/25 active:bg-red-600"
                                    onPress={() => {
                                        setIsLogoutModalVisible(false);
                                        router.replace('/login');
                                    }}
                                >
                                    <Text className="text-sm font-semibold text-white">Yes, Log Out</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    className="w-full py-4 bg-slate-100 rounded-2xl items-center active:bg-slate-200"
                                    onPress={() => setIsLogoutModalVisible(false)}
                                >
                                    <Text className="text-sm font-semibold text-slate-700">Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

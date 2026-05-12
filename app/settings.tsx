import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
    const router = useRouter();
    const [pushNotifications, setPushNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    return (
        <View className="flex-1 bg-slate-50">
            <SafeAreaView className="flex-1" edges={['top', 'left', 'right']}>
                {/* Header (Navigation Stack) */}
                <View className="px-6 pt-6 pb-4 bg-white/80 flex-row items-center justify-between z-20 border-b border-slate-100">
                    <View className="flex-row items-center gap-3">
                        <TouchableOpacity
                            className="w-8 h-8 -ml-2 items-center justify-center rounded-full active:bg-slate-100"
                            onPress={() => router.back()}
                        >
                            <Ionicons name="arrow-back-outline" size={24} color="#475569" />
                        </TouchableOpacity>
                        <Text className="text-xl font-semibold tracking-tight text-slate-900">Settings</Text>
                    </View>
                </View>

                <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
                    {/* Search Bar */}
                    <View className="px-6 py-4">
                        <View className="relative">
                            <View className="absolute left-3 top-0 bottom-0 justify-center z-10 w-6 items-center">
                                <Ionicons name="search-outline" size={18} color="#94a3b8" />
                            </View>
                            <TextInput
                                className="w-full pl-10 pr-3 py-2.5 bg-white rounded-xl text-slate-900 shadow-sm border border-slate-100 font-medium"
                                placeholder="Search settings..."
                                placeholderTextColor="#94a3b8"
                                style={{ fontSize: 14 }}
                            />
                        </View>
                    </View>

                    {/* Account Section */}
                    <View className="px-6 mb-6">
                        <Text className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 pl-1">Account</Text>
                        <View className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                            <TouchableOpacity className="w-full flex-row items-center justify-between p-4 border-b border-slate-50 active:bg-slate-50">
                                <View className="flex-row items-center gap-3">
                                    <View className="w-10 h-10 rounded-full bg-slate-100 p-0.5">
                                        <Image
                                            source={{ uri: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }}
                                            className="w-full h-full rounded-full"
                                            contentFit="cover"
                                        />
                                    </View>
                                    <View>
                                        <Text className="text-sm font-semibold text-slate-900">Alex Morgan</Text>
                                        <Text className="text-[11px] text-slate-500">Personal Info</Text>
                                    </View>
                                </View>
                                <Ionicons name="chevron-forward" size={18} color="#cbd5e1" />
                            </TouchableOpacity>

                            <TouchableOpacity className="w-full flex-row items-center justify-between p-4 active:bg-slate-50">
                                <View className="flex-row items-center gap-3">
                                    <View className="w-8 h-8 rounded-full bg-slate-50 items-center justify-center">
                                        <Ionicons name="shield-checkmark-outline" size={18} color="#475569" />
                                    </View>
                                    <Text className="text-sm font-medium text-slate-700">Login & Security</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={18} color="#cbd5e1" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* App Settings section */}
                    <View className="px-6 mb-6">
                        <Text className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 pl-1">App Settings</Text>
                        <View className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                            <TouchableOpacity className="w-full flex-row items-center justify-between p-4 border-b border-slate-50 active:bg-slate-50">
                                <View className="flex-row items-center gap-3">
                                    <View className="w-8 h-8 rounded-full bg-slate-50 items-center justify-center">
                                        <Ionicons name="globe-outline" size={18} color="#475569" />
                                    </View>
                                    <Text className="text-sm font-medium text-slate-700">Language</Text>
                                </View>
                                <View className="flex-row items-center gap-2">
                                    <Text className="text-xs text-slate-500 font-medium">English (US)</Text>
                                    <Ionicons name="chevron-forward" size={18} color="#cbd5e1" />
                                </View>
                            </TouchableOpacity>

                            <View className="w-full flex-row items-center justify-between p-4 border-b border-slate-50">
                                <View className="flex-row items-center gap-3">
                                    <View className="w-8 h-8 rounded-full bg-slate-50 items-center justify-center">
                                        <Ionicons name="notifications-outline" size={18} color="#475569" />
                                    </View>
                                    <Text className="text-sm font-medium text-slate-700">Push Notifications</Text>
                                </View>
                                <Switch
                                    value={pushNotifications}
                                    onValueChange={setPushNotifications}
                                    trackColor={{ false: '#e2e8f0', true: '#4f46e5' }}
                                    thumbColor="#ffffff"
                                    ios_backgroundColor="#e2e8f0"
                                />
                            </View>

                            <View className="w-full flex-row items-center justify-between p-4">
                                <View className="flex-row items-center gap-3">
                                    <View className="w-8 h-8 rounded-full bg-slate-50 items-center justify-center">
                                        <Ionicons name="moon-outline" size={18} color="#475569" />
                                    </View>
                                    <Text className="text-sm font-medium text-slate-700">Dark Mode</Text>
                                </View>
                                <Switch
                                    value={darkMode}
                                    onValueChange={setDarkMode}
                                    trackColor={{ false: '#e2e8f0', true: '#4f46e5' }}
                                    thumbColor="#ffffff"
                                    ios_backgroundColor="#e2e8f0"
                                />
                            </View>
                        </View>
                    </View>

                    {/* Support section */}
                    <View className="px-6 mb-8">
                        <Text className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 pl-1">Support</Text>
                        <View className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                            <TouchableOpacity className="w-full flex-row items-center justify-between p-4 border-b border-slate-50 active:bg-slate-50">
                                <View className="flex-row items-center gap-3">
                                    <View className="w-8 h-8 rounded-full bg-slate-50 items-center justify-center">
                                        <Ionicons name="help-circle-outline" size={18} color="#475569" />
                                    </View>
                                    <Text className="text-sm font-medium text-slate-700">Help Center</Text>
                                </View>
                                <Ionicons name="link-outline" size={18} color="#cbd5e1" />
                            </TouchableOpacity>

                            <TouchableOpacity className="w-full flex-row items-center justify-between p-4 border-b border-slate-50 active:bg-slate-50">
                                <View className="flex-row items-center gap-3">
                                    <View className="w-8 h-8 rounded-full bg-slate-50 items-center justify-center">
                                        <Ionicons name="document-text-outline" size={18} color="#475569" />
                                    </View>
                                    <Text className="text-sm font-medium text-slate-700">Terms of Service</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={18} color="#cbd5e1" />
                            </TouchableOpacity>

                            <TouchableOpacity className="w-full flex-row items-center justify-between p-4 active:bg-slate-50">
                                <View className="flex-row items-center gap-3">
                                    <View className="w-8 h-8 rounded-full bg-slate-50 items-center justify-center">
                                        <Ionicons name="trash-outline" size={18} color="#475569" />
                                    </View>
                                    <Text className="text-sm font-medium text-slate-700">Delete Account</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Footer Links */}
                    <View className="items-center px-6">
                        <View className="flex-row items-center justify-center gap-4 mb-4">
                            <TouchableOpacity>
                                <Text className="text-xs text-indigo-600 font-medium hover:underline">Privacy Policy</Text>
                            </TouchableOpacity>
                            <View className="w-1 h-1 rounded-full bg-slate-300" />
                            <TouchableOpacity>
                                <Text className="text-xs text-indigo-600 font-medium hover:underline">Licenses</Text>
                            </TouchableOpacity>
                        </View>
                        <Text className="text-[10px] text-slate-400 font-medium">Estate App v2.4.0 (Build 2045)</Text>
                    </View>

                </ScrollView>

                {/* Bottom Fade */}
                <LinearGradient
                    colors={['transparent', 'rgba(248,250,252,0.8)', '#f8fafc']}
                    className="absolute bottom-0 left-0 w-full h-12 pointer-events-none z-10"
                />
            </SafeAreaView>
        </View>
    );
}

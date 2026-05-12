import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChatDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    return (
        <View className="flex-1 bg-white">
            <Stack.Screen options={{ headerShown: false }} />
            <SafeAreaView className="flex-1" edges={['top', 'left', 'right']}>
                {/* Header */}
                <View className="px-4 py-3 border-b border-slate-100 flex-row items-center justify-between bg-white z-20">
                    <View className="flex-row items-center gap-3">
                        <TouchableOpacity onPress={() => router.back()} className="p-1 -ml-1">
                            <Ionicons name="arrow-back" size={24} color="#64748b" />
                        </TouchableOpacity>
                        <View className="relative">
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }}
                                style={{ width: 40, height: 40, borderRadius: 20 }}
                                contentFit="cover"
                            />
                            <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                        </View>
                        <View>
                            <Text className="text-base font-semibold text-slate-900">Sarah Miller</Text>
                            <Text className="text-xs text-slate-400 font-medium">Online now</Text>
                        </View>
                    </View>
                    <View className="flex-row items-center gap-4">
                        <TouchableOpacity>
                            <Ionicons name="call-outline" size={22} color="#94a3b8" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="ellipsis-horizontal" size={22} color="#94a3b8" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Chat Messages */}
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    className="flex-1"
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
                >
                    <ScrollView className="flex-1 bg-white px-4" contentContainerStyle={{ paddingBottom: 20 }}>
                        {/* Date Separator */}
                        <View className="items-center my-6">
                            <View className="bg-slate-100 px-3 py-1 rounded-full">
                                <Text className="text-[10px] font-medium text-slate-500">Today, 10:23 AM</Text>
                            </View>
                        </View>

                        {/* Incoming Message (Text) */}
                        <View className="flex-row items-end gap-2 mb-6">
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }}
                                style={{ width: 28, height: 28, borderRadius: 14 }}
                                contentFit="cover"
                            />
                            <View className="bg-white border border-slate-100 p-4 rounded-2xl rounded-bl-none shadow-sm max-w-[80%]">
                                <Text className="text-sm text-slate-700 leading-relaxed">
                                    Hi! I found a property that matches your criteria perfectly. It just came on the market this morning.
                                </Text>
                            </View>
                        </View>

                        {/* Incoming Message (Property Card) */}
                        <View className="flex-row items-end gap-2 mb-6">
                            <View className="w-7" /> {/* Spacer for alignment */}
                            <View className="bg-white border border-slate-100 p-3 rounded-2xl rounded-bl-none shadow-sm max-w-[85%] w-full">
                                <View className="relative mb-3">
                                    <Image
                                        source={{ uri: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }}
                                        style={{ width: '100%', height: 160, borderRadius: 12 }}
                                        contentFit="cover"
                                    />
                                    <View className="absolute top-2 left-2 bg-slate-900/90 px-2 py-1 rounded-md">
                                        <Text className="text-[10px] font-semibold text-white">New Listing</Text>
                                    </View>
                                    <TouchableOpacity className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full items-center justify-center">
                                        <Ionicons name="heart-outline" size={16} color="#64748b" />
                                    </TouchableOpacity>
                                </View>
                                <View className="flex-row justify-between items-start mb-1">
                                    <Text className="text-base font-semibold text-slate-900">Modern Loft in SOMA</Text>
                                    <View>
                                        <Text className="text-sm font-bold text-indigo-600">$4,200<Text className="text-slate-400 font-normal text-xs">/mo</Text></Text>
                                    </View>
                                </View>
                                <Text className="text-xs text-slate-500 mb-3">156 2nd St, San Francisco, CA</Text>
                                <View className="flex-row gap-2">
                                    <View className="flex-row items-center gap-1 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
                                        <Ionicons name="bed-outline" size={14} color="#64748b" />
                                        <Text className="text-xs font-medium text-slate-600">2 Beds</Text>
                                    </View>
                                    <View className="flex-row items-center gap-1 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
                                        <Ionicons name="water-outline" size={14} color="#64748b" />
                                        <Text className="text-xs font-medium text-slate-600">2 Baths</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Outgoing Message */}
                        <View className="flex-row justify-end items-end gap-2 mb-2">
                            <View className="bg-slate-900 p-4 rounded-2xl rounded-br-none shadow-md max-w-[80%]">
                                <Text className="text-sm text-white leading-relaxed">
                                    This looks amazing! Is the price negotiable for a longer lease term?
                                </Text>
                            </View>
                        </View>
                        <View className="flex-row justify-end items-center gap-1 pr-1">
                            <Text className="text-[10px] text-slate-400 font-medium bg-red">10:42 AM</Text>
                            <Ionicons name="checkmark-done" size={12} color="#818cf8" />
                        </View>

                    </ScrollView>

                    {/* Bottom Utility & Input Area */}
                    <View className="bg-white border-t border-slate-100 pt-3 pb-8 px-4">
                        {/* Quick Actions */}
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
                            <TouchableOpacity className="bg-indigo-50 border border-indigo-100 px-4 py-2.5 rounded-xl mr-2 flex-row items-center gap-2">
                                <Ionicons name="calendar-outline" size={16} color="#4f46e5" />
                                <Text className="text-indigo-600 text-xs font-medium">Book Viewing</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-xl mr-2">
                                <Text className="text-slate-600 text-xs font-medium">Make Offer</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-xl mr-2">
                                <Text className="text-slate-600 text-xs font-medium">Ask Details</Text>
                            </TouchableOpacity>
                        </ScrollView>

                        {/* Input Row */}
                        <View className="flex-row items-center gap-3">
                            <TouchableOpacity className="w-10 h-10 rounded-full border border-slate-200 items-center justify-center">
                                <Ionicons name="add" size={24} color="#94a3b8" />
                            </TouchableOpacity>
                            <View className="flex-1 bg-slate-50 border border-slate-100 rounded-full flex-row items-center px-4 py-2.5">
                                <TextInput
                                    placeholder="Type a message..."
                                    placeholderTextColor="#94a3b8"
                                    className="flex-1 text-sm font-medium text-slate-900 h-6"
                                    multiline
                                />
                                <TouchableOpacity>
                                    <Ionicons name="happy-outline" size={20} color="#94a3b8" />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity className="w-10 h-10 rounded-full bg-slate-900 items-center justify-center shadow-lg shadow-slate-900/20 active:scale-95">
                                <Ionicons name="paper-plane" size={20} color="white" style={{ marginLeft: 2 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
}

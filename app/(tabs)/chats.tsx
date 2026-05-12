import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomBottomNav from '../../components/CustomBottomNav';

const CHATS = [
    {
        id: 1,
        name: 'Sarah Miller',
        message: "I've confirmed the viewing for 2 PM tomorrow. See you th...",
        time: '2m ago',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        unread: true,
        online: true,
        isProperty: false
    },
    {
        id: 2,
        name: 'Modern Loft in SOMA',
        message: 'You: Is the price negotiable for a longer lease term?',
        time: '1h ago',
        avatar: 'https://images.unsplash.com/photo-1600596542815-2a429b08e619?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        subAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        unread: true,
        online: false,
        isProperty: true
    },
    {
        id: 3,
        name: 'Kevin Adams',
        message: "Thanks for the documents, I'll review them tonight.",
        time: 'Yesterday',
        initials: 'KA',
        unread: false,
        online: false,
        isProperty: false,
        readReceipt: true
    },
    {
        id: 4,
        name: 'Estate Support',
        message: 'Your verification request has been approved.',
        time: 'Oct 24',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        unread: false,
        online: false,
        isProperty: false,
        system: true
    }
];

const FILTERS = ['All Chats', 'Unread', 'Offers', 'Archived'];

export default function ChatsScreen() {
    const router = useRouter();
    const [activeFilter, setActiveFilter] = useState('All Chats');

    return (
        <View className="flex-1 bg-white">
            <SafeAreaView className="flex-1" edges={['top', 'left', 'right']}>
                {/* Header */}
                <View className="px-6 pt-6 pb-2 bg-white z-20">
                    <View className="flex-row justify-between items-end mb-6">
                        <View>
                            <Text className="text-2xl font-semibold tracking-tight text-slate-900">Messages</Text>
                            <Text className="text-xs text-slate-400 font-medium mt-1">3 unread conversations</Text>
                        </View>
                        <TouchableOpacity className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 items-center justify-center active:bg-slate-100">
                            <Ionicons name="create-outline" size={20} color="#0f172a" />
                        </TouchableOpacity>
                    </View>

                    {/* Search */}
                    <View className="relative mb-4">
                        <Ionicons name="search-outline" size={18} color="#94a3b8" style={{ position: 'absolute', left: 14, top: 14, zIndex: 10 }} />
                        <TextInput
                            placeholder="Search agents or messages..."
                            placeholderTextColor="#94a3b8"
                            className="w-full bg-slate-50 border border-slate-100 text-sm font-medium rounded-xl py-3 pl-10 pr-4 text-slate-900"
                        />
                    </View>

                    {/* Quick Filters */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-2" contentContainerStyle={{ paddingBottom: 4 }}>
                        {FILTERS.map((filter) => (
                            <TouchableOpacity
                                key={filter}
                                onPress={() => setActiveFilter(filter)}
                                className={`px-4 py-1.5 rounded-full border mr-2 ${activeFilter === filter ? 'bg-slate-900 border-slate-900' : 'bg-white border-slate-200'}`}
                            >
                                <Text className={`text-xs font-medium ${activeFilter === filter ? 'text-white' : 'text-slate-500'}`}>{filter}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Chat List */}
                <ScrollView className="flex-1 bg-white" contentContainerStyle={{ paddingBottom: 100 }}>
                    <View className="px-2 pb-6">
                        {CHATS.map((chat, index) => (
                            <React.Fragment key={chat.id}>
                                <TouchableOpacity
                                    className="p-3 active:bg-slate-50 rounded-2xl flex-row gap-4 mb-1"
                                    onPress={() => router.push(`/chat/${chat.id}`)}
                                >
                                    <View className="relative">
                                        {chat.isProperty ? (
                                            <View className="relative">
                                                <Image
                                                    source={{ uri: chat.avatar }}
                                                    style={{ width: 48, height: 48, borderRadius: 12 }}
                                                    contentFit="cover"
                                                />
                                                <View className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                                                    <Image
                                                        source={{ uri: chat.subAvatar }}
                                                        style={{ width: 20, height: 20, borderRadius: 10 }}
                                                    />
                                                </View>
                                            </View>
                                        ) : chat.initials ? (
                                            <View className="w-12 h-12 rounded-full bg-indigo-50 items-center justify-center border-2 border-white">
                                                <Text className="text-indigo-600 font-bold text-sm tracking-tight">{chat.initials}</Text>
                                            </View>
                                        ) : (
                                            <View className="relative">
                                                <Image
                                                    source={{ uri: chat.avatar }}
                                                    style={{ width: 48, height: 48, borderRadius: 24 }}
                                                    contentFit="cover"
                                                    className={chat.system ? "grayscale opacity-70" : ""}
                                                />
                                                {chat.online && (
                                                    <View className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                                                )}
                                            </View>
                                        )}
                                    </View>

                                    <View className="flex-1 justify-center">
                                        <View className="flex-row justify-between items-baseline mb-0.5">
                                            <Text className={`text-sm font-semibold ${chat.system ? 'text-slate-500' : 'text-slate-900'}`}>{chat.name}</Text>
                                            <Text className={`text-[10px] font-medium ${chat.unread ? 'text-indigo-600' : 'text-slate-400'}`}>{chat.time}</Text>
                                        </View>
                                        <View className="flex-row justify-between items-center">
                                            <Text className={`text-xs truncate pr-4 flex-1 ${chat.system || !chat.unread ? 'text-slate-400' : 'text-slate-800 font-medium'}`} numberOfLines={1}>
                                                {chat.message}
                                            </Text>
                                            {chat.unread ? (
                                                <View className="w-2 h-2 bg-indigo-600 rounded-full" />
                                            ) : chat.readReceipt ? (
                                                <Ionicons name="checkmark-done" size={16} color="#818cf8" />
                                            ) : chat.system ? (
                                                <Ionicons name="checkmark-circle-outline" size={14} color="#cbd5e1" />
                                            ) : null}
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                {index < CHATS.length - 1 && <View className="h-px bg-slate-50 mx-4 my-1" />}
                            </React.Fragment>
                        ))}

                        {/* Price Drop Alert Card */}
                        <View className="mx-2 mt-4 p-4 rounded-2xl shadow-lg shadow-slate-900/10 overflow-hidden relative">
                            <LinearGradient
                                colors={['#0f172a', '#1e293b']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                className="absolute inset-0"
                            />
                            <View className="flex-row items-start gap-3 relative z-10">
                                <View className="w-8 h-8 rounded-full bg-white/10 items-center justify-center backdrop-blur-sm">
                                    <Ionicons name="notifications" size={16} color="white" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-xs font-semibold text-white mb-1">Price Drop Alert</Text>
                                    <Text className="text-[10px] text-slate-300 leading-relaxed">The "Sunset Villa" you liked dropped by $15k. Tap to contact the agent now.</Text>
                                </View>
                                <TouchableOpacity className="bg-white px-3 py-1.5 rounded-lg shadow-sm">
                                    <Text className="text-[10px] font-semibold text-slate-900">View</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <CustomBottomNav activeTab="chats" />

                {/* Bottom Fade */}
                <LinearGradient
                    colors={['transparent', 'rgba(255,255,255,0.8)', 'white']}
                    className="absolute bottom-[80px] left-0 w-full h-12 pointer-events-none z-10"
                />
            </SafeAreaView>
        </View>
    );
}

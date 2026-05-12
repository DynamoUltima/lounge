import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const CAROUSEL_IMAGES = [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1de2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
];

export default function DetailScreen() {
    const router = useRouter();
    const [activeIndex, setActiveIndex] = useState(0);

    const onScroll = (event: any) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = event.nativeEvent.contentOffset.x / slideSize;
        setActiveIndex(Math.round(index));
    };

    return (
        <View className="flex-1 bg-slate-50">
            {/* Top Navigation Overlay */}
            <SafeAreaView className="absolute top-0 left-0 w-full z-20 flex-row justify-between items-center px-6 pt-4" edges={['top']}>
                <TouchableOpacity
                    className="w-10 h-10 rounded-full bg-white/20 border border-white/30 items-center justify-center overflow-hidden"
                    onPress={() => router.back()}
                >
                    <BlurView intensity={20} tint="light" className="absolute inset-0" />
                    <Ionicons name="arrow-back-outline" size={22} color="white" />
                </TouchableOpacity>
                <View className="flex-row gap-3">
                    <TouchableOpacity className="w-10 h-10 rounded-full bg-white/20 border border-white/30 items-center justify-center overflow-hidden">
                        <BlurView intensity={20} tint="light" className="absolute inset-0" />
                        <Ionicons name="share-social-outline" size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity className="w-10 h-10 rounded-full bg-white/20 border border-white/30 items-center justify-center overflow-hidden">
                        <BlurView intensity={20} tint="light" className="absolute inset-0" />
                        <Ionicons name="heart-outline" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false} bounces={false}>
                {/* Hero Image Gallery */}
                <View className="relative w-full h-80 bg-slate-900">
                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={onScroll}
                        scrollEventThrottle={16}
                        className="w-full h-full"
                    >
                        {CAROUSEL_IMAGES.map((img, index) => (
                            <Image
                                key={index}
                                source={{ uri: img }}
                                style={{ width, height: '100%', opacity: 0.95 }}
                                contentFit="cover"
                            />
                        ))}
                    </ScrollView>
                    <LinearGradient
                        colors={['transparent', 'rgba(15, 23, 42, 0.6)']}
                        className="absolute bottom-0 left-0 w-full h-24 pointer-events-none"
                    />

                    {/* Image Dots */}
                    <View className="absolute bottom-8 left-0 w-full flex-row justify-center gap-1.5 z-10 pointer-events-none">
                        {CAROUSEL_IMAGES.map((_, index) => (
                            <View
                                key={index}
                                className={`h-1.5 rounded-full ${index === activeIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`}
                            />
                        ))}
                    </View>
                </View>

                {/* Content Sheet */}
                <View className="flex-1 bg-white -mt-6 rounded-t-[32px] relative z-10 flex-col overflow-hidden pt-2 px-6">
                    {/* Drag Handle */}
                    <View className="w-full items-center pt-3 pb-4">
                        <View className="w-10 h-1 bg-slate-200 rounded-full" />
                    </View>

                    {/* Main Details */}
                    <View className="flex-row justify-between items-start mb-2">
                        <View className="flex-1">
                            <Text className="text-2xl font-semibold text-slate-900 tracking-tight mb-1">Modern Loft Studio</Text>
                            <View className="flex-row items-center gap-1.5">
                                <Ionicons name="location-outline" size={14} color="#94a3b8" />
                                <Text className="text-slate-500 text-sm">1024 Market St, San Francisco</Text>
                            </View>
                        </View>
                        <View className="items-end">
                            <View className="flex-row items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
                                <Ionicons name="star" size={12} color="#eab308" />
                                <Text className="text-xs font-semibold text-yellow-700">4.8</Text>
                            </View>
                        </View>
                    </View>

                    {/* Specs */}
                    <View className="flex-row gap-3 py-6">
                        <View className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl p-3 items-center gap-1">
                            <View className="w-8 h-8 rounded-full bg-white items-center justify-center shadow-sm">
                                <Ionicons name="bed-outline" size={18} color="#0f172a" />
                            </View>
                            <Text className="text-xs font-medium text-slate-500 mt-1">1 Bed</Text>
                        </View>
                        <View className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl p-3 items-center gap-1">
                            <View className="w-8 h-8 rounded-full bg-white items-center justify-center shadow-sm">
                                <Ionicons name="water-outline" size={18} color="#0f172a" />
                            </View>
                            <Text className="text-xs font-medium text-slate-500 mt-1">1 Bath</Text>
                        </View>
                        <View className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl p-3 items-center gap-1">
                            <View className="w-8 h-8 rounded-full bg-white items-center justify-center shadow-sm">
                                <Ionicons name="expand-outline" size={18} color="#0f172a" />
                            </View>
                            <Text className="text-xs font-medium text-slate-500 mt-1">650 sqft</Text>
                        </View>
                    </View>

                    {/* Agent */}
                    <View className="flex-row items-center justify-between py-4 border-y border-slate-100 mb-6">
                        <View className="flex-row items-center gap-3">
                            <View className="relative">
                                <Image source={{ uri: 'https://i.pravatar.cc/150?img=12' }} style={{ width: 48, height: 48, borderRadius: 24, borderWidth: 1, borderColor: '#e2e8f0' }} />
                                <View className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                            </View>
                            <View>
                                <Text className="text-sm font-semibold text-slate-900">Sarah Jenkins</Text>
                                <Text className="text-xs text-slate-500">Estate Agent</Text>
                            </View>
                        </View>
                        <View className="flex-row gap-3">
                            <TouchableOpacity className="w-10 h-10 rounded-full border border-slate-200 items-center justify-center active:bg-slate-50">
                                <Ionicons name="chatbubble-ellipses-outline" size={20} color="#475569" />
                            </TouchableOpacity>
                            <TouchableOpacity className="w-10 h-10 rounded-full border border-slate-200 items-center justify-center active:bg-slate-50">
                                <Ionicons name="call-outline" size={20} color="#475569" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Description */}
                    <View className="mb-6">
                        <Text className="text-base font-semibold text-slate-900 mb-2">Description</Text>
                        <Text className="text-sm text-slate-500 leading-relaxed">
                            Experience modern living in this beautifully designed studio loft. Featuring high ceilings, floor-to-ceiling windows with city views, and premium finishes throughout... <Text className="text-indigo-600 font-medium">Read more</Text>
                        </Text>
                    </View>

                    {/* Facilities */}
                    <View className="mb-8">
                        <Text className="text-base font-semibold text-slate-900 mb-4">Facilities</Text>
                        <View className="flex-row flex-wrap justify-between gap-4">
                            <View className="items-center gap-2">
                                <View className="w-12 h-12 bg-indigo-50 rounded-2xl items-center justify-center">
                                    <Ionicons name="wifi-outline" size={24} color="#4f46e5" />
                                </View>
                                <Text className="text-[10px] font-medium text-slate-600">Fast Wifi</Text>
                            </View>
                            <View className="items-center gap-2">
                                <View className="w-12 h-12 bg-indigo-50 rounded-2xl items-center justify-center">
                                    <Ionicons name="barbell-outline" size={24} color="#4f46e5" />
                                </View>
                                <Text className="text-[10px] font-medium text-slate-600">Gym</Text>
                            </View>
                            <View className="items-center gap-2">
                                <View className="w-12 h-12 bg-indigo-50 rounded-2xl items-center justify-center">
                                    <Ionicons name="car-outline" size={24} color="#4f46e5" />
                                </View>
                                <Text className="text-[10px] font-medium text-slate-600">Parking</Text>
                            </View>
                            <View className="items-center gap-2">
                                <View className="w-12 h-12 bg-indigo-50 rounded-2xl items-center justify-center">
                                    <Ionicons name="snow-outline" size={24} color="#4f46e5" />
                                </View>
                                <Text className="text-[10px] font-medium text-slate-600">AC</Text>
                            </View>
                        </View>
                    </View>

                    {/* Map Preview */}
                    <View className="mb-6">
                        <View className="flex-row justify-between items-center mb-3">
                            <Text className="text-base font-semibold text-slate-900">Location</Text>
                            <TouchableOpacity>
                                <Text className="text-xs font-medium text-indigo-600">View Map</Text>
                            </TouchableOpacity>
                        </View>
                        <View className="w-full h-32 bg-slate-100 rounded-2xl overflow-hidden relative border border-slate-100">
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }}
                                style={{ width: '100%', height: '100%', opacity: 0.6 }}
                                className="w-full h-full grayscale"
                                contentFit="cover"
                            />
                            <View className="absolute inset-0 items-center justify-center">
                                <View className="w-8 h-8 bg-indigo-600 rounded-full items-center justify-center shadow-lg border-4 border-indigo-600/20">
                                    <Ionicons name="home" size={14} color="white" />
                                </View>
                            </View>
                        </View>
                    </View>

                </View>
            </ScrollView>

            {/* Bottom Action Bar */}
            <SafeAreaView className="absolute bottom-0 left-0 w-full bg-white border-t border-slate-100 px-6 py-4 z-30 flex-row items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]" edges={['bottom']}>
                <View>
                    <Text className="text-xs text-slate-400 font-medium">Total Price</Text>
                    <View className="flex-row items-baseline gap-1 mt-0.5">
                        <Text className="text-xl font-bold text-indigo-600 tracking-tight">$2,400</Text>
                        <Text className="text-sm text-slate-400 font-medium">/month</Text>
                    </View>
                </View>
                <TouchableOpacity className="bg-slate-900 px-8 py-3.5 rounded-xl flex-row items-center gap-2 shadow-lg shadow-slate-900/20 active:scale-95">
                    <Text className="text-white font-semibold text-sm">Book Now</Text>
                    <Ionicons name="arrow-forward" size={18} color="white" />
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
}

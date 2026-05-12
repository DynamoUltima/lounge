import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { Easing, SlideInDown, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import RealEstatePaymentSheet from '../components/RealEstatePaymentSheet';

const { height } = Dimensions.get('window');

// --- Reusable Components ---

const PremiumHeader = ({ onClose, animatedStyle }: { onClose: () => void, animatedStyle: any }) => (
    <View className="relative h-64 w-full bg-[#0B1220] rounded-t-3xl overflow-hidden">
        {/* Close Button */}
        <TouchableOpacity
            onPress={onClose}
            className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 border border-white/10 items-center justify-center z-20 active:bg-white/20"
        >
            <Ionicons name="close" size={20} color="white" />
        </TouchableOpacity>

        {/* Central Lock Visual */}
        <View className="absolute inset-0 items-center justify-center pointer-events-none">
            <View className="relative items-center justify-center w-32 h-32">
                {/* Rotating dashed ring */}
                <Animated.View
                    style={animatedStyle}
                    className="absolute inset-0 rounded-full border border-dashed border-white/30"
                />
                {/* Static ring */}
                <View className="absolute inset-0 rounded-full border border-white/10" />

                {/* Inner Circle */}
                <View className="w-20 h-20 rounded-full bg-white/10 border border-white/20 items-center justify-center absolute">
                    <Ionicons name="lock-closed" size={28} color="white" />
                </View>
            </View>
        </View>

        {/* 360 Badge */}
        <View className="absolute bottom-6 left-6 flex-row items-center gap-2">
            <View className="bg-indigo-600 px-2.5 py-1 rounded">
                <Text className="text-white text-[10px] font-bold tracking-wide">360° PRO</Text>
            </View>
            <Text className="text-white text-xs font-medium tracking-tight">Virtual Experience</Text>
        </View>
    </View>
);

const FeatureItem = ({ icon, title, subtitle }: { icon: any, title: string, subtitle: string }) => (
    <View className="flex-row items-start gap-4">
        <View className="w-10 h-10 rounded-full bg-indigo-50 items-center justify-center">
            <Ionicons name={icon} size={20} color="#4f46e5" />
        </View>
        <View className="flex-1 mt-0.5">
            <Text className="text-[15px] font-bold text-slate-900">{title}</Text>
            <Text className="text-[13px] text-slate-500 mt-1" numberOfLines={1}>{subtitle}</Text>
        </View>
    </View>
);

const AvatarGroup = () => (
    <View className="flex-row items-center">
        <Image source={{ uri: 'https://i.pravatar.cc/150?img=12' }} style={{ width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: 'white', marginRight: -8 }} />
        <Image source={{ uri: 'https://i.pravatar.cc/150?img=28' }} style={{ width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: 'white', marginRight: -8 }} />
        <View className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 items-center justify-center z-10">
            <Text className="text-[10px] font-bold text-slate-600">+42</Text>
        </View>
    </View>
);

const PriceRow = () => (
    <View className="flex-row justify-between items-end mb-6">
        <View>
            <Text className="text-[11px] text-slate-400 font-medium uppercase tracking-widest mb-1.5">One-time access</Text>
            <View className="flex-row items-baseline gap-2">
                <Text className="text-4xl font-bold text-slate-900 tracking-tight leading-none">$4.99</Text>
                <Text className="text-sm text-slate-400 font-medium line-through">$12.99</Text>
            </View>
        </View>
        <AvatarGroup />
    </View>
);

// --- Main Screen ---

export default function TourDetailScreen() {
    const router = useRouter();
    const [isPaymentSheetVisible, setIsPaymentSheetVisible] = useState(false);

    // Rotation animation for the ring
    const rotation = useSharedValue(0);

    useEffect(() => {
        rotation.value = withRepeat(
            withTiming(360, {
                duration: 10000,
                easing: Easing.linear,
            }),
            -1 // Infinite repeat
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotateZ: `${rotation.value}deg` }],
        };
    });

    return (
        <View className="flex-1 bg-black/50 justify-end">
            {/* Modal Container */}
            <Animated.View
                entering={SlideInDown.duration(500).damping(14)}
                style={{ height: height * 0.85 }}
                className="w-full bg-white rounded-t-3xl shadow-2xl flex-col"
            >
                <PremiumHeader onClose={() => router.replace('/')} animatedStyle={animatedStyle} />

                {/* Modal Body */}
                <ScrollView
                    className="flex-1 bg-white"
                    contentContainerStyle={{ paddingHorizontal: 32, paddingTop: 32, paddingBottom: 24 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View className="mb-8">
                        <Text className="text-[22px] font-bold text-slate-900 tracking-tight mb-2.5">Unlock Virtual Tour</Text>
                        <Text className="text-[15px] text-slate-500 line-height-[24px]">
                            Get exclusive access to the high-definition 360° walkthrough. Measure rooms, inspect details, and tour remotely.
                        </Text>
                    </View>

                    {/* Features List */}
                    <View className="gap-6 mb-8">
                        <FeatureItem
                            icon="scan-outline"
                            title="Immersive Walkthrough"
                            subtitle="Move room to room as if you were there."
                        />
                        <FeatureItem
                            icon="analytics-outline"
                            title="Measurement Mode"
                            subtitle="Check if your furniture fits instantly."
                        />
                        <FeatureItem
                            icon="headset-outline"
                            title="VR Headset Ready"
                            subtitle="Compatible with Quest & Cardboard."
                        />
                    </View>

                    {/* Spacer for filling vertical area */}
                    <View className="flex-1" />

                    {/* Price & Action */}
                    <View className="mt-4">
                        <PriceRow />

                        {/* Main CTA Button */}
                        <TouchableOpacity
                            onPress={() => setIsPaymentSheetVisible(true)}
                            className="relative w-full bg-[#0B1220] active:bg-slate-800 flex-row items-center justify-center h-[56px] rounded-full shadow-lg shadow-slate-900/20"
                        >
                            <View className="flex-row items-center gap-2.5">
                                <Ionicons name="key-outline" size={20} color="white" style={{ transform: [{ rotate: '-45deg' }] }} />
                                <Text className="text-white font-semibold text-base tracking-wide">Unlock Experience</Text>
                            </View>
                            <View className="absolute right-6">
                                <Ionicons name="arrow-forward" size={20} color="rgba(255,255,255,0.6)" />
                            </View>
                        </TouchableOpacity>

                        {/* Trust Indicator */}
                        <SafeAreaView edges={['bottom']} className="mt-6">
                            <View className="flex-row items-center justify-center gap-1.5 opacity-60">
                                <Ionicons name="shield-checkmark" size={14} color="#16a34a" />
                                <Text className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Secure Checkout via Apple Pay</Text>
                            </View>
                        </SafeAreaView>
                    </View>
                </ScrollView>
            </Animated.View>

            {/* Payment Processing Sheet */}
            <RealEstatePaymentSheet
                visible={isPaymentSheetVisible}
                onSuccess={() => {
                    setIsPaymentSheetVisible(false);
                    router.replace('/unlocked-tour');
                }}
                onCancel={() => setIsPaymentSheetVisible(false)}
            />
        </View>
    );
}

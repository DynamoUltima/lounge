import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Reusable Components ---

const FeatureItem = ({ icon, colorClass, bgClass, title, description }: { icon: any, colorClass: string, bgClass: string, title: string, description: string }) => (
    <View className="flex-row gap-4 mb-6">
        <View className={`w-12 h-12 rounded-2xl ${bgClass} items-center justify-center shrink-0`}>
            <Ionicons name={icon} size={24} className={colorClass} />
        </View>
        <View className="flex-1">
            <Text className="font-semibold text-slate-900 text-[15px] mb-1">
                {title}
            </Text>
            <Text className="text-[13px] text-slate-500 leading-relaxed pr-4">
                {description}
            </Text>
        </View>
    </View>
);

// --- Main Screen ---

export default function PremiumUpgradeScreen() {
    const router = useRouter();
    const [isYearly, setIsYearly] = useState(false);

    return (
        <View className="flex-1 bg-white">
            <SafeAreaView className="flex-1" edges={['top']}>
                {/* Header */}
                <View className="px-6 pt-2 pb-2 flex-row items-center justify-between z-10 bg-white">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center active:bg-slate-50 transition-colors"
                    >
                        <Ionicons name="arrow-back" size={24} color="#475569" />
                    </TouchableOpacity>

                    <View className="flex-row gap-1.5 items-center bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
                        <Ionicons name="recording" size={16} color="#f59e0b" />
                        <Text className="text-[11px] font-bold text-amber-700 uppercase tracking-widest mt-0.5">
                            Premium
                        </Text>
                    </View>

                    <View className="w-10" />
                </View>

                {/* Content */}
                <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 140 }}
                >
                    <Animated.View entering={FadeIn.duration(600).delay(100)} className="px-6">
                        {/* Hero Text */}
                        <View className="mt-6 mb-10 text-center items-center">
                            <Text className="text-3xl font-bold text-slate-900 tracking-tight mb-3 text-center">
                                Master Your{'\n'}Real Estate Journey
                            </Text>
                            <Text className="text-slate-500 text-[15px] leading-relaxed text-center px-4 font-medium">
                                Get the competitive edge with exclusive tools designed for serious estate managers.
                            </Text>
                        </View>

                        {/* Pricing Toggle */}
                        <View className="bg-slate-100/80 p-1.5 rounded-2xl flex-row mb-12 relative h-14 items-center">
                            {/* Animated Background Pill */}
                            <Animated.View
                                className={`absolute top-1.5 bottom-1.5 w-[50%] bg-white rounded-xl shadow-sm border border-slate-200/50 transition-all duration-300 ${isYearly ? 'left-1/2 -ml-1.5' : 'left-1.5'}`}
                            />

                            <TouchableOpacity
                                onPress={() => setIsYearly(false)}
                                className="flex-1 relative z-10 py-3 items-center justify-center flex-row h-full"
                            >
                                <Text className={`text-sm tracking-wide ${!isYearly ? 'font-bold text-slate-900' : 'font-medium text-slate-500'}`}>
                                    Monthly
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setIsYearly(true)}
                                className="flex-1 relative z-10 py-3 items-center justify-center flex-row h-full"
                            >
                                <Text className={`text-sm tracking-wide ${isYearly ? 'font-bold text-slate-900' : 'font-medium text-slate-500'}`}>
                                    Yearly
                                </Text>
                                <View className="bg-[#dcfce7] px-1.5 py-0.5 rounded ml-2">
                                    <Text className="text-[10px] text-[#16a34a] font-bold">-20%</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* Price Display */}
                        <Animated.View entering={FadeIn.duration(400)} className="mb-12 items-center">
                            <View className="flex-row items-baseline justify-center mb-1">
                                <Text className="text-5xl font-bold text-slate-900 tracking-tight">
                                    ${isYearly ? '278' : '29'}
                                </Text>
                                <Text className="text-base text-slate-500 font-medium ml-1">
                                    / {isYearly ? 'year' : 'month'}
                                </Text>
                            </View>
                            <Text className="text-[13px] text-slate-400 font-medium mt-1">
                                Cancel anytime. No hidden fees.
                            </Text>
                        </Animated.View>

                        {/* Feature List */}
                        <Animated.View entering={SlideInDown.duration(600).delay(200).springify()}>
                            <FeatureItem
                                icon="bar-chart-outline"
                                bgClass="bg-indigo-50"
                                colorClass="color-indigo-600"
                                title="Advanced Analytics"
                                description="See who's viewing your listings and get detailed demographic insights."
                            />
                            <FeatureItem
                                icon="heart-outline"
                                bgClass="bg-pink-50"
                                colorClass="color-pink-500"
                                title="Priority Support"
                                description="Get 24/7 dedicated support from our estate experts team."
                            />
                            <FeatureItem
                                icon="checkmark-circle-outline"
                                bgClass="bg-teal-50"
                                colorClass="color-teal-600"
                                title="Verified Badge"
                                description="Stand out with a verified pro badge on your profile and listings."
                            />
                        </Animated.View>
                    </Animated.View>
                </ScrollView>

                {/* Sticky Bottom Actions */}
                <View className="absolute bottom-0 left-0 w-full bg-white/90 border-t border-slate-100 px-6 py-5 pb-8 z-20">
                    <TouchableOpacity
                        onPress={() => router.push('/checkout')}
                        className="w-full bg-[#0f172a] active:bg-slate-800 flex-row items-center justify-center gap-2 h-14 rounded-2xl shadow-xl shadow-slate-900/10 mb-2"
                    >
                        <Text className="text-white font-semibold text-[15px] tracking-wide">
                            Subscribe for ${isYearly ? '278' : '29'}
                        </Text>
                        <Ionicons name="arrow-forward" size={18} color="white" />
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </View>
    );
}

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    Easing,
    FadeIn,
    SlideInDown,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Animated Pulse Circle ---
const PulseCircle = () => {
    const scale = useSharedValue(0.8);
    const opacity = useSharedValue(0.5);

    useEffect(() => {
        scale.value = withRepeat(
            withTiming(1.3, { duration: 2000, easing: Easing.bezier(0.215, 0.61, 0.355, 1) }),
            -1, // Infinite
            false
        );
        opacity.value = withRepeat(
            withTiming(0, { duration: 2000, easing: Easing.bezier(0.215, 0.61, 0.355, 1) }),
            -1,
            false
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    return (
        <Animated.View
            style={[
                {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: '#dcfce7', // green-100
                    borderRadius: 9999,
                },
                animatedStyle,
            ]}
        />
    );
};

export default function SuccessScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-white">
            <SafeAreaView className="flex-1" edges={['top']}>

                {/* Top Actions */}
                <View className="w-full px-6 pt-2 pb-4 flex-row justify-end z-10">
                    <TouchableOpacity
                        onPress={() => router.replace('/(tabs)/profile')}
                        className="w-10 h-10 rounded-full bg-slate-50 items-center justify-center active:bg-slate-100 transition-colors"
                    >
                        <Ionicons name="close" size={24} color="#94a3b8" />
                    </TouchableOpacity>
                </View>

                {/* Main Success Content */}
                <ScrollView
                    className="flex-1 w-full"
                    contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 32, paddingBottom: 120, alignItems: 'center' }}
                    showsVerticalScrollIndicator={false}
                >
                    <Animated.View entering={FadeIn.duration(600)} className="w-full items-center">
                        {/* Animated Icon */}
                        <View className="relative w-24 h-24 items-center justify-center mb-8">
                            <PulseCircle />
                            <View className="absolute inset-0 bg-green-100 rounded-full opacity-50" style={{ transform: [{ scale: 0.8 }] }} />
                            <View className="relative z-10 w-16 h-16 bg-green-500 rounded-full items-center justify-center shadow-lg shadow-green-500/30">
                                <Ionicons name="checkmark" size={32} color="white" />
                            </View>
                        </View>

                        <Text className="text-2xl font-semibold text-slate-900 tracking-tight mb-2 text-center">
                            Payment Successful
                        </Text>
                        <Text className="text-slate-500 text-sm text-center mb-10">
                            Your transaction has been processed.
                        </Text>

                        {/* Receipt Card Container */}
                        <Animated.View entering={SlideInDown.duration(700).springify().delay(200)} className="w-full bg-slate-50 rounded-3xl p-1 border border-slate-100 relative mb-8">

                            {/* Ticket Top */}
                            <View className="bg-white rounded-[20px] p-5 shadow-sm border border-slate-100 relative overflow-hidden">
                                <View className="items-center mb-6 pt-2">
                                    <Text className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Total Paid</Text>
                                    <Text className="text-4xl font-bold text-slate-900 tracking-tight">$29.00</Text>
                                </View>

                                <View className="space-y-4 pb-2">
                                    <View className="flex-row justify-between items-center mb-3">
                                        <Text className="text-sm text-slate-500">Ref Number</Text>
                                        <Text className="text-sm font-semibold text-slate-900 font-mono tracking-tight">#00129384</Text>
                                    </View>
                                    <View className="flex-row justify-between items-center mb-3">
                                        <Text className="text-sm text-slate-500">Payment Time</Text>
                                        <Text className="text-sm font-semibold text-slate-900 tracking-tight">24 Oct, 10:28 AM</Text>
                                    </View>
                                    <View className="flex-row justify-between items-center mb-3">
                                        <Text className="text-sm text-slate-500">Payment Method</Text>
                                        <View className="flex-row items-center gap-1.5">
                                            <Ionicons name="card-outline" size={16} color="#6366f1" />
                                            <Text className="text-sm font-bold text-slate-900 tracking-tight">Credit Card</Text>
                                        </View>
                                    </View>
                                    <View className="flex-row justify-between items-center">
                                        <Text className="text-sm text-slate-500">Sender Name</Text>
                                        <Text className="text-sm font-semibold text-slate-900 tracking-tight">Alex Morgan</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Perforated Line Decoration */}
                            <View className="relative flex-row items-center justify-between px-4 -mt-3 z-10 w-full overflow-hidden h-6">
                                {/* Left Circle Cutout */}
                                <View className="absolute left-[-16px] w-6 h-6 rounded-full bg-slate-50 border border-slate-200 z-20" />

                                {/* Dashed Line */}
                                <View className="flex-1 ml-4 mr-4 h-[1px] border-t-2 border-dashed border-slate-200" style={{ marginTop: 2 }} />

                                {/* Right Circle Cutout */}
                                <View className="absolute right-[-16px] w-6 h-6 rounded-full bg-slate-50 border border-slate-200 z-20" />
                            </View>

                            {/* Ticket Bottom */}
                            <View className="bg-white rounded-b-[20px] rounded-t-lg p-4 pt-6 -mt-3 shadow-sm border border-t-0 border-slate-100 flex-row items-center justify-between">
                                <View className="flex-row items-center gap-3">
                                    <View className="w-10 h-10 rounded-full bg-indigo-50 items-center justify-center">
                                        <Ionicons name="document-text-outline" size={20} color="#4f46e5" />
                                    </View>
                                    <View>
                                        <Text className="text-[13px] font-semibold text-slate-900 tracking-tight">Get Receipt</Text>
                                        <Text className="text-[10px] text-slate-400 font-medium">PDF format, 245kb</Text>
                                    </View>
                                </View>
                                <TouchableOpacity className="w-8 h-8 items-center justify-center rounded-full border border-slate-200 active:bg-slate-50">
                                    <Ionicons name="download-outline" size={16} color="#475569" />
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </Animated.View>
                </ScrollView>

                {/* Footer Buttons */}
                <View className="absolute bottom-0 left-0 w-full bg-white/95 px-6 pt-3 pb-8 z-20">
                    <TouchableOpacity
                        onPress={() => router.replace('/unlocked-tour')}
                        className="w-full bg-slate-900 items-center justify-center py-4 rounded-2xl shadow-lg shadow-slate-900/20 active:scale-[0.98] transition-all mb-2"
                    >
                        <Text className="text-white font-semibold text-[15px] tracking-wide">Done</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => router.replace('/(tabs)')}
                        className="w-full bg-white items-center justify-center py-4 rounded-2xl border border-transparent active:bg-slate-50 transition-colors"
                    >
                        <Text className="text-[#475569] font-semibold text-[14px]">Back to Home</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </View>
    );
}

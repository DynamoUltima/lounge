import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    Easing,
    FadeIn,
    FadeInDown,
    FadeInUp,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// --- Components ---

const LiveTourHeader = () => (
    <View className="flex-row items-center gap-2 self-start bg-black/40 px-3 py-1.5 rounded-full border border-white/10">
        <View className="w-1.5 h-1.5 rounded-full bg-green-500" />
        <Text className="text-white text-[10px] font-bold tracking-widest uppercase">Live Tour</Text>
    </View>
);

const AccessBadge = () => (
    <View className="flex-row items-center gap-1.5 self-start bg-white px-3 py-1.5 rounded-full mt-3 shadow-lg">
        <Ionicons name="checkmark-circle" size={14} color="#16a34a" />
        <Text className="text-slate-900 text-xs font-bold tracking-wide">Access Unlocked</Text>
    </View>
);

const FloatingHotspot = () => {
    const scale = useSharedValue(1);
    const opacity = useSharedValue(0.6);

    useEffect(() => {
        scale.value = withRepeat(
            withSequence(
                withTiming(1.5, { duration: 1500, easing: Easing.out(Easing.ease) }),
                withTiming(1, { duration: 0 })
            ),
            -1
        );
        opacity.value = withRepeat(
            withSequence(
                withTiming(0, { duration: 1500, easing: Easing.out(Easing.ease) }),
                withTiming(0.6, { duration: 0 })
            ),
            -1
        );
    }, []);

    const animatedOuterStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    return (
        <TouchableOpacity activeOpacity={0.8} className="items-center justify-center w-16 h-16 pointer-events-auto">
            <Animated.View style={animatedOuterStyle} className="absolute inset-0 rounded-full border-2 border-white bg-white/20" />
            <View className="w-4 h-4 rounded-full bg-white shadow-lg shadow-white" />
        </TouchableOpacity>
    );
};

const DockItem = ({
    icon,
    label,
    isActive,
    onPress
}: {
    icon: any;
    label: string;
    isActive: boolean;
    onPress: () => void;
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`items-center justify-center flex-1 h-full rounded-2xl ${isActive ? 'bg-white/10' : ''}`}
            activeOpacity={0.7}
        >
            <Ionicons name={icon} size={22} color={isActive ? "white" : "#94a3b8"} />
            <Text className={`text-[10px] font-medium mt-1 tracking-wide ${isActive ? 'text-white' : 'text-slate-400'}`}>
                {label}
            </Text>
        </TouchableOpacity>
    );
};

const BottomDock = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => {
    return (
        <Animated.View entering={FadeInUp.duration(600).delay(300).springify()} className="px-6 w-full absolute bottom-10 z-20">
            <BlurView intensity={30} tint="dark" className="rounded-3xl overflow-hidden border border-white/10">
                <View className="flex-row items-center justify-between h-[72px] px-2 bg-black/40">
                    <DockItem
                        icon="scan-outline"
                        label="360 VIEW"
                        isActive={activeTab === '360'}
                        onPress={() => setActiveTab('360')}
                    />
                    <DockItem
                        icon="options-outline"
                        label="MEASURE"
                        isActive={activeTab === 'measure'}
                        onPress={() => setActiveTab('measure')}
                    />
                    <DockItem
                        icon="cube-outline"
                        label="DOLLHOUSE"
                        isActive={activeTab === 'dollhouse'}
                        onPress={() => setActiveTab('dollhouse')}
                    />
                    <DockItem
                        icon="share-outline"
                        label="SHARE"
                        isActive={activeTab === 'share'}
                        onPress={() => setActiveTab('share')}
                    />
                </View>
            </BlurView>
        </Animated.View>
    );
};

// --- Main Screen ---

export default function UnlockedPropertyTourScreen() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('360');

    return (
        <Animated.View entering={FadeIn.duration(800)} className="flex-1 bg-[#050A15]">
            <SafeAreaView className="flex-1">
                {/* Top Section */}
                <Animated.View entering={FadeInDown.duration(600).delay(200)} className="flex-row justify-between items-start px-6 pt-4 z-20 pointer-events-box-none">
                    {/* Top Left Area */}
                    <View className="flex-1 pointer-events-none">
                        <LiveTourHeader />
                        <Text className="text-white text-3xl font-bold tracking-tight mt-6 shadow-xl leading-tight">
                            Main Bedroom
                        </Text>
                        <AccessBadge />
                    </View>

                    {/* Top Right Area */}
                    <TouchableOpacity
                        onPress={() => router.back()}
                        activeOpacity={0.8}
                        className="w-12 h-12 rounded-full bg-black/40 border border-white/10 items-center justify-center pointer-events-auto"
                    >
                        <Ionicons name="map-outline" size={20} color="white" />
                    </TouchableOpacity>
                </Animated.View>

                {/* Simulated 360 Environment View */}
                <View className="absolute inset-0 items-center justify-center z-10 pointer-events-box-none">
                    {/* Hotspot positioned somewhere on the screen */}
                    <View style={{ transform: [{ translateY: -20 }, { translateX: -40 }] }}>
                        <FloatingHotspot />
                    </View>
                </View>

                {/* Bottom Dock Navigation */}
                <BottomDock activeTab={activeTab} setActiveTab={setActiveTab} />
            </SafeAreaView>
        </Animated.View>
    );
}

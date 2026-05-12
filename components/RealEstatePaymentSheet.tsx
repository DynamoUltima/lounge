import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Dimensions, Modal, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    Easing,
    FadeIn,
    FadeOut,
    SlideInDown,
    SlideOutDown,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const { height } = Dimensions.get('window');

interface PaymentSheetProps {
    visible: boolean;
    onSuccess: () => void;
    onCancel: () => void;
}

// --- Helper Components ---

const PaymentRow = ({ label, value, isBold = false, hasDivider = true }: { label: string, value: string, isBold?: boolean, hasDivider?: boolean }) => (
    <View>
        <View className="flex-row justify-between items-center py-4 px-6 relative">
            <Text className="text-slate-400 text-[15px] font-medium tracking-wide">{label}</Text>
            <View className="flex-row flex-1 justify-end items-center gap-2">
                {label === 'Card' && (
                    <View className="w-8 h-5 bg-slate-600 rounded flex-row items-center justify-center">
                        <Text className="text-white text-[8px] font-bold tracking-wider">VISA</Text>
                    </View>
                )}
                <Text className={`text-white text-[15px] tracking-wide ${isBold ? 'font-bold text-lg' : 'font-medium'}`}>
                    {value}
                </Text>
                {label !== 'Total' && (
                    <Ionicons name="chevron-forward" size={16} color="#475569" className="opacity-60 absolute right-0 -mr-4" />
                )}
            </View>
        </View>
        {hasDivider && <View className="h-[1px] bg-slate-800 mx-6" />}
    </View>
);

const ProcessingIndicator = ({ isSuccess }: { isSuccess: boolean }) => {
    const rotation = useSharedValue(0);

    useEffect(() => {
        if (!isSuccess) {
            rotation.value = withRepeat(
                withTiming(360, {
                    duration: 1000,
                    easing: Easing.linear,
                }),
                -1 // Infinite repeat
            );
        } else {
            rotation.value = 0; // Reset rotation when successful
        }
    }, [isSuccess]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotateZ: `${rotation.value}deg` }],
        };
    });

    return (
        <View className="items-center justify-center mt-8 mb-12">
            {!isSuccess ? (
                <View className="items-center justify-center relative w-12 h-12 mb-4">
                    <Animated.View style={animatedStyle} className="absolute inset-0">
                        {/* Fake partial spinner ring */}
                        <View className="w-12 h-12 rounded-full border-[3px] border-slate-700 border-t-[#3b82f6] border-r-[#3b82f6]" />
                    </Animated.View>
                </View>
            ) : (
                <View className="w-12 h-12 rounded-full bg-blue-500 items-center justify-center mb-4">
                    <Ionicons name="checkmark" size={28} color="white" />
                </View>
            )}
            <Text className="text-white font-semibold text-base mb-1 tracking-wide">
                {isSuccess ? 'Payment Successful' : 'Processing...'}
            </Text>
            <Text className="text-slate-500 text-[13px] tracking-wide">
                {isSuccess ? 'Access Granted' : 'Confirming with Face ID'}
            </Text>
        </View>
    );
};

// --- Main Component ---

export default function RealEstatePaymentSheet({ visible, onSuccess, onCancel }: PaymentSheetProps) {
    const [isSuccess, setIsSuccess] = useState(false);

    // Simulated Processing Flow
    useEffect(() => {
        if (visible) {
            // Reset state every time it opens
            setIsSuccess(false);

            const timer = setTimeout(() => {
                setIsSuccess(true);
                // Wait another 1s to show the success state before auto-closing
                setTimeout(() => {
                    onSuccess();
                }, 1000);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [visible, onSuccess]);

    if (!visible) return null;

    return (
        <Modal transparent={true} visible={visible} animationType="none" statusBarTranslucent>
            <View className="flex-1 justify-end">
                {/* Full-screen dimmed overlay */}
                <Animated.View
                    entering={FadeIn.duration(300)}
                    exiting={FadeOut.duration(300)}
                    className="absolute inset-0"
                    style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
                />

                {/* Bottom Sheet Container */}
                <Animated.View
                    entering={SlideInDown.duration(400).damping(16)}
                    exiting={SlideOutDown.duration(300)}
                    style={{ height: height * 0.7, shadowColor: '#000', shadowOffset: { width: 0, height: -10 }, shadowOpacity: 0.25, shadowRadius: 20, elevation: 24 }}
                    className="w-full bg-[#111827] rounded-t-3xl flex-col"
                >
                    <SafeAreaView edges={['bottom', 'left', 'right']} className="flex-1 pt-3 pb-8">
                        {/* Drag Indicator */}
                        <View className="items-center mb-4">
                            <View className="w-10 h-1.5 bg-slate-700 rounded-full" />
                        </View>

                        {/* Top Header Row (Cancel) */}
                        <View className="flex-row justify-end px-6 mb-8 relative">
                            {/* Decorative hidden placeholder for centering */}
                            <Text className="opacity-0">Cancel</Text>

                            {/* Real Action */}
                            <TouchableOpacity onPress={onCancel} activeOpacity={0.7}>
                                <Text className="text-blue-500 font-medium text-base tracking-wide">Cancel</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Payment Details Box */}
                        <View className="mx-6 bg-[#1f2937] rounded-2xl overflow-hidden mb-auto mt-2 border border-slate-800" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }}>
                            <PaymentRow label="Property" value="Main Bedroom 360° Access" />
                            <PaymentRow label="Card" value="•••• 4242" />
                            <PaymentRow label="Total" value="$4.99" isBold={true} hasDivider={false} />
                        </View>

                        {/* Processing State Footer */}
                        <ProcessingIndicator isSuccess={isSuccess} />
                    </SafeAreaView>
                </Animated.View>
            </View>
        </Modal>
    );
}

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Main Screen ---

export default function CheckoutScreen() {
    const router = useRouter();
    const [selectedPayment, setSelectedPayment] = useState<'card' | 'apple_pay'>('card');
    const [savePayment, setSavePayment] = useState(true);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="flex-1 bg-white">
                    <SafeAreaView className="flex-1" edges={['top']}>

                        {/* Header */}
                        <View className="px-6 pt-2 pb-4 flex-row items-center justify-between z-10 bg-white">
                            <TouchableOpacity
                                onPress={() => router.back()}
                                className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center active:bg-slate-50 transition-colors"
                            >
                                <Ionicons name="arrow-back" size={24} color="#475569" />
                            </TouchableOpacity>

                            <Text className="text-base font-semibold text-slate-900 tracking-tight">
                                Checkout
                            </Text>

                            <View className="w-10" />
                        </View>

                        {/* Scrollable Content */}
                        <ScrollView
                            className="flex-1 bg-white"
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 160 }}
                        >
                            <Animated.View entering={FadeIn.duration(500)} className="px-6 pt-2">

                                {/* Order Summary Card */}
                                <View className="bg-slate-900 rounded-2xl p-5 mb-8 overflow-hidden shadow-xl shadow-slate-900/10 relative">
                                    <View className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full opacity-20 -mr-10 -mt-10 blur-2xl" />

                                    <View className="relative z-10 flex-row justify-between items-start">
                                        <View>
                                            <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Total to pay</Text>
                                            <Text className="text-white text-3xl font-semibold tracking-tight">$29.00</Text>
                                            <Text className="text-slate-400 text-xs mt-1 font-medium">Billed monthly</Text>
                                        </View>
                                        <View className="bg-white/10 rounded-xl p-2.5 items-center justify-center">
                                            <Ionicons name="recording" size={20} color="#fbbf24" />
                                        </View>
                                    </View>

                                    <View className="mt-6 pt-4 border-t border-white/10 flex-row justify-between items-center">
                                        <Text className="text-sm font-medium text-slate-200">Premium Plan</Text>
                                        <TouchableOpacity>
                                            <Text className="text-xs text-indigo-300 font-medium tracking-wide">Change plan</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* Payment Methods Header */}
                                <Text className="text-sm font-semibold text-slate-900 mb-4 tracking-tight">Payment Method</Text>

                                <View className="mb-8 gap-3">

                                    {/* Credit Card Option */}
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        onPress={() => setSelectedPayment('card')}
                                        className={`w-full border rounded-2xl p-4 transition-all relative overflow-hidden ${selectedPayment === 'card' ? 'border-indigo-200 bg-indigo-50/40' : 'border-slate-200 bg-white'}`}
                                    >
                                        <View className="flex-row items-center gap-3 mb-1">
                                            {/* Radio Circle */}
                                            <View className={`w-5 h-5 rounded-full border items-center justify-center ${selectedPayment === 'card' ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'}`}>
                                                {selectedPayment === 'card' && <View className="w-2 h-2 bg-white rounded-full" />}
                                            </View>
                                            <Text className={`text-sm tracking-wide flex-1 ${selectedPayment === 'card' ? 'font-semibold text-indigo-900' : 'font-medium text-slate-700'}`}>Credit Card</Text>
                                            <Ionicons name="card-outline" size={20} color={selectedPayment === 'card' ? '#818cf8' : '#94a3b8'} />
                                        </View>

                                        {/* Card Inputs (Expandable) */}
                                        {selectedPayment === 'card' && (
                                            <Animated.View entering={SlideInDown.duration(400).springify()} className="pl-8 pt-4 gap-3">
                                                <View>
                                                    <Text className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider mb-1.5 ml-1">Card Number</Text>
                                                    <View className="w-full h-12 bg-white border border-indigo-100 rounded-xl px-4 flex-row items-center justify-between shadow-sm shadow-indigo-100/20">
                                                        <View className="flex-row items-center gap-2 flex-1 relative">
                                                            <Ionicons name="card-outline" size={16} color="#818cf8" />
                                                            <TextInput
                                                                className="flex-1 text-indigo-900 text-[13px] font-medium tracking-widest pl-1 relative"
                                                                defaultValue="4242 4242 4242 4242"
                                                                keyboardType="number-pad"
                                                            />
                                                        </View>
                                                        <Ionicons name="checkmark-circle" size={16} color="#22c55e" />
                                                    </View>
                                                </View>

                                                <View className="flex-row gap-3">
                                                    <View className="flex-1">
                                                        <Text className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider mb-1.5 ml-1">Expiry</Text>
                                                        <View className="w-full h-12 bg-white border border-indigo-100 rounded-xl px-4 justify-center shadow-sm shadow-indigo-100/20">
                                                            <TextInput
                                                                className="text-indigo-900 text-[13px] font-medium tracking-widest"
                                                                placeholder="MM/YY"
                                                                placeholderTextColor="#a5b4fc"
                                                                keyboardType="number-pad"
                                                            />
                                                        </View>
                                                    </View>
                                                    <View className="flex-1">
                                                        <Text className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider mb-1.5 ml-1">CVC</Text>
                                                        <View className="w-full h-12 bg-white border border-indigo-100 rounded-xl px-4 flex-row items-center justify-between shadow-sm shadow-indigo-100/20">
                                                            <TextInput
                                                                className="flex-1 text-indigo-900 text-[13px] font-medium tracking-widest"
                                                                placeholder="123"
                                                                placeholderTextColor="#a5b4fc"
                                                                keyboardType="number-pad"
                                                                secureTextEntry
                                                            />
                                                            <Ionicons name="help-circle-outline" size={16} color="#a5b4fc" />
                                                        </View>
                                                    </View>
                                                </View>
                                            </Animated.View>
                                        )}
                                    </TouchableOpacity>

                                    {/* Apple Pay Option */}
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        onPress={() => setSelectedPayment('apple_pay')}
                                        className={`w-full border rounded-2xl p-4 transition-all relative ${selectedPayment === 'apple_pay' ? 'border-slate-800 bg-slate-50' : 'border-slate-200 bg-white'}`}
                                    >
                                        <View className="flex-row items-center gap-3">
                                            {/* Radio Circle */}
                                            <View className={`w-5 h-5 rounded-full border items-center justify-center ${selectedPayment === 'apple_pay' ? 'border-slate-800 bg-slate-800' : 'border-slate-300'}`}>
                                                {selectedPayment === 'apple_pay' && <View className="w-2 h-2 bg-white rounded-full" />}
                                            </View>
                                            <Text className={`text-sm tracking-wide flex-1 ${selectedPayment === 'apple_pay' ? 'font-semibold text-slate-900' : 'font-medium text-slate-700'}`}>Apple Pay</Text>
                                            <Ionicons name="logo-apple" size={20} color={selectedPayment === 'apple_pay' ? '#0f172a' : '#94a3b8'} />
                                        </View>
                                    </TouchableOpacity>

                                </View>

                                {/* Billing Details Header */}
                                <Text className="text-sm font-semibold text-slate-900 mb-4 tracking-tight">Billing Details</Text>

                                <View className="bg-white border border-slate-100 rounded-2xl p-1 mb-8">
                                    <View className="flex-row items-center justify-between p-3 border-b border-slate-50">
                                        <View className="flex-row items-center gap-3">
                                            <View className="w-8 h-8 rounded-full bg-slate-50 items-center justify-center border border-slate-100">
                                                <Ionicons name="person-outline" size={14} color="#64748b" />
                                            </View>
                                            <View>
                                                <Text className="text-[13px] font-semibold text-slate-900 tracking-tight">Alex Morgan</Text>
                                                <Text className="text-[11px] text-slate-400 font-medium">alex.morgan@example.com</Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity className="px-2 py-1 active:bg-indigo-50 rounded-lg">
                                            <Text className="text-[11px] font-bold text-indigo-600">Edit</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={() => setSavePayment(!savePayment)}
                                        className="p-3 pl-4 flex-row items-center gap-2.5"
                                    >
                                        <View className={`w-4 h-4 rounded items-center justify-center border ${savePayment ? 'bg-indigo-600 border-indigo-600' : 'bg-transparent border-slate-300'}`}>
                                            {savePayment && <Ionicons name="checkmark" size={12} color="white" />}
                                        </View>
                                        <Text className="text-[13px] text-slate-500 font-medium tracking-wide">Save payment info for future billing</Text>
                                    </TouchableOpacity>
                                </View>

                            </Animated.View>
                        </ScrollView>

                        {/* Sticky Bottom Actions */}
                        <View className="absolute bottom-0 left-0 w-full bg-white/95 border-t border-slate-100 px-6 pt-4 pb-8 z-20">
                            <View className="flex-row items-center justify-between text-xs text-slate-400 mb-3 px-1">
                                <View className="flex-row items-center gap-1.5 opacity-80">
                                    <Ionicons name="shield-checkmark" size={14} color="#22c55e" />
                                    <Text className="font-semibold text-[11px] text-slate-500 tracking-wide uppercase">SSL Secure Payment</Text>
                                </View>
                                <Text className="font-medium text-[11px] text-slate-400">Powered by Stripe</Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => router.push('/success')}
                                className="w-full bg-[#4f46e5] active:bg-[#4338ca] flex-row items-center justify-center gap-2 h-14 rounded-2xl shadow-xl shadow-indigo-600/30"
                            >
                                <Text className="text-white font-semibold text-[15px] tracking-wide">
                                    Confirm Payment — $29.00
                                </Text>
                                <Ionicons name="arrow-forward" size={18} color="white" />
                            </TouchableOpacity>
                        </View>

                    </SafeAreaView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

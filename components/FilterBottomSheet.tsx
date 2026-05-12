import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, SlideInDown, SlideOutDown } from 'react-native-reanimated';

const { height } = Dimensions.get('window');

interface FilterBottomSheetProps {
    visible: boolean;
    onClose: () => void;
}

export default function FilterBottomSheet({ visible, onClose }: FilterBottomSheetProps) {
    const propertyTypes = ['Apartment', 'House', 'Villa', 'Loft'];
    const bedrooms = ['Any', '1', '2', '3+', '4+'];

    if (!visible) return null;

    return (
        <View className="absolute inset-0 z-50 justify-end">
            {/* Backdrop */}
            <Animated.View
                entering={FadeIn}
                className="absolute inset-0"
                style={{ backgroundColor: 'rgba(15, 23, 42, 0.2)' }}
            >
                <TouchableOpacity style={{ flex: 1 }} onPress={onClose} />
            </Animated.View>

            {/* Bottom Sheet Content */}
            <Animated.View
                entering={SlideInDown.duration(300)}
                exiting={SlideOutDown}
                className="bg-white w-full rounded-t-[32px] p-6 pb-8"
                style={{ maxHeight: height * 0.85, shadowColor: '#000', shadowOffset: { width: 0, height: 25 }, shadowOpacity: 0.25, shadowRadius: 50, elevation: 24 }}
            >
                {/* Handle */}
                <View className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6" />

                {/* Header */}
                <View className="flex-row items-center justify-between mb-8">
                    <Text className="text-xl font-semibold tracking-tight text-slate-900">Filters</Text>
                    <TouchableOpacity>
                        <Text className="text-xs font-medium text-slate-400">Reset all</Text>
                    </TouchableOpacity>
                </View>

                {/* Price Range */}
                <View className="mb-8">
                    <View className="flex-row justify-between items-end mb-4">
                        <Text className="text-sm font-medium text-slate-900">Price Range</Text>
                        <Text className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg border border-indigo-100">$1,200 - $3,800</Text>
                    </View>

                    {/* Histogram Visual */}
                    <View className="flex-row items-end gap-[3px] h-10 mb-2 px-1" style={{ opacity: 0.5 }}>
                        <View className="flex-1 bg-slate-200 rounded-t-sm h-[20%]" />
                        <View className="flex-1 bg-slate-200 rounded-t-sm h-[40%]" />
                        <View className="flex-1 bg-indigo-200 rounded-t-sm h-[60%]" />
                        <View className="flex-1 bg-indigo-300 rounded-t-sm h-[85%]" />
                        <View className="flex-1 bg-indigo-300 rounded-t-sm h-[50%]" />
                        <View className="flex-1 bg-indigo-200 rounded-t-sm h-[70%]" />
                        <View className="flex-1 bg-indigo-200 rounded-t-sm h-[45%]" />
                        <View className="flex-1 bg-slate-200 rounded-t-sm h-[30%]" />
                        <View className="flex-1 bg-slate-200 rounded-t-sm h-[15%]" />
                    </View>

                    {/* Range Slider (Simulated) */}
                    <View className="relative h-6 justify-center">
                        <View className="absolute left-0 right-0 h-1.5 bg-slate-100 rounded-full" />
                        <View className="absolute left-[22%] right-[22%] h-1.5 bg-indigo-600 rounded-full" />

                        {/* Thumb Left */}
                        <View className="absolute left-[22%] w-6 h-6 bg-white border border-slate-200 rounded-full -ml-3 items-center justify-center" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }}>
                            <View className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
                        </View>

                        {/* Thumb Right */}
                        <View className="absolute right-[22%] w-6 h-6 bg-white border border-slate-200 rounded-full -mr-3 items-center justify-center" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }}>
                            <View className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
                        </View>
                    </View>
                </View>

                {/* Property Type */}
                <View className="mb-8">
                    <Text className="text-sm font-medium text-slate-900 mb-3">Property Type</Text>
                    <View className="flex-row flex-wrap gap-2.5">
                        {propertyTypes.map((type, index) => (
                            <TouchableOpacity
                                key={type}
                                className={`px-4 py-2.5 rounded-xl border ${index === 0 ? 'bg-slate-900 border-slate-900' : 'bg-white border-slate-200'}`}
                                style={index === 0 ? { shadowColor: '#0f172a', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 4 } : undefined}
                            >
                                <Text className={`text-xs font-medium ${index === 0 ? 'text-white' : 'text-slate-600'}`}>
                                    {type}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Bedrooms */}
                <View className="mb-8">
                    <Text className="text-sm font-medium text-slate-900 mb-3">Bedrooms</Text>
                    <View className="flex-row gap-1 p-1.5 bg-slate-100 rounded-xl border border-slate-100">
                        {bedrooms.map((bed, index) => (
                            <TouchableOpacity
                                key={bed}
                                className={`flex-1 py-2 rounded-lg items-center justify-center ${index === 0 ? 'bg-white border border-slate-200' : ''}`}
                                style={index === 0 ? { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 } : undefined}
                            >
                                <Text className={`text-xs font-medium ${index === 0 ? 'text-slate-900 font-semibold' : 'text-slate-500'}`}>
                                    {bed}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Footer Buttons */}
                <View className="flex-row gap-3">
                    <TouchableOpacity className="w-14 items-center justify-center py-4 bg-slate-100 rounded-2xl">
                        <Ionicons name="refresh-outline" size={20} color="#0f172a" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        className="flex-1 py-4 bg-slate-900 rounded-2xl items-center justify-center"
                        style={{ shadowColor: '#0f172a', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 15, elevation: 10 }}
                        onPress={onClose}
                    >
                        <Text className="text-white font-semibold text-sm">Show 148 results</Text>
                    </TouchableOpacity>
                </View>

            </Animated.View>
        </View>
    );
}

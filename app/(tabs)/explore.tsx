import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomBottomNav from '../../components/CustomBottomNav';

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white relative">
      {/* Map Background Layer */}
      <View className="absolute inset-0 z-0">
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' }}
          style={{ width: '100%', height: '100%', opacity: 0.6 }}
          contentFit="cover"
        />
        <View className="absolute inset-0 bg-indigo-50/10" />
      </View>

      {/* Top Floating Search & Filters */}
      <LinearGradient
        colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.5)', 'transparent']}
        className="absolute top-0 left-0 w-full z-20 px-6 pb-4"
        style={{ paddingTop: insets.top + 10 }}
      >
        {/* Search Bar */}
        <View className="flex-row gap-3 mb-4">
          <View className="flex-1 relative shadow-lg shadow-slate-200/50 rounded-2xl">
            <Ionicons name="search-outline" size={20} color="#0f172a" style={{ position: 'absolute', left: 16, top: 12, zIndex: 10 }} />
            <TextInput
              value="San Francisco, CA"
              className="w-full bg-white border border-white text-sm font-semibold rounded-2xl py-3.5 pl-11 pr-4 text-slate-900 shadow-sm"
            />
          </View>
          <TouchableOpacity className="w-12 h-[46px] bg-white rounded-2xl items-center justify-center shadow-lg shadow-slate-200/50 border border-white active:scale-95">
            <Ionicons name="options-outline" size={22} color="#0f172a" />
          </TouchableOpacity>
        </View>

        {/* Horizontal Filter Chips */}
        <View className="flex-row gap-2">
          <TouchableOpacity className="px-4 py-2 bg-slate-900 rounded-full shadow-md">
            <Text className="text-white text-xs font-medium">Any Price</Text>
          </TouchableOpacity>
          <TouchableOpacity className="px-4 py-2 bg-white rounded-full shadow-md flex-row items-center gap-1">
            <Ionicons name="home-outline" size={14} color="#475569" />
            <Text className="text-slate-600 text-xs font-medium">House</Text>
          </TouchableOpacity>
          <TouchableOpacity className="px-4 py-2 bg-white rounded-full shadow-md flex-row items-center gap-1">
            <Ionicons name="bed-outline" size={14} color="#475569" />
            <Text className="text-slate-600 text-xs font-medium">2+ Beds</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Map Pins Layer */}
      <View className="absolute inset-0 z-10 pointer-events-none">
        {/* Pin 1: Inactive */}
        <TouchableOpacity className="absolute top-[30%] left-[20%] bg-white border border-slate-100 px-3 py-1.5 rounded-full shadow-lg">
          <Text className="text-xs font-bold tracking-tight text-slate-900">$850k</Text>
        </TouchableOpacity>

        {/* Pin 2: Active (Selected) */}
        <TouchableOpacity className="absolute top-[42%] left-[45%] z-20 items-center justify-center">
          <View className="bg-slate-900 px-3.5 py-2 rounded-full shadow-xl shadow-slate-900/40 transform scale-110">
            <Text className="text-xs font-bold tracking-tight text-white">$2.4k</Text>
          </View>
          <View className="w-2 h-2 bg-slate-900 transform rotate-45 -mt-1" />
        </TouchableOpacity>

        {/* Pin 3: Inactive */}
        <TouchableOpacity className="absolute top-[35%] right-[15%] bg-white border border-slate-100 px-3 py-1.5 rounded-full shadow-lg">
          <Text className="text-xs font-bold tracking-tight text-slate-900">$1.2M</Text>
        </TouchableOpacity>

        {/* Pin 4: Inactive */}
        <TouchableOpacity className="absolute bottom-[40%] left-[15%] bg-white border border-slate-100 px-3 py-1.5 rounded-full shadow-lg">
          <Text className="text-xs font-bold tracking-tight text-slate-900">$3.1k</Text>
        </TouchableOpacity>

        {/* Pin 5: Inactive */}
        <TouchableOpacity className="absolute bottom-[45%] right-[25%] bg-white border border-slate-100 px-3 py-1.5 rounded-full shadow-lg">
          <Text className="text-xs font-bold tracking-tight text-slate-900">$4.5k</Text>
        </TouchableOpacity>
      </View>

      {/* Floating Action Button (List View) */}
      <TouchableOpacity
        className="absolute right-6 z-20 bg-white w-12 h-12 rounded-full shadow-xl items-center justify-center border border-slate-100 active:scale-95"
        style={{ bottom: 130 + insets.bottom }}
      >
        <Ionicons name="list-outline" size={24} color="#0f172a" />
      </TouchableOpacity>

      {/* Bottom Property Card (Selected Pin) */}
      <View className="absolute left-4 right-4 z-20" style={{ bottom: 90 + insets.bottom }}>
        <View className="bg-white p-3 rounded-3xl shadow-2xl shadow-slate-900/10 border border-slate-100 flex-row gap-3">
          {/* Image */}
          <View className="w-24 h-24 rounded-2xl bg-gray-100 overflow-hidden relative">
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }}
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
            />
            <TouchableOpacity className="absolute top-2 right-2">
              <Ionicons name="heart-outline" size={16} color="white" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View className="flex-1 justify-center py-1">
            <View className="flex-row justify-between items-start mb-1">
              <Text className="text-sm font-semibold text-slate-900 tracking-tight">Modern Loft Studio</Text>
              <View className="flex-row items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded-md">
                <Ionicons name="star" size={10} color="#eab308" />
                <Text className="text-xs text-yellow-500 font-medium">4.8</Text>
              </View>
            </View>
            <Text className="text-xs text-slate-400 font-medium mb-3" numberOfLines={1}>1024 Market St, San Francisco</Text>

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="flex-row items-center gap-1">
                  <Ionicons name="bed-outline" size={12} color="#64748b" />
                  <Text className="text-[10px] font-medium text-slate-500">1</Text>
                </View>
                <View className="flex-row items-center gap-1">
                  <MaterialCommunityIcons name="shower" size={12} color="#64748b" />
                  <Text className="text-[10px] font-medium text-slate-500">1</Text>
                </View>
                <View className="flex-row items-center gap-1">
                  <MaterialCommunityIcons name="vector-square" size={12} color="#64748b" />
                  <Text className="text-[10px] font-medium text-slate-500">650</Text>
                </View>
              </View>
              <View>
                <Text className="text-sm font-bold text-indigo-600 tracking-tight">$2,400</Text>
                <Text className="text-[10px] text-slate-400 text-right">/mo</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <CustomBottomNav activeTab="explore" />

      {/* Subtle fade overlay at bottom */}
      <LinearGradient
        colors={['transparent', 'rgba(255,255,255,0.8)']}
        className="absolute bottom-[80px] left-0 w-full h-8 pointer-events-none z-10"
      />
    </View>
  );
}

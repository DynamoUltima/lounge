import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomBottomNav from '../../components/CustomBottomNav';
import FilterBottomSheet from '../../components/FilterBottomSheet';

const { width } = Dimensions.get('window');

const CATEGORIES = [
  { id: 1, name: 'Apts', icon: 'office-building', type: 'MaterialCommunityIcons' },
  { id: 2, name: 'Houses', icon: 'home-outline', type: 'Ionicons' },
  { id: 3, name: 'Hostel', icon: 'bed-outline', type: 'Ionicons' },
  { id: 4, name: 'Land', icon: 'map-outline', type: 'Ionicons' },
];

const PROPERTIES = [
  {
    id: 1,
    title: 'Modern Loft Studio',
    address: '1024 Market St, San Francisco',
    price: '$2,400',
    priceUnit: '/month',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    specs: { bed: 1, bath: 1, sqft: 650 },
    agent: { name: 'Sarah J.', image: 'https://i.pravatar.cc/150?img=12' },
    type: 'rent',
    badge: 'For Rent'
  },
  {
    id: 2,
    title: 'Beverly Hills Villa',
    address: '90210 Beverly Blvd, LA',
    price: '$4.2M',
    priceUnit: 'Buy now',
    image: 'https://images.unsplash.com/photo-1600596542815-2a429feb0325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    specs: { bed: 5, bath: 4, sqft: 3200 },
    agent: { name: 'Mike R.', image: 'https://i.pravatar.cc/150?img=68' },
    type: 'sale',
    badge: 'For Sale',
    hasTour: true
  },
  {
    id: 3,
    title: 'Sunset Valley Plot',
    address: 'Route 66, Arizona',
    price: '$120k',
    priceUnit: '',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    specs: { bed: 0, bath: 0, sqft: 0 }, // Land doesn't have bed/bath usually
    agent: { name: '', image: '' },
    type: 'land',
    badge: 'Land For Sale',
    landSize: '2.5 Acres'
  }
];

export default function HomeScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState(1);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1" edges={['top', 'left', 'right']}>
        {/* Header */}
        <View className="px-6 pt-4 pb-4 flex-row justify-between items-center bg-white z-30">
          <View className="flex-col">
            <Text className="text-xs text-slate-400 font-medium uppercase tracking-wider">Location</Text>
            <TouchableOpacity className="flex-row items-center gap-1">
              <Text className="text-slate-900 font-semibold tracking-tight text-sm">San Francisco, CA</Text>
              <Ionicons name="chevron-down" size={12} color="#94a3b8" />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center gap-3">
            <TouchableOpacity className="relative w-10 h-10 rounded-full border border-slate-100 items-center justify-center bg-white">
              <Ionicons name="notifications-outline" size={20} color="#475569" />
              <View className="absolute top-2.5 right-3 w-1.5 h-1.5 bg-red-500 rounded-full border border-white" />
            </TouchableOpacity>
            <View className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
              <Image source={{ uri: 'https://i.pravatar.cc/150?img=33' }} style={{ width: '100%', height: '100%' }} contentFit="cover" />
            </View>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          {/* Search & Filters */}
          <View className="px-6 mb-6">
            <Text className="text-2xl font-medium tracking-tight text-slate-900 mb-6 leading-tight">
              Find your best{'\n'}
              <Text className="text-slate-400">living experience</Text>
            </Text>

            {/* Search Input */}
            <View className="flex-row gap-3 mb-6">
              <View className="flex-1 relative justify-center">
                <Ionicons name="search-outline" size={20} color="#94a3b8" style={{ position: 'absolute', left: 16, zIndex: 10 }} />
                <TextInput
                  placeholder="Search address, city..."
                  placeholderTextColor="#94a3b8"
                  className="w-full bg-slate-50 border border-slate-200 text-sm font-medium rounded-2xl py-3.5 pl-11 pr-4"
                />
              </View>
              <TouchableOpacity
                className="w-12 h-[46px] bg-slate-900 rounded-2xl items-center justify-center"
                onPress={() => setIsFilterVisible(true)}
              >
                <Ionicons name="options-outline" size={22} color="white" />
              </TouchableOpacity>
            </View>

            {/* Categories */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 20 }}>
              <View className="flex-row gap-6">
                {CATEGORIES.map((cat) => (
                  <TouchableOpacity
                    key={cat.id}
                    onPress={() => setActiveCategory(cat.id)}
                    className="items-center gap-2 mr-2"
                  >
                    <View 
                      className={`w-14 h-14 rounded-2xl items-center justify-center border ${activeCategory === cat.id ? 'bg-slate-900 border-slate-900' : 'bg-white border-slate-200'}`}
                      style={activeCategory === cat.id ? { shadowColor: '#0f172a', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 5 } : undefined}
                    >
                      {cat.type === 'MaterialCommunityIcons' ? (
                        <MaterialCommunityIcons name={cat.icon as any} size={24} color={activeCategory === cat.id ? 'white' : '#94a3b8'} />
                      ) : (
                        <Ionicons name={cat.icon as any} size={24} color={activeCategory === cat.id ? 'white' : '#94a3b8'} />
                      )}
                    </View>
                    <Text className={`text-xs font-semibold ${activeCategory === cat.id ? 'text-slate-900' : 'text-slate-500'}`}>{cat.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Listings Feed */}
          <View className="px-6 gap-8">
            {PROPERTIES.map((prop) => (
              <TouchableOpacity
                key={prop.id}
                className="group relative"
                activeOpacity={0.9}
                onPress={() => router.push(prop.hasTour ? '/tour-detail' : '/detail')}
              >
                <View 
                  className={`relative w-full ${prop.type === 'land' ? 'h-52' : prop.hasTour ? 'h-80' : 'h-64'} rounded-3xl overflow-hidden mb-4 bg-gray-100 border border-slate-100`}
                  style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 }}
                >
                  <Image source={{ uri: prop.image }} style={{ width: '100%', height: '100%' }} contentFit="cover" transition={100} />

                  {prop.hasTour && (
                    <LinearGradient
                      colors={['rgba(15, 23, 42, 0.9)', 'rgba(15, 23, 42, 0.2)', 'transparent']}
                      start={{ x: 0.5, y: 1 }}
                      end={{ x: 0.5, y: 0 }}
                      style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '100%' }}
                    />
                  )}

                  <View 
                    className={`absolute top-4 left-4 ${prop.type === 'sale' ? 'bg-indigo-600 text-white' : prop.type === 'land' ? 'bg-slate-900 text-white' : 'px-3 py-1.5 rounded-full'}`}
                    style={prop.type !== 'sale' && prop.type !== 'land' ? { backgroundColor: 'rgba(255,255,255,0.9)', borderColor: 'rgba(255,255,255,0.2)', borderWidth: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 } : { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 }}
                  >
                    <Text className={`text-xs font-semibold ${prop.type === 'sale' || prop.type === 'land' ? 'text-white' : 'text-slate-900'}`}>{prop.badge}</Text>
                  </View>

                  {prop.type === 'rent' && (
                    <>
                      <TouchableOpacity 
                        className="absolute top-4 right-4 w-8 h-8 rounded-full items-center justify-center"
                        style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
                      >
                        <Ionicons name="heart-outline" size={18} color="white" />
                      </TouchableOpacity>
                      <View 
                        className="absolute bottom-4 right-4 px-2.5 py-1.5 rounded-lg flex-row items-center gap-1.5"
                        style={{ backgroundColor: 'rgba(15,23,42,0.8)' }}
                      >
                        <Ionicons name="images-outline" size={12} color="white" />
                        <Text className="text-white text-xs font-medium">6 Photos</Text>
                      </View>
                    </>
                  )}

                  {prop.type === 'land' && (
                    <View 
                      className="absolute bottom-4 left-4 px-3 py-1.5 rounded-xl flex-row items-center gap-1"
                      style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
                    >
                      <MaterialCommunityIcons name="arrow-expand-all" size={14} color="#0f172a" />
                      <Text className="text-xs font-semibold text-slate-900">{prop.landSize}</Text>
                    </View>
                  )}

                  {prop.hasTour && (
                    <View className="absolute bottom-0 w-full p-4">
                      <BlurView intensity={20} tint="light" className="overflow-hidden rounded-2xl border" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                        <View className="p-4 gap-3" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                          <View className="flex-row items-start justify-between">
                            <View className="flex-row items-center gap-2">
                              <View className="w-8 h-8 rounded-full items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                                <Ionicons name="scan-outline" size={18} color="white" />
                              </View>
                              <View>
                                <Text className="text-sm font-medium text-white">Virtual 360° Tour</Text>
                                <Text className="text-[10px]" style={{ color: 'rgba(255,255,255,0.7)' }}>Explore every corner remotely</Text>
                              </View>
                            </View>
                            <Ionicons name="lock-closed-outline" size={20} color="rgba(255,255,255,0.6)" />
                          </View>
                          <TouchableOpacity className="w-full bg-white py-3 rounded-xl flex-row items-center justify-center gap-2">
                            <Text className="text-slate-900 text-xs font-semibold">Unlock Tour</Text>
                            <View className="bg-slate-900 px-1.5 py-0.5 rounded">
                              <Text className="text-white text-[10px] font-bold">$4.99</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </BlurView>
                    </View>
                  )}
                </View>

                <View className="flex-row justify-between items-start mb-2">
                  <View>
                    <Text className="text-lg font-semibold text-slate-900 tracking-tight leading-none mb-1">{prop.title}</Text>
                    <View className="flex-row items-center gap-1">
                      <Ionicons name="location-outline" size={14} color="#94a3b8" />
                      <Text className="text-slate-500 text-xs font-medium">{prop.address}</Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className={`text-lg font-semibold tracking-tight ${prop.type === 'rent' ? 'text-indigo-600' : 'text-slate-900'}`}>{prop.price}</Text>
                    {prop.priceUnit ? <Text className="text-xs text-slate-400 font-medium">{prop.priceUnit}</Text> : null}
                  </View>
                </View>

                {prop.type !== 'land' && (
                  <View className="flex-row items-center justify-between border-t border-slate-100 pt-3 mt-3">
                    <View className="flex-row gap-4">
                      <View className="flex-row items-center gap-1">
                        <Ionicons name="bed-outline" size={16} color="#64748b" />
                        <Text className="text-slate-500 text-xs font-medium">{prop.specs?.bed} Bed</Text>
                      </View>
                      <View className="flex-row items-center gap-1">
                        <MaterialCommunityIcons name="shower" size={16} color="#64748b" />
                        <Text className="text-slate-500 text-xs font-medium">{prop.specs?.bath} Bath</Text>
                      </View>
                      <View className="flex-row items-center gap-1">
                        <MaterialCommunityIcons name="vector-square" size={16} color="#64748b" />
                        <Text className="text-slate-500 text-xs font-medium">{prop.specs?.sqft} sqft</Text>
                      </View>
                    </View>
                    <View className="flex-row items-center gap-2 pl-4 border-l border-slate-100">
                      <Image source={{ uri: prop.agent?.image }} style={{ width: 24, height: 24, borderRadius: 12 }} />
                      <Text className="text-xs text-slate-900 font-medium">{prop.agent?.name}</Text>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Bottom Navigation */}
      <CustomBottomNav activeTab="home" />

      {/* Filter Bottom Sheet */}
      <FilterBottomSheet
        visible={isFilterVisible}
        onClose={() => setIsFilterVisible(false)}
      />
    </View>
  );
}

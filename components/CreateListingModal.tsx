import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { auth, db, storage } from '../firebaseConfig';

interface CreateListingModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function CreateListingModal({ visible, onClose }: CreateListingModalProps) {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Step 1 State
    const [propertyType, setPropertyType] = useState<'house' | 'apartment' | 'commercial'>('house');
    const [isNegotiable, setIsNegotiable] = useState(true);
    const [title, setTitle] = useState('');
    const [sqft, setSqft] = useState('');

    // Images State
    const [images, setImages] = useState<string[]>([]);

    // Step 2 State
    const [bedrooms, setBedrooms] = useState(2);
    const [bathrooms, setBathrooms] = useState(1);
    const [amenities, setAmenities] = useState<string[]>(['Wi-Fi', 'AC']);
    const [description, setDescription] = useState('');

    // Step 3 State
    const [rentPrice, setRentPrice] = useState('3200');
    const [requireDeposit, setRequireDeposit] = useState(true);
    const [availability, setAvailability] = useState<'immediate' | 'date'>('immediate');

    const toggleAmenity = (id: string) => {
        setAmenities(prev =>
            prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
        );
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setImages(prev => [...prev, result.assets[0].uri]);
        }
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const uploadImageAsync = async (uri: string) => {
        console.log(`[uploadImageAsync] Starting upload for URI: ${uri}`);
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            const filename = uri.substring(uri.lastIndexOf('/') + 1) + '-' + Date.now();
            // Note: Fixed spacing in the storage path which might have been causing the invalid path issue
            const storagePath = `listings/${filename}`;
            console.log(`[uploadImageAsync] Blob created. Uploading to: ${storagePath}`);
            const storageRef = ref(storage, storagePath);
            await uploadBytes(storageRef, blob);
            const downloadUrl = await getDownloadURL(storageRef);
            console.log(`[uploadImageAsync] Upload successful. URL: ${downloadUrl}`);
            return downloadUrl;
        } catch (error) {
            console.error(`[uploadImageAsync] Error uploading image:`, error);
            throw error;
        }
    };

    const publishListing = async () => {
        console.log(`[publishListing] Triggered publish listing process.`);
        if (!auth.currentUser) {
            console.log(`[publishListing] Error: User not logged in.`);
            Alert.alert("Error", "You must be logged in to create a listing.");
            return;
        }

        try {
            setIsLoading(true);
            console.log(`[publishListing] User ID: ${auth.currentUser.uid}`);
            console.log(`[publishListing] Starting to upload ${images.length} images...`);

            // Upload all images and collect their download URLs
            const uploadedImageUrls = await Promise.all(
                images.map(imageUri => uploadImageAsync(imageUri))
            );

            console.log(`[publishListing] All images uploaded successfully. URLs:`, uploadedImageUrls);

            const payload = {
                userId: auth.currentUser.uid,
                propertyType,
                isNegotiable,
                title,
                sqft: Number(sqft) || 0,
                bedrooms,
                bathrooms,
                amenities,
                description,
                rentPrice: Number(rentPrice) || 0,
                requireDeposit,
                availability,
                images: uploadedImageUrls,
                createdAt: serverTimestamp()
            };

            console.log(`[publishListing] Saving payload to Firestore:`, JSON.stringify(payload, null, 2));
            const docRef = await addDoc(collection(db, 'listings'), payload);
            console.log(`[publishListing] Listing successfully saved to Firestore with ID: ${docRef.id}`);

            // Success
            setStep(4);
        } catch (error: any) {
            console.error(`[publishListing] Error during publish process:`, error);
            Alert.alert("Error Publishing", error.message || "An error occurred while saving your listing.");
        } finally {
            setIsLoading(false);
            console.log(`[publishListing] Publish process finished (success or failure).`);
        }
    };

    if (!visible) return null;

    return (
        <View style={[StyleSheet.absoluteFill, { zIndex: 101, elevation: 101 }]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <View className="flex-1 justify-end relative">

                    {/* Background Backdrop */}
                    <Animated.View entering={FadeIn.duration(200)} className="absolute inset-0">
                        <Pressable className="flex-1" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }} onPress={onClose} />
                    </Animated.View>

                    {/* Bottom Sheet Container */}
                    <Animated.View
                        entering={SlideInDown.duration(400).springify().damping(25).stiffness(120)}
                        className="bg-white rounded-t-[32px] flex flex-col pt-3"
                        style={{ shadowColor: '#000', shadowOffset: { width: 0, height: -10 }, shadowOpacity: 0.1, shadowRadius: 40, elevation: 15 }}
                        style={{ height: '90%' }} // Taking up most of the screen
                    >
                        {/* Header & Drag Handle (Hidden on Step 4) */}
                        {step !== 4 && (
                            <View className="px-6 pb-4 border-b border-slate-100">
                                <View className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-6" />
                                <View className="flex-row items-center justify-between">
                                    <View>
                                        <View className="flex-row items-center gap-2 mb-0.5">
                                            {step > 1 && (
                                                <Pressable
                                                    onPress={() => setStep(step - 1)}
                                                    className="text-slate-400 hover:text-slate-900 transition-colors -ml-1"
                                                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                                >
                                                    <Ionicons name="chevron-back" size={20} color="#94a3b8" />
                                                </Pressable>
                                            )}
                                            <Text className="text-xl font-semibold text-slate-900 tracking-tight">
                                                {step === 1 ? 'New Property' : step === 2 ? 'Features' : 'Final Details'}
                                            </Text>
                                        </View>
                                        <Text className={"text-xs text-slate-500 font-medium " + (step > 1 ? "ml-6" : "mt-0.5") + " "}>
                                            Step {step} of 3: {step === 1 ? 'Essentials' : step === 2 ? 'Amenities' : 'Pricing & Photos'}
                                        </Text>
                                    </View>
                                    <Pressable
                                        onPress={() => {
                                            onClose();
                                            setTimeout(() => setStep(1), 300);
                                        }}
                                        className="w-8 h-8 rounded-full bg-slate-50 items-center justify-center"
                                        style={({ pressed }) => [pressed && { backgroundColor: '#f1f5f9' }]}
                                    >
                                        <Ionicons name="close-circle-outline" size={20} color="#94a3b8" />
                                    </Pressable>
                                </View>

                                {/* Progress Bar */}
                                <View className="w-full h-1 bg-slate-100 rounded-full mt-5 overflow-hidden">
                                    <Animated.View
                                        className="h-full bg-slate-900 rounded-full"
                                        style={{ width: step === 1 ? '33.33%' : step === 2 ? '66.66%' : '100%' }}
                                    />
                                </View>
                            </View>
                        )}

                        {/* Scrollable Form Content */}
                        {step !== 4 ? (
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ padding: 24, paddingBottom: 120 }}
                            >
                                {step === 1 && (
                                    <Animated.View entering={FadeIn}>
                                        {/* Section: Media */}
                                        <View className="mb-8">
                                            <View className="flex-row items-center gap-2 mb-3">
                                                <Ionicons name="camera-outline" size={16} color="#4f46e5" />
                                                <Text className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                                                    Photos & Videos
                                                </Text>
                                            </View>

                                            <View className="flex-row flex-wrap gap-3">
                                                {/* Main Upload Box */}
                                                {images.length === 0 ? (
                                                    <Pressable 
                                                        onPress={pickImage} 
                                                        className="w-full h-40 rounded-2xl border border-dashed border-slate-300 bg-slate-50 items-center justify-center mb-1"
                                                        style={({ pressed }) => [pressed && { backgroundColor: '#f1f5f9' }]}
                                                    >
                                                        <View className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-2" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }}>
                                                            <Ionicons name="cloud-upload-outline" size={20} color="#4f46e5" />
                                                        </View>
                                                        <Text className="text-xs font-medium text-slate-600">Tap to upload cover</Text>
                                                        <Text className="text-[10px] text-slate-400 mt-1">Max 20MB</Text>
                                                    </Pressable>
                                                ) : (
                                                    <View className="w-full h-40 rounded-2xl border border-slate-100 bg-white relative overflow-hidden mb-1">
                                                        <Image source={{ uri: images[0] }} style={{ width: '100%', height: '100%' }} />
                                                        <Pressable onPress={() => removeImage(0)} className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.9)', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }}>
                                                            <Ionicons name="trash-outline" size={16} color="#ef4444" />
                                                        </Pressable>
                                                        <View className="absolute top-2 left-2 px-2 py-1 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}>
                                                            <Text className="text-[10px] font-semibold text-slate-900 uppercase">Cover</Text>
                                                        </View>
                                                    </View>
                                                )}

                                                {/* Secondary Slots Container */}
                                                <View className="flex-row gap-3 w-full">
                                                    {images.slice(1, 3).map((img, index) => (
                                                        <View key={index} className="flex-1 h-24 rounded-2xl border border-slate-100 bg-white relative overflow-hidden">
                                                            <Image source={{ uri: img }} style={{ width: '100%', height: '100%' }} />
                                                            <Pressable onPress={() => removeImage(index + 1)} className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.9)', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }}>
                                                                <Ionicons name="trash-outline" size={12} color="#ef4444" />
                                                            </Pressable>
                                                        </View>
                                                    ))}

                                                    {images.length < 5 && (
                                                        <Pressable onPress={pickImage} className="flex-1 h-24 rounded-2xl border border-dashed border-slate-200 bg-slate-50 flex items-center justify-center" style={({ pressed }) => [pressed && { backgroundColor: '#f1f5f9' }]}>
                                                            <Ionicons name="add-circle-outline" size={24} color="#94a3b8" />
                                                        </Pressable>
                                                    )}
                                                </View>
                                            </View>
                                        </View>

                                        {/* Section: Category */}
                                        <View className="mb-8">
                                            <View className="flex-row items-center gap-2 mb-3">
                                                <Ionicons name="business-outline" size={16} color="#4f46e5" />
                                                <Text className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                                                    Property Type
                                                </Text>
                                            </View>

                                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 20 }}>
                                                <View className="flex-row gap-3">
                                                    {[
                                                        { id: 'house', icon: 'home-outline', label: 'House' },
                                                        { id: 'apartment', icon: 'business-outline', label: 'Apartment' },
                                                        { id: 'commercial', icon: 'storefront-outline', label: 'Commercial' }
                                                    ].map((type) => {
                                                        const isActive = propertyType === type.id;
                                                        return (
                                                            <Pressable
                                                                key={type.id}
                                                                onPress={() => setPropertyType(type.id as any)}
                                                                className={
                                                                    isActive
                                                                        ? 'w-[105px] h-[88px] rounded-2xl border p-3 flex-col justify-between transition-colors border-slate-900 bg-slate-900'
                                                                        : 'w-[105px] h-[88px] rounded-2xl border p-3 flex-col justify-between transition-colors border-slate-200 bg-white'
                                                                }
                                                                style={isActive ? { shadowColor: '#0f172a', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 5 } : undefined}
                                                            >
                                                                <Ionicons
                                                                    name={type.icon as any}
                                                                    size={24}
                                                                    color={isActive ? 'white' : '#64748b'}
                                                                />
                                                                <Text className={"text-xs font-medium " + (isActive ? "text-white" : "text-slate-500")}>
                                                                    {type.label}
                                                                </Text>
                                                            </Pressable>
                                                        );
                                                    })}
                                                </View>
                                            </ScrollView>
                                        </View>

                                        {/* Section: Details Inputs */}
                                        <View className="mb-8">
                                            <View className="flex-row items-center gap-2 mb-5">
                                                <Ionicons name="document-text-outline" size={16} color="#4f46e5" />
                                                <Text className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                                                    Details
                                                </Text>
                                            </View>

                                            <View className="space-y-6">
                                                {/* Title Input */}
                                                <View className="relative border-b border-slate-200 pb-2 mb-6">
                                                    <Text className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mb-1">Listing Title</Text>
                                                    <View className="flex-row items-center justify-between">
                                                        <TextInput
                                                            value={title}
                                                            onChangeText={setTitle}
                                                            className="flex-1 text-sm text-slate-900 font-semibold p-0 h-6"
                                                            placeholder="Modern Sunset Villa"
                                                            placeholderTextColor="#94a3b8"
                                                        />
                                                        <Ionicons name="pencil" size={14} color="#cbd5e1" />
                                                    </View>
                                                </View>

                                                {/* Price & Size Row */}
                                                <View className="flex-row gap-5 mb-2">
                                                    <View className="flex-1 relative border-b border-slate-200 pb-2">
                                                        <Text className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mb-1">Price</Text>
                                                        <View className="flex-row items-center">
                                                            <Text className="text-slate-400 text-sm font-semibold mr-1">$</Text>
                                                            <TextInput
                                                                placeholder="0.00"
                                                                keyboardType="numeric"
                                                                className="flex-1 text-sm text-slate-900 font-semibold p-0 h-6"
                                                                placeholderTextColor="#94a3b8"
                                                            />
                                                        </View>
                                                    </View>

                                                    <View className="flex-1 relative border-b border-slate-200 pb-2">
                                                        <Text className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mb-1">Sq. Ft.</Text>
                                                        <View className="flex-row items-center justify-between">
                                                            <TextInput
                                                                value={sqft}
                                                                onChangeText={setSqft}
                                                                placeholder="0"
                                                                keyboardType="numeric"
                                                                className="flex-1 text-sm text-slate-900 font-semibold p-0 h-6"
                                                                placeholderTextColor="#94a3b8"
                                                            />
                                                            <Text className="text-slate-400 text-[10px] font-medium">ft²</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>

                                        {/* Toggle: Negotiable */}
                                        <View className="flex-row items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                            <View className="flex-row items-center gap-3">
                                                <View className="w-8 h-8 rounded-full bg-indigo-50 items-center justify-center">
                                                    <Ionicons name="hand-right-outline" size={16} color="#4f46e5" />
                                                </View>
                                                <View>
                                                    <Text className="text-sm font-medium text-slate-900 leading-tight mb-0.5">Negotiable Price</Text>
                                                    <Text className="text-[10px] text-slate-500">Open to offers?</Text>
                                                </View>
                                            </View>
                                            <Switch
                                                value={isNegotiable}
                                                onValueChange={setIsNegotiable}
                                                trackColor={{ false: '#cbd5e1', true: '#4f46e5' }}
                                                thumbColor="white"
                                                ios_backgroundColor="#cbd5e1"
                                                style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
                                            />
                                        </View>
                                    </Animated.View>
                                )}

                                {step === 2 && (
                                    <Animated.View entering={FadeIn} className="space-y-8">
                                        {/* Section: Rooms & Spaces */}
                                        <View>
                                            <View className="flex-row items-center gap-2 mb-4">
                                                <Ionicons name="bed-outline" size={16} color="#4f46e5" />
                                                <Text className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                                                    Rooms & Spaces
                                                </Text>
                                            </View>

                                            <View className="space-y-4">
                                                {/* Bedroom Counter */}
                                                <View className="flex-row items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl mb-4" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }}>
                                                    <View className="flex-row items-center gap-3">
                                                        <View className="w-10 h-10 rounded-full bg-slate-50 items-center justify-center">
                                                            <Ionicons name="bed-outline" size={20} color="#475569" />
                                                        </View>
                                                        <Text className="text-sm font-semibold text-slate-900">Bedrooms</Text>
                                                    </View>
                                                    <View className="flex-row items-center gap-3 bg-slate-50 p-1 rounded-xl">
                                                        <Pressable
                                                            onPress={() => setBedrooms(Math.max(0, bedrooms - 1))}
                                                            className="w-8 h-8 rounded-lg bg-white border border-slate-100 items-center justify-center" style={({ pressed }) => [pressed && { transform: [{ scale: 0.95 }] }]}
                                                            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }}
                                                        >
                                                            <Ionicons name="remove" size={16} color="#94a3b8" />
                                                        </Pressable>
                                                        <Text className="text-sm font-semibold text-slate-900 w-4 text-center">{bedrooms}</Text>
                                                        <Pressable
                                                            onPress={() => setBedrooms(bedrooms + 1)}
                                                            className="w-8 h-8 rounded-lg bg-white border border-slate-100 items-center justify-center" style={({ pressed }) => [pressed && { transform: [{ scale: 0.95 }] }]}
                                                            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }}
                                                        >
                                                            <Ionicons name="add" size={16} color="#0f172a" />
                                                        </Pressable>
                                                    </View>
                                                </View>

                                                {/* Bathroom Counter */}
                                                <View className="flex-row items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }}>
                                                    <View className="flex-row items-center gap-3">
                                                        <View className="w-10 h-10 rounded-full bg-slate-50 items-center justify-center">
                                                            <Ionicons name="water-outline" size={20} color="#475569" />
                                                        </View>
                                                        <Text className="text-sm font-semibold text-slate-900">Bathrooms</Text>
                                                    </View>
                                                    <View className="flex-row items-center gap-3 bg-slate-50 p-1 rounded-xl">
                                                        <Pressable
                                                            onPress={() => setBathrooms(Math.max(0, bathrooms - 1))}
                                                            className="w-8 h-8 rounded-lg bg-white border border-slate-100 items-center justify-center" style={({ pressed }) => [pressed && { transform: [{ scale: 0.95 }] }]}
                                                            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }}
                                                        >
                                                            <Ionicons name="remove" size={16} color="#94a3b8" />
                                                        </Pressable>
                                                        <Text className="text-sm font-semibold text-slate-900 w-4 text-center">{bathrooms}</Text>
                                                        <Pressable
                                                            onPress={() => setBathrooms(bathrooms + 1)}
                                                            className="w-8 h-8 rounded-lg bg-white border border-slate-100 items-center justify-center" style={({ pressed }) => [pressed && { transform: [{ scale: 0.95 }] }]}
                                                            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }}
                                                        >
                                                            <Ionicons name="add" size={16} color="#0f172a" />
                                                        </Pressable>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>

                                        {/* Section: Amenities Grid */}
                                        <View className="mt-8">
                                            <View className="flex-row items-center gap-2 mb-4">
                                                <Ionicons name="sparkles-outline" size={16} color="#4f46e5" />
                                                <Text className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                                                    Amenities
                                                </Text>
                                            </View>

                                            <View className="flex-row flex-wrap gap-3">
                                                {[
                                                    { id: 'Wi-Fi', icon: 'wifi-outline' },
                                                    { id: 'AC', icon: 'snow-outline' },
                                                    { id: 'Gym', icon: 'barbell-outline' },
                                                    { id: 'Parking', icon: 'car-outline' },
                                                    { id: 'Pool', icon: 'water-outline' },
                                                ].map((item) => {
                                                    const isActive = amenities.includes(item.id);
                                                    return (
                                                        <Pressable
                                                            key={item.id}
                                                            onPress={() => toggleAmenity(item.id)}
                                                        >
                                                            <View
                                                                className={
                                                                    isActive
                                                                        ? 'w-[105px] h-24 p-3 rounded-2xl border flex-col items-center justify-center gap-2 transition-all relative bg-slate-900 border-slate-900'
                                                                        : 'w-[105px] h-24 p-3 rounded-2xl border flex-col items-center justify-center gap-2 transition-all relative bg-white border-slate-200'
                                                                }
                                                                style={isActive ? { shadowColor: '#0f172a', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 5 } : undefined}
                                                            >
                                                                <Ionicons name={item.icon as any} size={24} color={isActive ? "white" : "#64748b"} />
                                                                <Text className={"text-[11px] font-medium " + (isActive ? "text-white" : "text-slate-500")}>{item.id}</Text>

                                                                {isActive && (
                                                                    <View className="absolute top-2 right-2">
                                                                        <Ionicons name="checkmark-circle" size={16} color="white" />
                                                                    </View>
                                                                )}
                                                            </View>
                                                        </Pressable>
                                                    );
                                                })}

                                                {/* Add More */}
                                                <Pressable className="w-[105px] h-24 p-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 flex-col items-center justify-center gap-2" style={({ pressed }) => [pressed && { backgroundColor: '#f1f5f9' }]}>
                                                    <Ionicons name="add-circle-outline" size={24} color="#94a3b8" />
                                                    <Text className="text-[11px] font-medium text-slate-400">More</Text>
                                                </Pressable>
                                            </View>
                                        </View>

                                        {/* Section: Description */}
                                        <View className="mt-8">
                                            <View className="flex-row items-center gap-2 mb-4">
                                                <Ionicons name="document-text-outline" size={16} color="#4f46e5" />
                                                <Text className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                                                    Description
                                                </Text>
                                            </View>

                                            <View className="relative">
                                                <TextInput
                                                    multiline
                                                    numberOfLines={6}
                                                    maxLength={500}
                                                    value={description}
                                                    onChangeText={setDescription}
                                                    placeholder="Tell us about the property features, neighborhood vibe, and anything special..."
                                                    placeholderTextColor="#94a3b8"
                                                    className="w-full h-32 bg-white border border-slate-200 rounded-2xl p-4 pt-4 text-sm text-slate-800"
                                                    style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }}
                                                    style={{ textAlignVertical: 'top' }}
                                                />
                                                <View className="absolute bottom-3 right-3 bg-white px-1">
                                                    <Text className="text-[10px] text-slate-400 font-medium">{description.length}/500</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </Animated.View>
                                )}

                                {step === 3 && (
                                    <Animated.View entering={FadeIn} className="space-y-8">
                                        {/* Section: Photos */}
                                        <View>
                                            <View className="flex-row items-center justify-between mb-4">
                                                <View className="flex-row items-center gap-2">
                                                    <Ionicons name="camera-outline" size={16} color="#4f46e5" />
                                                    <Text className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                                                        Photos
                                                    </Text>
                                                </View>
                                                <Text className="text-xs text-slate-400">{images.length} added</Text>
                                            </View>

                                            <View className="flex-row flex-wrap gap-3">
                                                {/* Cover Photo */}
                                                {images.length > 0 ? (
                                                    <View className="w-full h-48 rounded-2xl overflow-hidden relative mb-1" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }}>
                                                        <Image
                                                            source={{ uri: images[0] }}
                                                            style={{ width: '100%', height: '100%' }}
                                                        />
                                                        <View className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }} />

                                                        <View className="absolute top-3 left-3 px-2 py-1 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}>
                                                            <Text className="text-[10px] font-semibold text-slate-900 uppercase tracking-wide">Cover</Text>
                                                        </View>

                                                        <Pressable onPress={() => removeImage(0)} className="absolute top-3 right-3 w-8 h-8 rounded-full items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
                                                            <Ionicons name="trash" size={16} color="white" />
                                                        </Pressable>
                                                    </View>
                                                ) : (
                                                    <Pressable onPress={pickImage} className="w-full h-48 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 items-center justify-center mb-1" style={({ pressed }) => [pressed && { backgroundColor: '#f1f5f9' }]}>
                                                        <Ionicons name="cloud-upload-outline" size={32} color="#4f46e5" className="mb-2" />
                                                        <Text className="text-sm font-medium text-slate-600 mt-2">Tap to upload cover photo</Text>
                                                    </Pressable>
                                                )}

                                                <View className="flex-row gap-3 w-full">
                                                    {images.slice(1, 4).map((img, index) => (
                                                        <View key={index} className="flex-1 h-24 rounded-2xl overflow-hidden relative" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }}>
                                                            <Image
                                                                source={{ uri: img }}
                                                                style={{ width: '100%', height: '100%' }}
                                                            />
                                                            <Pressable onPress={() => removeImage(index + 1)} className="absolute top-1 right-1 w-6 h-6 rounded-full items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                                                <Ionicons name="trash" size={12} color="white" />
                                                            </Pressable>
                                                        </View>
                                                    ))}

                                                    {/* Add Photo Button */}
                                                    {images.length < 5 && (
                                                        <Pressable onPress={pickImage} className="flex-1 h-24 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 items-center justify-center gap-1" style={({ pressed }) => [pressed && { backgroundColor: '#f1f5f9' }]}>
                                                            <Ionicons name="add-outline" size={24} color="#94a3b8" />
                                                            <Text className="text-[10px] font-medium text-slate-400">Add Photo</Text>
                                                        </Pressable>
                                                    )}
                                                </View>
                                            </View>
                                        </View>

                                        {/* Section: Pricing & Valuation */}
                                        <View className="mt-8">
                                            <View className="flex-row items-center gap-2 mb-4">
                                                <Ionicons name="wallet-outline" size={16} color="#4f46e5" />
                                                <Text className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                                                    Pricing & Valuation
                                                </Text>
                                            </View>

                                            <View className="p-5 bg-white border border-slate-200 rounded-2xl mb-4" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }}>
                                                <View className="flex-row justify-between items-center mb-2">
                                                    <Text className="text-xs text-slate-500 font-medium">Monthly Rent</Text>
                                                    <View className="bg-green-100 px-2 py-0.5 rounded-full">
                                                        <Text className="text-[10px] text-green-700 font-semibold tracking-wide">MARKET RATE</Text>
                                                    </View>
                                                </View>
                                                <View className="flex-row items-baseline gap-1">
                                                    <Text className="text-xl font-medium text-slate-400">$</Text>
                                                    <TextInput
                                                        value={rentPrice}
                                                        onChangeText={setRentPrice}
                                                        keyboardType="numeric"
                                                        className="flex-1 text-4xl font-semibold text-slate-900 h-12 p-0 tracking-tight"
                                                        placeholder="0"
                                                        placeholderTextColor="#e2e8f0"
                                                    />
                                                </View>
                                            </View>

                                            {/* Deposit Toggle */}
                                            <View className="flex-row items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent">
                                                <View className="flex-row items-center gap-3">
                                                    <View className="w-10 h-10 rounded-full bg-white items-center justify-center" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }}>
                                                        <Ionicons name="shield-checkmark-outline" size={20} color="#475569" />
                                                    </View>
                                                    <View>
                                                        <Text className="text-sm font-semibold text-slate-900 mb-0.5">Security Deposit</Text>
                                                        <Text className="text-[11px] text-slate-500">Usually 1 month rent</Text>
                                                    </View>
                                                </View>
                                                <Switch
                                                    value={requireDeposit}
                                                    onValueChange={setRequireDeposit}
                                                    trackColor={{ false: '#e2e8f0', true: '#0f172a' }}
                                                    thumbColor="white"
                                                    ios_backgroundColor="#e2e8f0"
                                                    style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
                                                />
                                            </View>
                                        </View>

                                        {/* Section: Availability */}
                                        <View className="mt-8">
                                            <View className="flex-row items-center gap-2 mb-4">
                                                <Ionicons name="calendar-outline" size={16} color="#4f46e5" />
                                                <Text className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                                                    Availability
                                                </Text>
                                            </View>

                                            <View className="flex-row gap-3">
                                                {/* Immediate */}
                                                <Pressable
                                                    onPress={() => setAvailability('immediate')}
                                                    className="flex-1"
                                                >
                                                    <View
                                                        className={
                                                            availability === 'immediate'
                                                                ? 'p-4 h-full rounded-2xl flex-col gap-2 relative overflow-hidden transition-colors border bg-white border-slate-200'
                                                                : 'p-4 h-full rounded-2xl flex-col gap-2 relative overflow-hidden transition-colors border bg-slate-50 border-transparent'
                                                        }
                                                    >
                                                        {availability === 'immediate' && (
                                                            <View className="absolute top-0 right-0 w-8 h-8 bg-indigo-600 rounded-bl-xl items-center justify-center">
                                                                <Ionicons name="checkmark" size={16} color="white" />
                                                            </View>
                                                        )}
                                                        <Text className="text-xs text-slate-500">Available from</Text>
                                                        <Text className="text-sm font-semibold text-slate-900">Immediately</Text>
                                                    </View>
                                                </Pressable>

                                                {/* Custom Date */}
                                                <Pressable
                                                    onPress={() => setAvailability('date')}
                                                    className="flex-1"
                                                >
                                                    <View
                                                        className={
                                                            availability === 'date'
                                                                ? 'p-4 h-full rounded-2xl flex-col gap-2 transition-colors border bg-white border-slate-200'
                                                                : 'p-4 h-full rounded-2xl flex-col gap-2 transition-colors border bg-slate-50 border-transparent'
                                                        }
                                                        style={availability === 'date' ? { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 } : undefined}
                                                    >
                                                        <Text className="text-xs text-slate-400">Select Date</Text>
                                                        <View className="flex-row items-center gap-2">
                                                            <Ionicons name="calendar" size={18} color={availability === 'date' ? '#4f46e5' : '#94a3b8'} />
                                                            <Text className={"text-sm font-medium " + (availability === 'date' ? "text-slate-900" : "text-slate-400")}>Pick date</Text>
                                                        </View>
                                                    </View>
                                                </Pressable>
                                            </View>
                                        </View>
                                    </Animated.View>
                                )}

                            </ScrollView>
                        ) : (
                            // Step 4: Success View
                            <Animated.View entering={FadeIn} className="flex-1 flex-col items-center pt-2">
                                {/* Success Close Header */}
                                <View className="w-full px-6 flex-row justify-end mb-6">
                                    <Pressable
                                        onPress={() => {
                                            onClose();
                                            setTimeout(() => setStep(1), 300);
                                        }}
                                        className="w-8 h-8 rounded-full bg-slate-50 items-center justify-center"
                                    >
                                        <Ionicons name="close-circle-outline" size={20} color="#94a3b8" />
                                    </Pressable>
                                </View>

                                <ScrollView
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120, alignItems: 'center' }}
                                    className="w-full"
                                >
                                    {/* Success Animation Container */}
                                    <View className="relative w-24 h-24 mb-6 flex items-center justify-center">
                                        <View className="absolute inset-2 bg-green-100 rounded-full" />
                                        <View className="relative bg-green-500 w-16 h-16 rounded-full flex items-center justify-center" style={{ shadowColor: '#22c55e', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 5 }}>
                                            <Ionicons name="checkmark" size={32} color="white" />
                                        </View>

                                        {/* Decorative Particles */}
                                        <View className="absolute -top-1 left-1">
                                            <Ionicons name="star" size={16} color="#fbbf24" />
                                        </View>
                                        <View className="absolute top-1 -right-1">
                                            <Ionicons name="star" size={12} color="#818cf8" />
                                        </View>
                                    </View>

                                    <Text className="text-2xl font-semibold text-slate-900 tracking-tight text-center mb-2">
                                        Listing Published!
                                    </Text>
                                    <Text className="text-sm text-slate-500 text-center leading-relaxed mb-8 max-w-[260px]">
                                        Your property in <Text className="text-slate-900 font-medium">San Francisco</Text> is now live and visible to potential tenants.
                                    </Text>

                                    {/* Listing Card Preview */}
                                    <View className="w-full bg-white border border-slate-100 rounded-2xl p-3 mb-8 flex-row gap-4" style={{ shadowColor: '#e2e8f0', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 8, elevation: 5 }}>
                                        <View className="w-20 h-20 rounded-xl overflow-hidden relative">
                                            <Image
                                                source={{ uri: 'https://images.unsplash.com/photo-1600596542815-2004cb532753?q=80&w=300&auto=format&fit=crop' }}
                                                style={{ width: '100%', height: '100%' }}
                                                className="object-cover"
                                            />
                                            <View className="absolute top-1 left-1 w-9 items-center justify-center py-0.5 rounded" style={{ backgroundColor: 'rgba(34,197,94,0.9)' }}>
                                                <Text className="text-white text-[9px] font-medium tracking-wide">LIVE</Text>
                                            </View>
                                        </View>
                                        <View className="flex-1 justify-center py-1">
                                            <View className="flex-row items-center gap-1 mb-1">
                                                <Text className="text-lg font-bold text-slate-900">${rentPrice}</Text>
                                                <Text className="text-[10px] text-slate-400 font-medium">/ month</Text>
                                            </View>
                                            <Text className="text-xs font-medium text-slate-700 mb-2 truncate" numberOfLines={1}>
                                                Modern Loft in Mission District
                                            </Text>
                                            <View className="flex-row items-center gap-3">
                                                <View className="flex-row items-center gap-1">
                                                    <Ionicons name="bed-outline" size={12} color="#94a3b8" />
                                                    <Text className="text-[10px] text-slate-400 font-medium">{bedrooms} Beds</Text>
                                                </View>
                                                <View className="flex-row items-center gap-1">
                                                    <Ionicons name="water-outline" size={12} color="#94a3b8" />
                                                    <Text className="text-[10px] text-slate-400 font-medium">{bathrooms} Baths</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                    {/* Share Options */}
                                    <View className="w-full">
                                        <Text className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">Share Listing</Text>
                                        <View className="flex-row gap-3">
                                            <Pressable className="flex-1 h-12 rounded-2xl border border-slate-200 bg-white items-center justify-center flex-row gap-2" style={({ pressed }) => [pressed && { backgroundColor: '#f8fafc' }]}>
                                                <Ionicons name="copy-outline" size={18} color="#94a3b8" />
                                                <Text className="text-xs font-semibold text-slate-600">Copy Link</Text>
                                            </Pressable>
                                            <Pressable className="flex-1 h-12 rounded-2xl border border-slate-200 bg-white items-center justify-center flex-row gap-2" style={({ pressed }) => [pressed && { backgroundColor: '#f8fafc' }]}>
                                                <Ionicons name="share-social-outline" size={18} color="#94a3b8" />
                                                <Text className="text-xs font-semibold text-slate-600">More</Text>
                                            </Pressable>
                                        </View>
                                    </View>

                                </ScrollView>
                            </Animated.View>
                        )}

                        {/* Sticky Footer Actions */}
                        {step !== 4 ? (
                            <View className="absolute bottom-0 left-0 w-full bg-white border-t border-slate-100 px-6 pt-5 pb-8 flex-row items-center justify-between gap-4">
                                <Pressable
                                    onPress={() => step > 1 ? setStep(step - 1) : null}
                                    className="flex-1 py-4 items-center justify-center rounded-2xl"
                                    style={({ pressed }) => [pressed && { backgroundColor: '#f8fafc' }]}
                                >
                                    <Text className="text-slate-500 font-semibold text-[14px]">
                                        {step > 1 ? 'Back' : 'Save Draft'}
                                    </Text>
                                </Pressable>
                                {step < 3 ? (
                                    <Pressable
                                        onPress={() => setStep(step + 1)}
                                        className="flex-[2] bg-slate-900 py-4 items-center justify-center rounded-2xl transition-all flex-row gap-2"
                                        style={({ pressed }) => [
                                            { shadowColor: '#0f172a', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 5 },
                                            pressed && { transform: [{ scale: 0.98 }] }
                                        ]}
                                    >
                                        <Text className="text-white font-semibold text-[14px]">Next Step</Text>
                                        <Ionicons name="arrow-forward" size={16} color="white" />
                                    </Pressable>
                                ) : (
                                    <Pressable
                                        onPress={publishListing}
                                        disabled={isLoading}
                                        className="flex-[2]"
                                        style={({ pressed }) => [pressed && !isLoading && { transform: [{ scale: 0.98 }] }]}
                                    >
                                        <View className={`h-full py-4 items-center justify-center rounded-2xl flex-row gap-2 transition-all ${isLoading ? 'bg-indigo-400' : 'bg-indigo-600'} `}
                                            style={!isLoading ? { shadowColor: '#4f46e5', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 5 } : undefined}
                                        >
                                            {isLoading ? (
                                                <ActivityIndicator color="white" size="small" />
                                            ) : (
                                                <>
                                                    <Text className="text-white font-semibold text-[14px]">Publish Listing</Text>
                                                    <Ionicons name="rocket-outline" size={16} color="white" />
                                                </>
                                            )}
                                        </View>
                                    </Pressable>
                                )}
                            </View>
                        ) : (
                            <View className="absolute bottom-0 left-0 w-full bg-white border-t border-slate-50 px-6 pt-5 pb-8">
                                <Pressable className="w-full py-4 bg-slate-900 rounded-2xl items-center justify-center flex-row gap-2" style={({ pressed }) => [{ shadowColor: '#0f172a', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 5 }, pressed && { transform: [{ scale: 0.98 }] }]}>
                                    <Text className="text-white font-semibold text-sm">View Listing</Text>
                                    <Ionicons name="arrow-forward" size={16} color="white" />
                                </Pressable>
                                <Pressable
                                    onPress={() => {
                                        onClose();
                                        setTimeout(() => setStep(1), 300);
                                    }}
                                    className="w-full py-3 mt-2 items-center justify-center block"
                                    style={({ pressed }) => [pressed && { backgroundColor: '#f8fafc' }]}
                                >
                                    <Text className="text-slate-400 font-medium text-xs">Back to Dashboard</Text>
                                </Pressable>
                            </View>
                        )}

                    </Animated.View>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

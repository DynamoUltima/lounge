import { AntDesign, Feather, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Google from 'expo-auth-session/providers/google';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, Stack, useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithCredential, updateProfile } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../firebaseConfig';

WebBrowser.maybeCompleteAuthSession();

export default function RegisterScreen() {
    const router = useRouter();
    const [isChecked, setIsChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
        iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
        androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
    });

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token);
            setIsLoading(true);
            signInWithCredential(auth, credential)
                .then(async (userCredential) => {
                    const { user } = userCredential;
                    // Write user profile to Firestore (merge so repeat logins are safe)
                    await setDoc(
                        doc(db, 'users', user.uid),
                        {
                            uid: user.uid,
                            fullName: user.displayName ?? '',
                            email: user.email ?? '',
                            photoURL: user.photoURL ?? '',
                            provider: 'google',
                            phone: '',
                            location: '',
                            bio: '',
                            website: '',
                            createdAt: serverTimestamp(),
                        },
                        { merge: true }
                    );
                    router.replace('/(tabs)');
                })
                .catch((err) => {
                    console.error(err);
                    setError('Google Sign-In failed.');
                    setIsLoading(false);
                });
        }
    }, [response]);

    const handleRegister = async () => {
        if (!fullName || !email || !password) {
            setError('Please fill in all fields.');
            return;
        }
        if (!isChecked) {
            setError('You must agree to the Terms of Service.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
            const { user } = userCredential;

            // Set display name in Firebase Auth profile
            await updateProfile(user, { displayName: fullName.trim() });

            // Write user profile document to Firestore
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                fullName: fullName.trim(),
                email: email.trim().toLowerCase(),
                photoURL: '',
                provider: 'email',
                phone: '',
                location: '',
                bio: '',
                website: '',
                createdAt: serverTimestamp(),
            });

            router.replace('/(tabs)');
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Failed to create account.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <View className="flex-1 bg-white relative">
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    className="flex-1"
                >
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1" showsVerticalScrollIndicator={false}>
                        {/* Decorative Background Elements */}
                        <LinearGradient
                            colors={['rgba(99, 102, 241, 0.1)', 'rgba(236, 72, 153, 0.05)', 'transparent']}
                            start={{ x: 0.8, y: 0.1 }}
                            end={{ x: 0.2, y: 0.9 }}
                            style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: 200, transform: [{ rotate: '45deg' }] }}
                        />
                        <LinearGradient
                            colors={['rgba(236, 72, 153, 0.1)', 'rgba(99, 102, 241, 0.05)', 'transparent']}
                            start={{ x: 0.1, y: 0.8 }}
                            end={{ x: 0.9, y: 0.2 }}
                            style={{ position: 'absolute', bottom: -50, left: -50, width: 350, height: 350, borderRadius: 175, transform: [{ rotate: '-15deg' }] }}
                        />

                        <View className="flex-1 px-8 pt-16 pb-8">
                            {/* Logo / Brand */}
                            <View className="flex-row items-center gap-2 mb-8">
                                <View className="w-10 h-10 bg-indigo-600 rounded-xl items-center justify-center shadow-lg shadow-indigo-600/20">
                                    <Ionicons name="business-outline" size={20} color="white" />
                                </View>
                                <Text className="text-lg font-bold tracking-tight text-slate-900">ESTATE.</Text>
                            </View>

                            {/* Welcome Text */}
                            <View className="mb-8">
                                <Text className="text-3xl font-semibold text-slate-900 tracking-tight leading-tight">
                                    Create your {'\n'}
                                    <Text className="text-indigo-600">account.</Text>
                                </Text>
                                <Text className="text-sm text-slate-500 font-medium mt-3 leading-relaxed">
                                    Start your real estate journey today.
                                </Text>
                            </View>

                            {/* Register Form */}
                            <View className="gap-6">

                                {/* Name Input */}
                                <View className="space-y-1.5">
                                    <Text className="text-xs font-semibold text-slate-900 ml-1">Full Name</Text>
                                    <View className="relative">
                                        <View className="absolute left-4 top-4 z-10">
                                            <Feather name="user" size={20} color="#94a3b8" />
                                        </View>
                                        <TextInput
                                            placeholder="John Doe"
                                            placeholderTextColor="#94a3b8"
                                            className="w-full bg-slate-50 text-slate-900 text-sm font-medium border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:border-indigo-600 focus:border-2"
                                            value={fullName}
                                            onChangeText={setFullName}
                                        />
                                    </View>
                                </View>

                                {/* Email Input */}
                                <View className="space-y-1.5">
                                    <Text className="text-xs font-semibold text-slate-900 ml-1">Email Address</Text>
                                    <View className="relative">
                                        <View className="absolute left-4 top-4 z-10">
                                            <MaterialCommunityIcons name="email-outline" size={20} color="#94a3b8" />
                                        </View>
                                        <TextInput
                                            placeholder="alex@example.com"
                                            placeholderTextColor="#94a3b8"
                                            keyboardType="email-address"
                                            className="w-full bg-slate-50 text-slate-900 text-sm font-medium border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:border-indigo-600 focus:border-2"
                                            autoCapitalize="none"
                                            value={email}
                                            onChangeText={setEmail}
                                        />
                                    </View>
                                </View>

                                {/* Password Input */}
                                <View className="space-y-1.5">
                                    <Text className="text-xs font-semibold text-slate-900 ml-1">Password</Text>
                                    <View className="relative">
                                        <View className="absolute left-4 top-4 z-10">
                                            <Feather name="lock" size={20} color="#94a3b8" />
                                        </View>
                                        <TextInput
                                            placeholder="Create a password"
                                            placeholderTextColor="#94a3b8"
                                            secureTextEntry={!showPassword}
                                            className="w-full bg-slate-50 text-slate-900 text-sm font-medium border border-slate-200 rounded-2xl py-4 pl-12 pr-12 focus:border-indigo-600 focus:border-2"
                                            value={password}
                                            onChangeText={setPassword}
                                        />
                                        <TouchableOpacity
                                            onPress={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-4"
                                        >
                                            <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#94a3b8" />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* Terms Checkbox */}
                                <View className="pt-2">
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={() => setIsChecked(!isChecked)}
                                        className="flex-row items-start gap-3"
                                    >
                                        <View className={`w-5 h-5 border-2 rounded-lg items-center justify-center mt-0.5 ${isChecked ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-300'}`}>
                                            {isChecked && <Ionicons name="checkmark" size={14} color="white" />}
                                        </View>
                                        <Text className="text-xs font-medium text-slate-500 leading-tight flex-1">
                                            I agree to the <Text className="text-indigo-600">Terms of Service</Text> and <Text className="text-indigo-600">Privacy Policy</Text>
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                {/* Primary Action */}
                                {error ? <Text className="text-red-500 text-sm font-medium text-center mt-2 px-2">{error}</Text> : null}
                                <TouchableOpacity
                                    onPress={handleRegister}
                                    disabled={isLoading}
                                    className={`w-full bg-slate-900 rounded-2xl py-4 shadow-xl shadow-slate-900/10 flex-row items-center justify-center gap-2 mt-2 ${isLoading ? 'opacity-70' : ''}`}
                                    activeOpacity={0.9}
                                >
                                    {isLoading ? (
                                        <ActivityIndicator color="white" />
                                    ) : (
                                        <>
                                            <Text className="text-white font-semibold text-sm">Sign Up</Text>
                                            <Ionicons name="arrow-forward" size={18} color="white" />
                                        </>
                                    )}
                                </TouchableOpacity>

                            </View>

                            {/* Divider */}
                            <View className="relative py-6">
                                <View className="absolute inset-0 justify-center">
                                    <View className="w-full border-t border-slate-100" />
                                </View>
                                <View className="flex-row justify-center">
                                    <Text className="bg-white px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Or register with</Text>
                                </View>
                            </View>

                            {/* Social Actions */}
                            <View className="flex-row gap-4">
                                <TouchableOpacity
                                    onPress={() => promptAsync()}
                                    disabled={!request || isLoading}
                                    className="flex-1 flex-row items-center justify-center gap-3 py-3.5 border border-slate-200 rounded-2xl bg-white"
                                    activeOpacity={0.7}
                                >
                                    <AntDesign name="google" size={18} />
                                    <Text className="text-sm font-semibold text-slate-600">Google</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="flex-1 flex-row items-center justify-center gap-3 py-3.5 border border-slate-200 rounded-2xl bg-white" activeOpacity={0.7}>
                                    <View style={{ width: 20, alignItems: 'center' }}><FontAwesome name="apple" size={20} color="#0f172a" /></View>
                                    <Text className="text-sm font-semibold text-slate-600">Apple</Text>
                                </TouchableOpacity>
                            </View>

                            <View className="flex-1" />

                            {/* Footer */}
                            <View className="items-center pb-2 pt-6">
                                <Text className="text-sm text-slate-500 font-medium">
                                    Already have an account?{' '}
                                    <Link href="/login" asChild>
                                        <Text className="text-indigo-600 font-semibold">Sign in</Text>
                                    </Link>
                                </Text>
                            </View>

                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </>
    );
}

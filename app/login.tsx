import { AntDesign, Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import * as Google from 'expo-auth-session/providers/google';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, Stack, useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../firebaseConfig';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
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
                .then(() => router.replace('/(tabs)'))
                .catch((err) => {
                    console.error(err);
                    setError('Google Sign-In failed.');
                    setIsLoading(false);
                });
        }
    }, [response]);

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Please enter your email and password.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            await signInWithEmailAndPassword(auth, email.trim(), password);
            router.replace('/(tabs)');
        } catch (err: any) {
            console.error(err);
            setError('Invalid email or password.');
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
                            <View className="flex-row items-center gap-2 mb-10">
                                <View className="w-10 h-10 bg-indigo-600 rounded-xl items-center justify-center shadow-lg shadow-indigo-600/20">
                                    <Ionicons name="business-outline" size={20} color="white" />
                                </View>
                                <Text className="text-lg font-bold tracking-tight text-slate-900">ESTATE.</Text>
                            </View>

                            {/* Welcome Text */}
                            <View className="mb-10">
                                <Text className="text-3xl font-semibold text-slate-900 tracking-tight leading-tight">
                                    Let's sign you {'\n'}
                                    <Text className="text-indigo-600">in.</Text>
                                </Text>
                                <Text className="text-sm text-slate-500 font-medium mt-3 leading-relaxed">
                                    Welcome back. You've been missed!
                                </Text>
                            </View>

                            {/* Login Form */}
                            <View className="gap-6">

                                {/* Email Input */}
                                <View className="space-y-1.5">
                                    <Text className="text-xs font-semibold text-slate-900 ml-1">Email or Phone</Text>
                                    <View className="relative">
                                        <View className="absolute left-4 top-4 z-10">
                                            <Feather name="user" size={20} color="#94a3b8" />
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
                                    <View className="flex-row justify-between items-center ml-1">
                                        <Text className="text-xs font-semibold text-slate-900">Password</Text>
                                        <Text className="text-xs font-medium text-indigo-600">Forgot?</Text>
                                    </View>
                                    <View className="relative">
                                        <View className="absolute left-4 top-4 z-10">
                                            <Feather name="lock" size={20} color="#94a3b8" />
                                        </View>
                                        <TextInput
                                            placeholder="••••••••"
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

                                {/* Primary Action */}
                                {error ? <Text className="text-red-500 text-sm font-medium text-center mt-2 px-2">{error}</Text> : null}
                                <TouchableOpacity
                                    onPress={handleLogin}
                                    disabled={isLoading}
                                    className={`w-full bg-slate-900 rounded-2xl py-4 shadow-xl shadow-slate-900/10 flex-row items-center justify-center gap-2 mt-2 ${isLoading ? 'opacity-70' : ''}`}
                                    activeOpacity={0.9}
                                >
                                    {isLoading ? (
                                        <ActivityIndicator color="white" />
                                    ) : (
                                        <>
                                            <Text className="text-white font-semibold text-sm">Sign In</Text>
                                            <Ionicons name="arrow-forward" size={18} color="white" />
                                        </>
                                    )}
                                </TouchableOpacity>

                            </View>

                            {/* Divider */}
                            <View className="relative py-8">
                                <View className="absolute inset-0 justify-center">
                                    <View className="w-full border-t border-slate-100" />
                                </View>
                                <View className="flex-row justify-center">
                                    <Text className="bg-white px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Or continue with</Text>
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
                            <View className="items-center pb-2">
                                <Text className="text-sm text-slate-500 font-medium">
                                    Don't have an account?{' '}
                                    <Link href="/register" asChild>
                                        <Text className="text-indigo-600 font-semibold">Register</Text>
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

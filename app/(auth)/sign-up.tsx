import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useAuth, useSignUp } from '@clerk/expo';
import { Link, router } from 'expo-router';


export default function SignUp() {
    const { signUp, errors, fetchStatus } = useSignUp();
    const { isSignedIn } = useAuth();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");


    const isLoading = fetchStatus == "fetching"

    if (signUp.status === "complete" || isSignedIn) {
        return null;
    }

    const onVerifyPress = async () => {
        await signUp.verifications.verifyEmailCode({ code, })

        if (signUp.status == "complete") {
            await signUp.finalize({
                navigate: ({ decorateUrl }) => {
                    const url = decorateUrl("/");
                    router.replace(url as any)

                }
            })
        }

    }

    const onSignUpPress = async () => {
        const { error } = await signUp.password({
            emailAddress: email,
            password, firstName, lastName
        })
        if (error) {
            alert(error.message)
            return
        }

        if (!error) await signUp.verifications.sendEmailCode();
    };

    if (
        signUp.status == "missing_requirements" && signUp.unverifiedFields.includes('email_address') &&
        signUp.missingFields.length == 0
    ) {
        return (
            <View className='flex-1 justify-center px-6 py-12'>
                <Image
                    source={require("../../assets/images/kribb.png")}
                    className='w-32 h-16 mb-8'
                    resizeMode='contain'
                />
                <Text className='text-4xl font-bold'>Verify Your Account</Text>
                <Text className='color-zinc-500'>Check your email {email}</Text>

                <View className='flex-row gap-4 mt-4'>
                    <TextInput
                        className='flex-1 border border-zinc-300 border-1 rounded-xl p-5'
                        placeholder='Enter Verification Code'
                        placeholderTextColor={"zinc"}

                        keyboardType='number-pad'
                        value={code}
                        onChangeText={setCode}
                        autoCapitalize='words'
                    ></TextInput>
                    {errors.fields.code && (<Text
                        className='text-red-600 mb-4'
                    >{errors.fields.code.message}</Text>)}</View>

                <TouchableOpacity
                    onPress={onVerifyPress}

                    disabled={isLoading}
                    className="bg-black mt-4 items-center justify-center rounded-xl mb-4 w-full h-16"

                >

                    {isLoading ? (<ActivityIndicator color="while" />)
                        : (<Text className='text-white font-bold text-base'> Verify
                        </Text>)}

                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    signUp.verifications.sendEmailCode()
                }
                }>

                    <Text className='text-blue-600 '>Need new code?</Text>
                </TouchableOpacity>


            </View>
        );

    }



    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            className='bg-white'
            keyboardShouldPersistTaps="handled"
        >
            <View className='flex-1 justify-center px-6 py-12'>
                <Image
                    source={require("../../assets/images/kribb.png")}
                    className='w-32 h-16 mb-8'
                    resizeMode='contain'
                />
                <Text className='text-4xl font-bold'>Create Account</Text>
                <Text className='color-zinc-500'>Find your dream home today</Text>

                <View className='flex-row gap-4 mt-4'>
                    <TextInput
                        className='flex-1 border border-zinc-300 border-1 rounded-xl p-5'
                        placeholder='First Name'
                        placeholderTextColor={"zinc"}
                        value={firstName}
                        onChangeText={setFirstName}
                        autoCapitalize='words'
                    ></TextInput>

                    <TextInput
                        className='flex-1 border border-zinc-300 border-1 rounded-xl p-5'
                        placeholder='Last Name'
                        placeholderTextColor={"zinc"}
                        value={lastName}
                        onChangeText={setLastName}
                        autoCapitalize='words'
                    ></TextInput>
                </View>

                <TextInput
                    className='w-full border border-zinc-300 border-1 rounded-xl p-5 mt-4'
                    placeholder='Email'
                    placeholderTextColor={"zinc"}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType='email-address'
                    autoCapitalize='none'
                />
                {errors.fields.emailAddress && (<Text
                    className='text-red-600 mb-4'
                >{errors.fields.emailAddress.message}</Text>)}

                <TextInput
                    className='w-full border border-zinc-300 border-1 rounded-xl p-5 mt-4'
                    placeholder='Password'
                    placeholderTextColor={"zinc"}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize='none'
                />
                {errors.fields.password && (<Text
                    className='text-red-600 mb-4'
                >{errors.fields.password.message}</Text>)}

                <TouchableOpacity
                    onPress={onSignUpPress}

                    disabled={isLoading}
                    className="bg-blue-600 mt-4 items-center justify-center rounded-xl mb-4 w-full h-16"

                ><Text className='text-white font-bold text-base'> Sign Up
                    </Text>

                </TouchableOpacity>

                <View

                    className='flex-row justify-center'
                >
                    <Text className='text-gray-600 font-medium '>Alredy have account?
                    </Text>
                    <Link href="/sign-in"><Text className='color-blue-700 font-semibold'>Sign In</Text>
                    </Link>
                </View>
                <View nativeID='clerk-captcha' />

            </View>
        </ScrollView>

    )
}
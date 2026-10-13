import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '@clerk/expo'
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { router } from 'expo-router';

export default function profile() {

  const router = useRouter();
  const {signOut} = useAuth();
  const handleSignOut = async () =>{
    try{
      await signOut();
      router.replace('/sign-in')
    }
    catch(error){
      console.error("Error signing out:",error);
    }
  }
  return (
    <SafeAreaView>
      <Text>
        Profile
      </Text>
      <TouchableOpacity onPress={handleSignOut} className='mt-10 p-4 bg-black w-40 m-4 flex items-center border-2 rounded-md'>
        <Text className='color-white'>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
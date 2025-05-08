// import { View, Text } from 'react-native'
// import React from 'react'

// export default function index() {
//   return (
//     <View>
//       <Text>index</Text>
//     </View>
//   )
// }
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function index() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-4 py-2">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-4">
          <Ionicons name="construct-outline" size={24} color="#A855F7" />
          <Ionicons name="notifications-outline" size={24} color="#A855F7" />
        </View>

        {/* Welcome Text */}
        <Text className="text-2xl font-bold">Welcome,{"\n"}Taken Vera.</Text>
        <Text className="text-base text-gray-500 mb-4">Your disability here is an ability</Text>

        {/* Cards */}
        <View className="space-y-4">
          <Card title="Find Jobs" bg="bg-purple-600" icon="briefcase-outline" />
          <Card title="Health Benefits" bg="bg-red-600" icon="heart-outline" />
          <Card title="Communities" bg="bg-green-600" icon="people-outline" />
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="flex-row justify-between bg-purple-600 p-2 px-4">
        <BottomTab icon="home" label="Home" />
        <BottomTab icon="person-outline" label="Profile" />
        <BottomTab icon="chatbubble-outline" label="Chat" />
        <BottomTab icon="settings-outline" label="Setting" />
        <BottomTab icon="notifications-outline" label="Notification" />
      </View>
    </SafeAreaView>
  );
}

function Card({ title, bg, icon }:{title: string; bg: string; icon:"briefcase-outline"|"heart-outline"|"people-outline"}) {
  return (
    <View className={`rounded-xl p-4 ${bg} flex-row items-center justify-between`}>
      <Image
        source={require('../assets/images/icon.png')} // Replace with your actual image
        className="w-12 h-12"
      />
      <View>
        <Text className="text-white text-lg font-semibold">{title}</Text>
        <Ionicons name={icon} size={20} color="#fff" />
      </View>
      <Ionicons name="mic-outline" size={20} color="#fff" />
    </View>
  );
}

function BottomTab({ icon, label }:{icon:"home"|"person-outline"|"chatbubble-outline"|"settings-outline"|"notifications-outline"; label: string}) {
  return (
    <TouchableOpacity className="items-center">
      <Ionicons name={icon} size={22} color="#fff" />
      <Text className="text-white text-xs">{label}</Text>
    </TouchableOpacity>
  );
}

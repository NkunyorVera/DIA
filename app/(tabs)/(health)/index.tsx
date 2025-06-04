// import { getHealthBenefits } from "@/lib/appwite_utility";
// import { HealthBenefit } from "@/lib/types";
// import { useRouter } from "expo-router";
// import React, { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   FlatList,
//   Image,
//   Pressable,
//   Text,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// const HealthBenefitScreen = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [healthBenefits, setHealthBenefits] = useState<HealthBenefit[] | any>(
//     []
//   );

//   const router = useRouter();

//   useEffect(() => {
//     getHealthBenefits()
//       .then((res) => {
//         setHealthBenefits(res);
//       })
//       .catch(console.error)
//       .finally(() => setIsLoading(false));
//   }, []);

//   const renderItem = ({ item }: { item: HealthBenefit }) => (
//     <Pressable
//       onPress={() =>
//         router.push({
//           pathname: "/(tabs)/(health)/details/[id]",
//           params: { id: item.$id },
//         })
//       }
//       className="bg-white shadow-md rounded-2xl mb-4 overflow-hidden"
//     >
//       <Image
//         source={require("@/assets/logo.svg")}
//         className="w-full h-40"
//         resizeMode="cover"
//       />
//       <View className="p-4">
//         <Text className="text-lg font-bold">{item.title}</Text>
//         <Text className="text-gray-600">{item.organization}</Text>
//       </View>
//     </Pressable>
//   );

//   return (
//     <SafeAreaView className="flex-1 bg-gray-50 px-4 pt-4">
//       <Text className="text-2xl font-bold mb-4">Health Benefits</Text>

//       {isLoading ? (
//         <View className="flex-1 justify-center items-center">
//           <ActivityIndicator size="large" />
//         </View>
//       ) : (
//         <FlatList
//           data={healthBenefits}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.$id}
//           showsVerticalScrollIndicator={false}
//         />
//       )}
//     </SafeAreaView>
//   );
// };

// export default HealthBenefitScreen;

import CustomText from "@/components/CustomText";
import { getHealthBenefits } from "@/lib/appwite_utility";
import { HealthBenefit } from "@/lib/types";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HealthBenefitScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [healthBenefits, setHealthBenefits] = useState<HealthBenefit[] | any>(
    []
  );
  const router = useRouter();

  useEffect(() => {
    getHealthBenefits()
      .then((res) => {
        setHealthBenefits(res);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  // Mock data to match the style
  const mockBenefits = [
    {
      id: "1",
      title: "Comprehensive Health Plan",
      organization: "BlueCross Healthcare",
      description:
        "Get access to premium healthcare services with full coverage including dental and vision.",
      type: "Full Coverage",
      deadline: "2023-12-31",
    },
    {
      id: "2",
      title: "Mental Wellness Program",
      organization: "MindCare Solutions",
      description:
        "Professional counseling and therapy sessions covered up to 20 visits per year.",
      type: "Mental Health",
      deadline: "2023-11-15",
    },
  ];

  const renderItem = ({ item }: { item: HealthBenefit | any }) => (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/(tabs)/(health)/details/[id]",
          params: { id: item.$id || item.id },
        })
      }
      className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-gray-100"
    >
      {/* Header with bookmark */}
      <View className="flex-row justify-between items-start mb-3">
        <View>
          <CustomText className="text-lg font-bold text-gray-900">
            {item.title}
          </CustomText>
          <CustomText className="text-gray-500 text-sm">
            {item.organization}
          </CustomText>
        </View>
        <Pressable>
          <Feather name="bookmark" size={20} color="#9ca3af" />
        </Pressable>
      </View>

      {/* Description */}
      <CustomText className="text-gray-600 text-sm mb-4">
        {item.description}
      </CustomText>

      {/* Benefit details */}
      <View className="flex-row space-x-3 mb-4">
        <View className="bg-blue-50 px-3 py-1 rounded-full">
          <CustomText className="text-blue-600 text-xs font-medium">
            {item.type}
          </CustomText>
        </View>
        <View className="bg-purple-50 px-3 py-1 rounded-full flex-row items-center">
          <Ionicons name="calendar" size={14} color="#8b5cf6" />
          <CustomText className="text-purple-600 text-xs font-medium ml-1">
            Apply by {item.deadline}
          </CustomText>
        </View>
      </View>

      {/* View Details Button */}
      <Pressable className="border border-blue-600 py-2 rounded-lg items-center">
        <CustomText className="text-blue-600 font-bold">
          View Details
        </CustomText>
      </Pressable>
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 pt-6 pb-4">
        <View className="flex-row justify-between items-center mb-2">
          <CustomText className="text-2xl font-bold text-gray-900">
            Health Benefits
          </CustomText>
          <Pressable>
            <Feather name="search" size={24} color="#4b5563" />
          </Pressable>
        </View>

        <CustomText className="text-gray-500 text-sm">
          {healthBenefits.length} Available benefits
        </CustomText>
      </View>

      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      ) : (
        <FlatList
          data={mockBenefits.length ? mockBenefits : healthBenefits}
          renderItem={renderItem}
          keyExtractor={(item) => item.$id || item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
        />
      )}
    </SafeAreaView>
  );
};

export default HealthBenefitScreen;

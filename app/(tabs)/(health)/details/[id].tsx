// import CustomText from "@/components/CustomText";
// import { getSingleHealthBenefit } from "@/lib/appwite_utility";
// import { HealthBenefit } from "@/lib/types";
// import { showToast } from "@/utils/imageHelpers";
// import { Feather } from "@expo/vector-icons";
// import { useLocalSearchParams } from "expo-router";
// import React, { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   Linking,
//   SafeAreaView,
//   ScrollView,
//   TouchableOpacity,
//   View,
// } from "react-native";

// const HealthBenefitDetailsScreen = () => {
//   const { id } = useLocalSearchParams();
//   const [benefit, setBenefit] = useState<HealthBenefit | any>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (id) {
//       getSingleHealthBenefit(id as string)
//         .then((res) => {
//           setBenefit(res);
//         })
//         .catch((error) => {
//           console.log(error);
//           showToast("error", "Load failed", "Failed to load data");
//         })
//         .finally(() => {
//           setIsLoading(false);
//         });
//     } else {
//       showToast("error", "Invalid ID", "No valid health benefit ID provided");
//     }
//   }, []);

//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       {isLoading && (
//         <View className="flex-1 justify-center items-center">
//           <ActivityIndicator size="large" />
//         </View>
//       )}

//       {benefit ? (
//         <ScrollView className="p-4 space-y-4">
//           <View>
//             <CustomText className="text-2xl capitalize font-bold">
//               {benefit.title}
//             </CustomText>
//             <CustomText className="text-gray-600 mb-2">
//               {benefit.organization}
//             </CustomText>
//           </View>

//           <View>
//             <CustomText className="text-base font-semibold mb-1">
//               Description
//             </CustomText>
//             <CustomText className="text-gray-700">
//               {benefit.description}
//             </CustomText>
//           </View>

//           <View className="flex-row items-start space-x-2">
//             <Feather name="calendar" size={20} color="gray" />
//             <View>
//               <CustomText className="font-semibold">Deadline</CustomText>
//               <CustomText className="text-gray-700">
//                 {new Date(benefit.deadline).toLocaleDateString("en-US", {
//                   day: "numeric",
//                   month: "long",
//                   year: "numeric",
//                 })}
//               </CustomText>
//             </View>
//           </View>

//           <View className="flex-row items-start space-x-2">
//             <Feather name="phone" size={20} color="gray" />
//             <View>
//               <CustomText className="font-semibold">Contact</CustomText>
//               <CustomText className="text-gray-700">
//                 {benefit.contact}
//               </CustomText>
//             </View>
//           </View>

//           <View className="flex-row items-start space-x-2">
//             <Feather name="map-pin" size={20} color="gray" />
//             <View>
//               <CustomText className="font-semibold">Location</CustomText>
//               <CustomText className="text-gray-700">
//                 {benefit.location}
//               </CustomText>
//             </View>
//           </View>

//           {benefit.website && (
//             <TouchableOpacity onPress={() => Linking.openURL(benefit.website)}>
//               <View className="flex-row items-start space-x-2">
//                 <Feather name="external-link" size={20} color="gray" />
//                 <CustomText className="text-blue-600 underline">
//                   {benefit.website}
//                 </CustomText>
//               </View>
//             </TouchableOpacity>
//           )}

//           {/* Apply Button */}
//           <TouchableOpacity
//             className="bg-blue-600 mt-6 py-4 rounded-xl items-center"
//             onPress={() => {
//               if (benefit.website) {
//                 Linking.openURL(benefit.website);
//               } else {
//                 showToast(
//                   "info",
//                   "No Website",
//                   "No application link available"
//                 );
//               }
//             }}
//           >
//             <CustomText className="text-white font-semibold text-lg">
//               Apply Now
//             </CustomText>
//           </TouchableOpacity>
//         </ScrollView>
//       ) : (
//         <View className="flex-1 justify-center items-center px-6">
//           <CustomText className="text-lg text-center text-gray-500">
//             Failed to load health benefit details
//           </CustomText>
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// export default HealthBenefitDetailsScreen;
import CustomText from "@/components/CustomText";
import { getSingleHealthBenefit } from "@/lib/appwite_utility";
import { HealthBenefitType } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { showToast } from "@/utils/imageHelpers";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

const HealthBenefitDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [benefit, setBenefit] = useState<HealthBenefitType | any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getSingleHealthBenefit(id as string)
        .then((res) => {
          setBenefit(res);
        })
        .catch((error) => {
          console.log(error);
          showToast("error", "Load failed", "Failed to load data");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      showToast("error", "Invalid ID", "No valid health benefit ID provided");
    }
  }, []);

  // Mock data for design purposes

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header with back button */}
      <View className="relative">
        <Image
          source={require("@/assets/health.jpg")}
          className="w-full h-48"
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-5 left-4 bg-white/80 p-2 rounded-full"
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {isLoading && (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      )}

      {benefit && (
        <ScrollView className="pt-6 px-6 space-y-6">
          {/* Title and Organization */}
          <View className="space-y-2">
            <CustomText className="text-3xl font-bold text-gray-900">
              {benefit.title}
            </CustomText>
            <CustomText className="text-xl text-blue-600">
              {benefit.organization}
            </CustomText>
          </View>

          {/* Benefit Type Tag */}
          <View className="bg-blue-50 self-start px-4 py-2 rounded-full">
            <CustomText className="text-blue-600 font-medium">
              {benefit.type}
            </CustomText>
          </View>

          {/* Description */}
          <View className="space-y-3">
            <CustomText className="text-xl font-bold text-gray-900">
              About This Benefit
            </CustomText>
            <CustomText className="text-gray-700 leading-6">
              {benefit.description}
            </CustomText>
          </View>

          {/* Benefits List */}
          <View className="space-y-3">
            <CustomText className="text-xl font-bold text-gray-900">
              What's Included
            </CustomText>
            <View className="space-y-2 pl-2">
              {benefit.benefits.map((item: string, index: number) => (
                <View key={index} className="flex-row items-start">
                  <View className="mt-1.5 mr-2">
                    <MaterialIcons
                      name="check-circle"
                      size={18}
                      color="#10b981"
                    />
                  </View>
                  <CustomText className="text-gray-700 flex-1 leading-6">
                    {item}
                  </CustomText>
                </View>
              ))}
            </View>
          </View>

          {/* Details Cards */}
          <View className="space-y-4">
            <View className="bg-gray-50 p-4 rounded-xl">
              <View className="flex-row items-start space-x-3">
                <View className="bg-blue-100 p-2 rounded-full">
                  <Feather name="calendar" size={18} color="#3b82f6" />
                </View>
                <View className="flex-1">
                  <CustomText className="font-semibold text-gray-500">
                    Deadline
                  </CustomText>
                  <CustomText className="text-gray-900">
                    {formatDate(benefit.deadline)}
                  </CustomText>
                </View>
              </View>
            </View>

            <View className="bg-gray-50 p-4 rounded-xl">
              <View className="flex-row items-start space-x-3">
                <View className="bg-purple-100 p-2 rounded-full">
                  <Feather name="phone" size={18} color="#8b5cf6" />
                </View>
                <View className="flex-1">
                  <CustomText className="font-semibold text-gray-500">
                    Contact
                  </CustomText>
                  <CustomText className="text-gray-900">
                    {benefit.contact || "None"}
                  </CustomText>
                </View>
              </View>
            </View>

            <View className="bg-gray-50 p-4 rounded-xl">
              <View className="flex-row items-start space-x-3">
                <View className="bg-green-100 p-2 rounded-full">
                  <Feather name="map-pin" size={18} color="#10b981" />
                </View>
                <View className="flex-1">
                  <CustomText className="font-semibold text-gray-500">
                    Coverage Area
                  </CustomText>
                  <CustomText className="text-gray-900">
                    {benefit.location || "None"}
                  </CustomText>
                </View>
              </View>
            </View>
          </View>

          {/* Website Link */}
          {benefit.website && (
            <TouchableOpacity
              className="bg-blue-50 p-4 rounded-xl flex-row items-center justify-between"
              onPress={() => Linking.openURL(benefit.website)}
            >
              <View className="flex-row items-center space-x-3">
                <View className="bg-blue-100 p-2 rounded-full">
                  <Feather name="external-link" size={18} color="#3b82f6" />
                </View>
                <CustomText className="text-blue-600 font-medium">
                  Visit Website
                </CustomText>
              </View>
              <Feather name="chevron-right" size={20} color="#3b82f6" />
            </TouchableOpacity>
          )}

          {/* Apply Button */}
          <TouchableOpacity
            className="border-2 mb-16 border-purple-600 bg-white py-4 rounded-xl items-center shadow-md shadow-blue-500/30 mt-6"
            onPress={() => {
              if (benefit.website) {
                Linking.openURL(benefit.website);
              } else {
                showToast(
                  "info",
                  "No Website",
                  "No application link available"
                );
              }
            }}
          >
            <CustomText className="text-purple-600 font-bold text-lg">
              Apply Now
            </CustomText>
          </TouchableOpacity>
        </ScrollView>
      )}

      {!isLoading && !benefit && (
        <View className="flex-1 justify-center items-center px-6">
          <CustomText className="text-lg text-center text-gray-500">
            Failed to load health benefit details
          </CustomText>
        </View>
      )}
    </SafeAreaView>
  );
};

export default HealthBenefitDetailsScreen;

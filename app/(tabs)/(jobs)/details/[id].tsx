// import CustomText from "@/components/CustomText";
// import { getSingleJob } from "@/lib/appwite_utility";
// import { HealthBenefit } from "@/lib/types";
// import { formatDate } from "@/lib/utils";
// import { showToast } from "@/utils/imageHelpers";
// import { Feather, Ionicons } from "@expo/vector-icons";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import React, { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   Image,
//   Linking,
//   Pressable,
//   ScrollView,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// const SingleJobScreen = () => {
//   const { id } = useLocalSearchParams();
//   const router = useRouter();
//   const [benefit, setBenefit] = useState<HealthBenefit | any>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (id) {
//       getSingleJob(id as string)
//         .then((res) => {
//           setBenefit(res);
//         })
//         .catch((error) => {
//           console.error(error);
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
//       {/* Header Image + Back Button */}
//       <View className="relative">
//         <Image
//           source={require("@/assets/jobs.jpg")}
//           className="w-full h-48"
//           resizeMode="cover"
//         />
//         <Pressable
//           onPress={() => router.back()}
//           className="absolute top-5 left-4 bg-white/80 p-2 rounded-full"
//         >
//           <Ionicons name="arrow-back" size={24} color="#000" />
//         </Pressable>
//       </View>

//       {isLoading ? (
//         <View className="flex-1 justify-center items-center">
//           <ActivityIndicator size="large" color="#000" />
//         </View>
//       ) : benefit ? (
//         <>
//           <ScrollView className="p-4 space-y-5">
//             <View>
//               <CustomText className="text-2xl font-bold text-black">
//                 {benefit.title}
//               </CustomText>
//               <CustomText className="text-gray-600 text-base">
//                 {benefit.organization}
//               </CustomText>
//             </View>

//             <View>
//               <CustomText className="text-base font-semibold mb-1">
//                 Description
//               </CustomText>
//               <CustomText className="text-gray-700">
//                 {benefit.description}
//               </CustomText>
//             </View>

//             <View className="flex-row items-start space-x-2">
//               <Feather name="calendar" size={20} color="gray" />
//               <View>
//                 <CustomText className="font-semibold">Deadline</CustomText>
//                 <CustomText className="text-gray-700">
//                   {formatDate(benefit.deadline)}
//                 </CustomText>
//               </View>
//             </View>

//             <View className="flex-row items-start space-x-2">
//               <Feather name="phone" size={20} color="gray" />
//               <View>
//                 <CustomText className="font-semibold">Contact</CustomText>
//                 <CustomText className="text-gray-700">
//                   {benefit.contact}
//                 </CustomText>
//               </View>
//             </View>

//             <View className="flex-row items-start space-x-2">
//               <Feather name="map-pin" size={20} color="gray" />
//               <View>
//                 <CustomText className="font-semibold">Location</CustomText>
//                 <CustomText className="text-gray-700">
//                   {benefit.location}
//                 </CustomText>
//               </View>
//             </View>

//             {benefit.website && (
//               <TouchableOpacity
//                 onPress={() => Linking.openURL(benefit.website)}
//               >
//                 <CustomText className="text-blue-600 underline">
//                   Visit Website
//                 </CustomText>
//               </TouchableOpacity>
//             )}
//           </ScrollView>

//           {/* Apply Button */}
//           <View className="px-4 pb-4">
//             <TouchableOpacity
//               className="bg-blue-600 py-4 rounded-xl items-center"
//               onPress={() => {
//                 if (benefit.website) {
//                   Linking.openURL(benefit.website);
//                 } else {
//                   showToast(
//                     "info",
//                     "No website",
//                     "No application link available"
//                   );
//                 }
//               }}
//             >
//               <CustomText className="text-white font-semibold text-lg">
//                 Apply Now
//               </CustomText>
//             </TouchableOpacity>
//           </View>
//         </>
//       ) : (
//         <View className="flex-1 justify-center items-center px-6">
//           <CustomText className="text-lg text-center text-gray-500">
//             Failed to load health benefit details.
//           </CustomText>
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// export default SingleJobScreen;

import CustomText from "@/components/CustomText";
import { getSingleJob } from "@/lib/appwite_utility";
import { HealthBenefit } from "@/lib/types";
import { showToast } from "@/utils/imageHelpers";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SingleJobScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [job, setJob] = useState<HealthBenefit | any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getSingleJob(id as string)
        .then((res) => {
          setJob(res);
        })
        .catch((error) => {
          console.error(error);
          showToast("error", "Load failed", "Failed to load data");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      showToast("error", "Invalid ID", "No valid job ID provided");
    }
  }, []);

  // Mock data structure to match your image
  const mockJob = {
    title: "UI/UX Designer",
    organization: "Design Monks",
    salary: "$300/M",
    jobTime: "Full Time",
    location: "Remote",
    description:
      "We are looking for a talented UI/UX Designer to create user-friendly designs for web and mobile apps. You will collaborate with developers and stakeholders to bring ideas to life.",
    responsibilities: [
      "Create wireframes, prototypes, and high-fidelity designs",
      "Conduct user research and improve UX flow",
      "Work closely with developers to ensure smooth implementation",
    ],
  };

  return (
    <SafeAreaView edges={[]} className="flex-1 bg-white">
      {/* Header Image + Back Button */}
      <View className="relative">
        <Image
          source={require("@/assets/jobs.jpg")}
          className="w-full h-48"
          resizeMode="cover"
        />
        <Pressable
          onPress={() => router.back()}
          className="absolute top-5 left-4 bg-white/80 p-2 rounded-full"
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
      </View>

      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <>
          <ScrollView className="p-6 space-y-6">
            {/* Job Title and Company */}
            <View className="space-y-2">
              <CustomText className="text-3xl font-bold text-gray-900">
                {mockJob.title}
              </CustomText>
              <CustomText className="text-xl text-gray-600">
                {mockJob.organization}
              </CustomText>
            </View>

            {/* Job Highlights */}
            <View className="flex-row flex-wrap gap-3">
              <View className="bg-blue-50 px-4 py-2 rounded-full flex-row items-center">
                <MaterialIcons name="attach-money" size={18} color="#3b82f6" />
                <CustomText className="text-blue-600 ml-1 font-medium">
                  {mockJob.salary}
                </CustomText>
              </View>
              <View className="bg-purple-50 px-4 py-2 rounded-full flex-row items-center">
                <Feather name="clock" size={16} color="#8b5cf6" />
                <CustomText className="text-purple-600 ml-1 font-medium">
                  {mockJob.jobTime}
                </CustomText>
              </View>
              <View className="bg-green-50 px-4 py-2 rounded-full flex-row items-center">
                <Feather name="map-pin" size={16} color="#10b981" />
                <CustomText className="text-green-600 ml-1 font-medium">
                  {mockJob.location}
                </CustomText>
              </View>
            </View>

            {/* Description */}
            <View className="space-y-3">
              <CustomText className="text-xl font-bold text-gray-900">
                Description
              </CustomText>
              <CustomText className="text-gray-700 leading-6">
                {mockJob.description}
              </CustomText>
            </View>

            {/* Responsibilities */}
            <View className="space-y-3">
              <CustomText className="text-xl font-bold text-gray-900">
                Responsibilities
              </CustomText>
              <View className="space-y-2 pl-2">
                {mockJob.responsibilities.map((item, index) => (
                  <View key={index} className="flex-row items-start">
                    <View className="mt-1.5 mr-2">
                      <MaterialIcons name="circle" size={8} color="#6b7280" />
                    </View>
                    <CustomText className="text-gray-700 flex-1 leading-6">
                      {item}
                    </CustomText>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Apply Button */}
          <View className="px-6 pb-6 pt-3 border-t border-gray-100">
            <TouchableOpacity
              className="bg-blue-600 py-4 rounded-xl items-center shadow-md shadow-blue-500/30"
              onPress={() => {
                showToast(
                  "success",
                  "Application",
                  "Application process started"
                );
              }}
            >
              <CustomText className="text-white font-bold text-lg">
                Apply Now
              </CustomText>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default SingleJobScreen;

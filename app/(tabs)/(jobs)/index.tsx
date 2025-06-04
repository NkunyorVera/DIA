// import CustomText from "@/components/CustomText";
// import { getJobs } from "@/lib/appwite_utility";
// import { formatDate } from "@/lib/utils";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import React, { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   ScrollView,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function FindJobsScreen() {
//   const [jobs, setJobs] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     getJobs()
//       .then((res) => {
//         setJobs(res);
//       })
//       .catch((error) => {
//         console.error("Failed to fetch jobs:", error);
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   }, []);

//   return (
//     <SafeAreaView edges={[]} className="flex-1 bg-white">
//       <View className="flex-1 bg-purple-50">
//         {/* Header */}
//         <View className="bg-purple-600 px-6 py-5 rounded-b-3xl">
//           <CustomText className="text-white text-3xl font-bold">
//             Find Jobs
//           </CustomText>
//           <CustomText className="text-purple-100 mt-1 text-base">
//             For your ability
//           </CustomText>
//         </View>

//         {/* Content */}
//         <ScrollView className="flex-1 px-6 pt-6">
//           {/* Categories */}
//           <View className="flex-row space-x-3 mb-6">
//             <TouchableOpacity className="bg-purple-600 px-5 py-2.5 rounded-full">
//               <CustomText className="text-white font-medium text-sm">
//                 Recommended
//               </CustomText>
//             </TouchableOpacity>
//             <TouchableOpacity className="bg-purple-100 px-5 py-2.5 rounded-full">
//               <CustomText className="text-purple-800 font-medium text-sm">
//                 Trending
//               </CustomText>
//             </TouchableOpacity>
//           </View>

//           {/* Job Listings */}
//           <View className="gap-5 pb-10">
//             {isLoading && (
//               <View className="flex-1 justify-center items-center">
//                 <ActivityIndicator size="large" />
//               </View>
//             )}
//             {!isLoading && jobs.length === 0 && (
//               <View>
//                 <CustomText>No Jobs Available</CustomText>
//               </View>
//             )}
//             {!isLoading &&
//               jobs.length > 0 &&
//               jobs.map((item: any, index: number) => (
//                 <TouchableOpacity
//                   onPress={() =>
//                     router.push({
//                       pathname: "/(tabs)/(jobs)/details/[id]",
//                       params: { id: item.$id },
//                     })
//                   }
//                   key={item.$id || index}
//                   className="bg-white p-5 rounded-2xl shadow-sm border border-blue-100"
//                 >
//                   {/* Time */}
//                   <CustomText className="text-gray-500 text-xs mb-2">
//                     {formatDate(item?.deadline)}
//                   </CustomText>

//                   {/* Job Info */}
//                   <View className="flex-row items-start mb-4">
//                     <View className="bg-purple-100 p-3 rounded-full mr-4">
//                       <Ionicons name="briefcase" size={20} color="#9333ea" />
//                     </View>
//                     <View className="flex-1">
//                       <CustomText className="text-purple-800 text-lg font-semibold">
//                         {item.company}
//                       </CustomText>
//                       <CustomText className="text-gray-600 text-sm">
//                         {item.title}
//                       </CustomText>
//                     </View>
//                   </View>
//                 </TouchableOpacity>
//               ))}
//           </View>
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// }

import CustomText from "@/components/CustomText";
import { getJobs } from "@/lib/appwite_utility";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FindJobsScreen() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"remote" | "onsite" | "all">("all");
  const router = useRouter();

  useEffect(() => {
    getJobs()
      .then((res) => {
        setJobs(res);
      })
      .catch((error) => {
        console.error("Failed to fetch jobs:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Mock data to match your image
  const mockJobs = [
    {
      id: "1",
      company: "Design Monks",
      title: "Jr. UI/UX Designer",
      salary: "$300-$600",
      type: "remote",
      description:
        "Join top clients and find freelance jobs that match your skills! Browse, apply, and get hired for roles like UI/UX design, digital marketing, and more—all in one place!",
      progress: "5/45",
    },
    {
      id: "2",
      company: "Musemind",
      title: "Sr. Product Designer",
      salary: "$300-$600",
      type: "remote",
      description:
        "Join top clients and find freelance jobs that match your skills! Browse, apply, and get hired for roles like UI/UX design, digital marketing, and more—all in one place!",
      progress: "5/45",
    },
  ];

  return (
    <SafeAreaView edges={[]} className="flex-1 bg-white">
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-6 pt-6 pb-4">
          <View className="flex-row justify-between items-center mb-2">
            <CustomText className="text-2xl font-bold text-gray-900">
              Find Jobs
            </CustomText>
            <TouchableOpacity>
              <Feather name="bell" size={24} color="#4b5563" />
            </TouchableOpacity>
          </View>

          <CustomText className="text-gray-500 text-sm">
            64 New jobs available
          </CustomText>
        </View>

        {/* Location Filter */}
        <View className="flex-row px-6 pb-4 space-x-3">
          <TouchableOpacity
            className={`px-4 py-2 rounded-full ${
              filter === "remote" ? "bg-blue-600" : "bg-gray-100"
            }`}
            onPress={() => setFilter("remote")}
          >
            <CustomText
              className={`${
                filter === "remote" ? "text-white" : "text-gray-700"
              } font-medium`}
            >
              Remote Only
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            className={`px-4 py-2 rounded-full ${
              filter === "onsite" ? "bg-blue-600" : "bg-gray-100"
            }`}
            onPress={() => setFilter("onsite")}
          >
            <CustomText
              className={`${
                filter === "onsite" ? "text-white" : "text-gray-700"
              } font-medium`}
            >
              Onsite Only
            </CustomText>
          </TouchableOpacity>
        </View>

        {/* Job Listings */}
        <View className="px-6 pb-10 space-y-5">
          {isLoading ? (
            <View className="flex-1 justify-center items-center py-10">
              <ActivityIndicator size="large" color="#3b82f6" />
            </View>
          ) : (
            <>
              {mockJobs.map((job, index) => (
                <View
                  key={job.id || index}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                >
                  {/* Company Header */}
                  <View className="flex-row justify-between items-start mb-3">
                    <View>
                      <CustomText className="text-lg font-bold text-gray-900">
                        {job.company}
                      </CustomText>
                      <CustomText className="text-gray-500 text-sm">
                        {job.progress} applicants
                      </CustomText>
                    </View>
                    <TouchableOpacity>
                      <MaterialIcons
                        name="bookmark-border"
                        size={24}
                        color="#9ca3af"
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Job Description */}
                  <CustomText className="text-gray-600 text-sm mb-4">
                    {job.description}
                  </CustomText>

                  {/* Job Title and Salary */}
                  <View className="mb-4">
                    <CustomText className="text-xl font-bold text-gray-900 mb-1">
                      {job.title}
                    </CustomText>
                    <CustomText className="text-blue-600 font-medium">
                      Salary: {job.salary}
                    </CustomText>
                  </View>

                  {/* Apply Button */}
                  <TouchableOpacity
                    className="bg-blue-600 py-3 rounded-lg items-center"
                    onPress={() =>
                      router.push(`/(tabs)/(jobs)/details/${job.id}`)
                    }
                  >
                    <CustomText className="text-white font-bold">
                      Apply
                    </CustomText>
                  </TouchableOpacity>
                </View>
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

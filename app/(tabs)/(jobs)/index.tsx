import CustomText from "@/components/CustomText";
import { getJobs } from "@/lib/appwite_utility";
import { formatDate } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
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

  return (
    <SafeAreaView edges={[]} className="flex-1 bg-white">
      <View className="flex-1 bg-purple-50">
        {/* Header */}
        <View className="bg-purple-600 px-6 py-5 rounded-b-3xl">
          <CustomText className="text-white text-3xl font-bold">
            Find Jobs
          </CustomText>
          <CustomText className="text-purple-100 mt-1 text-base">
            For your ability
          </CustomText>
        </View>

        {/* Content */}
        <ScrollView className="flex-1 px-6 pt-6">
          {/* Categories */}
          <View className="flex-row space-x-3 mb-6">
            <TouchableOpacity className="bg-purple-600 px-5 py-2.5 rounded-full">
              <CustomText className="text-white font-medium text-sm">
                Recommended
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity className="bg-purple-100 px-5 py-2.5 rounded-full">
              <CustomText className="text-purple-800 font-medium text-sm">
                Trending
              </CustomText>
            </TouchableOpacity>
          </View>

          {/* Job Listings */}
          <View className="gap-5 pb-10">
            {isLoading && (
              <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" />
              </View>
            )}
            {!isLoading && jobs.length === 0 && (
              <View>
                <CustomText>No Jobs Available</CustomText>
              </View>
            )}
            {!isLoading &&
              jobs.length > 0 &&
              jobs.map((item: any, index: number) => (
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/(tabs)/(jobs)/details/[id]",
                      params: { id: item.$id },
                    })
                  }
                  key={item.$id || index}
                  className="bg-white p-5 rounded-2xl shadow-sm border border-blue-100"
                >
                  {/* Time */}
                  <CustomText className="text-gray-500 text-xs mb-2">
                    {formatDate(item?.deadline)}
                  </CustomText>

                  {/* Job Info */}
                  <View className="flex-row items-start mb-4">
                    <View className="bg-purple-100 p-3 rounded-full mr-4">
                      <Ionicons name="briefcase" size={20} color="#9333ea" />
                    </View>
                    <View className="flex-1">
                      <CustomText className="text-purple-800 text-lg font-semibold">
                        {item.company}
                      </CustomText>
                      <CustomText className="text-gray-600 text-sm">
                        {item.title}
                      </CustomText>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

import CustomText from "@/components/CustomText";
import JobCard from "@/components/JobCard";
import { getJobs } from "@/lib/appwite_utility";
import { JobType } from "@/lib/types";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FindJobsScreen() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"remote" | "onsite" | "all">("all");

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

  const renderItem = ({ item }: { item: JobType }) => {
    return <JobCard job={item} />;
  };

  return (
    <SafeAreaView edges={[]} className="flex-1 bg-white">
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
      <View className="px-5 pb-10 space-y-5">
        {isLoading ? (
          <View className="flex-1 justify-center items-center py-10">
            <ActivityIndicator size="large" color="#3b82f6" />
          </View>
        ) : jobs ? (
          <FlatList
            data={jobs}
            renderItem={renderItem}
            keyExtractor={(item) => item.$id || item.$id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 0,
              paddingBottom: 100,
              gap: 24,
            }}
          />
        ) : (
          <View className="flex items-center justify-center">
            <CustomText>No Jobs available</CustomText>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

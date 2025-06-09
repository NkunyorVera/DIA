import CustomText from "@/components/CustomText";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getSingleJob } from "@/lib/appwite_utility";
import { HealthBenefit } from "@/lib/types";
import { formatDate } from "@/lib/utils";
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
  const { user } = useGlobalContext();
  const isVerified = user.disabilityCard !== null;

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
      ) : job ? (
        <>
          <ScrollView className="p-6 space-y-6">
            {/* Job Title and Company */}
            <View className="space-y-2 mb-4">
              <CustomText className="text-3xl font-bold text-gray-900">
                {job?.title}
              </CustomText>
              <CustomText className="text-xl text-gray-600">
                {job?.company}
              </CustomText>
            </View>

            {/* Job Highlights */}
            <View className="flex-row flex-wrap gap-2 mb-4">
              <View className="bg-blue-50 px-4 py-2 rounded-full flex-row items-center">
                <MaterialIcons name="attach-money" size={18} color="#3b82f6" />
                <CustomText className="text-blue-600 ml-1 font-medium text-sm">
                  {job?.salary}
                </CustomText>
              </View>
              <View className="bg-purple-50 px-4 py-2 rounded-full flex-row items-center">
                <Feather name="clock" size={16} color="#8b5cf6" />
                <CustomText className="text-purple-600 ml-1 font-medium text-sm">
                  {formatDate(job?.deadline, "short")}
                </CustomText>
              </View>
              <View className="bg-green-50 px-4 py-2 rounded-full flex-row items-center">
                <Feather name="map-pin" size={16} color="#10b981" />
                <CustomText className="text-green-600 ml-1 font-medium text-sm">
                  {job?.location || "Not specified"}
                </CustomText>
              </View>
              <View className="bg-orange-50 px-4 py-2 rounded-full flex-row items-center">
                <Feather name="globe" size={16} color="#ea580c" />
                <CustomText className="text-orange-600 ml-1 font-medium text-sm">
                  {job?.type}
                </CustomText>
              </View>
            </View>

            {/* Description */}
            <View className="space-y-3 mb-4">
              <CustomText className="text-xl font-bold text-gray-900">
                Description
              </CustomText>
              <CustomText className="text-gray-700 leading-6">
                {job?.description}
              </CustomText>
            </View>

            {/* Responsibilities */}
            <View className="space-y-3">
              <CustomText className="text-xl font-bold text-gray-900">
                Responsibilities
              </CustomText>
              <View className="space-y-2 pl-2">
                {job?.responsibilities &&
                  job?.responsibilities.map((item: string, index: number) => (
                    <View key={index} className="flex-row items-start">
                      <View className="mt-1.5 mr-2">
                        <MaterialIcons name="circle" size={8} color="#6b7280" />
                      </View>
                      <CustomText className="text-gray-700 flex-1 leading-6">
                        {item}
                      </CustomText>
                    </View>
                  ))}
                {job.responsibilities.length == 0 && (
                  <View className="flex justify-start py-2.5">
                    <CustomText>Not specified</CustomText>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>

          {/* Apply Button */}
          <View className="px-6 pb-6 pt-3 border-t border-gray-100">
            <TouchableOpacity
              className={`${
                isVerified ? "bg-purple-200" : "bg-gray-600"
              } py-4 rounded-xl items-center shadow-md shadow-purple-500/30`}
              onPress={() => {
                showToast(
                  "success",
                  "Application",
                  "Application process started"
                );
              }}
              disabled={isVerified}
            >
              <CustomText
                className={`${
                  isVerified ? "text-purple-600" : "text-white"
                } font-bold text-lg`}
              >
                Apply Now
              </CustomText>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View className="flex items-center justify-center">
          <CustomText>Failed to load job details</CustomText>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SingleJobScreen;

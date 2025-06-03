import CustomText from "@/components/CustomText";
import { getSingleJob } from "@/lib/appwite_utility";
import { HealthBenefit } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { showToast } from "@/utils/imageHelpers";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Linking,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SingleJobScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [benefit, setBenefit] = useState<HealthBenefit | any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getSingleJob(id as string)
        .then((res) => {
          setBenefit(res);
        })
        .catch((error) => {
          console.error(error);
          showToast("error", "Load failed", "Failed to load data");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      showToast("error", "Invalid ID", "No valid health benefit ID provided");
    }
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
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
      ) : benefit ? (
        <>
          <ScrollView className="p-4 space-y-5">
            <View>
              <CustomText className="text-2xl font-bold text-black">
                {benefit.title}
              </CustomText>
              <CustomText className="text-gray-600 text-base">
                {benefit.organization}
              </CustomText>
            </View>

            <View>
              <CustomText className="text-base font-semibold mb-1">
                Description
              </CustomText>
              <CustomText className="text-gray-700">
                {benefit.description}
              </CustomText>
            </View>

            <View className="flex-row items-start space-x-2">
              <Feather name="calendar" size={20} color="gray" />
              <View>
                <CustomText className="font-semibold">Deadline</CustomText>
                <CustomText className="text-gray-700">
                  {formatDate(benefit.deadline)}
                </CustomText>
              </View>
            </View>

            <View className="flex-row items-start space-x-2">
              <Feather name="phone" size={20} color="gray" />
              <View>
                <CustomText className="font-semibold">Contact</CustomText>
                <CustomText className="text-gray-700">
                  {benefit.contact}
                </CustomText>
              </View>
            </View>

            <View className="flex-row items-start space-x-2">
              <Feather name="map-pin" size={20} color="gray" />
              <View>
                <CustomText className="font-semibold">Location</CustomText>
                <CustomText className="text-gray-700">
                  {benefit.location}
                </CustomText>
              </View>
            </View>

            {benefit.website && (
              <TouchableOpacity
                onPress={() => Linking.openURL(benefit.website)}
              >
                <CustomText className="text-blue-600 underline">
                  Visit Website
                </CustomText>
              </TouchableOpacity>
            )}
          </ScrollView>

          {/* Apply Button */}
          <View className="px-4 pb-4">
            <TouchableOpacity
              className="bg-blue-600 py-4 rounded-xl items-center"
              onPress={() => {
                if (benefit.website) {
                  Linking.openURL(benefit.website);
                } else {
                  showToast(
                    "info",
                    "No website",
                    "No application link available"
                  );
                }
              }}
            >
              <CustomText className="text-white font-semibold text-lg">
                Apply Now
              </CustomText>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View className="flex-1 justify-center items-center px-6">
          <CustomText className="text-lg text-center text-gray-500">
            Failed to load health benefit details.
          </CustomText>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SingleJobScreen;

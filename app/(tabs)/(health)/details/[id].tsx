import CustomText from "@/components/CustomText";
import { getSingleHealthBenefit } from "@/lib/appwite_utility";
import { HealthBenefit } from "@/lib/types";
import { showToast } from "@/utils/imageHelpers";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

const HealthBenefitDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const [benefit, setBenefit] = useState<HealthBenefit | any>(null);
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

  return (
    <SafeAreaView className="flex-1 bg-white">
      {isLoading && (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
        </View>
      )}

      {benefit ? (
        <ScrollView className="p-4 space-y-4">
          <View>
            <CustomText className="text-2xl capitalize font-bold">
              {benefit.title}
            </CustomText>
            <CustomText className="text-gray-600 mb-2">
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
                {new Date(benefit.deadline).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
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
            <TouchableOpacity onPress={() => Linking.openURL(benefit.website)}>
              <View className="flex-row items-start space-x-2">
                <Feather name="external-link" size={20} color="gray" />
                <CustomText className="text-blue-600 underline">
                  {benefit.website}
                </CustomText>
              </View>
            </TouchableOpacity>
          )}

          {/* Apply Button */}
          <TouchableOpacity
            className="bg-blue-600 mt-6 py-4 rounded-xl items-center"
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
            <CustomText className="text-white font-semibold text-lg">
              Apply Now
            </CustomText>
          </TouchableOpacity>
        </ScrollView>
      ) : (
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

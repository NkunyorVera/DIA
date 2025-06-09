import { HealthBenefitType } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import CustomText from "./CustomText";

const HealthBenefitCard = ({
  $id,
  title,
  description,
  deadline,
  organization,
}: HealthBenefitType) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/(tabs)/(health)/details/[id]",
          params: { id: $id || "" },
        })
      }
      className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-gray-100"
    >
      {/* Header with bookmark */}
      <View className="flex-row justify-between items-start mb-3">
        <View>
          <CustomText className="text-lg font-bold text-gray-900">
            {title}
          </CustomText>
          <CustomText className="text-gray-500 text-sm">
            {organization}
          </CustomText>
        </View>
      </View>

      {/* Description */}
      <CustomText className="text-gray-600 text-sm mb-4">
        {description}
      </CustomText>

      {/* Benefit details */}
      <View className="flex-row space-x-3 mb-4">
        <View className="bg-purple-50 px-3 py-1 rounded-full flex-row items-center">
          <Ionicons name="calendar" size={14} color="#8b5cf6" />
          <CustomText className="text-purple-600 text-xs font-medium ml-1">
            Apply by {formatDate(deadline)}
          </CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HealthBenefitCard;

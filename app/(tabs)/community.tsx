import CustomText from "@/components/CustomText";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CommunitiesScreen() {
  return (
    <SafeAreaView edges={[]} className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="flex-1 bg-purple-50">
          {/* Header */}
          <View className="bg-purple-600 p-4">
            <CustomText className="text-white text-2xl font-bold">
              Communities
            </CustomText>
          </View>

          <ScrollView className="flex-1 p-6">
            {/* All Communities Section */}
            <View className="flex-row justify-between items-center mb-6">
              <CustomText className="text-purple-800 text-xl font-bold">
                All Communities
              </CustomText>
              <TouchableOpacity>
                <CustomText className="text-purple-600">View All</CustomText>
              </TouchableOpacity>
            </View>

            {/* Community Categories */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-6"
            >
              {[
                "Blind Sight",
                "Lame Walker",
                "Agile Feet",
                "Gentle Deaf",
                "Autism Allies",
              ].map((category) => (
                <TouchableOpacity
                  key={category}
                  className="bg-purple-100 rounded-full px-4 py-2 mr-3"
                >
                  <CustomText className="text-purple-800">
                    {category}
                  </CustomText>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* My Communities Section */}
            <CustomText className="text-purple-800 text-xl font-bold mb-4">
              My Communities
            </CustomText>

            {/* Community Cards */}
            <View className="gap-5">
              {/* Blind Sight Community */}
              <View className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                <View className="flex-row justify-between items-start mb-2">
                  <CustomText className="text-purple-800 text-lg font-bold">
                    Blind Sight
                  </CustomText>
                  <View className="flex-row items-center">
                    <Ionicons name="star" size={16} color="#F59E0B" />
                    <CustomText className="text-purple-800 ml-1">
                      4.2
                    </CustomText>
                  </View>
                </View>
                <CustomText className="text-purple-600 mb-3">
                  10k+ Members
                </CustomText>
                <TouchableOpacity className="bg-purple-600 py-2 rounded-lg">
                  <CustomText className="text-white text-center">
                    View Community
                  </CustomText>
                </TouchableOpacity>
              </View>

              {/* Gentle Deaf Cohort Community */}
              <View className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                <View className="flex-row justify-between items-start mb-2">
                  <CustomText className="text-purple-800 text-lg font-bold">
                    Gentle Deaf Cohort
                  </CustomText>
                  <View className="flex-row items-center">
                    <Ionicons name="star" size={16} color="#F59E0B" />
                    <CustomText className="text-purple-800 ml-1">
                      3.7
                    </CustomText>
                  </View>
                </View>
                <CustomText className="text-purple-600 mb-3">
                  6k+ Members
                </CustomText>
                <TouchableOpacity className="bg-purple-600 py-2 rounded-lg">
                  <CustomText className="text-white text-center">
                    View Community
                  </CustomText>
                </TouchableOpacity>
              </View>

              {/* Lame Walkers Community */}
              <View className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                <View className="flex-row justify-between items-start mb-2">
                  <CustomText className="text-purple-800 text-lg font-bold">
                    Lame Walkers
                  </CustomText>
                  <View className="flex-row items-center">
                    <Ionicons name="star" size={16} color="#F59E0B" />
                    <CustomText className="text-purple-800 ml-1">
                      4.2
                    </CustomText>
                  </View>
                </View>
                <CustomText className="text-purple-600 mb-3">
                  24k+ Members
                </CustomText>
                <TouchableOpacity className="bg-purple-600 py-2 rounded-lg">
                  <CustomText className="text-white text-center">
                    View Community
                  </CustomText>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

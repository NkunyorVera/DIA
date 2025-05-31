import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FindJobsScreen() {
  return (
    <SafeAreaView edges={[]} className="flex-1 bg-white">
      <View className="flex-1 bg-purple-50">
        {/* Header */}
        <View className="bg-purple-600 px-6 py-5 rounded-b-3xl">
          <Text className="text-white text-3xl font-bold">Find Jobs</Text>
          <Text className="text-purple-100 mt-1 text-base">
            For your ability
          </Text>
        </View>

        {/* Content */}
        <ScrollView className="flex-1 px-6 pt-6">
          {/* Categories */}
          <View className="flex-row space-x-3 mb-6">
            <TouchableOpacity className="bg-purple-600 px-5 py-2.5 rounded-full">
              <Text className="text-white font-medium text-sm">
                Recommended
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-purple-100 px-5 py-2.5 rounded-full">
              <Text className="text-purple-800 font-medium text-sm">
                Trending
              </Text>
            </TouchableOpacity>
          </View>

          {/* Job Listings */}
          <View className="gap-5 pb-10">
            {[1, 2, 3, 4].map((item) => (
              <View
                key={item}
                className="bg-white p-5 rounded-2xl shadow-sm border border-blue-100"
              >
                {/* Time */}
                <Text className="text-purple-500 text-xs mb-2">4 days ago</Text>

                {/* Job Info */}
                <View className="flex-row items-start mb-4">
                  <View className="bg-purple-100 p-3 rounded-full mr-4">
                    <Ionicons name="briefcase" size={20} color="#9333ea" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-purple-800 text-lg font-semibold">
                      ACC. Tech
                    </Text>
                    <Text className="text-purple-600 text-sm">
                      Customer Support role
                    </Text>
                  </View>
                </View>

                {/* Apply Button */}
                <TouchableOpacity className="bg-purple-600 py-2.5 rounded-xl">
                  <Text className="text-white text-center font-medium text-sm">
                    Apply Now
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

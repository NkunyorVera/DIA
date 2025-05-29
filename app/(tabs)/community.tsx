import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CommunitiesScreen() {
  return (
    <SafeAreaView edges={[]} className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="flex-1 bg-blue-50">
          {/* Header */}
          <View className="bg-blue-600 p-4">
            <Text className="text-white text-2xl font-bold">Communities</Text>
          </View>

          <ScrollView className="flex-1 p-6">
            {/* All Communities Section */}
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-blue-800 text-xl font-bold">
                All Communities
              </Text>
              <TouchableOpacity>
                <Text className="text-blue-600">View All</Text>
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
                  className="bg-blue-100 rounded-full px-4 py-2 mr-3"
                >
                  <Text className="text-blue-800">{category}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* My Communities Section */}
            <Text className="text-blue-800 text-xl font-bold mb-4">
              My Communities
            </Text>

            {/* Community Cards */}
            <View className="gap-5">
              {/* Blind Sight Community */}
              <View className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                <View className="flex-row justify-between items-start mb-2">
                  <Text className="text-blue-800 text-lg font-bold">
                    Blind Sight
                  </Text>
                  <View className="flex-row items-center">
                    <Ionicons name="star" size={16} color="#F59E0B" />
                    <Text className="text-blue-800 ml-1">4.2</Text>
                  </View>
                </View>
                <Text className="text-blue-600 mb-3">10k+ Members</Text>
                <TouchableOpacity className="bg-blue-600 py-2 rounded-lg">
                  <Text className="text-white text-center">View Community</Text>
                </TouchableOpacity>
              </View>

              {/* Gentle Deaf Cohort Community */}
              <View className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                <View className="flex-row justify-between items-start mb-2">
                  <Text className="text-blue-800 text-lg font-bold">
                    Gentle Deaf Cohort
                  </Text>
                  <View className="flex-row items-center">
                    <Ionicons name="star" size={16} color="#F59E0B" />
                    <Text className="text-blue-800 ml-1">3.7</Text>
                  </View>
                </View>
                <Text className="text-blue-600 mb-3">6k+ Members</Text>
                <TouchableOpacity className="bg-blue-600 py-2 rounded-lg">
                  <Text className="text-white text-center">View Community</Text>
                </TouchableOpacity>
              </View>

              {/* Lame Walkers Community */}
              <View className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                <View className="flex-row justify-between items-start mb-2">
                  <Text className="text-blue-800 text-lg font-bold">
                    Lame Walkers
                  </Text>
                  <View className="flex-row items-center">
                    <Ionicons name="star" size={16} color="#F59E0B" />
                    <Text className="text-blue-800 ml-1">4.2</Text>
                  </View>
                </View>
                <Text className="text-blue-600 mb-3">24k+ Members</Text>
                <TouchableOpacity className="bg-blue-600 py-2 rounded-lg">
                  <Text className="text-white text-center">View Community</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

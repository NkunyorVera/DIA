import CustomText from "@/components/CustomText";
import { useGlobalContext } from "@/context/GlobalProvider";
import { communities } from "@/lib/data";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function CommunitiesScreen() {
  const router = useRouter();
  const { user } = useGlobalContext();

  const goToCommunity = (id: string) => {
    router.push({
      pathname: "/(tabs)/(community)/chat/[groupId]",
      params: { groupId: id || "" },
    });
  };

  return (
    <SafeAreaView edges={[]} className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-purple-600 p-4 border-b border-gray-200">
        <CustomText className="text-gray-100 text-2xl font-bold">
          Communities
        </CustomText>
      </View>

      <ScrollView className="flex-1 px-4">
        {/* All Communities Section */}
        <View className="flex-row justify-between items-center my-4">
          <CustomText className="text-gray-900 text-lg font-semibold">
            All Communities
            {user.disability}
          </CustomText>
          <TouchableOpacity>
            <CustomText className="text-purple-500">View All</CustomText>
          </TouchableOpacity>
        </View>

        {/* Community Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-6"
        >
          {communities.map((community) => (
            <TouchableOpacity
              key={community.id}
              className="bg-gray-100 rounded-full px-4 py-2 mr-3"
            >
              <CustomText className="text-gray-800">
                {community.name}
              </CustomText>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* My Communities Section */}
        <CustomText className="text-gray-900 text-lg font-semibold mb-4">
          My Communities
        </CustomText>

        {/* Community Cards */}
        <View className="gap-4 mb-6">
          {communities.map((community) => {
            const isMember =
              user.disability.toLowerCase() ===
              community.groupDisability.toLowerCase();
            return (
              <View
                key={community.id}
                className="w-full items-start border border-gray-600 p-4 rounded-lg"
              >
                <View className="flex-row justify-between items-start mb-2">
                  <CustomText className="text-gray-900 text-lg font-semibold">
                    {community.name}
                  </CustomText>
                  <View className="flex-row items-center">
                    <Ionicons name="star" size={16} color="#F59E0B" />
                    <CustomText className="text-gray-800 ml-1">
                      {community.rating}
                    </CustomText>
                  </View>
                </View>
                <CustomText className="text-gray-500 text-sm mb-1">
                  {community.description}
                </CustomText>
                <CustomText className="text-gray-600 mb-3">
                  {community.members} Members
                </CustomText>

                <TouchableOpacity
                  key={community.id}
                  className="bg-purple-600 p-4 rounded-xl shadow-sm"
                  onPress={
                    isMember
                      ? () => goToCommunity(community.id)
                      : () => {
                          Toast.show({
                            type: "info",
                            text1: "Not member",
                            text2: "Not a member of this group",
                          });
                        }
                  }
                >
                  <CustomText className="text-white">View community</CustomText>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

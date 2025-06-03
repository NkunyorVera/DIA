import { getHealthBenefits } from "@/lib/appwite_utility";
import { HealthBenefit } from "@/lib/types";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HealthBenefitScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [healthBenefits, setHealthBenefits] = useState<HealthBenefit[] | any>(
    []
  );

  const router = useRouter();

  useEffect(() => {
    getHealthBenefits()
      .then((res) => {
        setHealthBenefits(res);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const renderItem = ({ item }: { item: HealthBenefit }) => (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/(tabs)/(health)/details/[id]",
          params: { id: item.$id },
        })
      }
      className="bg-white shadow-md rounded-2xl mb-4 overflow-hidden"
    >
      <Image
        source={require("@/assets/logo.svg")}
        className="w-full h-40"
        resizeMode="cover"
      />
      <View className="p-4">
        <Text className="text-lg font-bold">{item.title}</Text>
        <Text className="text-gray-600">{item.organization}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50 px-4 pt-4">
      <Text className="text-2xl font-bold mb-4">Health Benefits</Text>

      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={healthBenefits}
          renderItem={renderItem}
          keyExtractor={(item) => item.$id}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default HealthBenefitScreen;

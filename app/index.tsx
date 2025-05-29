import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";
import { navigate } from "expo-router/build/global-state/routing";
import React, { useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

type Slide = {
  title: string;
  description: string;
  imageUrl: string;
};

const slides: Slide[] = [
  {
    title: "Inclusive Job Opportunities",
    description: "Find disability-friendly employers and career resources.",
    imageUrl:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Supportive Community",
    description: "Connect with others who understand your experiences.",
    imageUrl:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Find Accessible Healthcare",
    description:
      "Easily search for doctors based on location, specialty, and availability.",
    imageUrl:
      "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
];

const OnboardingScreen: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { session } = useAuth();

  if (session) return <Redirect href={"/(tabs)"} />;

  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center relative">
      <View className="absolute top-10 right-6 z-10">
        <TouchableOpacity onPress={() => navigate("/signin")}>
          <Text className="text-blue-800 font-semibold text-lg">Skip</Text>
        </TouchableOpacity>
      </View>
      <View className="mb-10 items-center justify-center">
        <Image
          source={require("../assets/logo.png")}
          className="absolute"
          resizeMode="contain"
          style={{ width: 100, height: 100 }}
        />
      </View>
      <Carousel
        loop={true}
        width={width * 0.85}
        height={420}
        data={slides}
        scrollAnimationDuration={600}
        onSnapToItem={(index) => setActiveIndex(index)}
        style={{ display: "flex", alignItems: "center" }}
        renderItem={({ item }) => (
          <View className="p-6 rounded-2xl items-center">
            <View className="w-full rounded-full border border-slate-400 items-center mb-5 shadow-lg overflow-hidden">
              <Image
                source={{ uri: item.imageUrl }}
                style={{ width: width * 0.8, height: 256 }}
                resizeMode="cover"
                className="rounded-full"
              />
            </View>
            <Text className="text-gray-900 text-xl font-bold text-center mb-2">
              {item.title}
            </Text>
            <Text className="text-gray-300 text-lg text-center">
              {item.description}
            </Text>
          </View>
        )}
      />

      <View className="flex-row mt-6">
        {slides.map((_, index) => (
          <View
            key={index}
            className={`w-2 h-2 mx-1 rounded-full ${
              activeIndex === index ? "bg-blue-600" : "bg-blue-200"
            }`}
          />
        ))}
      </View>

      <TouchableOpacity
        className="mt-8 bg-blue-600 shadow-xl shadow-blue-800  px-10 py-4 rounded-full w-4/5 items-center"
        onPress={() =>
          activeIndex === slides.length - 1
            ? navigate("/signin")
            : setActiveIndex((prev) =>
                activeIndex === slides.length - 1 ? prev : prev + 1
              )
        }
      >
        <Text className="text-white font-bold text-base">
          {activeIndex === slides.length - 1 ? "Get Started" : "Next"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

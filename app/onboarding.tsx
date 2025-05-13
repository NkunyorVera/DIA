import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { navigate } from "expo-router/build/global-state/routing";
import React, { useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import CommunitySVG from "../assets/community.svg";
import HealthSVG from "../assets/health.svg";
import JobSVG from "../assets/job.svg";

const { width } = Dimensions.get("window");

type Slide = {
  title: string;
  description: string;
  svg: any;
};

const slides: Slide[] = [
  {
    title: "Job Oopportunities and listings",
    description:
      "For enhanced accessibility and inclusive professional networking.",
    svg: <JobSVG width={width * 0.85} height={256} fill={"#FF8C42"} />,
  },
  {
    title: "Join Community Forums",
    description: "For disability inclusive communication and networking.",
    svg: <CommunitySVG width={width * 0.85} height={256} fill={"#FF8C42"} />,
  },
  {
    title: "Health Benefit Management",
    description: "Easily access and manage healthcare resources.",
    svg: <HealthSVG width={width * 0.85} height={256} fill={"#FF8C42"} />,
  },
];

// Replace with your actual navigation type
type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Onboarding">;

const OnboardingScreen: React.FC<Props> = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SafeAreaView className="flex-1 bg-background items-center justify-center">
      <View className="mb-10 items-center justify-center">
        <Image
          source={require("../assets/logo.png")}
          className=" absolute"
          resizeMode="contain"
          style={{ width: 140, height: 140 }}
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
          <View className=" p-6 rounded-2xl items-center">
            <View className="w-full rounded-2xl items-center mb-5">
              {item.svg}
            </View>
            <Text className="text-primary text-xl font-bold text-center mb-2">
              {item.title}
            </Text>
            <Text className="text-text-secondary text-base text-center">
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
              activeIndex === index ? "bg-secondary" : "bg-border"
            }`}
          />
        ))}
      </View>

      <TouchableOpacity
        className="mt-8 bg-secondary px-10 py-4 rounded-full w-4/5 items-center"
        onPress={() =>
          activeIndex === slides.length - 1
            ? navigate("/login")
            : setActiveIndex((prev) =>
                activeIndex === slides.length - 1 ? prev : prev + 1
              )
        }
      >
        <Text className="text-white font-bold text-base">
          {activeIndex === slides.length - 1 ? "Login" : "Skip"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

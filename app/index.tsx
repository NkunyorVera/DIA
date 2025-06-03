import CustomText from "@/components/CustomText";
import MicButton from "@/components/MicButton";
import { useGlobalContext } from "@/context/GlobalProvider";
import { slides } from "@/lib/data";
import { appGuide, stopGuide } from "@/lib/speech";
import { Redirect } from "expo-router";
import { navigate } from "expo-router/build/global-state/routing";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const OnboardingScreen: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<React.ElementRef<typeof Carousel>>(null);
  const { isLoading, isLoggedIn } = useGlobalContext();

  const { title, description } = slides[activeIndex];

  useEffect(() => {
    if (!isLoading) {
      if (activeIndex === 0) {
        appGuide("Welcome to our inclusive app. Let's take a quick tour.");
      }
    }
    carouselRef.current?.scrollTo({ index: activeIndex, animated: true });
    return () => {
      stopGuide();
    };
  }, []);

  if (!isLoading && isLoggedIn) {
    return <Redirect href="/home" />;
  }

  const handleNext = () => {
    if (activeIndex === slides.length - 1) {
      navigate("/signin");
    } else {
      carouselRef.current?.scrollTo({ index: activeIndex + 1, animated: true });
    }
  };

  appGuide(title + ".\n" + description);

  return (
    <SafeAreaView className="flex-1 bg-white px-6 justify-center">
      <View className="items-center mb-4">
        <Image
          source={require("../assets/logo.png")}
          style={{ width: 90, height: 90 }}
          resizeMode="contain"
        />
        <CustomText className="text-xl font-semibold uppercase text-purple-800 mt-2">
          Disability Aid
        </CustomText>
      </View>

      <Carousel
        ref={carouselRef}
        loop={false}
        width={width * 0.9}
        height={420}
        data={slides}
        scrollAnimationDuration={600}
        onSnapToItem={(index) => setActiveIndex(index)}
        style={{ alignSelf: "center" }}
        renderItem={({ item }) => (
          <View className="p-5 items-center">
            <View className="items-center mb-5 relative">
              <View>
                <Image
                  source={item.imageUrl}
                  style={{ width: 256, height: 256 }}
                  resizeMode="cover"
                  className="rounded-full"
                />
              </View>
              <MicButton
                message={item.title + "./n" + item.description}
                className="absolute top-0 right-0 transform -translate-x-1/2 -translate-y-0"
              />
            </View>
            <CustomText className="text-xl font-semibold text-purple-800 text-center mt-4">
              {item.title}
            </CustomText>
            <CustomText className="text-base text-gray-600 text-center mt-2">
              {item.description}
            </CustomText>
          </View>
        )}
      />

      <View className="flex-row justify-center mt-6">
        {slides.map((_, index) => (
          <View
            key={index}
            className={`w-3 h-3 mx-1 rounded-full ${
              activeIndex === index ? "bg-purple-700" : "bg-purple-300"
            }`}
          />
        ))}
      </View>

      <TouchableOpacity
        className="mt-8 bg-purple-700 px-10 py-4 rounded-full w-full items-center shadow-lg"
        onPress={handleNext}
      >
        <CustomText className="text-white font-semibold text-lg">
          {activeIndex === slides.length - 1 ? "Get Started" : "Next"}
        </CustomText>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

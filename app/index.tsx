// import { useAuth } from "@/context/AuthContext";
// import { Redirect } from "expo-router";
// import { navigate } from "expo-router/build/global-state/routing";
// import React, { useRef, useState } from "react";
// import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
// import Carousel from "react-native-reanimated-carousel";
// import { SafeAreaView } from "react-native-safe-area-context";

// const { width } = Dimensions.get("window");

// type Slide = {
//   title: string;
//   description: string;
//   imageUrl: string;
// };

// const slides: Slide[] = [
//   {
//     title: "Inclusive Job Opportunities",
//     description: "Find disability-friendly employers and career resources.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//   },
//   {
//     title: "Supportive Community",
//     description: "Connect with others who understand your experiences.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//   },
//   {
//     title: "Find Accessible Healthcare",
//     description:
//       "Easily search for doctors based on location, specialty, and availability.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//   },
// ];

// const OnboardingScreen: React.FC = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const carouselRef = useRef<React.ElementRef<typeof Carousel>>(null);
//   const { session } = useAuth();

//   if (session) return <Redirect href={"/(tabs)/home"} />;

//   const handleNext = () => {
//     if (activeIndex === slides.length - 1) {
//       navigate("/signin");
//     } else {
//       carouselRef.current?.scrollTo({ index: activeIndex + 1, animated: true });
//     }
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-white items-center justify-center relative">
//       <View className="mb-2.5 items-center justify-center">
//         <Image
//           source={require("../assets/logo.png")}
//           style={{ width: 100, height: 100 }}
//           resizeMode="contain"
//         />
//       </View>

//       <Carousel
//         ref={carouselRef}
//         loop={false}
//         width={width * 0.85}
//         height={420}
//         data={slides}
//         scrollAnimationDuration={600}
//         onSnapToItem={(index) => setActiveIndex(index)}
//         style={{ display: "flex", alignItems: "center" }}
//         renderItem={({ item }) => (
//           <View className="p-6 rounded-2xl items-center">
//             <View className="w-full rounded-full border border-slate-400 items-center mb-5 shadow-lg overflow-hidden">
//               <Image
//                 source={{ uri: item.imageUrl }}
//                 style={{ width: width * 0.8, height: 256 }}
//                 resizeMode="cover"
//                 className="rounded-full"
//               />
//             </View>
//             <CustomText className="text-gray-900 text-xl font-bold text-center mb-2">
//               {item.title}
//            </CustomText>
//             <CustomText className="text-gray-500 text-lg text-center">
//               {item.description}
//            </CustomText>
//           </View>
//         )}
//       />

//       <View className="flex-row mt-6">
//         {slides.map((_, index) => (
//           <View
//             key={index}
//             className={`w-2 h-2 mx-1 rounded-full ${
//               activeIndex === index ? "bg-purple-600" : "bg-purple-200"
//             }`}
//           />
//         ))}
//       </View>

//       <TouchableOpacity
//         className="mt-8 bg-purple-600 shadow-xl shadow-blue-800 px-10 py-4 rounded-full w-4/5 items-center"
//         onPress={handleNext}
//       >
//         <CustomText className="text-white font-bold text-base">
//           {activeIndex === slides.length - 1 ? "Get Started" : "Next"}
//        </CustomText>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// export default OnboardingScreen;

import CustomText from "@/components/CustomText";
import { useAuth } from "@/context/AuthContext";
import { appGuide, stopGuide } from "@/lib/speech";
import { Redirect } from "expo-router";
import { navigate } from "expo-router/build/global-state/routing";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, TouchableOpacity, View } from "react-native";
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
  const carouselRef = useRef<React.ElementRef<typeof Carousel>>(null);
  const { session } = useAuth();

  useEffect(() => {
    appGuide("Welcome to our inclusive app. Let's take a quick tour.");
    return () => {
      stopGuide();
    };
  }, [activeIndex]);

  if (session) return <Redirect href="/(tabs)/home" />;

  const handleNext = () => {
    if (activeIndex === slides.length - 1) {
      navigate("/signin");
    } else {
      carouselRef.current?.scrollTo({ index: activeIndex + 1, animated: true });
    }
  };

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
            <View className="w-full rounded-full items-center mb-5 overflow-hidden">
              <Image
                source={{ uri: item.imageUrl }}
                style={{ width: 256, height: 256 }}
                resizeMode="cover"
                className="rounded-full"
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

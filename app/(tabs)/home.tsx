// import FeatureCard from "@/components/FeatureCard";
// import ProfileImageModal from "@/components/ProfileImageModal";
// import UserInfoModal from "@/components/UserInfoModal";
// import { useAuth } from "@/context/AuthContext";
// import { databases } from "@/lib/appwrite";
// import { Ionicons } from "@expo/vector-icons";
// import { navigate } from "expo-router/build/global-state/routing";
// import React, { JSX, useEffect, useState } from "react";
// import { ScrollView, Text, View } from "react-native";
// import { Query } from "react-native-appwrite";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function HomeScreen(): JSX.Element {
//   const { user } = useAuth();
//   const [showUserInfoModal, setShowUserInfoModal] = useState<boolean>(false);
//   const [showProfileImageModal, setShowProfileImageModal] =
//     useState<boolean>(false);
//   const [currentUser, setCurrentUser] = useState<any>(null);

//   const checkUserProfile = async (): Promise<void> => {
//     try {
//       const res = await databases.listDocuments(
//         process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
//         process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
//         [Query.equal("userId", user?.$id)]
//       );

//       if (res.total === 0) {
//         setShowUserInfoModal(true);
//       }

//       setCurrentUser(res.documents[0]);
//     } catch (err) {
//       console.error("Error checking user profile:", err);
//     }
//   };

//   useEffect(() => {
//     if (user?.$id) checkUserProfile();
//   }, [user]);

//   const openNextModal = () => {
//     setShowUserInfoModal(false);
//     setShowProfileImageModal(true);
//   };

//   const userName: string = currentUser?.name || "User";
//   const disability: string = currentUser?.disability || "Your unique ability";

//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       <UserInfoModal
//         visible={showUserInfoModal}
//         onClose={() => setShowUserInfoModal(false)}
//         callbackFunc={openNextModal}
//       />

//       <ProfileImageModal
//         visible={showProfileImageModal}
//         onClose={() => setShowProfileImageModal(false)}
//       />

//       <ScrollView className="px-4 py-6 space-y-4">
//         {/* Header */}
//         <View className="flex-row justify-between items-center mb-2">
//           <Ionicons name="construct-outline" size={28} color="#9333EA" />
//           <Ionicons name="notifications-outline" size={28} color="#9333EA" />
//         </View>

//         {/* Welcome Text */}
//         <View className="mb-6">
//           <Text className="text-3xl font-extrabold text-gray-900 leading-snug">
//             Welcome,{"\n"}
//             {userName}.
//           </Text>
//           <Text className="text-sm text-gray-500 mt-1">
//             Your disability here is {disability}.
//           </Text>
//         </View>

//         {/* Cards */}
//         <View className="gap-2.5 mb-10">
//           <FeatureCard
//             title="Find Jobs"
//             bgColor="#E3ECFE"
//             iconColor="#2A62F3"
//             mainIcon="briefcase-search"
//             subIcon="briefcase"
//             onNavigate={() => navigate("/(tabs)/jobs")}
//           />
//           <FeatureCard
//             title="Health Benefits"
//             bgColor="#FFE9D9"
//             iconColor="#FF8C42"
//             mainIcon="hospital-box"
//             subIcon="heartbeat"
//           />
//           <FeatureCard
//             title="Join Communities"
//             bgColor="#D3F2D8"
//             iconColor="#2E7D32"
//             mainIcon="account-group"
//             subIcon="users"
//             onNavigate={() => navigate("/(tabs)/community")}
//           />
//           <FeatureCard
//             title="Seek Assistance"
//             bgColor="#FFF2C3"
//             iconColor="#FFC107"
//             mainIcon="hand-heart"
//             subIcon="question-circle"
//           />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

import FeatureCard from "@/components/FeatureCard";
import ProfileImageModal from "@/components/ProfileImageModal";
import UserInfoModal from "@/components/UserInfoModal";
import { useAuth } from "@/context/AuthContext";
import { databases } from "@/lib/appwrite";
import { Ionicons } from "@expo/vector-icons";
import { navigate } from "expo-router/build/global-state/routing";
import * as Speech from "expo-speech";
import React, { JSX, useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Query } from "react-native-appwrite";
import { SafeAreaView } from "react-native-safe-area-context";

const featureCards = [
  {
    title: "Find Jobs",
    bgColor: "#E3ECFE",
    iconColor: "#2A62F3",
    mainIcon: "briefcase-search",
    subIcon: "briefcase",
    route: "/(tabs)/jobs",
  },
  {
    title: "Health Benefits",
    bgColor: "#FFE9D9",
    iconColor: "#FF8C42",
    mainIcon: "hospital-box",
    subIcon: "heartbeat",
    route: null, // Not navigable
  },
  {
    title: "Join Communities",
    bgColor: "#D3F2D8",
    iconColor: "#2E7D32",
    mainIcon: "account-group",
    subIcon: "users",
    route: "/(tabs)/community",
  },
  {
    title: "Seek Assistance",
    bgColor: "#FFF2C3",
    iconColor: "#FFC107",
    mainIcon: "hand-heart",
    subIcon: "question-circle",
    route: null, // Not navigable
  },
];

export default function HomeScreen(): JSX.Element {
  const { user } = useAuth();
  const [showUserInfoModal, setShowUserInfoModal] = useState<boolean>(false);
  const [showProfileImageModal, setShowProfileImageModal] =
    useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const checkUserProfile = async (): Promise<void> => {
    try {
      const res = await databases.listDocuments(
        process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
        [Query.equal("userId", user?.$id)]
      );

      if (res.total === 0) {
        setShowUserInfoModal(true);
      }

      setCurrentUser(res.documents[0]);
    } catch (err) {
      console.error("Error checking user profile:", err);
    }
  };

  useEffect(() => {
    if (user?.$id) checkUserProfile();
    // Welcome message when screen loads
    // Speech.speak(
    //   `Welcome to your dashboard ${
    //     currentUser?.name || ""
    //   }. Explore available features.`,
    //   { rate: 0.9 }
    // );
    // return () => {
    //   Speech.stop();
    // };
  }, []);

  const openNextModal = () => {
    setShowUserInfoModal(false);
    setShowProfileImageModal(true);
  };

  const userName: string = currentUser?.name || "User";
  const disability: string = currentUser?.disability || "Your unique ability";

  const speakCardDescription = (title: string) => {
    const descriptions: Record<string, string> = {
      "Find Jobs":
        "Browse disability-friendly job opportunities tailored to your skills",
      "Health Benefits":
        "Access healthcare resources and manage your medical benefits",
      "Join Communities":
        "Connect with supportive communities that understand your needs",
      "Seek Assistance": "Get help and support for your daily challenges",
    };
    Speech.speak(`${title}. ${descriptions[title] || ""}`, { rate: 0.9 });
  };

  return (
    <SafeAreaView edges={[]} className="flex-1 bg-white">
      <UserInfoModal
        visible={showUserInfoModal}
        onClose={() => setShowUserInfoModal(false)}
        callbackFunc={openNextModal}
      />

      <ProfileImageModal
        visible={showProfileImageModal}
        onClose={() => setShowProfileImageModal(false)}
      />

      {/* Header */}
      <View className="flex-row justify-between items-center mb-4 p-6">
        {/* Left Side: Logo + Text */}
        <View className="flex-row items-center gap-2.5 justify-center">
          <View className="bg-purple-100 p-0 rounded-full items-center justify-center">
            <Image
              source={require("../../assets/logo.png")}
              resizeMode="contain"
              style={{ width: 48, height: 48 }}
            />
          </View>
          <Text className="text-xl font-bold text-white">DisabilityAID</Text>
        </View>

        {/* Right Side: Mic Button */}
        <TouchableOpacity
          className="bg-purple-100 rounded-full"
          onPress={() =>
            Speech.speak(
              `Welcome ${userName}. Your disability is your unique ability.`,
              { rate: 0.9 }
            )
          }
        >
          <Ionicons name="mic-outline" size={24} color="#9333ea" />
        </TouchableOpacity>
      </View>
      <ScrollView
        className="px-6 space-y-6"
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Section */}
        <View className="mb-5">
          <Text className="text-2xl font-bold  leading-snug">
            Welcome back, {userName}
          </Text>
          <Text className="text-base text-gray-500 mt-2">
            Your disability is your unique ability:{" "}
          </Text>
        </View>

        {/* Features Grid */}
        <View className="grid grid-cols-2 gap-4 mb-6">
          {featureCards.map((card) => (
            <FeatureCard
              key={card.title}
              title={card.title}
              bgColor={card.bgColor}
              iconColor={card.iconColor}
              mainIcon={card.mainIcon}
              subIcon={card.subIcon}
              onNavigate={() => {
                if (card.route) {
                  navigate(card.route);
                } else {
                  Speech.speak(
                    `The ${card.title} feature is not available yet.`,
                    { rate: 0.9 }
                  );
                }
                speakCardDescription(card.title);
              }}
              onSpeak={() => speakCardDescription(card.title)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

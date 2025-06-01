import { featureCards } from "@/lib/data";
import { appGuide } from "@/lib/speech";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import FeatureCard from "./FeatureCard";

const FeatureList = () => {
  const router = useRouter();
  return (
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
              router.push(card.route);
            } else {
              appGuide(`The ${card.title} feature is not available yet.`);
            }
            speakCardDescription(card.title);
          }}
          onSpeak={() => speakCardDescription(card.title)}
        />
      ))}
    </View>
  );
};

export default FeatureList;

function speakCardDescription(title: string) {
  const descriptions: Record<string, string> = {
    "Find Jobs":
      "Browse disability-friendly job opportunities tailored to your skills",
    "Health Benefits":
      "Access healthcare resources and manage your medical benefits",
    "Join Communities":
      "Connect with supportive communities that understand your needs",
    "Seek Assistance": "Get help and support for your daily challenges",
  };
  appGuide(`${title}. ${descriptions[title] || ""}`);
}

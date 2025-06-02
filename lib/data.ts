import { FeatureCardType, SlideType } from "./types";

export const featureCards: FeatureCardType[] = [
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
export const slides: SlideType[] = [
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

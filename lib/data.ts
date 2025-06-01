import { FeatureCardType } from "./types";

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

import { FeatureCardType, SlideType } from "./types";

export const featureCards: FeatureCardType[] = [
  {
    title: "Find Jobs",
    bgColor: "#2A62F3",
    iconColor: "#FFFFFF",
    mainIcon: "briefcase-search",
    subIcon: "briefcase",
    route: "/(tabs)/(jobs)/",
  },
  {
    title: "Health Benefits",
    bgColor: "#FF8C42",
    iconColor: "#FFFF",
    mainIcon: "hospital-box",
    subIcon: "heartbeat",
    route: "/(tabs)/(health)/", // Not navigable
  },
  {
    title: "Join Communities",
    bgColor: "#2E7D32",
    iconColor: "#FFFFFF",
    mainIcon: "account-group",
    subIcon: "users",
    route: "/(tabs)/community",
  },
  {
    title: "Seek Assistance",
    bgColor: "#FFC107",
    iconColor: "#FFFFFF",
    mainIcon: "hand-heart",
    subIcon: "question-circle",
    route: null, // Not navigable
  },
];
export const slides: SlideType[] = [
  {
    title: "Inclusive Job Opportunities",
    description: "Find disability-friendly employers and career resources.",
    imageUrl: require("@/assets/jobs.jpg"),
  },
  {
    title: "Supportive Community",
    description: "Connect with others who understand your experiences.",
    imageUrl: require("@/assets/community.jpg"),
  },
  {
    title: "Find Accessible Healthcare",
    description:
      "Easily search for doctors based on location, specialty, and availability.",
    imageUrl: require("@/assets/health.jpg"),
  },
];

export const communities = [
  {
    id: "1",
    name: "Blind Sight",
    rating: 4.2,
    members: "10k+",
    groupDisability: "Blind",
    description: "Support community for visually impaired individuals",
  },
  {
    id: "2",
    name: "Gentle Deaf Cohort",
    rating: 3.7,
    members: "6k+",
    groupDisability: "Deaf",
    description: "Community for deaf and hard of hearing people",
  },
  {
    id: "3",
    name: "Lame Walkers",
    rating: 4.2,
    members: "24k+",
    groupDisability: "Lame",
    description: "Support group for people with mobility challenges",
  },
  {
    id: "4",
    name: "Arm Band",
    rating: 4.5,
    members: "8k+",
    groupDisability: "Hand-Disability",
    description: "Community for people with hand disability.",
  },
];

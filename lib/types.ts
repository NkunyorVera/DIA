import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

export type UserType = {
  email: string;
  name?: string;
  phone?: string;
  address?: string;
  password: string;
  disability?: string;
  avatar?: string;
};

export type UserUpdateType = {
  name?: string;
  phone?: string;
  address?: string;
  disability?: string;
  avatar?: string;
};

export type UserProfile = {
  userId: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  disability: string;
  avatar: string;
  disabilityCard: string;
};

export type FileUpload = {
  uri: string;
  name: string;
  type: string;
  size: number;
};

export type AuthRoutes = "/" | "/signin" | "/signup";

export type FeatureCardType = {
  title: string;
  bgColor: string;
  iconColor: string;
  mainIcon: keyof typeof MaterialCommunityIcons.glyphMap;
  subIcon: keyof typeof FontAwesome.glyphMap;
  route: FeatureRouteType;
};

export type FeatureRouteType =
  | "/(tabs)/(jobs)/"
  | "/(tabs)/community"
  | "/(tabs)/(health)/"
  | null;

export type SlideType = {
  title: string;
  description: string;
  imageUrl: string;
};

export type JobType = {
  $id: string;
  company: string;
  location?: string;
  type: string;
  websit?: string;
  description: string;
  deadline: string;
  title: string;
  salary: string;
  responsibilities?: string[];
};

export type HealthBenefitType = {
  $id: string;
  organization: string;
  location?: string;
  website?: string;
  contact?: string;
  description: string;
  deadline: string;
  title: string;
  benefits?: string[];
};

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

export type FeatureRouteType = "/(tabs)/jobs" | "/(tabs)/community" | null;

export type SlideType = {
  title: string;
  description: string;
  imageUrl: string;
};

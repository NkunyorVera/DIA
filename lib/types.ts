import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

export type UserType = {
  email: string;
  name?: string;
  phone?: string;
  address?: string;
  password: string;
  disability?: string;
  photoUrl?: string;
};

export type UserUpdateType = {
  name?: string;
  phone?: string;
  address?: string;
  disability?: string;
  photoUrl?: string;
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

// // screens/LoginScreen.tsx
// import { Ionicons } from "@expo/vector-icons";
// import { Link } from "expo-router";
// import { Text, TouchableOpacity, View } from "react-native";

// import AuthInput from "@/components/AuthInput";
// import { useAuth } from "@/context/AuthContext";
// import { navigate } from "expo-router/build/global-state/routing";
// import React from "react";

// export default function LoginScreen() {
//   const { user, handleChange, login } = useAuth();

//   return (
//     <View className="flex-1 justify-center items-center p-6">
//       <View className="w-full bg-white items-center mb-4 p-10 rounded-lg shadow-lg">
//         <View className="items-center mb-4">
//           <Ionicons name="log-in-outline" size={28} color={"#FF8C42"} />
//           <Text className="text-2xl text-secondary font-semibold mt-2">
//             LOGIN
//           </Text>
//         </View>

//         <AuthInput
//           icon="mail-outline"
//           placeholder="Enter email"
//           value={user.email}
//           onChangeText={(val: string) => handleChange("email", val)}
//         />
//         <AuthInput
//           icon="lock-closed-outline"
//           placeholder="Enter password"
//           value={user.password}
//           onChangeText={(val: string) => handleChange("password", val)}
//           secureTextEntry
//         />

//         <TouchableOpacity
//           className="bg-secondary py-3 rounded-full items-center mb-4 w-full"
//           onPress={() => {
//             login();
//             navigate("/(tabs)");
//           }}
//         >
//           <Text className="text-white font-semibold">Login</Text>
//         </TouchableOpacity>

//         <Text className="text-center text-sm">
//           Don't have an account?{" "}
//           <Link className="text-secondary underline" href="/register">
//             Sign Up
//           </Link>
//         </Text>
//       </View>
//     </View>
//   );
// }

import AuthInput from "@/components/AuthInput";
import SocialLoginButtons from "@/components/SocialLoginButtons";
import UserInfoModal from "@/components/UserInfoModal";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { navigate } from "expo-router/build/global-state/routing";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const { user, handleChange, login, loginWithGoogle, loginWithFacebook } =
    useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleLogin = async () => {
    const success = await login();
    if (success) setShowModal(true);
  };

  return (
    <View className="flex-1 justify-center items-center p-6">
      <View className="w-full bg-white items-center mb-4 p-8 rounded-lg shadow-lg">
        <Ionicons name="log-in-outline" size={28} color="#FF8C42" />
        <Text className="text-2xl text-secondary font-semibold mt-2 mb-4">
          LOGIN
        </Text>

        <AuthInput
          icon="mail-outline"
          placeholder="Email"
          value={user.email}
          onChangeText={(val) => handleChange("email", val)}
        />
        <AuthInput
          icon="lock-closed-outline"
          placeholder="Password"
          secureTextEntry
          value={user.password}
          onChangeText={(val) => handleChange("password", val)}
        />

        <TouchableOpacity
          className="bg-secondary py-3 w-full mt-4 rounded-full"
          onPress={handleLogin}
        >
          <Text className="text-white font-bold text-center">Login</Text>
        </TouchableOpacity>

        <Text className="text-sm mt-3">
          Don't have an account?
          <Link className="text-secondary underline" href="/register">
            {" "}
            Sign Up
          </Link>
        </Text>

        <View className="mt-5 w-full">
          <SocialLoginButtons
            onGoogle={loginWithGoogle}
            onFacebook={loginWithFacebook}
          />
        </View>
      </View>

      <UserInfoModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={() => {
          setShowModal(false);
          navigate("/(tabs)");
        }}
      />
    </View>
  );
}

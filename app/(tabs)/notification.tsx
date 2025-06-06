import CustomText from "@/components/CustomText";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const notificationsMock = [
  {
    id: "1",
    title: "New Message",
    body: "You have a new message from John.",
    type: "info",
    time: "2 mins ago",
    read: false,
  },
  {
    id: "2",
    title: "Profile Updated",
    body: "Your profile has been successfully updated.",
    type: "success",
    time: "1 hour ago",
    read: true,
  },
  {
    id: "3",
    title: "Security Alert",
    body: "A login attempt was made from an unknown device.",
    type: "alert",
    time: "Yesterday",
    read: false,
  },
];

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState(notificationsMock);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <Feather name="check-circle" size={20} color="#10B981" />;
      case "alert":
        return <Feather name="alert-triangle" size={20} color="#EF4444" />;
      default:
        return <Feather name="bell" size={20} color="#9333ea" />;
    }
  };

  return (
    <SafeAreaView edges={[]} className="flex-1 bg-white">
      <ScrollView className="flex-1 bg-white px-6 pt-8">
        <CustomText className="text-2xl font-bold mb-6 text-gray-800">
          Notifications
        </CustomText>
        {notifications.length === 0 ? (
          <CustomText className="text-gray-500 text-center mt-20">
            No notifications
          </CustomText>
        ) : (
          notifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              className={`flex-row items-start bg-gray-50 p-4 rounded-xl mb-3 border ${
                notification.read ? "border-gray-200" : "border-blue-300"
              }`}
              onPress={() => markAsRead(notification.id)}
            >
              <View className="mt-1 mr-3">{getIcon(notification.type)}</View>
              <View className="flex-1">
                <CustomText className="font-semibold text-base text-gray-800">
                  {notification.title}
                </CustomText>
                <CustomText className="text-sm text-gray-600 mt-1">
                  {notification.body}
                </CustomText>
                <CustomText className="text-xs text-gray-400 mt-2">
                  {notification.time}
                </CustomText>
              </View>
              {!notification.read && <View style={styles.unreadDot} />}
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#3B82F6",
    marginTop: 4,
    marginLeft: 6,
  },
});

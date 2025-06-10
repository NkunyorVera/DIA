import { communities } from "@/lib/data";
import { useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Message = {
  id: string;
  text: string;
  isMe: boolean;
  timestamp: Date;
  sender?: string;
};

type GroupInfo = {
  id: string;
  name: string;
  members: string;
  description: string;
  image?: any;
};

const ChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey there! How are you doing?",
      isMe: false,
      sender: "Alex",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
    {
      id: "2",
      text: "I'm good, thanks! How about you?",
      isMe: true,
      timestamp: new Date(Date.now() - 1000 * 60 * 4),
    },
    {
      id: "3",
      text: "Pretty good. Just working on some React Native stuff.",
      isMe: false,
      sender: "Jamie",
      timestamp: new Date(Date.now() - 1000 * 60 * 3),
    },
    {
      id: "4",
      text: "That sounds interesting! What are you building?",
      isMe: true,
      timestamp: new Date(Date.now() - 1000 * 60 * 2),
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const flatListRef = useRef<FlatList>(null);
  const { groupId } = useLocalSearchParams();

  // Mock group data - in a real app you would fetch this based on the ID
  const groupInfo = communities.find((community) => community.id === groupId);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      isMe: true,
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    setNewMessage("");
    scrollToBottom();
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View className={`mb-3 mx-4 ${item.isMe ? "items-end" : "items-start"}`}>
      {!item.isMe && (
        <Text className="text-gray-600 text-xs mb-1 ml-2">
          {item.sender || "Member"}
        </Text>
      )}
      <View
        className={`px-4 py-3 rounded-2xl max-w-[80%] ${
          item.isMe
            ? "bg-purple-500 rounded-br-none"
            : "bg-white rounded-bl-none"
        }`}
      >
        <Text
          className={`text-base ${item.isMe ? "text-white" : "text-gray-800"}`}
        >
          {item.text}
        </Text>
        <Text
          className={`text-xs mt-1 ${
            item.isMe ? "text-blue-100" : "text-gray-500"
          }`}
        >
          {formatTime(item.timestamp)}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView edges={[]} className="flex-1 bg-gray-50">
      {/* Header with Group Info */}
      <View className="bg-white p-4 border-b border-gray-200">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            <Image
              source={require("@/assets/images/group-placeholder.jpg")}
              className="w-12 h-12 rounded-full mr-3"
            />
            <View className="flex-1">
              <Text className="font-semibold text-lg" numberOfLines={1}>
                {groupInfo?.name}
              </Text>
              <Text className="text-gray-500 text-sm">
                {groupInfo?.members} • {groupInfo?.description}
              </Text>
            </View>
          </View>
          <TouchableOpacity className="ml-4">
            <Text className="text-purple-500">Info</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages List */}
      <View className="flex-1">
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 16 }}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={scrollToBottom}
          onLayout={scrollToBottom}
        />
      </View>

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="bg-white border-t border-gray-200 px-4 py-3"
      >
        <View className="flex-row items-center">
          <TouchableOpacity className="mr-3">
            <Text className="text-gray-500 text-2xl">+</Text>
          </TouchableOpacity>
          <TextInput
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-3"
            placeholder="Type a message..."
            value={newMessage}
            onChangeText={setNewMessage}
            onSubmitEditing={handleSend}
            returnKeyType="send"
            multiline
          />
          <TouchableOpacity
            className={`w-10 h-10 rounded-full items-center justify-center ${
              newMessage.trim() ? "bg-blue-500" : "bg-gray-300"
            }`}
            onPress={handleSend}
            disabled={!newMessage.trim()}
          >
            <Text className="text-white text-lg">↑</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

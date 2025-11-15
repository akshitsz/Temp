
import React from "react";
import { View, Text} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListTodo } from 'lucide-react-native';


type Props = {
  title?: string;
};

export default function Header({ title = "Todo App"}: Props) {
  return (
    <SafeAreaView className="bg-white shadow-md">

      <View className="w-full px-4 py-4 flex-row items-center ">
        
        <ListTodo size={20} style={{ width: 20, height: 20, marginRight: 8 }} />
        
        <Text className="text-2xl font-bold text-black tracking-wide">
          {title}
        </Text>
      </View>

    </SafeAreaView>
  );
}

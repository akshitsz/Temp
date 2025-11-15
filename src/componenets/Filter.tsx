import { TouchableOpacity, View, Text } from "react-native";
import React from "react";

type FilterType = "all" | "completed" | "pending";

type FilterProps = {
  activeFilter: FilterType;
  onChange: (value: FilterType) => void;
};

const Filter: React.FC<FilterProps> = ({ activeFilter, onChange }) => {
  return (
    <View className="flex flex-row mt-2 justify-between">
     
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onChange("all")}
        className={`flex px-10 py-2 rounded-xl m-1 h-12 items-center justify-center ${
          activeFilter === "all" ? "bg-gray-800" : "bg-gray-600"
        }`}
      >
        <Text className="text-white font-bold">All</Text>
      </TouchableOpacity>

   
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onChange("completed")}
        className={`flex px-10 py-2 rounded-xl m-1 h-12 items-center justify-center ${
          activeFilter === "completed" ? "bg-green-800" : "bg-green-600"
        }`}
      >
        <Text className="text-white font-bold">Completed</Text>
      </TouchableOpacity>

      
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onChange("pending")}
        className={`flex px-10 py-2 rounded-xl m-1 h-12 items-center justify-center ${
          activeFilter === "pending" ? "bg-yellow-800" : "bg-yellow-600"
        }`}
      >
        <Text className="text-white font-bold">Pending</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Filter;

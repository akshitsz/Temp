import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CheckSquare, Trash2, Check } from "lucide-react-native";
import Filter from "./Filter";

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

type FilterType = "all" | "completed" | "pending";

const STORAGE_KEY = "@my_task_v1";

export default function Content() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);


  const [filter, setFilter] = useState<FilterType>("all");

  // for loading the saved task
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setTasks(JSON.parse(raw));
      } catch (e) {
        console.warn("Load tasks failed", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const persist = async (next: Task[]) => {
    setTasks(next);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      console.warn("Save tasks failed", e);
    }
  };

  const addTask = () => {
    const text = input.trim();
    if (!text) return Alert.alert("Please type a task");
    const t: Task = { id: Date.now().toString(), text, completed: false };
    persist([t, ...tasks]);
    setInput("");
    Keyboard.dismiss();
  };

  const toggleComplete = (id: string) =>
    persist(
      tasks.map((x) =>
        x.id === id ? { ...x, completed: !x.completed } : x
      )
    );

  const deleteTask = (id: string) => {
    const found = tasks.find((t) => t.id === id);
    if (!found) return;
    if (found.completed) return Alert.alert("Can't delete a completed task");
    persist(tasks.filter((t) => t.id !== id));
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) setTasks(JSON.parse(raw));
    } catch (e) {
      console.warn("Refresh failed", e);
    } finally {
      setRefreshing(false);
    }
  };

 
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true; // "all"
  });

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 px-4 py-3 bg-gray-100">
      <View className="flex-row items-center space-x-2 mb-3 mt-2">
        <TextInput
          placeholder="Type task here"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={addTask}
          className="flex-1 px-3 py-2 bg-white rounded shadow h-12"
          returnKeyType="done"
        />
        <TouchableOpacity
          onPress={addTask}
          activeOpacity={0.8}
          className="flex px-4 py-2 bg-blue-600 rounded h-12 items-center justify-center"
        >
          <Text className="text-white font-semibold">Add</Text>
        </TouchableOpacity>
      </View>

      <Filter activeFilter={filter} onChange={setFilter} />


      {filteredTasks.length === 0 ? (
        <View className="items-center mt-10">
          <Text className="text-gray-500">
            {tasks.length === 0
              ? "No tasks yet — add one"
              : filter === "completed"
              ? "No completed tasks"
              : "No pending tasks"}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredTasks} 
          refreshing={refreshing}
          onRefresh={handleRefresh}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <View className="flex-row items-center justify-between bg-white p-3 my-1 rounded shadow-sm">
              <View className="flex-row items-center space-x-3 flex-1">
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => toggleComplete(item.id)}
                  className="p-2 rounded-full"
                  >
                  {item.completed ? (
                    <Check size={18} color="#32b40bff" />
                  ) : (
                    <CheckSquare size={18} />
                  )}
                </TouchableOpacity>

                <Text
                  className={`text-base ${
                    item.completed
                      ? "line-through text-gray-400"
                      : "text-black"
                  }`}
                  numberOfLines={2}
                >
                  {item.text}
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => deleteTask(item.id)}
                disabled={item.completed}
                className={`p-2 rounded ${
                  item.completed ? "opacity-40" : ""
                }`}
              >
                <Trash2 size={18} color="#fc0505ff" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

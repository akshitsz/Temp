
import React from "react";
import { StatusBar } from "react-native";
import Header from "./src/componenets/Header";
import Content from "./src/componenets/Content";
import { SafeAreaView } from "react-native-safe-area-context";
import "./global.css";

export default function App() {
  return (
   
    <SafeAreaView className="flex-1">
      <StatusBar barStyle="dark-content" />
      
      <Header />
      <Content />

    </SafeAreaView>
  );
}

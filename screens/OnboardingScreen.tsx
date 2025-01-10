import React from "react";
import { View, StyleSheet } from "react-native";
import LiquidSwipe from "@/components/LiquidSwipe";
import { router } from "expo-router";
import image1 from "../assets/images/image1.png";
import image2 from "../assets/images/image2.png";
import image3 from "../assets/images/image3.png";
const slides = [
  {
    title: "Welcome",
    description: " Let's Started !✨",
    color: "black",
    image: image1,
  },
  {
    title: "Discover",
    description: "Explore new opportunities",
    color: "black",
    image: image2,
  },
  {
    title: "Enjoy",
    description: "Have fun with the experience",
    color: "black",
    image: image3,
  },
];

export default function OnboardingScreen({}: any) {
  const handleSwipeComplete = () => {
    router.push("/routes/login");
  };

  return (
    <View style={styles.container}>
      <LiquidSwipe slides={slides} onSwipeComplete={handleSwipeComplete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

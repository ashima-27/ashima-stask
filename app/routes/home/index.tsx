import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "expo-router";
import HomeScreen from "@/screens/HomeScreen";

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
};
type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login" | "Signup"
>;

const Index = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  return <HomeScreen navigation={navigation} />;
};

export default Index;

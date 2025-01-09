import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import LoginScreen from "@/screens/LoginScreen";
import { useNavigation } from "expo-router";

type RootStackParamList = {
  Home: undefined;
  Signup: undefined;
};
type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home" | "Signup"
>;

const Index = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  return <LoginScreen navigation={navigation} />;
};

export default Index;

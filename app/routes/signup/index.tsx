import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "expo-router";

import SignUpScreen from "@/screens/SignupScreen";

type RootStackParamList = {
  Home: undefined;
  Signup: undefined;
};

type SignupScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

const Index = () => {
  const navigation = useNavigation<SignupScreenNavigationProp>();

  return <SignUpScreen navigation={navigation} />;
};

export default Index;

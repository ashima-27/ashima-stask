import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import CustomHeading from "../components/CustomHeading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { NavigationProp } from "@react-navigation/native";
import { router } from "expo-router";
import { UserData } from "./SignupScreen";

type LoginScreenProps = {
  navigation: NavigationProp<any>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({
    email: null,
    password: null,
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    } else {
      newErrors.email = null;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else {
      newErrors.password = null;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        const storedUserData = await AsyncStorage.getItem("userData");
        if (!storedUserData) {
          Toast.show({
            type: "error",
            text1: "User Not Found",
            text2: "No account found with this email.",
          });
          setIsLoading(false);
          return;
        }

        const userData: UserData = JSON.parse(storedUserData);

        if (userData.email === email && userData.password === password) {
          await AsyncStorage.setItem("isAuthenticated", "true");
          Toast.show({
            type: "success",
            text1: "Login Successful",
            text2: `Welcome back, ${email}!`,
          });
          router.push("./home");
        } else {
          Toast.show({
            type: "error",
            text1: "Invalid Credentials",
            text2: "Email or password is incorrect.",
          });
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to login. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://plus.unsplash.com/premium_photo-1673978423093-e54ddb60304a?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <CustomHeading
          text="Welcome Back"
          fontSize={32}
          fontWeight="bold"
          color="#FFFFFF"
        />
        <CustomHeading text="Login to continue" fontSize={16} color="#AAAAAA" />

        <CustomInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          textColor="#FFFFFF"
          error={errors.email}
        />

        <CustomInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          textColor="#FFFFFF"
          error={errors.password}
        />

        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#4444FF"
            style={styles.loader}
          />
        ) : (
          <CustomButton
            title="Login"
            onPress={handleLogin}
            backgroundColor="#4444FF"
            textColor="#FFFFFF"
            style={styles.loginButton}
          />
        )}

        <CustomButton
          title="Don't have an account? Sign up"
          onPress={() => router.push("/routes/signup")}
          backgroundColor="transparent"
          textColor="#AAAAAA"
          style={styles.signupButton}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  loginButton: {
    marginTop: 24,
  },
  signupButton: {
    marginTop: 12,
  },
  loader: {
    marginTop: 24,
  },
});

export default LoginScreen;

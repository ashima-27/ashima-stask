import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import CustomHeading from "../components/CustomHeading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { NavigationProp } from "@react-navigation/native";
import { router } from "expo-router";

type SignupScreenProps = {
  navigation: NavigationProp<any>;
};

export interface UserData {
  email: string;
  password: string;
  invitationCode?: string;
  joinedDate: string;
}

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [invitationCode, setInvitationCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({
    email: null,
    password: null,
    confirmPassword: null,
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
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    } else {
      newErrors.password = null;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    } else {
      newErrors.confirmPassword = null;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignup = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        const existingUserData = await AsyncStorage.getItem("userData");
        if (existingUserData) {
          const existingUser: UserData = JSON.parse(existingUserData);
          if (existingUser.email === email) {
            Toast.show({
              type: "error",
              text1: "Email Already Exists",
              text2: "This email is already registered.",
            });
            setIsLoading(false);
            return;
          }
        }

        const userData: UserData = {
          email,
          password,
          invitationCode: invitationCode || undefined,
          joinedDate: new Date().toISOString(),
        };

        await AsyncStorage.setItem("userData", JSON.stringify(userData));
        await AsyncStorage.setItem("isAuthenticated", "true");

        Toast.show({
          type: "success",
          text1: "Signup Successful",
          text2: `Welcome, ${email}!`,
        });

        router.push("/routes/login");
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to create account. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Toast />
      <ImageBackground
        source={{
          uri: "https://plus.unsplash.com/premium_photo-1673978423093-e54ddb60304a?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}
        style={styles.container}
      >
        <View style={styles.overlay}>
          <CustomHeading
            text="Join us for free"
            fontSize={32}
            fontWeight="bold"
            color="#FFFFFF"
          />
          <CustomHeading
            text="Influence your followers smartly"
            fontSize={16}
            color="#AAAAAA"
          />

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
            placeholder="Make a password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            textColor="#FFFFFF"
            error={errors.password}
          />

          <CustomInput
            label="Confirm Password"
            placeholder="Enter your password again"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            textColor="#FFFFFF"
            error={errors.confirmPassword}
          />

          <CustomInput
            label="Invitation Code"
            placeholder="Invitation code (Optional)"
            value={invitationCode}
            onChangeText={setInvitationCode}
            textColor="#FFFFFF"
          />

          {isLoading ? (
            <ActivityIndicator
              size="large"
              color="#4444FF"
              style={styles.loader}
            />
          ) : (
            <CustomButton
              title="Sign up"
              onPress={handleSignup}
              backgroundColor="#4444FF"
              textColor="#FFFFFF"
              style={styles.signupButton}
            />
          )}

          <CustomButton
            title="Already have an account? Login"
            onPress={() => router.push("/routes/login")}
            backgroundColor="transparent"
            textColor="#AAAAAA"
            style={styles.loginButton}
          />
        </View>
      </ImageBackground>
    </>
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
  signupButton: {
    marginTop: 24,
  },
  loginButton: {
    marginTop: 12,
  },
  loader: {
    marginTop: 24,
  },
});

export default SignupScreen;

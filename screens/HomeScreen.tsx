import React, { useEffect, useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomHeading from "../components/CustomHeading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp } from "@react-navigation/native";
import { UserData } from "./SignupScreen";
import { router } from "expo-router";

type HomeScreenProps = {
  navigation: NavigationProp<any>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem("userData");
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("isAuthenticated");

      router.push("/routes/login");
    } catch (error) {
      console.error("Error logging out:", error);
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
          text="Welcome to Your Dashboard"
          fontSize={32}
          fontWeight="bold"
          color="#FFFFFF"
        />

        {userData && (
          <>
            <View style={styles.infoContainer}>
              <CustomHeading
                text={`Email: ${userData.email}`}
                fontSize={18}
                color="#FFFFFF"
              />
              <CustomHeading
                text={`Joined: ${new Date(
                  userData.joinedDate
                ).toLocaleDateString()}`}
                fontSize={18}
                color="#FFFFFF"
              />
              {userData.invitationCode && (
                <CustomHeading
                  text={`Invitation Code: ${userData.invitationCode}`}
                  fontSize={18}
                  color="#FFFFFF"
                />
              )}
            </View>

            <CustomButton
              title="Logout"
              onPress={handleLogout}
              backgroundColor="#FF4444"
              textColor="#FFFFFF"
              style={styles.logoutButton}
            />
          </>
        )}
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
  infoContainer: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 20,
    marginTop: 24,
    marginBottom: 24,
  },
  logoutButton: {
    marginTop: 24,
  },
});

export default HomeScreen;

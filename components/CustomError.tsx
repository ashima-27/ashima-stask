import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface CustomErrorProps {
  error: string | null;
}

const CustomError: React.FC<CustomErrorProps> = ({ error }) => {
  if (!error) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    marginBottom: 8,
  },
  errorText: {
    color: "#FF4444",
    fontSize: 12,
  },
});

export default CustomError;

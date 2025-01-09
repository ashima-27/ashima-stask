import React from "react";
import { Text, StyleSheet } from "react-native";

interface CustomHeadingProps {
  text: string;
  fontSize?: number;
  fontWeight?:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  color?: string;
}

const CustomHeading: React.FC<CustomHeadingProps> = ({
  text,
  fontSize = 24,
  fontWeight = "normal",
  color = "#FFFFFF",
}) => {
  return (
    <Text style={[styles.heading, { fontSize, fontWeight, color }]}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  heading: {
    marginBottom: 24,
    textAlign: "center",
  },
});

export default CustomHeading;

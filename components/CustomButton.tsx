import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  backgroundColor = "#4C1D95",
  textColor = "#FFFFFF",
  style,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor:
            backgroundColor === "transparent" ? "transparent" : backgroundColor,
        },
        style,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.buttonText,
          {
            color: textColor.startsWith("text-")
              ? textColor.replace("text-", "#")
              : textColor,
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CustomButton;

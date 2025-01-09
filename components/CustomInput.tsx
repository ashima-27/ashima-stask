import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomError from "./CustomError";

interface CustomInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  textColor?: string;
  error?: string | null;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  textColor = "#FFFFFF",
  error = "",
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      <View style={[styles.inputContainer, error ? styles.inputError : null]}>
        <TextInput
          style={[styles.input, { color: textColor }]}
          placeholder={placeholder}
          placeholderTextColor="#666666"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
        />
        {secureTextEntry && (
          <Ionicons
            name={isPasswordVisible ? "eye-off" : "eye"}
            size={24}
            color="#666666"
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.icon}
          />
        )}
      </View>
      <CustomError error={error} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    opacity: 0.7,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
  },
  inputError: {
    borderColor: "#FF4444",
    borderWidth: 1,
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  icon: {
    padding: 10,
  },
});

export default CustomInput;

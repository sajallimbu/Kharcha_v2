import { View, StyleSheet, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { color_primary } from "../variables/global_css";

const FloatingActionButton = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={onPress}>
        <AntDesign name="plus" size={24} color="white" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 16,
    right: 16,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  button: {
    backgroundColor: color_primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
});

export default FloatingActionButton;

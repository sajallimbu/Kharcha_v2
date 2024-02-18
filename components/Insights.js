import { StyleSheet, Text, View } from "react-native";
import { global_background } from "../variables/global_css";

export default function Insights() {
  return (
    <View style={insight_style.container}>
      <Text style={insight_style.text}>This is insight</Text>
    </View>
  );
}

const insight_style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: global_background,
  },
  text: {
    textAlign: "center",
  },
});

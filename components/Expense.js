import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  color_default_white,
  color_primary,
  color_tertiary,
} from "../variables/global_css";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function Expense({ currency_symbol, expense, on_reset_press }) {
  return (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: color_primary,
        borderRadius: 8,
        height: 152,
        justifyContent: "center",
        gap: 8,
        position: "relative",
      }}
    >
      <View style={{ position: "absolute", top: 8, right: 8 }}>
        <Pressable>
          <Entypo
            name="cycle"
            size={24}
            color={color_default_white}
            onPress={on_reset_press}
          />
        </Pressable>
      </View>
      <View style={{}}>
        <Text style={expense_styles.expense_text}>
          {currency_symbol}
          {expense}
        </Text>
      </View>
    </View>
  );
}

const expense_styles = StyleSheet.create({
  expense_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  expense_text: {
    color: color_default_white,
    fontSize: 64,
    textAlign: "center",
  },
});

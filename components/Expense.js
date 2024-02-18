import { StyleSheet, Text, View } from "react-native";
import {
  color_default_white,
  color_primary,
  color_tertiary,
} from "../variables/global_css";

export default function Expense({ currency_symbol, expense }) {
  return (
    <View style={expense_styles.expense_container}>
      <Text style={expense_styles.expense_text}>
        {currency_symbol}
        {expense}
      </Text>
    </View>
  );
}

const expense_styles = StyleSheet.create({
  expense_container: {
    backgroundColor: color_primary,
    borderRadius: 8,
    height: 152,
    flexDirection: "row",
    alignItems: "center",
  },
  expense_text: {
    flex: 1,
    color: color_default_white,
    fontSize: 64,
    textAlign: "center",
  },
});

import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  color_default_white,
  color_primary,
  lightgray,
} from "../variables/global_css";
import { AntDesign } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

export default function ExpenseModal({
  is_modal_visible,
  on_request_close,
  on_button_press,
}) {
  const [amount, set_amount] = useState(0);
  return (
    <Modal
      visible={is_modal_visible}
      animationType="slide"
      onRequestClose={on_request_close}
      transparent={true}
    >
      <View style={expense_modal_style.modal_background}>
        <View
          style={{
            width: 380,
            minWidth: 300,
            height: 300,
            maxHeight: 280,
            backgroundColor: color_default_white,
            borderRadius: 8,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            justifyContent: "space-around",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              paddingRight: 20,
              paddingLeft: 20,
              gap: 8,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Pressable onPress={on_button_press} style={{ position: "" }}>
                <AntDesign name="close" size={24} color={color_primary} />
              </Pressable>
            </View>
            <View style={{ flexDirection: "column", gap: 2 }}>
              <Text style={expense_modal_style.expense_label}>
                Enter Amount
              </Text>
              <TextInput
                placeholder="Amount"
                style={expense_modal_style.expense_input}
                keyboardType="numeric"
                onChangeText={(value) => set_amount(value)}
              />
            </View>
            {/* {Add a drop down for category select} */}
            {/* <View style={{ flexDirection: "column", gap: 2 }}>
              <Text style={expense_modal_style.expense_label}>Description</Text>
              <TextInput
                placeholder="Enter a description"
                style={expense_modal_style.expense_input}
              />
            </View> */}
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: color_primary,
                color: color_default_white,
                borderRadius: 4,
                height: 48,
              }}
            >
              <Pressable
                onPress={() => on_button_press(amount)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: color_default_white,
                    fontWeight: "bold",
                  }}
                >
                  Add Expense
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const expense_modal_style = StyleSheet.create({
  expense_label: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modal_background: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "transparent",
  },
  expense_input: {
    borderWidth: 1,
    borderColor: lightgray,
    color: color_primary,
    borderRadius: 4,
    height: 48,
    padding: 8,
    fontSize: 16,
  },
});

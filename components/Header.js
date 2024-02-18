import { Pressable, StyleSheet, Text, View } from "react-native";
import { header_buttons } from "../variables/header_buttons";
import {
  border_color,
  color_default_white,
  color_primary,
  color_quaternary,
  color_secondary,
  color_tertiary,
  global_background,
  heading_font_size,
  regular_font_size,
} from "../variables/global_css";

export default function Header({ username, on_button_click, current_page }) {
  return (
    <View style={header_styles.header_container}>
      <View>
        <Text style={header_styles.header_container_title_text}>
          Welcome, {username}
        </Text>
        <Text style={header_styles.header_container_sub_header_text}>
          Your expense for
        </Text>
      </View>
      <View style={header_styles.header_pressable_wrapper}>
        {header_buttons.map((header_obj, index) => {
          return (
            <View
              key={index}
              style={
                current_page == index
                  ? header_styles.header_pressable_active
                  : header_styles.header_pressable
              }
            >
              <Pressable onPress={() => on_button_click(header_obj["Name"])}>
                <Text
                  key={index}
                  style={
                    current_page == index
                      ? header_styles.header_pressable_text_active
                      : header_styles.header_pressable_text
                  }
                  id={header_obj["Name"]}
                >
                  {header_obj["Name"]}
                </Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const header_styles = StyleSheet.create({
  header_container: {
    backgroundColor: global_background,
    flexDirection: "column",
    gap: 16,
  },
  header_container_title_text: {
    fontSize: 24,
    fontWeight: "bold",
    color: color_primary,
  },
  header_container_sub_header_text: {
    fontSize: 20,
    fontWeight: "bold",
    color: color_primary,
  },
  header_pressable_wrapper: {
    backgroundColor: global_background,
    flexDirection: "row",
    gap: 4,
  },
  header_pressable: {
    flex: 1,
    borderWidth: 1,
    borderColor: border_color,
    borderRadius: 32,
    justifyContent: "center",
    maxWidth: 128,
    minWidth: 32,
  },
  header_pressable_active: {
    flex: 1,
    borderWidth: 1,
    padding: 2,
    borderRadius: 32,
    borderColor: border_color,
    backgroundColor: color_primary,
    justifyContent: "center",
    maxWidth: 128,
    minWidth: 32,
  },
  header_pressable_text: {
    fontSize: regular_font_size,
    fontWeight: "bold",
    textAlign: "center",
    padding: 8,
  },
  header_pressable_text_active: {
    fontSize: regular_font_size,
    fontWeight: "bold",
    textAlign: "center",
    color: color_default_white,
  },
});

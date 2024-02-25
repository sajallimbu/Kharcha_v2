import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  border_color,
  color_default_white,
  expense_outgoing_color,
} from "../variables/global_css";
const image = require("../assets/favicon.png");

export default function History({ history_title, history, currency_symbol }) {
  return (
    <View style={history_styles.history_container}>
      <Text style={history_styles.history_title}>{history_title}</Text>
      <FlatList
        data={history}
        renderItem={({ item }) => {
          return (
            <View style={history_styles.history_item}>
              {/* <View
                style={{
                  paddingRight: 8,
                }}
              >
                <Image
                  source={image}
                  style={{
                    width: 42,
                    height: 42,
                  }}
                />
              </View> */}
              <View style={history_styles.history_item_and_date}>
                <Text style={history_styles.history_item_text}>
                  {item["Description"]}
                </Text>
                <Text style={history_styles.history_item_date}>
                  {item["DateCreated"]}
                </Text>
              </View>
              <View style={{ justifyContent: "center" }}>
                <Text style={history_styles.history_item_amount}>
                  {currency_symbol}
                  {item["Amount"]}
                </Text>
              </View>
            </View>
          );
        }}
        ItemSeparatorComponent={<View style={{ height: 8 }}></View>}
      />
    </View>
  );
}

const history_styles = StyleSheet.create({
  history_container: {
    flex: 1,
    gap: 8,
  },
  history_title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  history_item: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 8,
    padding: 16,
    backgroundColor: color_default_white,
  },
  history_item_and_date: { flex: 1, flexDirection: "column" },
  history_item_date: { color: "gray" },
  history_item_amount: {
    display: "flex",
    fontSize: 16,
    color: expense_outgoing_color,
  },
  history_item_text: { fontSize: 20, fontWeight: "bold", flex: 1 },
});

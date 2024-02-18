import { useState } from "react";
import { header_buttons } from "../variables/header_buttons";
import { currencies } from "../variables/currencies";
import { StyleSheet, View } from "react-native";
import Header from "./Header";
import Expense from "./Expense";
import { global_background } from "../variables/global_css";
import History from "./History";

export default function Home(params) {
  const [current_page, set_current_page] = useState(0);
  const [country, set_country] = useState("United States");
  const [expense, set_expense] = useState("73422");
  const [username, set_username] = useState("Sajal");
  const [history, set_history] = useState(dummy_history);
  const click_handler = (page) => {
    const current_target = page;
    const header_button_obj = header_buttons.find(
      (obj) => obj["Name"] === current_target
    );
    const new_page = header_button_obj["Page"] || 0;
    set_current_page(new_page);
  };
  const selected_currency =
    currencies.find((currency_obj) => currency_obj["name"] === country) || {};
  const flag = selected_currency["flag"] || "";
  const currency_symbol = selected_currency
    ? selected_currency["currency"]
      ? selected_currency["currency"]["symbol"]
      : ""
    : "";
  const current_date = new Date().toDateString();
  return (
    <View style={home_style.container}>
      <Header
        username={username}
        on_button_click={click_handler}
        current_page={current_page}
      ></Header>
      <Expense currency_symbol={currency_symbol} expense={expense}></Expense>
      <History
        history_title={current_date}
        history={history}
        currency_symbol={currency_symbol}
      ></History>
    </View>
  );
}

const home_style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: global_background,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    gap: 16,
  },
});

const dummy_history = [
  {
    title: "Suya and garri",
    date_created: "2024-02-17T18:59:51.208Z",
    amount: "5000",
  },
  {
    title: "Momo and coke",
    date_created: "2024-02-17T18:59:51.208Z",
    amount: "545",
  },
  {
    title: "Big mart",
    date_created: "2024-02-17T18:59:51.208Z",
    amount: "2544",
  },
  {
    title: "Clothes",
    date_created: "2024-02-17T18:59:51.208Z",
    amount: "15000",
  },
  {
    title: "Dental",
    date_created: "2024-02-17T18:59:51.208Z",
    amount: "8000",
  },
  {
    title: "Suya and garri",
    date_created: "2024-02-17T18:59:51.208Z",
    amount: "5000",
  },
  {
    title: "Momo and coke",
    date_created: "2024-02-17T18:59:51.208Z",
    amount: "545",
  },
  {
    title: "Big mart",
    date_created: "2024-02-17T18:59:51.208Z",
    amount: "2544",
  },
  {
    title: "Clothes",
    date_created: "2024-02-17T18:59:51.208Z",
    amount: "15000",
  },
  {
    title: "Dental",
    date_created: "2024-02-17T18:59:51.208Z",
    amount: "8000",
  },
];
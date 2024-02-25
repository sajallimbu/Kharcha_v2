import { useEffect, useState } from "react";
import { header_buttons } from "../variables/header_buttons";
import { currencies } from "../variables/currencies";
import { StyleSheet, View } from "react-native";
import Header from "./Header";
import Expense from "./Expense";
import { global_background } from "../variables/global_css";
import History from "./History";
import FloatingActionButton from "./FloationActionButton";
import ExpenseModal from "./ExpenseModal";
import { useSQLiteContext } from "expo-sqlite/next";
import * as SQLite from "expo-sqlite";

export default function Home(params) {
  const [current_page, set_current_page] = useState(0);
  const [country, set_country] = useState("Nepal");
  const [expense, set_expense] = useState("0");
  const [username, set_username] = useState("Sajal");
  const [history, set_history] = useState([]);
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
  const on_fab_press = (event) => {
    console.log("Pressed");
    set_is_expense_modal_visible(true);
  };
  const [is_expense_modal_visible, set_is_expense_modal_visible] =
    useState(false);

  // sqlite implementation
  const db = useSQLiteContext();
  console.log("db_context: " + JSON.stringify(db));

  useEffect(() => {
    db.withTransactionAsync(async () => {
      await db.runAsync(`CREATE TABLE IF NOT EXISTS Expense (
          Id INTEGER PRIMARY KEY AUTOINCREMENT,
          Category TEXT,
          Description TEXT,
          Amount INTEGER,
          DateCreated TEXT
      );`);
      await getData();
    }).catch((error) => console.error(error));
  }, [db]);

  async function getData() {
    console.log("Hello");
    const result = await db.getAllAsync(`SELECT * FROM Expense;`);
    console.table("db_result: " + result);
    set_history(result);
    const total_expense_till_now = await db.getAllAsync(
      "SELECT Amount FROM Expense;"
    );
    console.log("toto expense: " + total_expense_till_now);
    let total_expense = 0;
    total_expense_till_now.map((obj) => {
      total_expense += obj["Amount"] || 0;
    });
    set_expense(total_expense);
  }
  //

  async function reset_data() {
    console.log("Resetting data");
    db.withTransactionAsync(async () => {
      await db.runAsync(`DELETE FROM Expense`);
      await getData();
    });
  }

  return (
    <View style={home_style.container}>
      <Header
        username={username}
        on_button_click={click_handler}
        current_page={current_page}
      ></Header>
      <Expense
        currency_symbol={currency_symbol}
        expense={expense}
        on_reset_press={reset_data}
      ></Expense>
      <History
        history_title={current_date}
        history={history}
        currency_symbol={currency_symbol}
      ></History>
      <FloatingActionButton onPress={on_fab_press}></FloatingActionButton>
      <ExpenseModal
        is_modal_visible={is_expense_modal_visible}
        on_request_close={() => set_is_expense_modal_visible(fase)}
        on_button_press={({ description, amount }) => {
          set_is_expense_modal_visible(false);
          if (!description || !amount) {
            console.log("Triggered on close");
            return;
          }
          db.runAsync(
            `
              INSERT INTO Expense (Category, Description, Amount, DateCreated)
              VALUES (?,?,?,?);
            `,
            ["", description, amount, current_date]
          ).catch((error) => console.error("Insert error: " + error));

          console.log("Save pressed: " + amount);
          if (amount !== "") {
            getData();
          }
        }}
        currency_symbol={currency_symbol}
      ></ExpenseModal>
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

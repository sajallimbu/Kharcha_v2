import {
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  ActivityIndicator,
  Text,
} from "react-native";
import {
  color_primary,
  global_background,
  regular_font_size,
  small_font_size,
  tab_nav_icon_size,
} from "./variables/global_css";
import { NavigationContainer } from "@react-navigation/native";
import {
  createBottomTabNavigator,
  useBottomTabBarHeight,
} from "@react-navigation/bottom-tabs";
import Home from "./components/Home";
import Insights from "./components/Insights";
import Ionicons from "@expo/vector-icons/Ionicons";
import { initialize_db } from "./services/Database";
import { Suspense, useEffect, useState } from "react";
import { SQLiteProvider } from "expo-sqlite/next";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";

const Tab = createBottomTabNavigator();
const loadDatabase = async () => {
  const dbName = "expense.db";
  const dbAsset = require("./assets/expense.db");
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  console.log("dbName: " + dbName);
  console.log("dbAsset: " + dbAsset);
  console.log("dbUri:" + dbUri);
  console.log("dbFilePath: " + dbFilePath);

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  console.log("fileInfo: " + JSON.stringify(fileInfo));
  if (!fileInfo.exists) {
    console.log("expense.db does not exist");
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      { intermediates: true }
    );
    await FileSystem.downloadAsync(dbUri, dbFilePath);
  }
};

export default function App() {
  const [db_loaded, set_db_loaded] = useState(true);

  useEffect(() => {
    loadDatabase()
      .then(() => set_db_loaded(true))
      .catch((error) => console.error(error));
  });

  if (!db_loaded) {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator size={"large"} />
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={app_style.safe_container}>
      {/* <Suspense> */}
      <SQLiteProvider databaseName="expense.db" useSuspense>
        {/* <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: color_primary,
            headerShown: false,
            tabBarStyle: {
              position: "absolute",
              height: 56,
              paddingBottom: 8,
              paddingTop: 8,
            },
          }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="home" color={color} size={tab_nav_icon_size} />
              ),
              tabBarLabelStyle: {
                fontSize: small_font_size,
              },
            }}
          />
          <Tab.Screen
            name="Insights"
            component={Insights}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons
                  name="pie-chart"
                  color={color}
                  size={tab_nav_icon_size}
                />
              ),
              tabBarLabelStyle: {
                fontSize: small_font_size,
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer> */}
        <Home></Home>
      </SQLiteProvider>
      {/* </Suspense> */}
    </SafeAreaView>
  );
}

const app_style = StyleSheet.create({
  safe_container: {
    flex: 1,
    backgroundColor: global_background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

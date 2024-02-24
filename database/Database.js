import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import { Asset } from "expo-asset";

export async function loadDatabase() {
  const db_name = "expense.db";
  const db_asset = require(`../assets/${db_name}`);
  const db_uri = Asset.fromModule(db_asset).uri;
  const db_file_path = `${FileSystem.documentDirectory}SQLite/${db_name}`;

  const file_info = await FileSystem.getInfoAsync(db_file_path);
  if (!file_info.exists) {
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      { intermediates: true }
    );
    await FileSystem.downloadAsync(db_uri, db_file_path);
  }
}

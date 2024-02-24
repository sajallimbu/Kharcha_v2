CREATE TABLE IF NOT EXISTS Expense (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Category TEXT,
    Description TEXT,
    Amount INTEGER,
    DateCreated TEXT
);
INSERT INTO Expense (Category, Description, Amount, DateCreated)
VALUES ("Food", "Jhol momo", "180", "2024-02-24");
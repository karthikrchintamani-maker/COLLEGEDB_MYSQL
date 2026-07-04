const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "info123",
    port: 3310
});

connection.connect((err) => {
    if (err) throw err;

    connection.query("CREATE DATABASE IF NOT EXISTS college2", (err) => {
        if (err) throw err;

        connection.changeUser({ database: "college2" }, (err) => {
            if (err) throw err;

            connection.query("CREATE TABLE IF NOT EXISTS faculty(FacultyName VARCHAR(25), Subject VARCHAR(25), Experience VARCHAR(25))", (err) => {
                if (err) throw err;

                connection.query("CREATE TABLE IF NOT EXISTS library_table(LID INT, LibraryName VARCHAR(25))", (err) => {
                    if (err) throw err;

                    connection.query("CREATE TABLE IF NOT EXISTS marks(StudentName VARCHAR(25), English INT, Maths INT, Science INT)", (err) => {
                        if (err) throw err;

                        connection.query("DELETE FROM faculty");
                        connection.query("DELETE FROM library_table");
                        connection.query("DELETE FROM marks");

                        connection.query(`
                        INSERT INTO faculty VALUES
                        ('Prof.Sam','Maths','2 Year'),
                        ('Prof.Ami','Science','4 Year'),
                        ('Prof.Arvind','Maths','5 Year'),
                        ('Prof.Paratik','Science','6 Year')
                        `, (err) => {
                            if (err) throw err;

                            connection.query(`
                            INSERT INTO library_table VALUES
                            (345,'Fourth Library'),
                            (415,'Fifth Library'),
                            (425,'Sixth Library')
                            `, (err) => {
                                if (err) throw err;

                                connection.query(`
                                INSERT INTO marks VALUES
                                ('Shivani',47,42,75),
                                ('Amir',78,74,56),
                                ('Arvind',84,47,58),
                                ('Parth',48,56,87)
                                `, (err) => {
                                    if (err) throw err;

                                    connection.query("UPDATE faculty SET Experience='8 Year' WHERE FacultyName='Prof.Sam'");
                                    connection.query("UPDATE library_table SET LibraryName='Central Library' WHERE LID=345");
                                    connection.query("UPDATE marks SET English=90 WHERE StudentName='Amir'");

                                    connection.query("DELETE FROM faculty WHERE FacultyName='Prof.Paratik'");
                                    connection.query("DELETE FROM library_table WHERE LID=415");
                                    connection.query("DELETE FROM marks WHERE StudentName='Shivani'");

                                    connection.query("SELECT * FROM faculty", (err, result) => {
                                        if (err) throw err;
                                        console.log("\nFACULTY TABLE");
                                        console.table(result);

                                        connection.query("SELECT * FROM library_table", (err, result) => {
                                            if (err) throw err;
                                            console.log("\nLIBRARY TABLE");
                                            console.table(result);

                                            connection.query("SELECT * FROM marks", (err, result) => {
                                                if (err) throw err;
                                                console.log("\nMARKS TABLE");
                                                console.table(result);

                                                connection.query("SELECT FacultyName,Experience FROM faculty", (err, result) => {
                                                    if (err) throw err;
                                                    console.log("\nFACULTY DETAILS");
                                                    console.table(result);

                                                    connection.query("SELECT LibraryName FROM library_table", (err, result) => {
                                                        if (err) throw err;
                                                        console.log("\nLIBRARY DETAILS");
                                                        console.table(result);

                                                        connection.query("SELECT StudentName,English FROM marks", (err, result) => {
                                                            if (err) throw err;
                                                            console.log("\nMARKS DETAILS");
                                                            console.table(result);

                                                            connection.end();
                                                            console.log("Connection Closed Successfully");
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });

                                });
                            });
                        });

                    });
                });
            });
        });
    });
});

module.exports = connection;
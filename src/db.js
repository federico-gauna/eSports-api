import mysql from "mysql2/promise";

const {
    MYSQLHOST,
    MYSQLPORT,
    MYSQLUSER,
    MYSQLPASSWORD,
    MYSQLDATABASE
} = process.env;

export const pool = mysql.createPool({
    host: MYSQLHOST,
    port: Number(MYSQLPORT || 3306),
    user: MYSQLUSER,
    password: MYSQLPASSWORD,
    database: MYSQLDATABASE,
    waitForConnections: true,
    connectionLimit: 10
});
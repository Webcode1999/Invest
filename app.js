require('dotenv').config()
const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;
app.use(express.json());


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});


  const a = `CREATE TABLE IF NOT EXISTS currencies (
    id int(11) NOT NULL AUTO_INCREMENT,
    name varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
    time timestamp NOT NULL DEFAULT current_timestamp(),
    symbol varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
    PRIMARY KEY (id)
    )`;


    const b = `CREATE TABLE IF NOT EXISTS transactions (
        id int(11) NOT NULL AUTO_INCREMENT,
        currency_id int(11) DEFAULT NULL,
        amount float DEFAULT NULL,
        date date DEFAULT NULL,
        PRIMARY KEY (id),
        KEY currency_id (currency_id)
        )`;


        const c= `CREATE TABLE IF NOT EXISTS gold (
            id int(11) NOT NULL AUTO_INCREMENT,
            gram int(255) NOT NULL,
            date date DEFAULT NULL,
            PRIMARY KEY (id)
            )`;



const executeQuery = (query, params) => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, function (error, results) {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    });
};


app.get('/api/data', async (req, res) => {
    try {
        await executeQuery(a);
        await executeQuery(b);
        await executeQuery(c);
        const transactionQueryResults = await executeQuery('SELECT c.name AS currency_name, c.symbol AS currency_symbol, SUM(t.amount) AS total_transaction FROM transactions t JOIN currencies c ON t.currency_id = c.id GROUP BY c.name, c.symbol');
        const goldQueryResults = await executeQuery('SELECT SUM(g.gram) AS total_gold_transaction FROM gold g');
        const transactionResults = await executeQuery('SELECT currencies.name, currencies.symbol, transactions.amount FROM transactions INNER JOIN currencies ON transactions.currency_id = currencies.id');
        const goldResults = await executeQuery('SELECT * FROM gold');

        res.json({
            transactionQuery: transactionQueryResults,
            goldQuery: goldQueryResults,
            transactions: transactionResults,
            gold: goldResults
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error' });
    }
});

app.post('/transactions', async (req, res) => {
    const { currencyId, amount } = req.body;

    if (!currencyId || !amount) {
        console.error('Invalid request data');
        return res.status(400).json({ status: 'error', message: 'Invalid request data' });
    }

    const query = `INSERT INTO transactions (currency_id, amount) VALUES (?, ?)`;

    try {
        await executeQuery(query, [currencyId, amount]);
        res.json({ status: 'success', currencyId, amount });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ status: 'error', message: 'Database error' });
    }
});


app.listen(port, () => {
    console.log(`App running on port ${port}`);
});











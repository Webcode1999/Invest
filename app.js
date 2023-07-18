require('dotenv').config()
const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

app.get('/api/data', (req, res) => {

    // DBにある情報を４つクエリしJson形式に返す

    const transaction = new Promise((resolve, reject) => {
        connection.query('SELECT currencies.name, currencies.symbol, transactions.amount FROM transactions INNER JOIN currencies ON transactions.currency_id = currencies.id', function (error, results) {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    });

    const gold = new Promise((resolve, reject) => {
        connection.query('SELECT * FROM gold', function (error, results) {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    });

    const transactionQuery = new Promise((resolve, reject) => {
        connection.query('SELECT c.name AS currency_name, c.symbol AS currency_symbol, SUM(t.amount) AS total_transaction FROM transactions t JOIN currencies c ON t.currency_id = c.id GROUP BY c.name, c.symbol', function (error, results) {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    });

    const goldQuery = new Promise((resolve, reject) => {
        connection.query('SELECT SUM(g.gram) AS total_gold_transaction FROM gold g', function (error, results) {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    });

    Promise.all([transactionQuery, goldQuery, transaction, gold])
        .then(([transactionQueryResults, goldQueryResults, transactionResults, goldResults]) => {
            res.json({
                transactionQuery: transactionQueryResults, 
                goldQuery: goldQueryResults, 
                transactions: transactionResults, 
                gold: goldResults
            });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({status: 'error'});
        });
});


app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

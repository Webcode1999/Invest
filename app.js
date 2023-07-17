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
    connection.query('SELECT currencies.name, transactions.amount FROM transactions INNER JOIN currencies ON transactions.currency_id = currencies.id', function (error, results, fields) {
        if (error) {
            console.error(error);
            res.status(500).json({status: 'error'});
        } else {
            res.json(results);
        }
    });
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

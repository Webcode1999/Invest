fetch('http://localhost:3000/api/data')
    .then(response => response.json())
    .then(data => {
        let transactions = data.transactionQuery.map(item => item.total_transaction);
        console.log(transactions);

        // Function to find a transaction by currency symbol
        function findTransactionBySymbol(symbol) {
            return transactions.find(transactionQuery => transactionQuery.map(item => item.total_transaction) === symbol);
        }

        // Function to update the amount for a country
        function updateCountryAmount(countryId, symbol) {
            let element = document.getElementById(countryId);
            let transaction = findTransactionBySymbol(symbol);
            if (transaction) {
                element.textContent =  data.transactionQuery.map(item => item.total_transaction);
            }
        }

        // Update amounts for each country
        updateCountryAmount('Country_id_1', 'USD');
        updateCountryAmount('Country_id_7', 'CHF');
        updateCountryAmount('Country_id_2', 'EUR');
        updateCountryAmount('Country_id_4', 'MAD');
        updateCountryAmount('Country_id_8', 'GBP');
    })
    .catch(error => console.error('エラーが出ました', error));




// fetch('http://localhost:3000/api/data')
//     .then(response => response.json())
//     .then(data => {
//         let transactions = data.transactions;
//         let Country_id_1 = document.getElementById('Country_id_1');
//         Country_id_1.textContent = transactions[3].amount;
//         let Country_id_7 = document.getElementById('Country_id_7');
//         Country_id_7.textContent = transactions[4].amount;
//         let Country_id_2 = document.getElementById('Country_id_2');
//         Country_id_2.textContent = transactions[2].amount;
//         let Country_id_4 = document.getElementById('Country_id_4');
//         Country_id_4.textContent = transactions[0].amount;
//         let Country_id_8 = document.getElementById('Country_id_8');
//         Country_id_8.textContent = transactions[5].amount;
//     })
//     .catch(error => console.error('エラーが出ました', error));
    // fetch('http://localhost:3000/api/data')
    // .then(response => response.json())
    // .then(data => {
    //     const countries = {1: 3, 7: 4, 2: 2, 4: 0, 8: 5};

    //     for (let id in countries) {
    //         let element = document.getElementById(`Country_id_${id}`);
    //         element.textContent = data[countries[id]].amount;
    //     }
    // })
    // .catch(error => console.error('エラーが出ました', error));
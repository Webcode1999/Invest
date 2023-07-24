document.getElementById('buyBtn').addEventListener('click', function () {
    const currencyId = document.getElementById('currency').value;
    const amount = document.getElementById('amount').value;
    performTransaction(currencyId, amount, 1);
});
  
document.getElementById('sellBtn').addEventListener('click', function () {
    const currencyId = document.getElementById('currency').value;
    const amount = document.getElementById('amount').value;
    performTransaction(currencyId, amount, -1);
});

function performTransaction(currencyId, amount, multiplier) {
    console.log("Performing transaction...");

    fetch('http://localhost:3000/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currencyId, amount: amount * multiplier })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(json => console.log(json))
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please check the console for more details.');
    });
}


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
    fetch('http://localhost:3000/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currencyId, amount: amount * multiplier })
    }).catch(alert);
}

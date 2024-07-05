const apiKey = '3d5d4dc5e856270ae07ded59';
const baseCurrency = 'GBP';
const apiUrl = `https://v6.exchangerate-api.com/v6/3d5d4dc5e856270ae07ded59/latest/${baseCurrency}`;

async function fetchCurrencies() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const currencies = Object.keys(data.conversion_rates);
        const fromCurrency = document.getElementById('from-currency');
        const toCurrency = document.getElementById('to-currency');

        currencies.forEach(currency => {
            const option1 = document.createElement('option');
            option1.value = currency;
            option1.textContent = currency;
            fromCurrency.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = currency;
            option2.textContent = currency;
            toCurrency.appendChild(option2);
        });
    } catch (error) {
        console.error('Error fetching currencies:', error);
    }
}

async function convertCurrency() {
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const amount = document.getElementById('amount').value;

    if (!fromCurrency || !toCurrency || !amount) {
        alert('Please fill in all fields');
        return;
    }

    try {
        const conversionUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`;
        const response = await fetch(conversionUrl);
        const data = await response.json();
        const result = data.conversion_result;
        document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
    } catch (error) {
        console.error('Error converting currency:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchCurrencies);

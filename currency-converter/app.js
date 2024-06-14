document.addEventListener('DOMContentLoaded', function() {
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const commonURL = 'https://api.exchangerate-api.com/v4/latest/USD'; // Use your API endpoint
        
    async function loadCurrencies() {
        const response = await fetch(commonURL);
        const data = await response.json();
        const entries = Object.entries(data.rates);

        entries.forEach(([currency]) => {
            let option = new Option(currency, currency);
            fromCurrency.appendChild(option.cloneNode(true));
            toCurrency.appendChild(option.cloneNode(true));
        });
        toCurrency.value = 'EUR'; // Default to EUR for demonstration
    }

    window.convertCurrency = async function() {
        const amount = document.getElementById('amount').value;
        const from = fromCurrency.value;
        const to = toCurrency.value;
        const conversionAPI = `https://v6.exchangerate-api.com/v6/d19fc971c4852456c1b81ed8/pair/${from}/${to}`

        const response = await fetch(conversionAPI);
        const data = await response.json();
        const rate = data.conversion_rate;
        const result = amount * rate;
        document.getElementById('result').textContent = `${amount} ${from} is approximately ${result.toFixed(2)} ${to}`;
    };

    loadCurrencies();
});

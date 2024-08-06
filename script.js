// Currency Converter
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
 
// Weather App

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const weatherApiKey = "553f5fda1bc3ae7464c97a29ae97e2f6";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
             const weatherData = await getWeatherData(city);
             displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city");
    }

});
async function getWeatherData(city){


    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}`;

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}

function displayWeatherInfo(data){

    const {name: city,
           main: {temp, humidity}, 
           weather: [{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
              return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
              return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
              return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
              return "❄️";
        case (weatherId >= 700 && weatherId < 800):
              return "🌫️";
        case (weatherId === 800):
              return "☀️";
        case (weatherId >= 801 && weatherId < 810):
              return "☁️";
        default:
            return "❓";
    }
}

function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}

// Speed Converter

// Times Table Questions
document.getElementById("timesTableForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const number = parseInt(document.getElementById('number').value);
    const limit = parseInt(document.getElementById('limit').value);

    const randomMultiplier = Math.floor(Math.random() * limit) + 1;
    const correctAnswer = number * randomMultiplier;

    document.getElementById('question').innerText = `What is ${number} times ${randomMultiplier}?`;
    document.getElementById('question-section').style.display = 'block';

    document.getElementbyId=('feedback').innerText = '';

    document.getElementById('checkAnswerButton').onclick = function() {
        const userAnswer = parseInt(document.getElementById('answer').value);
        const feedbackElement = document.getElementById('feedback');
        if (userAnswer === correctAnswer) {
            feedbackElement.innerText = 'Correct!';
            feedbackElement.style.color = 'green';
        } else {
            feedbackElement.innerText = `Incorrect. The correct answer is ${correctAnswer}.`;
            feedbackElement.style.color = 'red';
        }
    }
});

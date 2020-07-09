const bodyParser = require("body-parser");

// Global variables
const zip = document.getElementById('zip').value;
const feelings = document.getElementById('feelings').value;
const _date = document.getElementById('date');
const _temp = document.getElementById('temp');
const _content = document.getElementById('content');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const APINum = '8078fdbb772a5ceb4d5cffae1b5c3e9c';
const OWMURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Event listener to add function to existing HTML DOM element
const generateWeatherBtn = document.getElementById('generate');
generateWeatherBtn.addEventListener('click', generateWeatherFunc);

/* Function called by event listener */
const generateWeatherFunc = () => {
    getWeatherInfo(OWMURL, APINum, zip)
    .then( data =>
    postData('/data', {temp: data.main.temp, date: newDate, feelings: feelings}),
    updateUserInterface('/info') )
}

const getWeatherInfo = async (url, apiId, zipNum) => {
    const res = await fetch(`${url}${zipNum}&appid=${apiId}`)
    try {
        const data = await res.json();
        return data;
    } catch(error) {
        console.error(`error: ${error}`)
    }
}
const postData = async (url='', data={}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const _data = await res.json();
        return _data;
    } catch (error) {
        console.error(`error: ${error}`)
    }
}
const updateUserInterface = async (url) => {
    const req = await fetch(url);
    try {
        const userData = await request.json();
        _data.innerHTML = userData[0].date;
        _temp.innerHTML = userData[0].temp;
        _content.innerHTML = userData[0].feelings;
    } catch(error) {
        console.log('error', error);
    };
}


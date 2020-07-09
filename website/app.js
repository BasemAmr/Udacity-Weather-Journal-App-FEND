const _date = document.getElementById('date');
const _temp = document.getElementById('temp');
const _content = document.getElementById('content');

// Personal API Key for OpenWeatherMap API
const APINum = '8078fdbb772a5ceb4d5cffae1b5c3e9c';
const OWMURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', generateWeatherFunc);
function generateWeatherFunc(event) {
    const zip = document.getElementById('zip').value;
    const UserFeelings = document.getElementById('feelings').value;
    console.warn(feelings);
    
    getWeatherInfo(OWMURL, zip, APINum)
    .then(data => {
        // let date = new Date(data.dt * 1000)
        // let date_str = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
        postData('/add', {temperature: data.main.temp, date: newDate, feelings: UserFeelings});
        updateUserInterface('/all');
    })
};

// Event listener to add function to existing HTML DOM element

/* Function called by event listener */


/* Function to GET Web API Data */
const getWeatherInfo = async (url, zipNum, appId) => {
    const res  = await fetch(url + 94040 + '&appid=' + appId );
    try {
        const data = await res.json();
        return data;
    } catch(error) {
        console.log('ERROR', error);
    };
};

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log('error', error);
    };
};

/* Function to GET Project Data */
const updateUserInterface = async(url='') => {
    const req = await fetch(url);
    try {
        const UIData = await req.json();
        _date.innerHTML = UIData[0].date;
        _temp.innerHTML = UIData[0].temperature;
        _content.innerHTML = UIData[0].feelings;
    } catch(error) {
        console.error('ERROR', error);
    };
};

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');

app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 5050;
const listening = () => {console.log(`server is running on port: ${port}`)}
const server = app.listen(port, listening);

// A GET route to return projectData object
app.get('/data', (req, res) => {
    res.send(projectData);
});

// A POST route to send weather info 
app.post('/info', (req, res) => {
    const weatherInfo = {
        temp: req.body.temp,
        date: req.body.date,
        feelings: req.body.feelings
    };
    projectData.slice(0, 0, weatherInfo);
});

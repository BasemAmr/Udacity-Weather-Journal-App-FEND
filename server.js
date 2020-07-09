// Setup empty JS object to act as endpoint for all routes
const projectData = [];

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
    
// Spin up the server
const port = 5050;
const listening = () => {console.log(`server is runnig on localhost:${port}`)}
const server = app.listen(port, listening());

// Callback function to complete GET '/all'
app.get('/info', function (req, res) {
    res.send(projectData);
});

// POST Route
app.post('/data', function (req, res) {
    userData = {
        temperature: req.body.temperature,
        date: req.body.date,
        feelings: req.body.feelings
    };

    projectData.unshift(userData);
});

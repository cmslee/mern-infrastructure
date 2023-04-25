require('dotenv').config();
require('./config/database'); //connects to database

//setup: import necessary dependencies
const express = require('express');
const path = require('path'); //node module
const favicon = require('serve-favicon');
const logger = require('morgan');

//create express app
const app = express();
//set port for development vs. in production conditions
//? in development: 3001 (running w/build folder)
//? in production/deployed: set in environment variables (src folder version)
const PORT = process.env.PORT || 3001;

//*Config
//Logger middleware: logs the request that server is receiving
app.use(logger('dev')); 
//JSON Payload middleware: for data coming through frontend functions
app.use(express.json()); 
//Config both serve-favicon & static middleware to serve from the production 'build' folder
//?favicon needs a path to favicon icon; (path module from node.js, join method) ==> join (directory name, build folder, and favicon) into one path
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));
//mount middleware: checks if token was sent and sets user data to the reqest (req.user)
//!middleware has to go before routes!
app.use(require('./config/checkToken'));

//*ROUTES

//API Routes
//?anything that comes through this path, pass it through this router
app.use('/api/users', require('./routes/api/users'));

//catch-all route
//?returns index.html on all non-AJAX requests
app.get('/*', (req, res) => {
    //res.send can send anything, but res.sendFile is specific to files
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

//*Listen
app.listen(PORT, () =>{
    console.log(`Server is running on port: ${PORT}`);
})
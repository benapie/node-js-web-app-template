// Set all initial variables needed.
const express = require('express');
const path = require('path');
const mysql = require('mysql');

// To make referencing files easier...
global[`__base`] = __dirname + '/';

// // Connect to the database
// if (process.argv.includes('local')) {
//     console.log(`/** Connected to LOCAL database. **/`);
//     global["pool"] = mysql.createPool({
//         connectionLimit: 10,
//         host: 'localhost',
//         user: 'user',
//         password: 'password',
//         database: 'main'
//     });
// } else {
//     console.log(`/** Connected to PRODUCTION database. **/`);
//     global["pool"] = mysql.createPool({
//         connectionLimit: 10,
//         host: '',
//         user: '',
//         password: '',
//         database: 'main'
//     });
// }

// Create app
const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Logging
app.use(require('morgan')('combined'));

// Body parsing
app.use(require('body-parser').urlencoded({extended: true}));

// Sessions
app.use(require('express-session')({
    secret: 'mpi-rgm-web-app',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 120000} // 10 mins
}));

// File access
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// Routing
app.use('/', require('./routes/public'));
app.use('/', require('./routes/public'));

// 404 Error handler
app.use(function (req, res) {
    res.render('index', {
        title: 'Error',
        user: req.user,
        error: new Error("404: I cannot find that page!")
    });
});

// 500 Error handler
app.use(function (err, req, res) {
    res.render('index', {
        title: 'Error',
        user: req.user,
        error: new Error('500: Internal server error.')
    });
});

module.exports = app;
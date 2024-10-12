//Importing framework, middleware (for front-end to interact with back-end) and database operations
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

//Create express app and define port
const app = express();
const PORT = 3000; //standard port number

app.use(cors());
app.use(express.json());

//Create new database instance
const db = new sqlite3.Database('countries.db');

// Root route that redirects to /countries
app.get('/', (req, res) => {
    res.redirect('/countries');
});

//Endpoint to handle GET requests for countries
app.get('/countries', (req, res) => {
    //Retrieving the query param and converting it to lowercase
    const query = req.query.query ? req.query.query.toLowerCase() : '';
    
    //If query is provided it will search for matching countries in db
    if (query) {
        db.all("SELECT name FROM countries WHERE LOWER(name) LIKE ?", [`%${query}%`], (err, rows) => {
            //handle errors from the database
            if (err) {
                return res.status(500).json({error: err.message});
            }
            //Sending back an array of matching country names
            res.json(rows.map(row => row.name));
        });
    }
    //If no query is provided, return all countries
    else {
        db.all("SELECT name FROM countries", [], (err, rows) => {
            //handle errors from the database
            if (err) {
                return res.status(500).json({error: err.message});
            }
            //Sending back all country names
            res.json(rows.map(row => row.name));
        });
    }
});

//Starting server and listen on the defined port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
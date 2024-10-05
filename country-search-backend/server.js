const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('countries.db');

app.get('/countries', (req, res) => {
    const query = req.query.query?.toLowerCase();

    if (query) {
        db.all("SELECT name FROM countries WHERE LOWER(name) LIKE ?", ['%${query}%'], (err, rows) =>{
            if (err) {
                return res.status(500).json({error: err.message});
            }
            res.json(rows.map(row => row.name));
        });
    } else {
        db.all("SELECT name FROM countries", [], (err, rows) => {
            if (err) {
                return res.status(500).json({error: err.message});
            }
            res.json(rows.map(row => row.name));
        });
    }
});

//Starting server
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:${PORT}');
});
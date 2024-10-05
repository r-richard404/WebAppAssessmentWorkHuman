const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('countries.db');

// initialises database and insert countries into countries.db file
db.serialize(() => {
    // create countries table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS countries (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT NOT NULL
    )`);
    
    const countries = [
        "Albania", "Andorra", "Australia", "Brazil", "Belgium",
        "Canada", "China", "France", "Germany", "India",
        "Indonesia", "Ireland", "Italy", "Japan", "Kenya",
        "Luxembourg", "Mexico", "New Zealand", "Nigeria",
        "Portugal", "Russia", "South Africa", "South Korea",
        "Spain", "Sweden", "Thailand", "Ukraine",
        "United Kingdom", "United States of America", "Vietnam",
        "Zambia"
    ];

    const stmt = db.prepare("INSERT INTO countries (name) VALUES (?)");
    countries.forEach(country => {
        stmt.run(country);
    });
    stmt.finalize();
});

db.close();
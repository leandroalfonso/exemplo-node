const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
const corsOptions = {
  origin: '*',
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));

// MySQL connection
const connection = mysql.createConnection({
  host: 'db4free.net',
  user: 'leandro_alfonso0',
  password: 'Leandro171716',
  database: 'colaborador_bd01'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// GET route
app.get('/data', (req, res) => {
  const sql = 'SELECT * FROM usuarios';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error querying MySQL database: ', err);
      res.status(500).send('Error querying MySQL database');
      return;
    }

    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


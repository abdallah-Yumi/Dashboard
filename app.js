console.log('node is running')
const XLSX = require('xlsx');

const express = require('express');
const app = express();
const port = 3001;


app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});


app.listen(port, () => {
    console.log('Server running at http://localhost:3001');
});


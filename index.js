const express = require('express');
const app = express();
const port = process.env.port || 5000

const data = require('./data/courses.json');

app.get('/', (req, res) => {
    res.send("my Server is Running")
})

app.get('/courses', (req, res) => {
    res.send(data)
})

app.listen(port, () => {

})
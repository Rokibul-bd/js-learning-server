const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.port || 5000
const courses = require('./data/courses.json');


app.use(cors())

app.get('/', (req, res) => {
    res.send("my Server is Running")
})

app.get('/courses', (req, res) => {
    res.send(data)
})

// Dynamic route by Id
app.get('/courses/:id', (req, res) => {
    const id = req.params.id;
    const course = courses.find(cs => cs.id == id);
    res.send(course)
})

app.listen(port, () => {

})
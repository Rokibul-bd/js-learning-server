const express = require('express');
const app = express();

const port = process.env.port || 5000

app.get('/', (req, res) => {
    res.send("my Server is Running")
})

app.listen(port, () => {

})
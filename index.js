const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const cors = require('cors')
const port = process.env.port || 5000
require('dotenv').config();


app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0mrh6im.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const courseCollaction = client.db('jsLearning').collection('courses')
const courseBookingCollactions = client.db('jsLearning').collection('booking')


async function run() {
    try {

        app.get('/', (req, res) => {
            res.send("my Server is Running")
        })

        app.get('/courses', async (req, res) => {
            const query = {};
            const result = await courseCollaction.find(query).toArray()
            res.send(result)
        })

        // Dynamic route by Id
        app.get('/courses/:id', (req, res) => {
            const id = req.params.id;
            const course = courseCollaction.find(cs => cs.id == id);
            res.send(course)
        })
        app.post('/booking', async (req, res) => {
            const booking = req.body;
            const query = {
                email: booking.email,
                name: booking.name
            }
            console.log('Query', query)
            const aleardybooked = await courseBookingCollactions.find(query).toArray();

            if (aleardybooked.length) {
                const message = `You have already booked on course ${booking.name}`;
                return res.send({
                    acknowledged: false, message
                })
            }

            const result = await courseBookingCollactions.insertOne(booking)
            res.send(result)
        })
        app.get('/booking/:email', async (req, res) => {
            const email = req.params.email
            const query = { email: email }
            const result = await courseBookingCollactions.find(query).toArray();
            res.send(result)
        })
    }
    finally {

    }
}

run().catch(err => console.error(err))

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });




app.listen(port, () => {

})
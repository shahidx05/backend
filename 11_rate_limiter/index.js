const express = require('express')
const app = express()
const main = require('./database')
const authRouter = require("./routes/auth")
const redisClient = require('./config/redis');
const cookieParser = require('cookie-parser');
const rateLimiter = require('./middleware/rateLimiter');
const port = 3000

app.use(cookieParser());
app.use(express.json())
app.use(rateLimiter);
 
app.use('/auth', authRouter);

const InitialzeConnection = async () => {
    try {
        // await redisClient.connect();
        // console.log("Connected to Redis");

        // await main();
        // console.log("Connected to MongoDB");

        Promise.all([redisClient.connect(), main()])
        console.log("Connected to Redis and MongoDB");

        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    } catch (error) {
        console.log("Errror: " + error);
    }
}


InitialzeConnection();

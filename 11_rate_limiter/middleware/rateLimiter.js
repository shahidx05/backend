 const redisClient = require('./config/redis');

// const rateLimiter = async (req, res, next) => {
//     try{
//         const ip = req.ip;
//         const count = await redisClient.incr(ip);
//         if(count==1){
//             // await redisClient.expire(ip, 60); // Set TTL of 60 seconds
//             await redisClient.expire(3660); 
//         }
//         if(count>60){
//             throw new Error("Too many requests. Please try again later.");
//         }
//         next();
//     }
//     catch(error){
//         res.status(429).send("Error: " + error.message);
//     }
// }

// sliding window rate limiter
const windowSize = 3600;
const Max_REQUESTS = 60;
const rateLimiter = async (req, res, next) => {
    try{
        const key = req.ip;
        const currentTime = Date.now() / 1000; // current time in seconds
        const window_Time = currentTime - windowSize;

        await redisClient.zremrangebyscore(key, 0, window_Time);

        const numberOfRequest = await redisClient.zcard(key);

        if(numberOfRequest >= Max_REQUESTS){
            throw new Error("Too many requests. Please try again later.");
        }

        await redisClient.zadd(key, currentTime, currentTime);
        await redisClient.expire(key, windowSize + 60); // extra 60 seconds to store the data
    }
    catch(error){
        res.status(429).send("Error: " + error.message);
    }
}


module.exports = rateLimiter;
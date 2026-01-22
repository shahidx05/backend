const redis = require('redis')

const redisClient = redis.createClient({
    sername: 'default',
    password: 'xgHLmUjJjSMEM3PdlE3Y88I78e554s4H',
    socket: {
        host: 'redis-19403.c264.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 19403
    }})

module.exports = redisClient
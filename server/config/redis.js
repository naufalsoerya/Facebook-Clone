const Redis = require('ioredis');
const redis = new Redis({
    port: 10214,
    host: 'redis-10214.c295.ap-southeast-1-1.ec2.cloud.redislabs.com',
    username: "default",
    password: 'CumNksnOKxHsw8stKUUO6bL9ZEJjrr31',
    db: 0,
});

module.exports = redis;
const express = require("express");
const axios = require("axios");
const responseT = require("response-time");
const redis = require('redis');
const fs = require('fs');

const cliente1 = redis.createClient({
  host: 'caching1',
  port: 6379
});

const cliente2 = redis.createClient({
  host: 'caching2',
  port: 6379
});

const cliente3 = redis.createClient({
  host: 'caching3',
  port: 6379
});

const app = express();

app.use(responseT());

const interval = setInterval(() => {
  const start = Date.now();
  //console.log("Cronjob executed!");
  //app.get("/", async (req, res) => {
    const rand = Math.floor(Math.random() * (387 - 2 + 1) + 2);
    console.log(rand);
    //const redisClients = [cliente1, cliente2, cliente3];
    //const redisClientIndex = Math.floor(Math.random() * redisClients.length);
    //const redisClient = redisClients[redisClientIndex];
    if (0 < rand && rand <= 130) {
      cliente1.get(`monsters-${rand}`, async (err, reply) => {
        if (reply) {
          const nu = Date.now() - start;
          console.log('X-Response-Time', `${nu}ms`);
          fs.writeFile('times.txt', nu.toString(), (err) => {
            if (err) throw err;
          });
          return JSON.parse(reply);
        } else {
          const response = await axios.get(`https://botw-compendium.herokuapp.com/api/v2/entry/${rand}`);
          cliente1.set(`monsters-${rand}`, JSON.stringify(response.data.data), (err, reply) => {
            if (err) {
              console.log(err);
            } else {
              const nu = Date.now() - start;
              console.log(reply);
              console.log('X-Response-Time', `${nu}ms`);
              fs.writeFile('times.txt', nu.toString(), (err) => {
                if (err) throw err;
              });
              //response.data.data;
            }
          });
        }
      });
    } else if (130 < rand && rand <= 260) {
      cliente2.get(`monsters-${rand}`, async (err, reply) => {
        if (reply) {
          const nu = Date.now() - start;
          console.log('X-Response-Time', `${nu}ms`);
          fs.writeFile('times.txt', nu.toString(), (err) => {
            if (err) throw err;
          });
          return JSON.parse(reply);
        } else {
          const response = await axios.get(`https://botw-compendium.herokuapp.com/api/v2/entry/${rand}`);
          cliente2.set(`monsters-${rand}`, JSON.stringify(response.data.data), (err, reply) => {
            if (err) {
              console.log(err);
            } else {
              const nu = Date.now() - start;
              console.log(reply);
              console.log('X-Response-Time', `${nu}ms`);
              fs.writeFile('times.txt', nu.toString(), (err) => {
                if (err) throw err;
              });
              //response.data.data;
            }
          });
        }
      });
    } else if (260 < rand && rand < 390) {
      cliente3.get(`monsters-${rand}`, async (err, reply) => {
        if (reply) {
          const nu = Date.now() - start;
          console.log('X-Response-Time', `${nu}ms`);
          fs.writeFile('times.txt', nu.toString(), (err) => {
            if (err) throw err;
          });
          return JSON.parse(reply);
        } else {
          const response = await axios.get(`https://botw-compendium.herokuapp.com/api/v2/entry/${rand}`);
          cliente3.set(`monsters-${rand}`, JSON.stringify(response.data.data), (err, reply) => {
            if (err) {
              console.log(err);
            } else {
              const nu = Date.now() - start;
              console.log(reply);
              console.log('X-Response-Time', `${nu}ms`);
              fs.writeFile('times.txt', nu.toString(), (err) => {
              if (err) throw err;
              });
              //response.data.data;
            }
          });
        }
      });
    }  
}, 1000);

app.listen(3000);
console.log("server on port 3000");
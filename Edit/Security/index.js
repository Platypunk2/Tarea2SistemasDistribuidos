'use strict';

const express = require('express');
const axios = require('axios')
const bp = require('body-parser')
const { Kafka } = require('kafkajs')
const fs = require('fs');
const redis = require('redis');

const kafka = new Kafka({
  clientId: 'my-app2',
  brokers: ['kafka:9092'],
})
//const cors = require("cors");
// Constants
const PORT = 8070;
const HOST = '0.0.0.0';
const url = `redis://redis_sv:6379`;
// App
const app = express();
const consumer = kafka.consumer({ groupId: 'test-group' })
const client = redis.createClient({url});


(async () => {
  // Connect to redis server
  console.log('Conectado')
  await client.connect();
})();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

function Block(User)
{
    console.log("Bloqueando Usuario")
    var Usuarios = null
    fs.readFile('data.json', (err, data) => {if (err) throw err;
      Usuarios = JSON.parse(data);
      console.log(Usuarios);
      Usuarios['users-blocked'].push(User)
      fs.writeFileSync('data.json',JSON.stringify(Usuarios))
    });

}

(async () => {
  var User = null
  var time = null
  var value = null
  var time_list = []
  await consumer.subscribe({ topic: 'Validacion', fromBeginning: true })
  console.log('Consumer On')
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      value = message.value
      console.log('Recibido algo')
      console.log({
        value: message.value.toString(),
      })
      User = JSON.parse(value)
      time = User['time']
      delete User['time']
      delete User['pass']
      
      let reply = await client.get(User['user']);
      
      if(reply)
      {
        var cache = JSON.parse(reply)
        cache['count'] += 1
        cache['time'].push(time)
        console.log("Cache: ",cache)
        if(cache['count'] < 5)
        {
          await client.set(User['user'],JSON.stringify(cache))
        }
        else
        {
          var DeltaTime = time-cache['time'][cache['count']-5]
          console.log(DeltaTime)
          if(DeltaTime < 60 && cache['Blocked'] == false)
          {
            cache['Blocked'] = true
            Block(User)
            
          }
          await client.set(User['user'],JSON.stringify(cache))
        }
      }
      else
      {
        time_list.push(time)
        var data = {'count':1,'time':time_list,'Blocked':false}
        await client.set(User['user'],JSON.stringify(data))
      }


    },
  })

})();

app.get('/blocked', (req, res) => {
  (async () => {
    fs.readFile('data.json', (err, data) => {
      if (err) throw err;
      var Usuarios = JSON.parse(data);
      console.log(Usuarios);
      res.json(Usuarios);
    });
  })();
  
});

app.listen(PORT, HOST, () => {
  console.log(`SERVER RUN AT http://localhost:${PORT}`);
});
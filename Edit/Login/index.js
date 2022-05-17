'use strict';

const express = require('express');
const axios = require('axios')
const bp = require('body-parser')
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['kafka:9092'],
})
//const cors = require("cors");
// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Tarea 2 Sistemas Distribuidos');
});

const producer = kafka.producer()
const admin = kafka.admin()


app.post('/login', (req, res) => {
  (async () => {
    await producer.connect()
    await admin.connect()

    await admin.createTopics({
      waitForLeaders: true,
      topics: [
        { 
          topic: 'Validacion',
          replicationFactor: 1
        }
      ],
    })

    const user = req.body;
    var time = Math.floor(new Date() / 1000)
    user['time'] = time
    console.log('query item: ',user)
    await producer.send({
      topic: 'Validacion',
      messages: [
        { value: JSON.stringify(user) },
      ],
    })
    await producer.disconnect()
    await admin.disconnect()
    res.json('Recibido')

  })();

});


  app.listen(PORT, HOST, () => {
    console.log(`CLIENT RUN AT http://localhost:${PORT}`);
  });
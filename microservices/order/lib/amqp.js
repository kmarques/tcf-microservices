const amqp = require("amqplib");

let channel = null;

async function start() {
  if(channel) return channel;

  return amqp.connect("amqp://myuser:mypassword@rabbitmq")
    .then(function (connection) {
      return connection.createChannel();
    })
    .then(function (chn) {
      channel = chn;
      return channel
    });
}

module.exports = start;

const amqp = require("amqplib");

let channel = null;

async function start() {
  if(channel) return channel;

  return amqp.connect(process.env.AMQP_HOST)
    .then(function (connection) {
      return connection.createChannel();
    })
    .then(function (chn) {
      channel = chn;
      return chn;
    });
}

module.exports = start;

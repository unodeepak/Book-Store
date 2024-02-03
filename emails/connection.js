const amqp = require("amqplib");

const connection = async () => {
  const connect = await amqp.connect("amqp://localhost");
  const channel = await connect.createChannel();

  return channel;
};

module.exports = connection;

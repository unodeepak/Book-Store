const amqp = require("amqplib");
const consumer = require("./consumer");
// const channel = require("./connection");

const publisher = async (messages) => {
  try {
    const connect = await amqp.connect("amqp://localhost");
    const channel = await connect.createChannel();
    const queue = "email_queue";

    await channel.assertQueue(queue, { durable: false });

    for (let msg of messages) {
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
    }

    // await consumer();

    await channel.close();
    await connect.close();
    console.log("Queue Process");

    return true;
  } catch (err) {
    console.log("Error in publisher", err);
    return false;
  }
};

module.exports = publisher;

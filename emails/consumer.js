const amqp = require("amqplib");
const nodemailer = require("nodemailer");
// const channel = require("./connection");
const sendMail = require("../helpers/sendMail");

const consumer = async () => {
  try {
    const connect = await amqp.connect("amqp://localhost");
    const channel = await connect.createChannel();
    const queue = "email_queue";
    await channel.assertQueue(queue, { durable: false });

    channel.consume(
      queue,
      (msg) => {
        const message = JSON.parse(msg?.content?.toString());
        sendMail(message);
      },
      { noAck: true }
    );

    console.log("message consume successfully");
  } catch (err) {
    console.log("Error is ", err);
    return false;
  }
};

module.exports = consumer;

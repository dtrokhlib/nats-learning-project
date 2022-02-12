import nats, { Message } from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', async () => {
  console.log('Publisher connected to NATS');

  const publisher = new TicketCreatedPublisher(stan);

  try {
    await publisher.publish({
      id: 'dasadas',
      title: 'adasddsa',
      price: 23,
    });
  } catch (err) {
    console.log(err);
  }

  // // Publisher
  // const data = JSON.stringify({
  //   id: '123',
  //   title: 'concert',
  //   price: 20,
  // });

  // stan.publish('ticket:created', data, () => {
  //   console.log('Event Published');
  // });
});

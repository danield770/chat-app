import PusherServer from 'pusher';
import PusherClient from 'pusher-js';

export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID as string,
  key: 'f9c68cbe0e5947dcedb1',
  secret: process.env.PUSHER_SECRET as string,
  cluster: 'ap2',
  useTLS: true,
});

export const pusherClient = new PusherClient('f9c68cbe0e5947dcedb1', {
  cluster: 'ap2',
});

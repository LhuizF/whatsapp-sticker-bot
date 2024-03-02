import { Client, LocalAuth } from 'whatsapp-web.js';
import { getCommands } from './config/commands';
import express from 'express';
import qr from 'qrcode';

const app = express();

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Server ON:: ${PORT}!`);
});

const getHtml = async (qrData: string) => {
  const qrImage = await qr.toDataURL(qrData);

  const html = `
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>QR Code</title>
  <style>
      body {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
          background-color: #131313;
      }
      img {
          max-width: 100%;
          width: 100%;
          height: auto;
      }
      div {
        background-color: #f5f5f5;
        padding: 20px;
        border-radius: 10px;
        width: 300px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        height: 300px;
      }
  </style>
  </head>
  <body>
    <div>
      <img src="${qrImage}" alt="qr-code" />
    </div>
  </body>
  </html>`;

  return html;
};

app.get('/qr-code', (req, res) => {
  const client = new Client({
    authStrategy: new LocalAuth(),
  });

  client.on('qr', async (qr) => {
    const qrCode = await getHtml(qr);
    res.send(qrCode);
  });

  client.on('ready', () => {
    console.log('ZAP ON!');
  });

  client.on('message', async (message) => {
    const chat = await message.getChat();

    if (chat.isGroup || typeof message.body !== 'string') return;

    const [command] = message.body.toLowerCase().split(' ');
    if (!command) return;
    const commands = await getCommands();
    if (commands[command]) {
      try {
        await commands[command].handle(client, message);
      } catch (err) {
        console.log('ERROR', err);
      }
    }
  });

  client.initialize();
});

app.get('/ping', (req, res) => {
  res.send('pong');
});

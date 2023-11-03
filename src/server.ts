import { getCommands } from './config/commands';
import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

const upServer = async () => {
  const client = new Client({
    authStrategy: new LocalAuth(),
  });

  client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
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
};

upServer();

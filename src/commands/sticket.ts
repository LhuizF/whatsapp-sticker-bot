import { ICommand, QuoteMessage } from '../interfaces';
import axios from 'axios';
import { Client, Message, MessageMedia } from 'whatsapp-web.js';

class SticketCommand implements ICommand {
  readonly name = '/sticket';

  constructor() {}

  async handle(client: Client, message: Message): Promise<void> {
    if (message.type === 'image') {
      const image = await message.downloadMedia();
      const media = await new MessageMedia(image.mimetype, image.data);

      client.sendMessage(message.from, media, {
        sendMediaAsSticker: true,
        stickerAuthor: 'wa-sticker-bot:LhuizF',
        stickerName: 'sticker',
      });

      return;
    }
    const [, url] = message.body.split(' ');

    const { data } = await axios
      .get(url.trim(), { responseType: 'arraybuffer' })
      .catch((err) => {
        console.log('ERROR', err.response.data);
        client.sendMessage(message.from, 'Erro ao baixar imagem!');
        throw err;
      });

    const imageBase = Buffer.from(data).toString('base64');
    const image = await new MessageMedia('image/jpeg', imageBase, 'image.jpg');

    await client.sendMessage(message.from, image, {
      sendMediaAsSticker: true,
      stickerAuthor: 'wa-sticker-bot:LhuizF',
      stickerName: 'sticker',
    });
  }
}

export default SticketCommand;

import { ICommand } from '../interfaces';
import axios from 'axios';
import { Client, Message, MessageMedia } from 'whatsapp-web.js';

class StickerCommand implements ICommand {
  readonly name = '/sticker';

  constructor() {}

  async handle(client: Client, message: Message): Promise<void> {
    try {
      client.sendMessage(message.from, 'Aguarde!');
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

      const response = await axios
        .get(url.trim(), { responseType: 'arraybuffer' })
        .catch((err) => {
          console.log('ERROR', err?.response?.data);
          client.sendMessage(message.from, 'Erro ao baixar imagem!');
          return null;
        });

        if (!response) return;

      const imageBase = Buffer.from(response.data).toString('base64');
      const image = await new MessageMedia(
        'image/jpeg',
        imageBase,
        'image.jpg',
      );

      await client.sendMessage(message.from, image, {
        sendMediaAsSticker: true,
        stickerAuthor: 'wa-sticker-bot:LhuizF',
        stickerName: 'sticker',
      });
    } catch (error) {
      console.log('CATH', error);
      client.sendMessage(message.from, 'Ocorreu um erro');
    }
  }
}

export default StickerCommand;

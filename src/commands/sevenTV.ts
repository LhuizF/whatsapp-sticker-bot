import { ICommand, IEmotesItem } from '../interfaces';
import { Client, Message, MessageMedia } from 'whatsapp-web.js';
import axios from 'axios';

class SevenTVCommand implements ICommand {
  readonly name = '/7tv';
  readonly fileNumber = 3;

  async handle(client: Client, message: Message): Promise<void> {
    try {
      client.sendMessage(message.from, 'Aguarde!');

      const [, emoteSearch, pageSelected] = message.body.split(' ');

      const page = Number(pageSelected) || 1;

      const payload = {
        operationName: 'SearchEmotes',
        variables: {
          query: emoteSearch,
          limit: 1,
          page: page,
          sort: {
            value: 'popularity',
            order: 'DESCENDING',
          },
        },
        query:
          'query SearchEmotes($query: String!, $page: Int, $sort: Sort, $limit: Int, $filter: EmoteSearchFilter) {\n emotes(query: $query, page: $page, sort: $sort, limit: $limit, filter: $filter) {\nitems{\n id\n name\n host{\n url \n files{\n name \n format}}}\n}\n}',
      };

      const response = await axios
        .post('https://7tv.io/v3/gql', payload)
        .then((res) => res.data)
        .catch((err) => {
          console.log('ERRRRRRR', err.response.data);
          throw err;
        });

      const [emote] = response.data.emotes.items as IEmotesItem[];

      if (!emote) {
        client.sendMessage(message.from, 'Emote não encontrado! :(');
        return;
      }

      const file =
        emote.host.files[this.fileNumber] ||
        emote.host.files[emote.host.files.length - 1];

      const image = await MessageMedia.fromUrl(
        `https:${emote.host.url}/${file.name}`,
      );

      const media = await new MessageMedia(image.mimetype, image.data);

      client.sendMessage(message.from, media, {
        sendMediaAsSticker: true,
        stickerAuthor: 'wa-sticker-bot:LhuizF',
        stickerName: emote.name,
      });
    } catch (error) {
      console.log('CATCH', error);
      client.sendMessage(message.from, 'Ocorreu um erro');
    }
  }
}

export default SevenTVCommand;

import { Client, Message } from 'whatsapp-web.js';

export interface ICommand {
  readonly name: string;
  handle(client: Client, message: Message): Promise<void>;
}

export interface IEmotesItem {
  id: string;
  name: string;
  host: {
    url: string;
    files: {
      name: string;
      format: string;
    }[];
  };
}

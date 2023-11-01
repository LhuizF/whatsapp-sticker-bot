import { Client, Message } from 'whatsapp-web.js';

export interface ICommand {
  readonly name: string;
  handle(client: any, message: Message): Promise<void>;
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

export interface QuoteMessage {
  id: Id;
  rowId: number;
  type: string;
  t: number;
  from: string;
  to: string;
  self: string;
  ack: number;
  invis: boolean;
  ephemeralStartTimestamp: number;
  directPath: string;
  mimetype: string;
  filehash: string;
  size: number;
  filename: string;
  mediaKey: string;
  mediaKeyTimestamp: number;
  messageRangeIndex: string;
  deprecatedMms3Url: string;
  encFilehash: string;
  msgRowOpaqueData: any;
  rcat: any;
  star: boolean;
  isMdHistoryMsg: boolean;
  caption: string;
  pollOptions: any[];
}

export interface Id {
  fromMe: boolean;
  remote: string;
  id: string;
  _serialized: string;
}

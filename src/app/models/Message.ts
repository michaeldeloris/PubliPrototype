import { User } from './User';

export class Message {
  id: number;
  content: string;
  author: User;
  publicationDate: string;

  getPublicationDateAsDate() {
    return new Date(this.publicationDate);
  }

  static fromHttp(message: Message): Message {
    const newMessage = new Message();
    newMessage.id = message.id;
    newMessage.content = message.content;
    newMessage.author = User.fromHttp(message.author);
    newMessage.publicationDate = message.publicationDate;
    return newMessage;
  }
}

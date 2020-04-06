import { User } from './User';

export class Message {
  id: number;
  content: string;
  author: User;
  publicationDate: string;

  getPublicationDateAsDate() {
    return new Date(this.publicationDate);
  }

  static fromHttp(messages: Array<Message>) {
    const newMessages = new Array<Message>();
    for(let message of messages) {
      const newMessage = new Message();
      newMessage.id = message.id;
      newMessage.content = message.content;
      newMessage.author = User.fromHttp(message.author);
      newMessage.publicationDate = message.publicationDate;
      newMessages.push(newMessage);
    }
    return newMessages;
  }
}

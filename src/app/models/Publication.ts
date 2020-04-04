import { User } from './User';
import { Message } from './Message';

export class Publication {
  id: number;
  title: string;
  publicationDate: string;
  content: string;
  imagePath: string;
  author: User;
  messages: Array<Message>;

  getPublicationDateAsDate() {
    return new Date(this.publicationDate);
  }
}

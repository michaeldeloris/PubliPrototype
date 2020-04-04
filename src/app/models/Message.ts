import { User } from './User';

export class Message {
  id: number;
  content: string;
  author: User;
  publicationDate: string;

  getPublicationDateAsDate() {
    return new Date(this.publicationDate);
  }
}

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

  static fromHttp(publication: Publication) {
    const newPublication = new Publication();
    newPublication.id = publication.id;
    newPublication.title = publication.title;
    newPublication.publicationDate = publication.publicationDate;
    newPublication.content = publication.content;
    newPublication.imagePath = publication.imagePath;
    newPublication.author = User.fromHttp(publication.author);
    newPublication.messages = Message.fromHttp(publication.messages);
  }
}

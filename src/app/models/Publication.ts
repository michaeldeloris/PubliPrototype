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
    return new Date(this.publicationDate.split('.')[0]); //adapt date to work on iOS too
  }

  static fromHttp(publication: Publication): Publication {
    const newPublication = new Publication();
    newPublication.id = publication.id;
    newPublication.title = publication.title;
    newPublication.publicationDate = publication.publicationDate;
    newPublication.content = publication.content;
    newPublication.imagePath = publication.imagePath;
    newPublication.author = User.fromHttp(publication.author);
    newPublication.messages = new Array<Message>();
    for(let message of publication.messages) {
      newPublication.messages.push(Message.fromHttp(message));

    }
    return newPublication;
  }
}

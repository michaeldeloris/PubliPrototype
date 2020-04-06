export class User {
  id: number;
  username: string;

  static fromHttp(user: User): User {
    const newUser = new User();
    newUser.id = user.id;
    newUser.username = user.username;
    return newUser;
  }
}

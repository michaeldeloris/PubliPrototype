export class User {
  id: number;
  username: string;
  role: Role;

  static fromHttp(user: User): User {
    const newUser = new User();
    newUser.id = user.id;
    newUser.username = user.username;
    newUser.role = user.role;
    return newUser;
  }
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface User {
  id: number;
  username: string;
}

// export interface userList {
//   users: User[];
// }
export type sanitizedUser = Pick<User, 'username' | 'id'>[];
// export type sanitizedUser = <User>[]

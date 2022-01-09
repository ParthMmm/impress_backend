export interface User {
  id: string;
  username: string;
}

// export interface userList {
//   users: User[];
// }
export type sanitizedUser = Omit<User, 'password'>;
// export type sanitizedUser = <User>[]

export interface User {
  id: number;
  username: string;
}

// export interface userList {
//   users: User[];
// }
export type sanitizedUser = Omit<User, 'password'>;
// export type sanitizedUser = <User>[]

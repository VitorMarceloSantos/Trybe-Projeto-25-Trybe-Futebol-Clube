interface IUser {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

interface IUserStatus {
  status: number;
  message: string;
}

export { IUser, IUserStatus };

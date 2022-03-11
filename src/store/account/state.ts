import { User } from 'src/interfaces/user.interface';
export interface IAccountInfo {
  accountID?: string;
  FName: string;
  MName: string;
  LName: string;
  username: string;
  password: string;
  email: string;
  role: string;
  dateCreated: string;
  status: 'Active' | 'Inactive';
}
export interface AccountStateInterface {
  allAccount: User[];
}

function state(): AccountStateInterface {
  return {
    allAccount: [],
  };
}

export default state;

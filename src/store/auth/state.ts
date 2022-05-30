export interface AUser {
  id?: number;
  FName: string;
  MName?: string;
  LName: string;
  username?: string;
  password?: string;
  type: string;
  contact?: string;
  email?: string;
  status: string;
  userDateCreated: string;
}
export interface IAuthState {
  currentUser?: AUser;
}

function state(): IAuthState {
  return {};
}

export default state;

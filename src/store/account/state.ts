export interface AccountInfo {
  FName: string;
  MName: string;
  LName: string;
  username: string;
  password: string;
  email: string;
  dateCreated: string;
  role: string;
  status: 'Active' | 'Inactive';
}

export interface AccountStateInterface {
  account: AccountInfo[];
  activeAccount?: AccountInfo;
}

function state(): AccountStateInterface {
  return {
    account: [
      {
        FName: 'Basam',
        MName: 'C',
        LName: 'Serad',
        username: 'Sam',
        password: 'Sam',
        email: 'sam@gmail.com',
        dateCreated: '12/23/1998',
        role: 'Admin',
        status: 'Active',
      },
    ],
  };
}

export default state;

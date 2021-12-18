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
  allAccount: IAccountInfo[];
  activeAccount?: IAccountInfo;
}

function state(): AccountStateInterface {
  return {
    allAccount: [
      {
        accountID: '01',
        FName: 'Basam',
        MName: 'C',
        LName: 'Serad',
        username: 'Sam',
        password: 'samserad23',
        email: 'basamserad1998@gmail.com',
        role: 'Admin',
        dateCreated: '12/17/2021',
        status: 'Active',
      },
    ],
  };
}

export default state;

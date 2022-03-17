import { User } from 'src/interfaces/user.interface';
import { UserDto } from 'src/services/rest-api';
export interface AccountStateInterface {
  allAccount: UserDto[];
  newUser?: User;
}

function state(): AccountStateInterface {
  return {
    allAccount: [],
  };
}

export default state;

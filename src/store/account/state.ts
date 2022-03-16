import { UserDto } from 'src/services/rest-api';
export interface AccountStateInterface {
  allAccount: UserDto[];
  newUser?: UserDto;
}

function state(): AccountStateInterface {
  return {
    allAccount: [],
  };
}

export default state;

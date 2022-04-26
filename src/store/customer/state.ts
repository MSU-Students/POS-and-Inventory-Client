import { Customer } from 'src/interfaces/customer.interface';

export interface CustomertateInterface {
  allCustomer: Customer[];
  newCustomer?: Customer;
}

function state(): CustomertateInterface {
  return {
    allCustomer: [],
  };
}

export default state;

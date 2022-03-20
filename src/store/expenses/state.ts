import { Expenses } from 'src/interfaces/expenses.interface';

export interface ExpensesStateInterface {
  allExpenses: Expenses[];
  newExpenses?: Expenses;
}

function state(): ExpensesStateInterface {
  return {
    allExpenses: [],
  };
}

export default state;

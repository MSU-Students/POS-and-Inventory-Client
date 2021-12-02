export interface ExpensesInfo {
  reference: string;
  date: string;
  category: string;
  supplier: string;
  amount: number;
  note: string;
}

export interface ExpensesStateInterface {
  expenses: ExpensesInfo[];
  activeExpenses?: ExpensesInfo;
}

function state(): ExpensesStateInterface {
  return {
    expenses: [
      {
        reference: 'hj4j324jbb34bj4',
        date: '12/23/2021',
        category: 'Utensils',
        supplier: 'Coca Cola Company',
        amount: 10000,
        note: '',
      },
    ],
  };
}

export default state;

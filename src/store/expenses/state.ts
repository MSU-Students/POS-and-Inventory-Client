export interface IExpensesInfo {
  expensesReference: string;
  expensesName: string;
  expensesDateCreated: string;
  category: string;
  supplier: string;
  expensesAmount: number;
  expensesNote: string;
}

export interface ExpensesStateInterface {
  allExpenses: IExpensesInfo[];
  activeExpenses?: IExpensesInfo;
}

function state(): ExpensesStateInterface {
  return {
    allExpenses: [
      {
        expensesReference: 'hj4j324jbb34bj4',
        expensesName: 'Spoon',
        expensesDateCreated: '12/23/2021',
        category: 'Utensils',
        supplier: 'Coca Cola Company',
        expensesAmount: 10000,
        expensesNote: '',
      },
      {
        expensesReference: 'hj4j324jbb34bj4',
        expensesName: 'Spoon',
        expensesDateCreated: '12/23/2021',
        category: 'Utensils',
        supplier: 'Coca Cola Company',
        expensesAmount: 10000,
        expensesNote: '',
      },
      {
        expensesReference: 'hj4j324jbb34bj4',
        expensesName: 'Spoon',
        expensesDateCreated: '12/23/2021',
        category: 'Utensils',
        supplier: 'Coca Cola Company',
        expensesAmount: 10000,
        expensesNote: '',
      },
      {
        expensesReference: 'hj4j324jbb34bj4',
        expensesName: 'Spoon',
        expensesDateCreated: '12/23/2021',
        category: 'Utensils',
        supplier: 'Coca Cola Company',
        expensesAmount: 10000,
        expensesNote: '',
      },
    ],
  };
}

export default state;

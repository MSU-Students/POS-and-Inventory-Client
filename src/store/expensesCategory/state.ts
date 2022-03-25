export interface ExpensesCategory {
  expensesCategoryID?: string;
  expensesCategoryName: string;
}

export interface expensesCategoryStateInterface {
  allExpensesCategory: ExpensesCategory[];
  newExpensesCategory?: ExpensesCategory;
}

function state(): expensesCategoryStateInterface {
  return {
    allExpensesCategory: [],
  };
}

export default state;

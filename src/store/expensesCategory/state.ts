export interface IexpensesCategoryInfo {
  expensesCategoryID?: string;
  expensesCategoryName: string;
}

export interface expensesCategoryStateInterface {
  allexpensesCategory: IexpensesCategoryInfo[];
}

function state(): expensesCategoryStateInterface {
  return {
    allexpensesCategory: [
      {
        expensesCategoryName: 'Rent',
      },
    ],
  };
}

export default state;

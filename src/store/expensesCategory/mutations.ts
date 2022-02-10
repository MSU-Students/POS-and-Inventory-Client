import { MutationTree } from 'vuex';
import { IexpensesCategoryInfo, expensesCategoryStateInterface } from './state';

const mutation: MutationTree<expensesCategoryStateInterface> = {
  setExpenseCat(state, payload: IexpensesCategoryInfo) {
    state.allexpensesCategory.push(payload);
  },
  setNewExpenseCat(state, payload: IexpensesCategoryInfo) {
    const index = state.allexpensesCategory.findIndex(
      (s) => s.expensesCategoryID === payload.expensesCategoryID
    );
    if (index >= 0) {
      state.allexpensesCategory.splice(index, 1, payload);
    }
  },
  deleteExpenseCat(state, payload: IexpensesCategoryInfo) {
    const index = state.allexpensesCategory.findIndex(
      (s) => s.expensesCategoryID === payload.expensesCategoryID
    );
    if (index >= 0) {
      state.allexpensesCategory.splice(index, 1);
    }
  },
};

export default mutation;

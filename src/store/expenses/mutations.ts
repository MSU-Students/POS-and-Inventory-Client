import { MutationTree } from 'vuex';
import { IExpensesInfo, ExpensesStateInterface } from './state';

const mutation: MutationTree<ExpensesStateInterface> = {
  setExpenses(state, payload: IExpensesInfo) {
    state.allExpenses.push(payload);
  },
  setNewExpenses(state, payload: IExpensesInfo) {
    const index = state.allExpenses.findIndex(
      (s) => s.expensesReference === payload.expensesReference
    );
    if (index >= 0) {
      state.allExpenses.splice(index, 1, payload);
    }
  },
  deleteExpenses(state, payload: IExpensesInfo) {
    const index = state.allExpenses.findIndex(
      (s) => s.expensesReference === payload.expensesReference
    );
    if (index >= 0) {
      state.allExpenses.splice(index, 1);
    }
  },
};

export default mutation;

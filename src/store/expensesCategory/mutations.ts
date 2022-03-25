import { MutationTree } from 'vuex';
import { expensesCategoryStateInterface } from './state';

const mutation: MutationTree<expensesCategoryStateInterface> = {
  setNewExpenses(state, payload) {
    state.newExpensesCategory = payload;
  },
  updateExpenses(state, payload) {
    state.newExpensesCategory = payload;
  },
  deleteExpenses(state, payload) {
    state.allExpensesCategory.push(payload);
  },

  getAllExpenses(state, payload) {
    state.allExpensesCategory = [];
    state.allExpensesCategory.push(...payload);
  },

  getOneUser(state, payload) {
    state.allExpensesCategory = payload;
  },
};

export default mutation;

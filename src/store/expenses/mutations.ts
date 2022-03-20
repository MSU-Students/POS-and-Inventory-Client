import { MutationTree } from 'vuex';
import { ExpensesStateInterface } from './state';

const mutation: MutationTree<ExpensesStateInterface> = {
  setNewExpenses(state, payload) {
    state.newExpenses = payload;
  },
  updateExpenses(state, payload) {
    state.newExpenses = payload;
  },
  deleteExpenses(state, payload) {
    state.allExpenses.push(payload);
  },

  getAllExpenses(state, payload) {
    state.allExpenses = [];
    state.allExpenses.push(...payload);
  },

  getOneExpenses(state, payload) {
    state.allExpenses = payload;
  },
};

export default mutation;

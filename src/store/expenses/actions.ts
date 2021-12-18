import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ExpensesStateInterface, IExpensesInfo } from './state';

const actions: ActionTree<ExpensesStateInterface, StateInterface> = {
  addExpenses(context, payload: IExpensesInfo) {
    context.commit('setExpenses', payload);
  },

  editExpenses(context, payload: IExpensesInfo) {
    context.commit('setNewExpenses', payload);
  },

  deleteExpenses(context, payload: IExpensesInfo) {
    context.commit('deleteExpenses', payload);
  },
};

export default actions;

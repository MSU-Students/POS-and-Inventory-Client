import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { expensesCategoryStateInterface, IexpensesCategoryInfo } from './state';

const actions: ActionTree<expensesCategoryStateInterface, StateInterface> = {
  addExpenseCat(context, payload: IexpensesCategoryInfo) {
    context.commit('setExpenseCat', payload);
  },

  editExpenseCat(context, payload: IexpensesCategoryInfo) {
    context.commit('setNewExpenseCat', payload);
  },

  deleteExpenseCat(context, payload: IexpensesCategoryInfo) {
    context.commit('deleteExpenseCat', payload);
  },
};

export default actions;

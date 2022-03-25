import expenseCategoryService from 'src/services/expensesCategory.service';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { expensesCategoryStateInterface } from './state';

const actions: ActionTree<expensesCategoryStateInterface, StateInterface> = {
  async addExpensesCat(context, payload: any): Promise<any> {
    const result = await expenseCategoryService.create(payload);
    context.commit('setNewExpenses', result);
    await context.dispatch('getAllExpensesCategory');
  },

  async editExpensesCat(context, payload: any): Promise<any> {
    const result = await expenseCategoryService.create(payload);
    context.commit('updateExpenses', result);
    await context.dispatch('getAllExpensesCategory');
  },

  async deleteExpensesCat(context, expensesID: number): Promise<any> {
    const result = await expenseCategoryService.delete(expensesID);
    context.commit('deleteExpenses', result);
  },

  async getAllExpensesCategory(context): Promise<any> {
    const res = await expenseCategoryService.getAll();
    context.commit('getAllExpenses', res);
  },

  async getOneExpensesCategory(context, expensesID: number): Promise<any> {
    const res = await expenseCategoryService.getOne(expensesID);
    context.commit('getOneUser', res);
  },
};

export default actions;

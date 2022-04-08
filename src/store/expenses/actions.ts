import expensesService from 'src/services/expenses.service';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ExpensesStateInterface } from './state';

const actions: ActionTree<ExpensesStateInterface, StateInterface> = {
  async addExpenses(context, payload: any): Promise<any> {
    const result = await expensesService.create(payload);
    context.commit('setNewExpenses', result);
    await context.dispatch('getAllExpenses');
  },

  async editExpenses(context, payload: any): Promise<any> {
    const result = await expensesService.update(payload.expensesID, payload);
    context.commit('updateExpenses', result);
    await context.dispatch('getAllExpenses');
  },

  async deleteExpenses(context, expensesID: number): Promise<any> {
    const result = await expensesService.delete(expensesID);
    context.commit('deleteExpenses', result);
    await context.dispatch('getAllExpenses');
  },

  async getAllExpenses(context): Promise<any> {
    const res = await expensesService.getAll();
    context.commit('getAllExpenses', res);
    await this.dispatch('supplier/getAllSupplier');
  },

  async getOneExpenses(context, expensesID: number): Promise<any> {
    const res = await expensesService.getOne(expensesID);
    context.commit('getOneExpenses', res);
  },
};

export default actions;

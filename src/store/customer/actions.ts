import customerService from 'src/services/cutomer.service';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { CustomertateInterface } from './state';

const actions: ActionTree<CustomertateInterface, StateInterface> = {
  async addCustomer(context, payload: any): Promise<any> {
    const result = await customerService.create(payload);
    context.commit('setNewCustomer', result);
    await context.dispatch('getAllCustomer');
  },

  async editCustomer(context, payload: any): Promise<any> {
    const result = await customerService.update(payload.id, payload);
    context.commit('updateCustomer', result);
    await context.dispatch('getAllCustomer');
  },

  async deleteCustomer(context, id: number): Promise<any> {
    const result = await customerService.delete(id);
    context.commit('deleteCustomer', result);
    await context.dispatch('getAllCustomer');
  },

  async getAllCustomer(context): Promise<any> {
    const res = await customerService.getAll();
    context.commit('getAllCustomer', res);
    await this.dispatch('supplier/getAllSupplier');
  },

  async getOneCustomer(context, id: number): Promise<any> {
    const res = await customerService.getOne(id);
    context.commit('getOneCustomer', res);
  },
};

export default actions;

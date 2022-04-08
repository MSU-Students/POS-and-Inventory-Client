import { SupplierDto } from 'src/services/rest-api';
import supplierService from 'src/services/supplier.service';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { SupplierStateInterface } from './state';

const actions: ActionTree<SupplierStateInterface, StateInterface> = {
  async addSupplier(context, payload: SupplierDto): Promise<void> {
    const result = await supplierService.create(payload);
    context.commit('setNewSupplier', result);
    await context.dispatch('getAllSupplier');
  },

  async editSupplier(context, payload: any): Promise<any> {
    const result = await supplierService.update(payload.supplierID, payload);
    context.commit('updateSupplier', result);
    await context.dispatch('getAllSupplier');
  },

  async deleteSupplier(context, supplierID: number): Promise<any> {
    const result = await supplierService.delete(supplierID);
    context.commit('deleteSupplier', result);
    await context.dispatch('getAllSupplier');
  },

  async getAllSupplier(context): Promise<any> {
    const res = await supplierService.getAll();
    context.commit('getAllSupplier', res);
  },

  async getOneSupplier(context, supplierID: number): Promise<any> {
    const res = await supplierService.getOne(supplierID);
    context.commit('getOneSupplier', res);
  },
};

export default actions;

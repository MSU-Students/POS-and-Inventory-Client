import inventoryCategoryService from 'src/services/inventoryCategory.service';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { InventoryCatStateInterface } from './state';

const actions: ActionTree<InventoryCatStateInterface, StateInterface> = {
  async addInventoryCat(context, payload: any): Promise<any> {
    const result = await inventoryCategoryService.create(payload);
    context.commit('setNewInventoryCat', result);
    await context.dispatch('getAllInventoryCategory');
  },

  async editInventoryCat(context, payload: any): Promise<any> {
    const result = await inventoryCategoryService.create(payload);
    context.commit('updateInventoryCat', result);
    await context.dispatch('getAllInventoryCategory');
  },

  async deleteInventoryCat(context, categoryID: number): Promise<any> {
    const result = await inventoryCategoryService.delete(categoryID);
    context.commit('deleteInventoryCat', result);
  },

  async getAllInventoryCategory(context): Promise<any> {
    const res = await inventoryCategoryService.getAll();
    context.commit('getAllInventoryCategory', res);
  },

  async getOneInventoryCategory(context, categoryID: number): Promise<any> {
    const res = await inventoryCategoryService.getOne(categoryID);
    context.commit('getOneInventoryCategory', res);
  },
};

export default actions;

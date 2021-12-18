import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { InventoryStateInterface, iInventoryInfo } from './state';

const actions: ActionTree<InventoryStateInterface, StateInterface> = {
  addInventory(context, payload: iInventoryInfo) {
    context.commit('setInventory', payload);
  },

  editInventory(context, payload: iInventoryInfo) {
    context.commit('setNewInventory', payload);
  },

  deleteInventory(context, payload: iInventoryInfo) {
    context.commit('deleteInventory', payload);
  },
};

export default actions;

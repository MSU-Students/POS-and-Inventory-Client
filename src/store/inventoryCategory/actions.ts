import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { InventoryCatStateInterface, IInventoryCatInfo } from './state';

const actions: ActionTree<InventoryCatStateInterface, StateInterface> = {
  addInventoryCat(context, payload: IInventoryCatInfo) {
    context.commit('setInventoryCat', payload);
  },

  editInventoryCat(context, payload: IInventoryCatInfo) {
    context.commit('setNewInventoryCat', payload);
  },

  deleteInventoryCat(context, payload: IInventoryCatInfo) {
    context.commit('deleteInventoryCat', payload);
  },
};

export default actions;

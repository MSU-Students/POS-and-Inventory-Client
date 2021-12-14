import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { SupplierStateInterface, ISupplierInfo } from './state';

const actions: ActionTree<SupplierStateInterface, StateInterface> = {
  addSupplier(context, payload: ISupplierInfo) {
    context.commit('setSupplier', payload);
  },

  editSupplier(context, payload: ISupplierInfo) {
    context.commit('setNewSupplier', payload);
  },

  deleteSupplier(context, payload: ISupplierInfo) {
    context.commit('deleteSupplier', payload);
  },
};

export default actions;

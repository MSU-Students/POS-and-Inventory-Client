import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ManageSaleStateInterface, IManageSaleInfo } from './state';

const actions: ActionTree<ManageSaleStateInterface, StateInterface> = {
  addManageSale(context, payload: IManageSaleInfo) {
    context.commit('setManageSale', payload);
  },

  editManageSale(context, payload: IManageSaleInfo) {
    context.commit('setNewManageSale', payload);
  },

  deleteManageSale(context, payload: IManageSaleInfo) {
    context.commit('deleteManageSale', payload);
  },
};

export default actions;

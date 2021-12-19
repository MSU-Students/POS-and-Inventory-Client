import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { PurchaseStateInterface, IPurchaseInfo } from './state';

const actions: ActionTree<PurchaseStateInterface, StateInterface> = {
  addPurchase(context, payload: IPurchaseInfo) {
    context.commit('setPurchase', payload);
  },

  editPurchase(context, payload: IPurchaseInfo) {
    context.commit('setNewPurchase', payload);
  },

  deletePurchase(context, payload: IPurchaseInfo) {
    context.commit('deletePurchase', payload);
  },
};

export default actions;
